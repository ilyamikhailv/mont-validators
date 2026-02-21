import { FormControl } from '@angular/forms';
import { maxNumberValidator } from './max-number.validator';

describe('maxNumberValidator', () => {
  it('should return null when value is valid', () => {
    const control = new FormControl(5);
    expect(maxNumberValidator(10)(control)).toBeNull();
  });

  it('should return error when value exceeds max', () => {
    const control = new FormControl(15);
    const result = maxNumberValidator(10)(control);
    expect(result).not.toBeNull();
    expect(result!['maxNumber']).toBeDefined();
  });

  it('should accept config object', () => {
    const control = new FormControl(15);
    const result = maxNumberValidator({ value: 10 })(control);
    expect(result).not.toBeNull();
  });
});
