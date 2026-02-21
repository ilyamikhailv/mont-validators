import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { RegexValidator } from '../util/regex-validator';
import { toValidationError, nullError } from '../util/object-maker';
import { getFormControl } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { CompareConfig } from '../models/config/compare-config';

export function compareValidator(config: CompareConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    const compareControl = cfg.fieldName
      ? getFormControl(cfg.fieldName, control)
      : undefined;
    const controlValue = control.value;
    const compareValue = compareControl?.value ?? '';

    if (
      RegexValidator.isNotBlank(controlValue) ||
      RegexValidator.isNotBlank(compareValue)
    ) {
      if (!(compareControl && compareControl.value === controlValue)) {
        return toValidationError(
          AnnotationTypes.compare,
          { message: cfg.message ?? `Fields do not match` },
          [controlValue, compareValue]
        );
      }
    }
    return nullError();
  };
}
