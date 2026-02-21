import { FormControl, FormGroup } from '@angular/forms';
import { compareValidator } from './compare.validator';

describe('compareValidator', () => {
  it('should return null when values match', () => {
    const group = new FormGroup({
      password: new FormControl('secret123'),
      confirm: new FormControl('secret123'),
    });
    const validator = compareValidator({ fieldName: 'password' });
    expect(validator(group.get('confirm')!)).toBeNull();
  });

  it('should return error when values do not match', () => {
    const group = new FormGroup({
      password: new FormControl('secret123'),
      confirm: new FormControl('different'),
    });
    const validator = compareValidator({ fieldName: 'password' });
    const result = validator(group.get('confirm')!);
    expect(result).not.toBeNull();
    expect(result!['compare']).toBeDefined();
  });
});
