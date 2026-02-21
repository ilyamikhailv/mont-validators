import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { REGEX_RULES } from '../util/regex-rules';
import { AnnotationTypes } from '../const/annotation-types';
import type { BaseConfig } from '../models/config/base-config';

export function emailValidator(config?: BaseConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidate(control, cfg)) {
      if (!REGEX_RULES['basicEmail'].test(String(control.value))) {
        return toValidationError(
          AnnotationTypes.email,
          { message: cfg.message ?? `Invalid email` },
          [control.value]
        );
      }
    }
    return nullError();
  };
}
