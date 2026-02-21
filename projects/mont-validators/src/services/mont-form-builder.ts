import { DestroyRef, Injectable } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { defaultContainer } from '../core/default-container';
import type { InstanceContainer, PropertyInfo } from '../core/validator.interface';
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY } from '../const/property-types';
import { APP_VALIDATORS } from '../const/app-validators';
import { conditionalChangeValidator } from '../validators/conditional-change.validator';
import { RegexValidator } from '../util/regex-validator';
import {
  isRecord,
  isObjectArray,
  isConstructor,
  toRecord,
  getConstructor,
} from '../util/type-guards';

export interface MontFormBuilderOptions {
  /** DestroyRef for automatic cleanup of cross-field validation subscriptions */
  destroyRef?: DestroyRef;
}

/**
 * Builds FormGroup from a class instance with validation decorators.
 * Use with @prop, @required, @email, etc. decorators.
 *
 * @example
 * ```ts
 * class UserForm {
 *   @prop() @required() @email() email = '';
 *   @prop() @required() @minLength(8) password = '';
 * }
 * const form = this.formBuilder.group(new UserForm());
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MontFormBuilder {

  /**
   * Creates a FormGroup from a decorated class instance.
   * @param model - Class instance with @prop and validator decorators
   * @param options - Optional config, e.g. destroyRef for subscription cleanup
   * @returns FormGroup with validators applied
   */
  group<T extends object>(model: T, options?: MontFormBuilderOptions): FormGroup {
    if (typeof model === 'function') {
      throw new Error(
        'MontFormBuilder.group() expects a class instance, not a constructor. Use: fb.group(new MyClass())'
      );
    }
    const modelConstructor = getConstructor(model);
    const instance = defaultContainer.get(modelConstructor);
    if (!instance) {
      throw new Error(
        `No metadata found for ${modelConstructor?.name ?? 'model'}. Ensure decorators are applied.`
      );
    }
    return this.createFormGroup(instance, toRecord(model), options?.destroyRef);
  }

  private createFormGroup(
    instanceContainer: InstanceContainer,
    entityObject: Record<string, unknown>,
    destroyRef?: DestroyRef
  ): FormGroup {
    const group: Record<string, AbstractControl> = {};

    for (const property of instanceContainer.properties) {
      if (property.ignore?.(entityObject)) continue;

      const validators = this.getValidatorsForProperty(property, instanceContainer, destroyRef);

      switch (property.propertyType) {
        case PROPERTY:
          group[property.name] = new FormControl(
            this.getPropertyValue(entityObject, property),
            validators
          );
          break;
        case OBJECT_PROPERTY:
          const entity = this.getEntity(property, entityObject);
          const rawObj = entityObject[property.name];
          const objValue = isRecord(rawObj) ? rawObj : {};
          if (entity) {
            const nestedInstance = defaultContainer.get(entity);
            if (nestedInstance) {
              group[property.name] = this.createFormGroup(nestedInstance, objValue, destroyRef);
            } else {
              group[property.name] = new FormControl(objValue, validators);
            }
          } else {
            group[property.name] = new FormControl(objValue, validators);
          }
          break;
        case ARRAY_PROPERTY:
          const arrEntity = this.getEntity(property, entityObject);
          const rawArr = entityObject[property.name];
          const arrValue = isObjectArray(rawArr) ? rawArr : [];
          const arrayControls = arrValue.map((item) => {
            if (arrEntity) {
              const nestedInstance = defaultContainer.get(arrEntity);
              if (nestedInstance) {
                return this.createFormGroup(nestedInstance, item, destroyRef);
              }
            }
            return new FormControl(item, validators);
          });
          group[property.name] = new FormArray(arrayControls);
          break;
      }
    }

    return new FormGroup(group);
  }

  private getValidatorsForProperty(
    property: PropertyInfo,
    instanceContainer: InstanceContainer,
    destroyRef?: DestroyRef
  ): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    const columns = this.getColumnsForProperty(property.name, instanceContainer);
    if (columns.length > 0) {
      validators.push(conditionalChangeValidator(columns, destroyRef));
    }

    const propertyValidators = instanceContainer.propertyAnnotations.filter(
      (a) => a.propertyName === property.name && a.isValidator !== false
    );

    for (const pv of propertyValidators) {
      if (pv.isAsync) continue;
      const validatorFn = APP_VALIDATORS[pv.annotationType];
      if (validatorFn) {
        const config =
          pv.annotationType === 'required' || pv.annotationType === 'requiredTrue'
            ? undefined
            : (pv.config ?? {});
        validators.push(validatorFn(config as never));
      }
    }

    return validators;
  }

  private getColumnsForProperty(
    propertyName: string,
    instanceContainer: InstanceContainer
  ): string[] {
    const conditionalValidationProps = instanceContainer.conditionalValidationProps;
    if (!conditionalValidationProps) return [];
    return Object.keys(conditionalValidationProps).filter((key) =>
      conditionalValidationProps[key].includes(propertyName)
    );
  }

  private getPropertyValue(
    entityObject: Record<string, unknown>,
    property: PropertyInfo
  ): unknown {
    const key = property.dataPropertyName ?? property.name;
    let value = entityObject[key];
    if (!RegexValidator.isNotBlank(value) && property.defaultValue !== undefined) {
      value = property.defaultValue;
    }
    return value;
  }

  private getEntity(
    property: PropertyInfo,
    entityObject: Record<string, unknown>
  ): (new (...args: unknown[]) => unknown) | undefined {
    if (property.entity) return property.entity;
    if (property.entityProvider) {
      const result = property.entityProvider.call(entityObject);
      return isConstructor(result) ? result : undefined;
    }
    if (property.propertyType === OBJECT_PROPERTY) {
      const val = entityObject[property.name];
      if (isRecord(val)) {
        return val.constructor as new (...args: unknown[]) => unknown;
      }
    }
    if (property.propertyType === ARRAY_PROPERTY) {
      const arr = entityObject[property.name];
      if (Array.isArray(arr) && arr.length > 0) {
        const first = arr[0];
        if (isRecord(first)) {
          return first.constructor as new (...args: unknown[]) => unknown;
        }
      }
    }
    return undefined;
  }
}
