import type { AbstractControl } from '@angular/forms';
import { RegexValidator } from './regex-validator';

export function processRule(
  control: AbstractControl,
  config: { conditionalExpression?: (c: AbstractControl) => boolean } | undefined
): boolean {
  if (!config) return true;
  if (config.conditionalExpression) {
    return config.conditionalExpression(control);
  }
  return true;
}

export function shouldValidate(
  control: AbstractControl,
  config: { conditionalExpression?: (c: AbstractControl) => boolean } | undefined
): boolean {
  if (!processRule(control, config)) return false;
  return RegexValidator.isNotBlank(control.value);
}

export function shouldValidateArray(
  control: AbstractControl,
  config: { conditionalExpression?: (c: AbstractControl) => boolean } | undefined
): boolean {
  if (!processRule(control, config)) return false;
  return typeof control.value === 'string'
    ? RegexValidator.isNotBlank(control.value)
    : Array.isArray(control.value);
}
