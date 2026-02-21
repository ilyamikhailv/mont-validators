import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidateArray } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { AnnotationTypes } from '../const/annotation-types';
import type { ChoiceConfig } from '../models/config/choice-config';

/**
 * Validates array length is between minLength and maxLength.
 * Use for multi-select or checkbox groups.
 *
 * @param config - Optional config with minLength, maxLength (0 = no max), message
 * @returns ValidatorFn that returns error when array length is out of range
 *
 * @example
 * ```ts
 * choiceValidator({ minLength: 1, maxLength: 5 })
 * choiceValidator({ minLength: 2, message: 'Select at least 2 items' })
 * ```
 */
export function choiceValidator(config?: ChoiceConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidateArray(control, cfg)) {
      const value = control.value;
      if (!Array.isArray(value)) return nullError();
      const arr = value;
      const minLen = cfg.minLength ?? 0;
      const maxLen = cfg.maxLength ?? 0;
      if (arr.length < minLen || (maxLen !== 0 && arr.length > maxLen)) {
        return toValidationError(
          AnnotationTypes.choice,
          { message: cfg.message },
          [minLen, maxLen]
        );
      }
    }
    return nullError();
  };
}
