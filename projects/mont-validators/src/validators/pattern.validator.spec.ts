import { FormControl } from '@angular/forms';
import { patternValidator } from './pattern.validator';

describe('patternValidator', () => {
  it('should return null when value matches pattern', () => {
    const control = new FormControl('abc');
    expect(patternValidator('[a-zA-Z]+')(control)).toBeNull();
  });

  it('should return error when value does not match pattern', () => {
    const control = new FormControl('123');
    const result = patternValidator('[a-zA-Z]+')(control);
    expect(result).not.toBeNull();
    expect(result!['pattern']).toBeDefined();
  });

  it('should accept config object', () => {
    const control = new FormControl('1');
    const result = patternValidator({ pattern: '[a-zA-Z]+' })(control);
    expect(result).not.toBeNull();
  });

  it('should return null when control is empty', () => {
    const control = new FormControl('');
    expect(patternValidator('[a-zA-Z]+')(control)).toBeNull();
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl('1');
    const result = patternValidator({
      pattern: '[a-zA-Z]+',
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });
});
