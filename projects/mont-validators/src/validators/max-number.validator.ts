import type { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  wrapParametricValidator,
  getMaxRefValues,
} from '../util/angular-validator-wrapper';
import { getNumberConfig } from '../util/config-provider';
import { AnnotationTypes } from '../const/annotation-types';
import type { NumberConfig } from '../models/config/number-config';

const maxNumberValidatorFactory = wrapParametricValidator<
  number,
  NumberConfig | number
>(
  Validators.max,
  AnnotationTypes.maxNumber,
  getMaxRefValues,
  (config) => getNumberConfig(config).value,
  { useShouldValidate: true }
);

/**
 * Validates that the control value is a number <= maximum.
 *
 * @param config - NumberConfig with value (max) and optional message, or number for max value
 * @returns ValidatorFn that returns error when value exceeds maximum
 */
export function maxNumberValidator(config: NumberConfig | number): ValidatorFn {
  return maxNumberValidatorFactory(config);
}
