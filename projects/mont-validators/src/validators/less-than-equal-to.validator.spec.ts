import { FormControl, FormGroup } from '@angular/forms';
import { lessThanEqualToValidator } from './less-than-equal-to.validator';

describe('lessThanEqualToValidator', () => {
  it('should return null when value is less than field', () => {
    const form = new FormGroup({
      min: new FormControl(5),
      max: new FormControl(10),
    });
    const control = form.get('min')!;
    control.setValidators([lessThanEqualToValidator({ fieldName: 'max' })]);
    control.updateValueAndValidity();
    expect(control.errors).toBeNull();
  });

  it('should return null when value equals field', () => {
    const form = new FormGroup({
      min: new FormControl(10),
      max: new FormControl(10),
    });
    const control = form.get('min')!;
    control.setValidators([lessThanEqualToValidator({ fieldName: 'max' })]);
    control.updateValueAndValidity();
    expect(control.errors).toBeNull();
  });

  it('should return error when value is greater than field', () => {
    const form = new FormGroup({
      min: new FormControl(15),
      max: new FormControl(10),
    });
    const control = form.get('min')!;
    control.setValidators([lessThanEqualToValidator({ fieldName: 'max' })]);
    control.updateValueAndValidity();
    expect(control.errors).not.toBeNull();
    expect(control.errors!['lessThanEqualTo']).toBeDefined();
  });

  it('should use value from config when fieldName not in form', () => {
    const control = new FormControl(15);
    const result = lessThanEqualToValidator({ value: 10 })(control);
    expect(result).not.toBeNull();
    expect(result!['lessThanEqualTo']).toBeDefined();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(lessThanEqualToValidator({ value: 10 })(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const form = new FormGroup({
      min: new FormControl(15),
      max: new FormControl(10),
    });
    const control = form.get('min')!;
    control.setValidators([
      lessThanEqualToValidator({
        fieldName: 'max',
        conditionalExpression: () => false,
      }),
    ]);
    control.updateValueAndValidity();
    expect(control.errors).toBeNull();
  });

  it('should use custom message when provided', () => {
    const control = new FormControl(15);
    const result = lessThanEqualToValidator({
      value: 10,
      message: 'Must be less or equal',
    })(control);
    expect(result).not.toBeNull();
    expect(result!['lessThanEqualTo'].message).toBe('Must be less or equal');
  });
});
