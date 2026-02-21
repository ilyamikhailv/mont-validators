import { FormControl } from '@angular/forms';
import { choiceValidator } from './choice.validator';

describe('choiceValidator', () => {
  it('should return null when no config and empty array', () => {
    const control = new FormControl([]);
    expect(choiceValidator()(control)).toBeNull();
  });

  it('should return null when array length within minLength and maxLength', () => {
    const control = new FormControl([1, 2, 3]);
    expect(
      choiceValidator({ minLength: 2, maxLength: 5 })(control)
    ).toBeNull();
  });

  it('should return error when array length less than minLength', () => {
    const control = new FormControl([1]);
    const result = choiceValidator({ minLength: 2 })(control);
    expect(result).not.toBeNull();
    expect(result!['choice']).toBeDefined();
  });

  it('should return error when array length greater than maxLength', () => {
    const control = new FormControl([1, 2, 3, 4]);
    const result = choiceValidator({ minLength: 0, maxLength: 3 })(control);
    expect(result).not.toBeNull();
    expect(result!['choice']).toBeDefined();
  });

  it('should return null when value is not array', () => {
    const control = new FormControl('not-array');
    expect(choiceValidator({ minLength: 1 })(control)).toBeNull();
  });

  it('should use custom message when provided', () => {
    const control = new FormControl([]);
    const result = choiceValidator({
      minLength: 1,
      message: 'Select at least one',
    })(control);
    expect(result).not.toBeNull();
    expect(result!['choice'].message).toBe('Select at least one');
  });
});
