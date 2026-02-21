import { FormControl } from '@angular/forms';
import { maxLengthValidator } from './max-length.validator';

describe('maxLengthValidator', () => {
  it('should return null when length is valid', () => {
    const control = new FormControl('123');
    expect(maxLengthValidator(5)(control)).toBeNull();
  });

  it('should return error when length exceeds max', () => {
    const control = new FormControl('123456');
    const result = maxLengthValidator(5)(control);
    expect(result).not.toBeNull();
    expect(result!['maxLength']).toBeDefined();
  });

  it('should accept config object', () => {
    const control = new FormControl('123456');
    const result = maxLengthValidator({ value: 5 })(control);
    expect(result).not.toBeNull();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(maxLengthValidator(5)(control)).toBeNull();
  });
});
