import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { getNumberConfig } from '../util/config-provider';
import { AnnotationTypes } from '../const/annotation-types';
import type { NumberConfig } from '../models/config/number-config';

/**
 * Validates that the control value is a number >= minimum.
 *
 * @param config - NumberConfig with value (min) and optional message, or number for min value
 * @returns ValidatorFn that returns error when value is less than minimum
 *
 * @example
 * ```ts
 * minNumberValidator(0)
 * minNumberValidator({ value: 18, message: 'Age must be at least {{0}}' })
 * ```
 */
export function minNumberValidator(config: NumberConfig | number): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = getNumberConfig(config);
    if (shouldValidate(control, cfg)) {
      const num = parseFloat(String(control.value));
      if (isNaN(num) || num < cfg.value) {
        return toValidationError(
          AnnotationTypes.minNumber,
          { message: cfg.message },
          [control.value, cfg.value]
        );
      }
    }
    return nullError();
  };
}
