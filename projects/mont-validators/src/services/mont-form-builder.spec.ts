import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { defaultContainer } from '../core/default-container';
import { MontFormBuilder } from './mont-form-builder';
import { prop } from '../decorators/prop.decorator';
import { propObject } from '../decorators/prop-object.decorator';
import { propArray } from '../decorators/prop-array.decorator';
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
    expect(form.get('password')?.errors?.['minLength']).toBeDefined();
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

  it('should support propObject with nested FormGroup', () => {
    class AddressForm {
      @prop()
      city = '';

      @prop()
      street = '';
    }

    class UserForm {
      @prop()
      name = '';

      @propObject(AddressForm)
      address: { city: string; street: string } = { city: 'Moscow', street: 'Red' };
    }

    const user = new UserForm();
    const form = formBuilder.group(user);

    expect(form.get('address')).toBeInstanceOf(FormGroup);
    expect(form.get('address.city')?.value).toBe('Moscow');
    expect(form.get('address.street')?.value).toBe('Red');
  });

  it('should support propArray with FormArray of nested FormGroups', () => {
    class ItemForm {
      @prop()
      name = '';
    }

    class OrderForm {
      @prop()
      orderId = '';

      @propArray(ItemForm)
      items: ItemForm[] = [];
    }

    const order = new OrderForm();
    const item1 = new ItemForm();
    item1.name = 'item1';
    const item2 = new ItemForm();
    item2.name = 'item2';
    order.items = [item1, item2];

    const form = formBuilder.group(order);

    expect(form.get('items')).toBeInstanceOf(FormArray);
    expect((form.get('items') as FormArray).length).toBe(2);
    expect((form.get('items') as FormArray).at(0).get('name')?.value).toBe('item1');
  });

  it('should use defaultValue when property is empty', () => {
    class FormWithDefault {
      @prop({ defaultValue: 'default' })
      field = '';
    }

    const model = new FormWithDefault();
    const form = formBuilder.group(model);

    expect(form.get('field')?.value).toBe('default');
  });

  it('should respect ignore when property.ignore returns true', () => {
    class FormWithIgnore {
      @prop()
      visible = 'yes';

      @prop({ ignore: (obj: { skip?: boolean }) => obj.skip === true })
      hidden = 'no';
    }

    const model = new FormWithIgnore();
    (model as { skip?: boolean }).skip = true;
    const form = formBuilder.group(model);

    expect(form.get('visible')).toBeDefined();
    expect(form.get('hidden')).toBeNull();
  });
});
