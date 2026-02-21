import { FormControl } from '@angular/forms';
import { oneOfValidator } from './one-of.validator';

describe('oneOfValidator', () => {
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

  it('should be case insensitive', () => {
    const control = new FormControl('A');
    expect(oneOfValidator({ matchValues: ['a', 'b'] })(control)).toBeNull();
  });
});
