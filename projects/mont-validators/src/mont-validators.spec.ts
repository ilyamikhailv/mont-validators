import { FormControl, FormGroup } from '@angular/forms';
import { MontValidators } from './mont-validators';

describe('MontValidators', () => {
  it('should provide required validator', () => {
    const control = new FormControl('', [MontValidators.required()]);
    expect(control.hasError('required')).toBe(true);
    control.setValue('value');
    expect(control.valid).toBe(true);
  });

  it('should provide email validator', () => {
    const control = new FormControl('invalid', [MontValidators.email()]);
    expect(control.hasError('email')).toBe(true);
  });

  it('should provide minNumber validator', () => {
    const control = new FormControl(3, [MontValidators.minNumber(5)]);
    expect(control.hasError('minNumber')).toBe(true);
  });

  it('should provide lessThanEqualTo validator', () => {
    const group = new FormGroup({
      max: new FormControl(100),
      value: new FormControl(150),
    });
    const validator = MontValidators.lessThanEqualTo({ fieldName: 'max' });
    const result = validator(group.get('value')!);
    expect(result).not.toBeNull();
  });
});
