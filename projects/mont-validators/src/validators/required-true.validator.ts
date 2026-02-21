import type { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { wrapAngularValidator } from '../util/angular-validator-wrapper';
import { AnnotationTypes } from '../const/annotation-types';
import type { BaseConfig } from '../models/config/base-config';

const requiredTrueValidatorFactory = wrapAngularValidator(
  Validators.requiredTrue,
  AnnotationTypes.requiredTrue,
  (control) => [control.value],
  { useShouldValidate: false }
);

/**
 * Validates that the control value is exactly true (e.g. for checkboxes).
 *
 * @param config - Optional config with message, conditionalExpression
 * @returns ValidatorFn that returns error when value is not true
 */
export function requiredTrueValidator(config?: BaseConfig): ValidatorFn {
  return requiredTrueValidatorFactory(config);
}
