import { FormControl, FormGroup } from '@angular/forms';
import { greaterThanValidator } from './greater-than.validator';

describe('greaterThanValidator', () => {
  it('should return null when value is greater than field', () => {
    const form = new FormGroup({
      min: new FormControl(5),
      max: new FormControl(10),
    });
    const control = form.get('max')!;
    control.setValidators([greaterThanValidator({ fieldName: 'min' })]);
    control.updateValueAndValidity();
    expect(control.errors).toBeNull();
  });

  it('should return error when value is not greater than field', () => {
    const form = new FormGroup({
      min: new FormControl(10),
      max: new FormControl(5),
    });
    const control = form.get('max')!;
    control.setValidators([greaterThanValidator({ fieldName: 'min' })]);
    control.updateValueAndValidity();
    expect(control.errors).not.toBeNull();
    expect(control.errors!['greaterThan']).toBeDefined();
  });

  it('should return error when value equals field', () => {
    const form = new FormGroup({
      min: new FormControl(10),
      max: new FormControl(10),
    });
    const control = form.get('max')!;
    control.setValidators([greaterThanValidator({ fieldName: 'min' })]);
    control.updateValueAndValidity();
    expect(control.errors).not.toBeNull();
  });

  it('should use value from config when fieldName not in form', () => {
    const control = new FormControl(5);
    const result = greaterThanValidator({ value: 10 })(control);
    expect(result).not.toBeNull();
    expect(result!['greaterThan']).toBeDefined();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(greaterThanValidator({ value: 10 })(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const form = new FormGroup({
      min: new FormControl(10),
      max: new FormControl(5),
    });
    const control = form.get('max')!;
    control.setValidators([
      greaterThanValidator({
        fieldName: 'min',
        conditionalExpression: () => false,
      }),
    ]);
    control.updateValueAndValidity();
    expect(control.errors).toBeNull();
  });

  it('should use custom message when provided', () => {
    const control = new FormControl(5);
    const result = greaterThanValidator({
      value: 10,
      message: 'Must be greater',
    })(control);
    expect(result).not.toBeNull();
    expect(result!['greaterThan'].message).toBe('Must be greater');
  });
});
