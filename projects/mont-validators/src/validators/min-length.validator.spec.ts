import { FormControl } from '@angular/forms';
import { minLengthValidator } from './min-length.validator';

describe('minLengthValidator', () => {
  it('should return null when length is valid', () => {
    const control = new FormControl('12345');
    expect(minLengthValidator(5)(control)).toBeNull();
  });

  it('should return error when length is less than min', () => {
    const control = new FormControl('123');
    const result = minLengthValidator(5)(control);
    expect(result).not.toBeNull();
    expect(result!['minLength']).toBeDefined();
  });

  it('should accept config object', () => {
    const control = new FormControl('12');
    const result = minLengthValidator({ value: 5 })(control);
    expect(result).not.toBeNull();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(minLengthValidator(5)(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl('12');
    const result = minLengthValidator({
      value: 5,
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });
});
