import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import type { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * When the specified controls change, triggers revalidation of the current control.
 * Used for cross-field validation (e.g. greaterThan, lessThanEqualTo, compare).
 * Sets up valueChanges subscriptions on the dependent controls.
 *
 * @param conditionalValidationProps - Field paths to watch for changes
 * @param destroyRef - Optional DestroyRef for automatic subscription cleanup when form context is destroyed
 */
export function conditionalChangeValidator(
  conditionalValidationProps: string[],
  destroyRef?: DestroyRef
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
          const valueChanges$ = targetControl.valueChanges;
          if (destroyRef) {
            valueChanges$
              .pipe(takeUntilDestroyed(destroyRef))
              .subscribe(() => {
                setTimeout(() => control.updateValueAndValidity({ emitEvent: false }), 0);
              });
          } else {
            valueChanges$.subscribe(() => {
              setTimeout(() => control.updateValueAndValidity({ emitEvent: false }), 0);
            });
          }
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
  throw new Error(
    'conditionalChangeValidator requires controls to be inside a FormGroup. ' +
      'Ensure the control is part of a FormGroup hierarchy.'
  );
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
