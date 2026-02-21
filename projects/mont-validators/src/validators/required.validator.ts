import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { wrapAngularValidator } from '../util/angular-validator-wrapper';
import { AnnotationTypes } from '../const/annotation-types';
import type { BaseConfig } from '../models/config/base-config';

const requiredValidatorFactory = wrapAngularValidator(
  Validators.required,
  AnnotationTypes.required,
  (control) => [control.value],
  { useShouldValidate: false }
);

/**
 * Validates that the control has a non-empty value.
 *
 * @param config - Optional config with message, conditionalExpression
 * @returns ValidatorFn that returns error when value is empty
 */
export function requiredValidator(config?: BaseConfig): ValidatorFn {
  return requiredValidatorFactory(config);
}
