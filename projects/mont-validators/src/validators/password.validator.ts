import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { RegexValidator } from '../util/regex-validator';
import { AnnotationTypes } from '../const/annotation-types';
import type { PasswordConfig } from '../models/config/password-config';

/**
 * Validates password strength (digit, alphabet, lowerCase, upperCase, specialCharacter, minLength, maxLength).
 *
 * @param config - Optional config with validation rules and message
 * @returns ValidatorFn that returns error when password does not meet validation rules
 *
 * @example
 * ```ts
 * passwordValidator({ validation: { digit: true, minLength: 8 } })
 * passwordValidator({ validation: { upperCase: true, lowerCase: true }, message: 'Weak password' })
 * ```
 */
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
