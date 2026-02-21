import { FormControl } from '@angular/forms';
import { emailValidator } from './email.validator';

describe('emailValidator', () => {
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
});
