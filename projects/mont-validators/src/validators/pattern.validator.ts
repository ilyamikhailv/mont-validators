import type { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  wrapParametricValidator,
  getPatternRefValues,
} from '../util/angular-validator-wrapper';
import { AnnotationTypes } from '../const/annotation-types';
import type { PatternConfig } from '../models/config/decorator-config-map';

const patternValidatorFactory = wrapParametricValidator<
  string | RegExp,
  PatternConfig
>(
  Validators.pattern,
  AnnotationTypes.pattern,
  getPatternRefValues,
  (config) => {
    if (config === undefined || config === null) return '';
    const c = config as PatternConfig;
    return c.pattern ?? '';
  },
  { useShouldValidate: true }
);

/**
 * Validates that the control value matches a regex pattern.
 *
 * @param config - PatternConfig with pattern and optional message, or pattern directly
 * @returns ValidatorFn that returns error when value does not match pattern
 */
export function patternValidator(
  config: PatternConfig | string | RegExp
): ValidatorFn {
  const normalized =
    typeof config === 'string' || config instanceof RegExp
      ? { pattern: config }
      : config;
  return patternValidatorFactory(normalized);
}
