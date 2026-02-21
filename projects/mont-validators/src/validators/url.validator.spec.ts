import { FormControl } from '@angular/forms';
import { urlValidator } from './url.validator';

describe('urlValidator', () => {
  it('should return null for valid URL', () => {
    const control = new FormControl('https://example.com');
    expect(urlValidator()(control)).toBeNull();
  });

  it('should return null for valid URL with www', () => {
    const control = new FormControl('https://www.example.com');
    expect(urlValidator()(control)).toBeNull();
  });

  it('should return error for invalid URL', () => {
    const control = new FormControl('not-a-url');
    const result = urlValidator()(control);
    expect(result).not.toBeNull();
    expect(result!['url']).toBeDefined();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(urlValidator()(control)).toBeNull();
  });

  it('should use custom message when provided', () => {
    const control = new FormControl('invalid');
    const result = urlValidator({ message: 'Custom URL error' })(control);
    expect(result).not.toBeNull();
    expect(result!['url'].message).toBe('Custom URL error');
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl('invalid');
    const result = urlValidator({
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });
});
