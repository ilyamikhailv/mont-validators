import { Validators } from '@angular/forms';
import { minNumberValidator } from './validators/min-number.validator';
import { maxNumberValidator } from './validators/max-number.validator';
import { greaterThanValidator } from './validators/greater-than.validator';
import { lessThanEqualToValidator } from './validators/less-than-equal-to.validator';
import { urlValidator } from './validators/url.validator';
import { emailValidator } from './validators/email.validator';
import { passwordValidator } from './validators/password.validator';
import { compareValidator } from './validators/compare.validator';
import { choiceValidator } from './validators/choice.validator';
import { oneOfValidator } from './validators/one-of.validator';
import type { NumberConfig } from './models/config/number-config';
import type { FieldConfig } from './models/config/field-config';
import type { ChoiceConfig } from './models/config/choice-config';
import type { ArrayConfig } from './models/config/array-config';
import type { PasswordConfig } from './models/config/password-config';
import type { BaseConfig } from './models/config/base-config';

/**
 * Imperative API for Angular Reactive Forms validators.
 * Use with FormControl/FormGroup validators array.
 *
 * @example
 * ```ts
 * const control = new FormControl('', [
 *   MontValidators.required(),
 *   MontValidators.email(),
 * ]);
 * ```
 */
export const MontValidators = {
  /** Requires non-empty value */
  required: () => Validators.required,
  /** Requires value to be exactly true */
  requiredTrue: () => Validators.requiredTrue,
  /** Minimum string length */
  minLength: (min: number) => Validators.minLength(min),
  /** Maximum string length */
  maxLength: (max: number) => Validators.maxLength(max),
  /** Regex pattern match */
  pattern: (pattern: string | RegExp) => Validators.pattern(pattern),
  /** Email format validation */
  email: (config?: BaseConfig) => emailValidator(config),
  /** Minimum numeric value */
  minNumber: (config: NumberConfig | number) => minNumberValidator(config),
  /** Maximum numeric value */
  maxNumber: (config: NumberConfig | number) => maxNumberValidator(config),
  /** Value must be greater than another field or value */
  greaterThan: (config: FieldConfig) => greaterThanValidator(config),
  /** Value must be less than or equal to another field or value */
  lessThanEqualTo: (config: FieldConfig) => lessThanEqualToValidator(config),
  /** URL format validation */
  url: (config?: BaseConfig) => urlValidator(config),
  /** Password strength validation (digit, upperCase, etc.) */
  password: (config?: PasswordConfig) => passwordValidator(config),
  /** Value must match another field */
  compare: (config: FieldConfig) => compareValidator(config),
  /** Array length between minLength and maxLength */
  choice: (config?: ChoiceConfig) => choiceValidator(config),
  /** Value must be one of allowed values */
  oneOf: (config: ArrayConfig) => oneOfValidator(config),
};
