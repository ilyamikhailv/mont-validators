import type { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { shouldValidate } from '../util/form-provider';
import { toValidationError, nullError } from '../util/object-maker';
import { getFormControl } from '../util/app-util';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

export function greaterThanValidator(config: FieldConfig): ValidatorFn {
  return (control: AbstractControl) => {
    const cfg = config ?? {};
    if (shouldValidate(control, cfg)) {
      const matchControl = cfg.fieldName
        ? getFormControl(cfg.fieldName, control)
        : undefined;
      const matchValue = matchControl?.value ?? cfg.value ?? '';
      const num = parseFloat(String(control.value));
      const matchNum = parseFloat(String(matchValue));
      if (!isNaN(num) && !isNaN(matchNum) && num <= matchNum) {
        return toValidationError(
          AnnotationTypes.greaterThan,
          { message: cfg.message ?? `Value must be greater than {{0}}` },
          [control.value, matchValue]
        );
      }
    }
    return nullError();
  };
}
