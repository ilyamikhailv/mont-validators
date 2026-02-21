import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { getFormControl } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

/**
 * Validates that the control value is greater than another field or fixed value.
 *
 * @param config - Config with fieldName (sibling control) or value (fixed number/string), optional message
 * @returns ValidatorFn that returns error when value is not greater than reference
 *
 * @example
 * ```ts
 * greaterThanValidator({ fieldName: 'min' })
 * greaterThanValidator({ value: 0, message: 'Must be positive' })
 * ```
 */
export function greaterThanValidator(config: FieldConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidate(control, cfg)) {
      const matchControl = cfg.fieldName
        ? getFormControl(cfg.fieldName, control)
        : undefined;
      const matchValue = matchControl?.value ?? cfg.value ?? '';
      const num = parseFloat(String(control.value));
      const matchNum = parseFloat(String(matchValue));
      if (!isNaN(num) && !isNaN(matchNum) && num <= matchNum) {
        return toValidationError(
          AnnotationTypes.greaterThan,
          { message: cfg.message },
          [control.value, matchValue]
        );
      }
    }
    return nullError();
  };
}
