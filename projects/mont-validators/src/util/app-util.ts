import { FormGroup } from '@angular/forms';
import type { AbstractControl } from '@angular/forms';

export function getFormControl(
  fieldName: string,
  control: AbstractControl
): AbstractControl | undefined {
  const splitText = fieldName.split('.');
  if (splitText.length > 1 && control.parent instanceof FormGroup) {
    let formControl: AbstractControl | undefined = control.parent;
    for (const name of splitText) {
      formControl = formControl?.get(name) ?? undefined;
    }
    return formControl;
  }
  return control.parent instanceof FormGroup
    ? control.parent.get(fieldName) ?? undefined
    : undefined;
}

export function lowerCaseWithTrim(value: unknown): string {
  return typeof value === 'string'
    ? value.toLowerCase().trim()
    : String(value ?? '').toLowerCase().trim();
}
