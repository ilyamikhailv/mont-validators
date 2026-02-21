import { FormControl } from '@angular/forms';
import { minNumberValidator } from './min-number.validator';

describe('minNumberValidator', () => {
  it('should return null when value is valid', () => {
    const control = new FormControl(10);
    expect(minNumberValidator(5)(control)).toBeNull();
  });

  it('should return error when value is less than min', () => {
    const control = new FormControl(3);
    const result = minNumberValidator(5)(control);
    expect(result).not.toBeNull();
    expect(result!['minNumber']).toBeDefined();
  });

  it('should accept config object', () => {
    const control = new FormControl(3);
    const result = minNumberValidator({ value: 5 })(control);
    expect(result).not.toBeNull();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(minNumberValidator(5)(control)).toBeNull();
  });
});
