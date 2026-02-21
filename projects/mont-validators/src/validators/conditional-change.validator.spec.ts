import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { conditionalChangeValidator } from './conditional-change.validator';
import { lessThanEqualToValidator } from './less-than-equal-to.validator';

describe('conditionalChangeValidator', () => {
  it('should trigger revalidation when dependent control changes', fakeAsync(() => {
    const form = new FormGroup({
      min: new FormControl(10),
      max: new FormControl(5),
    });

    const maxControl = form.get('max')!;
    maxControl.setValidators([
      conditionalChangeValidator(['min']),
      lessThanEqualToValidator({ fieldName: 'min' }),
    ]);
    maxControl.updateValueAndValidity();

    expect(maxControl.valid).toBe(true);

    form.get('min')!.setValue(3);
    tick();
    expect(maxControl.valid).toBe(false);
    expect(maxControl.errors!['lessThanEqualTo']).toBeDefined();
  }));

  it('should return null from validator fn', () => {
    const form = new FormGroup({
      a: new FormControl(1),
      b: new FormControl(2),
    });
    const validator = conditionalChangeValidator(['a']);
    expect(validator(form.get('b')!)).toBeNull();
  });

});
