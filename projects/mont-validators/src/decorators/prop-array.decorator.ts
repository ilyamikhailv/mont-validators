import { defaultContainer } from '../core/default-container';
import type { PropertyInfo } from '../core/validator.interface';
import { ARRAY_PROPERTY } from '../const/property-types';
import type { PropNestedConfig } from '../models/config/prop-config';
import { getConstructor } from '../util/type-guards';

export function propArray(
  entity?: new (...args: unknown[]) => unknown,
  config?: PropNestedConfig
) {
  return (target: object, propertyKey: string, _parameterIndex?: number) => {
    const propertyInfo: PropertyInfo = {
      name: propertyKey,
      propertyType: ARRAY_PROPERTY,
      entity,
      dataPropertyName: config?.name,
      entityProvider: config?.entityProvider,
    };
    defaultContainer.addProperty(getConstructor(target), propertyInfo);
  };
}
