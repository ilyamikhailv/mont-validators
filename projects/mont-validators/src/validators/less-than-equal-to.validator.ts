import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { getFormControl } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

/**
 * Validates that the control value is less than or equal to another field or fixed value.
 *
 * @param config - Config with fieldName (sibling control) or value (fixed number/string), optional message
 * @returns ValidatorFn that returns error when value exceeds reference
 *
 * @example
 * ```ts
 * lessThanEqualToValidator({ fieldName: 'max' })
 * lessThanEqualToValidator({ value: 100, message: 'Must be at most {{0}}' })
 * ```
 */
export function lessThanEqualToValidator(config: FieldConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidate(control, cfg)) {
      const matchControl = cfg.fieldName
        ? getFormControl(cfg.fieldName, control)
        : undefined;
      const matchValue = matchControl?.value ?? cfg.value ?? '';
      const num = parseFloat(String(control.value));
      const matchNum = parseFloat(String(matchValue));
      if (!isNaN(num) && !isNaN(matchNum) && num > matchNum) {
        return toValidationError(
          AnnotationTypes.lessThanEqualTo,
          { message: cfg.message },
          [control.value, matchValue]
        );
      }
    }
    return nullError();
  };
}
