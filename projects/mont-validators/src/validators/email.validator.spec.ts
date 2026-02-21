import { FormControl } from '@angular/forms';
import { emailValidator } from './email.validator';

describe('emailValidator', () => {
  it.each([
    ['test@example.com', true],
    ['user@domain.org', true],
    ['a@b.co', true],
    ['invalid', false],
    ['', true],
    ['no-at-sign', false],
  ])('should validate %s as %s', (value, expectedValid) => {
    const result = emailValidator()(new FormControl(value));
    expect(result === null).toBe(expectedValid);
  });

  it('should return null for valid email', () => {
    const control = new FormControl('test@example.com');
    expect(emailValidator()(control)).toBeNull();
  });

  it('should return error for invalid email', () => {
    const control = new FormControl('invalid');
    const result = emailValidator()(control);
    expect(result).not.toBeNull();
    expect(result!['email']).toBeDefined();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(emailValidator()(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl('invalid');
    const result = emailValidator({
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });
});
