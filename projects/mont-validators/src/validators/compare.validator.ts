import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { RegexValidator } from '../util/regex-validator';
import { toValidationError, nullError } from '../util/object-maker';
import { getFormControl } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

/**
 * Validates that the control value matches another field's value (e.g. confirm password).
 *
 * @param config - Config with fieldName (sibling control to compare with) and optional message
 * @returns ValidatorFn that returns error when values do not match
 *
 * @example
 * ```ts
 * compareValidator({ fieldName: 'password' })
 * compareValidator({ fieldName: 'password', message: 'Passwords do not match' })
 * ```
 */
export function compareValidator(config: FieldConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    const compareControl = cfg.fieldName
      ? getFormControl(cfg.fieldName, control)
      : undefined;
    const controlValue = control.value;
    const compareValue = compareControl?.value ?? '';

    if (
      RegexValidator.isNotBlank(controlValue) ||
      RegexValidator.isNotBlank(compareValue)
    ) {
      if (!(compareControl && compareControl.value === controlValue)) {
        return toValidationError(
          AnnotationTypes.compare,
          { message: cfg.message },
          [controlValue, compareValue]
        );
      }
    }
    return nullError();
  };
}
