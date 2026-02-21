import type { ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import type { ValidationErrors } from './util/object-maker';

/**
 * Creates a FormControl with validator and runs validation.
 */
export function createControlWithValidator(
  value: unknown,
  validator: ValidatorFn
): FormControl {
  const control = new FormControl(value);
  control.setValidators([validator]);
  control.updateValueAndValidity();
  return control;
}

/**
 * Asserts that validation result contains error for the given key.
 * Returns the error detail for further assertions.
 */
export function expectValidationError(
  result: ValidationErrors | null,
  key: string
): NonNullable<ValidationErrors[string]> {
  expect(result).not.toBeNull();
  const error = result![key];
  expect(error).toBeDefined();
  return error!;
}
