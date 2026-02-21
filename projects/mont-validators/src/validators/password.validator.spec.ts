import { FormControl } from '@angular/forms';
import { passwordValidator } from './password.validator';

describe('passwordValidator', () => {
  it('should return null when no validation config', () => {
    const control = new FormControl('any');
    expect(passwordValidator()(control)).toBeNull();
  });

  it('should return null for password with digit when digit required', () => {
    const control = new FormControl('pass1');
    expect(passwordValidator({ validation: { digit: true } })(control)).toBeNull();
  });

  it('should return error when digit required but missing', () => {
    const control = new FormControl('password');
    const result = passwordValidator({ validation: { digit: true } })(control);
    expect(result).not.toBeNull();
    expect(result!['password']).toBeDefined();
  });

  it('should return null for password with minLength satisfied', () => {
    const control = new FormControl('12345');
    expect(
      passwordValidator({ validation: { minLength: 5 } })(control)
    ).toBeNull();
  });

  it('should return error when minLength not satisfied', () => {
    const control = new FormControl('123');
    const result = passwordValidator({ validation: { minLength: 5 } })(control);
    expect(result).not.toBeNull();
    expect(result!['password']).toBeDefined();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(passwordValidator({ validation: { digit: true } })(control)).toBeNull();
  });

  it('should use custom message when provided', () => {
    const control = new FormControl('abc');
    const result = passwordValidator({
      validation: { digit: true },
      message: 'Custom password error',
    })(control);
    expect(result).not.toBeNull();
    expect(result!['password'].message).toBe('Custom password error');
  });
});
