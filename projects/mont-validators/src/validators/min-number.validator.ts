import type { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  wrapParametricValidator,
  getMinRefValues,
} from '../util/angular-validator-wrapper';
import { getNumberConfig } from '../util/config-provider';
import { AnnotationTypes } from '../const/annotation-types';
import type { NumberConfig } from '../models/config/number-config';

const minNumberValidatorFactory = wrapParametricValidator<
  number,
  NumberConfig | number
>(
  Validators.min,
  AnnotationTypes.minNumber,
  getMinRefValues,
  (config) => getNumberConfig(config).value,
  { useShouldValidate: true }
);

/**
 * Validates that the control value is a number >= minimum.
 *
 * @param config - NumberConfig with value (min) and optional message, or number for min value
 * @returns ValidatorFn that returns error when value is less than minimum
 */
export function minNumberValidator(config: NumberConfig | number): ValidatorFn {
  return minNumberValidatorFactory(config);
}
