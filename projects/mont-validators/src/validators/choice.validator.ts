import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidateArray } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { AnnotationTypes } from '../const/annotation-types';
import type { ChoiceConfig } from '../models/config/choice-config';

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
          {
            message:
              cfg.message ?? `Array length must be between {{0}} and {{1}}`,
          },
          [minLen, maxLen]
        );
      }
    }
    return nullError();
  };
}
