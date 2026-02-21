import type { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  wrapParametricValidator,
  getMaxLengthRefValues,
} from '../util/angular-validator-wrapper';
import { AnnotationTypes } from '../const/annotation-types';
import type { MaxLengthConfig } from '../models/config/decorator-config-map';

const maxLengthValidatorFactory = wrapParametricValidator<
  number,
  MaxLengthConfig | number
>(
  Validators.maxLength,
  AnnotationTypes.maxLength,
  getMaxLengthRefValues,
  (config) => {
    if (config === undefined || config === null) return 0;
    if (typeof config === 'number') return config;
    return (config as MaxLengthConfig).value ?? 0;
  },
  { useShouldValidate: true }
);

/**
 * Validates that the control value has maximum length.
 *
 * @param config - MaxLengthConfig with value (max length) and optional message, or number
 * @returns ValidatorFn that returns error when length exceeds maximum
 */
export function maxLengthValidator(
  config: MaxLengthConfig | number
): ValidatorFn {
  return maxLengthValidatorFactory(config);
}
