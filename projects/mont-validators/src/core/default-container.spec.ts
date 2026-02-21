import { defaultContainer } from './default-container';
import { prop } from '../decorators/prop.decorator';
import { getConstructor } from '../util/type-guards';

describe('defaultContainer', () => {
  afterEach(() => {
    defaultContainer.clear();
  });

  it('should return undefined for unknown constructor', () => {
    class UnknownClass {}
    expect(defaultContainer.get(UnknownClass)).toBeUndefined();
  });

  it('should return instance container after decorator is applied', () => {
    class DecoratedClass {
      @prop()
      name = '';
    }

    const instance = defaultContainer.get(getConstructor(new DecoratedClass()));
    expect(instance).toBeDefined();
    expect(instance?.instance).toBe(DecoratedClass);
    expect(instance?.properties).toBeDefined();
    expect(instance?.propertyAnnotations).toBeDefined();
  });

  it('should clear all instances', () => {
    class DecoratedClass {
      @prop()
      name = '';
    }

    const before = defaultContainer.get(getConstructor(new DecoratedClass()));
    expect(before).toBeDefined();

    defaultContainer.clear();

    const after = defaultContainer.get(getConstructor(new DecoratedClass()));
    expect(after).toBeUndefined();
  });

  it('should allow re-registration after clear', () => {
    class DecoratedClass {
      @prop()
      name = '';
    }

    defaultContainer.clear();
    const model = new DecoratedClass();
    const instance = defaultContainer.get(getConstructor(model));
    expect(instance).toBeUndefined();

    class NewDecoratedClass {
      @prop()
      name = '';
    }

    const newInstance = defaultContainer.get(getConstructor(new NewDecoratedClass()));
    expect(newInstance).toBeDefined();
  });
});
