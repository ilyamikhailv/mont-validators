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
import type { CompareConfig } from './models/config/compare-config';
import type { ChoiceConfig } from './models/config/choice-config';
import type { ArrayConfig } from './models/config/array-config';
import type { PasswordConfig } from './models/config/password-config';
import type { BaseConfig } from './models/config/base-config';

export const MontValidators = {
  required: () => Validators.required,
  requiredTrue: () => Validators.requiredTrue,
  minLength: (min: number) => Validators.minLength(min),
  maxLength: (max: number) => Validators.maxLength(max),
  pattern: (pattern: string | RegExp) => Validators.pattern(pattern),
  email: (config?: BaseConfig) => emailValidator(config),
  minNumber: (config: NumberConfig | number) => minNumberValidator(config),
  maxNumber: (config: NumberConfig | number) => maxNumberValidator(config),
  greaterThan: (config: FieldConfig) => greaterThanValidator(config),
  lessThanEqualTo: (config: FieldConfig) => lessThanEqualToValidator(config),
  url: (config?: BaseConfig) => urlValidator(config),
  password: (config?: PasswordConfig) => passwordValidator(config),
  compare: (config: CompareConfig) => compareValidator(config),
  choice: (config?: ChoiceConfig) => choiceValidator(config),
  oneOf: (config: ArrayConfig) => oneOfValidator(config),
};
