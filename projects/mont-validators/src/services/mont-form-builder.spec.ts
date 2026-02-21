import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { defaultContainer } from '../core/default-container';
import { MontFormBuilder } from './mont-form-builder';
import { prop } from '../decorators/prop.decorator';
import { required } from '../decorators/required.decorator';
import { email } from '../decorators/email.decorator';
import { minLength } from '../decorators/min-length.decorator';
import { compare } from '../decorators/compare.decorator';
import { minNumber } from '../decorators/min-number.decorator';
import { maxNumber } from '../decorators/max-number.decorator';

describe('MontFormBuilder', () => {
  let formBuilder: MontFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    formBuilder = TestBed.inject(MontFormBuilder);
  });

  afterEach(() => {
    defaultContainer.clear();
  });

  it('should create FormGroup from decorated class', () => {
    class UserForm {
      @prop()
      @required()
      @email()
      email = '';

      @prop()
      @required()
      @minLength(8)
      password = '';
    }

    const user = new UserForm();
    user.email = 'test@example.com';
    user.password = 'password123';

    const form = formBuilder.group(user);

    expect(form).toBeInstanceOf(FormGroup);
    expect(form.get('email')).toBeInstanceOf(FormControl);
    expect(form.get('password')).toBeInstanceOf(FormControl);
    expect(form.get('email')?.value).toBe('test@example.com');
    expect(form.get('password')?.value).toBe('password123');
  });

  it('should apply validators from decorators', () => {
    class UserForm {
      @prop()
      @required()
      @email()
      email = '';

      @prop()
      @required()
      @minLength(8)
      password = '';
    }

    const user = new UserForm();
    user.email = '';
    user.password = 'short';

    const form = formBuilder.group(user);

    expect(form.get('email')?.errors?.['required']).toBeDefined();
    expect(form.get('password')?.errors?.['minlength']).toBeDefined();
  });

  it('should create valid form when values satisfy validators', () => {
    class UserForm {
      @prop()
      @required()
      @email()
      email = '';

      @prop()
      @required()
      @minLength(8)
      password = '';
    }

    const user = new UserForm();
    user.email = 'valid@example.com';
    user.password = 'longpassword';

    const form = formBuilder.group(user);

    expect(form.valid).toBe(true);
  });

  it('should support compare decorator with conditionalChangeValidator', () => {
    class UserForm {
      @prop()
      @required()
      @minLength(8)
      password = '';

      @prop()
      @required()
      @compare({ fieldName: 'password' })
      confirmPassword = '';
    }

    const user = new UserForm();
    user.password = 'password123';
    user.confirmPassword = 'password123';

    const form = formBuilder.group(user);

    expect(form.get('password')).toBeDefined();
    expect(form.get('confirmPassword')).toBeDefined();
    expect(form.get('confirmPassword')?.value).toBe('password123');

    form.get('confirmPassword')?.setValue('different');
    expect(form.get('confirmPassword')?.errors?.['compare']).toBeDefined();
  });

  it('should support minNumber and maxNumber decorators', () => {
    class RangeForm {
      @prop()
      @minNumber(0)
      @maxNumber(100)
      value = 50;
    }

    const model = new RangeForm();
    const form = formBuilder.group(model);

    expect(form.get('value')?.value).toBe(50);
    expect(form.valid).toBe(true);

    form.get('value')?.setValue(-1);
    expect(form.get('value')?.errors?.['minNumber']).toBeDefined();

    form.get('value')?.setValue(150);
    expect(form.get('value')?.errors?.['maxNumber']).toBeDefined();
  });

  it('should throw when model has no decorators', () => {
    class PlainClass {
      name = '';
    }

    const model = new PlainClass();
    expect(() => formBuilder.group(model)).toThrow(/No metadata found/);
  });

  it('should throw when constructor is passed instead of instance', () => {
    class UserForm {
      @prop()
      email = '';
    }

    expect(() => formBuilder.group(UserForm as never)).toThrow(
      /expects a class instance/
    );
  });

  it('should accept options parameter', () => {
    class UserForm {
      @prop()
      @required()
      email = '';
    }

    const user = new UserForm();
    user.email = 'test@example.com';

    const form = formBuilder.group(user, {});

    expect(form).toBeInstanceOf(FormGroup);
    expect(form.get('email')?.value).toBe('test@example.com');
  });
});
