import { FormControl } from '@angular/forms';
import { requiredTrueValidator } from './required-true.validator';

describe('requiredTrueValidator', () => {
  it('should return error when value is not true', () => {
    const control = new FormControl(false);
    const result = requiredTrueValidator()(control);
    expect(result).not.toBeNull();
    expect(result!['requiredTrue']).toBeDefined();
  });

  it('should return null when value is true', () => {
    const control = new FormControl(true);
    expect(requiredTrueValidator()(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl(false);
    const result = requiredTrueValidator({
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });
});
