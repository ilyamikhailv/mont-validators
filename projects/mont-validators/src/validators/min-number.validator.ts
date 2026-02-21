import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { getNumberConfig } from '../util/config-provider';
import { AnnotationTypes } from '../const/annotation-types';
import type { NumberConfig } from '../models/config/number-config';

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
