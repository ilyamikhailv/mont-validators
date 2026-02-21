import { FormControl } from '@angular/forms';
import { oneOfValidator } from './one-of.validator';

describe('oneOfValidator', () => {
  it.each([
    [['a', 'b', 'c'], 'a', true],
    [['a', 'b', 'c'], 'x', false],
    [['yes', 'no'], 'YES', true],
    [['admin'], 'user', false],
  ])('matchValues %s, value %s -> valid: %s', (matchValues, value, expectedValid) => {
    const result = oneOfValidator({ matchValues })(new FormControl(value));
    expect(result === null).toBe(expectedValid);
  });

  it('should return null when value is in list', () => {
    const control = new FormControl('a');
    expect(oneOfValidator({ matchValues: ['a', 'b', 'c'] })(control)).toBeNull();
  });

  it('should return error when value is not in list', () => {
    const control = new FormControl('x');
    const result = oneOfValidator({ matchValues: ['a', 'b', 'c'] })(control);
    expect(result).not.toBeNull();
    expect(result!['oneOf']).toBeDefined();
  });

  it('should return null when conditionalExpression returns false', () => {
    const control = new FormControl('x');
    const result = oneOfValidator({
      matchValues: ['a', 'b'],
      conditionalExpression: () => false,
    })(control);
    expect(result).toBeNull();
  });

  it('should be case insensitive', () => {
    const control = new FormControl('A');
    expect(oneOfValidator({ matchValues: ['a', 'b'] })(control)).toBeNull();
  });
});
