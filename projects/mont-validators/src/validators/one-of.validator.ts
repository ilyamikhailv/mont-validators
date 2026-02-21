import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { processRule } from '../util/form-provider';
import { RegexValidator } from '../util/regex-validator';
import { toValidationError, nullError } from '../util/object-maker';
import { lowerCaseWithTrim } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { ArrayConfig } from '../models/config/array-config';

export function oneOfValidator(config: ArrayConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    const shouldValidate =
      processRule(control, cfg) &&
      (typeof control.value === 'string'
        ? RegexValidator.isNotBlank(control.value)
        : Array.isArray(control.value));
    if (shouldValidate) {
      const matchValues = cfg.matchValues ?? [];
      let found = false;
      for (const value of matchValues) {
        const matchValue = lowerCaseWithTrim(value);
        const controlVal = control.value;
        if (Array.isArray(controlVal)) {
          found = controlVal.some((y) => lowerCaseWithTrim(y) === matchValue);
        } else {
          found = lowerCaseWithTrim(controlVal) === matchValue;
        }
        if (found) break;
      }
      if (!found) {
        return toValidationError(
          AnnotationTypes.oneOf,
          { message: cfg.message ?? `Value must be one of the allowed values` },
          [control.value]
        );
      }
    }
    return nullError();
  };
}
