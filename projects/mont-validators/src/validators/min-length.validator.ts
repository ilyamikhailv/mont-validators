import type { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  wrapParametricValidator,
  getMinLengthRefValues,
} from '../util/angular-validator-wrapper';
import { AnnotationTypes } from '../const/annotation-types';
import type { MinLengthConfig } from '../models/config/decorator-config-map';

const minLengthValidatorFactory = wrapParametricValidator<
  number,
  MinLengthConfig | number
>(
  Validators.minLength,
  AnnotationTypes.minLength,
  getMinLengthRefValues,
  (config) => {
    if (config === undefined || config === null) return 0;
    if (typeof config === 'number') return config;
    return (config as MinLengthConfig).value ?? 0;
  },
  { useShouldValidate: true }
);

/**
 * Validates that the control value has minimum length.
 *
 * @param config - MinLengthConfig with value (min length) and optional message, or number
 * @returns ValidatorFn that returns error when length is less than minimum
 */
export function minLengthValidator(
  config: MinLengthConfig | number
): ValidatorFn {
  return minLengthValidatorFactory(config);
}
