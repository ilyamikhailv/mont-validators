import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { RegexValidator } from '../util/regex-validator';
import { AnnotationTypes } from '../const/annotation-types';
import type { PasswordConfig } from '../models/config/password-config';

export function passwordValidator(config?: PasswordConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidate(control, cfg)) {
      const validation = RegexValidator.isValidPassword(
        cfg.validation,
        String(control.value)
      );
      if (!validation.isValid) {
        return toValidationError(
          AnnotationTypes.password,
          { message: cfg.message },
          [control.value]
        );
      }
    }
    return nullError();
  };
}
