import { FormControl } from '@angular/forms';
import { requiredValidator } from './required.validator';

describe('requiredValidator', () => {
  it('should return error when value is empty', () => {
    const control = new FormControl('');
    const result = requiredValidator()(control);
    expect(result).not.toBeNull();
    expect(result!['required']).toBeDefined();
  });

  it('should return null when value is non-empty', () => {
    const control = new FormControl('value');
    expect(requiredValidator()(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl('');
    const result = requiredValidator({
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });
});
