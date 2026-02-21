import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { getFormControl } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

export function lessThanEqualToValidator(config: FieldConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidate(control, cfg)) {
      const matchControl = cfg.fieldName
        ? getFormControl(cfg.fieldName, control)
        : undefined;
      const matchValue = matchControl?.value ?? cfg.value ?? '';
      const num = parseFloat(String(control.value));
      const matchNum = parseFloat(String(matchValue));
      if (!isNaN(num) && !isNaN(matchNum) && num > matchNum) {
        return toValidationError(
          AnnotationTypes.lessThanEqualTo,
          { message: cfg.message },
          [control.value, matchValue]
        );
      }
    }
    return nullError();
  };
}
