import { FormGroup } from '@angular/forms';
import type { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

/**
 * When the specified controls change, triggers revalidation of the current control.
 * Used for cross-field validation (e.g. greaterThan, lessThanEqualTo, compare).
 * Sets up valueChanges subscriptions on the dependent controls.
 */
export function conditionalChangeValidator(
  conditionalValidationProps: string[]
): ValidatorFn {
  let subscribed = false;
  return (control: AbstractControl) => {
    if (control.parent && !subscribed) {
      subscribed = true;
      const rootFormGroup = getRootFormGroup(control);
      const parentFormGroup = control.parent;

      conditionalValidationProps.forEach((propPath) => {
        const targetControl = getControlByPath(rootFormGroup, parentFormGroup, propPath);
        if (targetControl) {
          targetControl.valueChanges.subscribe(() => {
            setTimeout(() => control.updateValueAndValidity({ emitEvent: false }), 0);
          });
        }
      });
    }
    return null;
  };
}

function getRootFormGroup(control: AbstractControl): FormGroup {
  if (control.parent) {
    return getRootFormGroup(control.parent);
  }
  if (control instanceof FormGroup) {
    return control;
  }
  throw new Error('Root control must be a FormGroup');
}

function getControlByPath(
  rootFormGroup: FormGroup,
  parentFormGroup: AbstractControl,
  propPath: string
): AbstractControl | null {
  if (propPath.includes('[]')) {
    return null;
  }
  const parts = propPath.split('.');
  if (parts.length > 1) {
    let ctrl: AbstractControl | null = rootFormGroup;
    for (const name of parts) {
      ctrl = ctrl?.get(name) ?? null;
    }
    return ctrl;
  }
  return parentFormGroup.get(propPath) ?? null;
}
