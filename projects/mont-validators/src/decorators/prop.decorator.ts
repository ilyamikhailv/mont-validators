import { defaultContainer } from '../core/default-container';
import type { PropertyInfo } from '../core/validator.interface';
import { PROPERTY } from '../const/property-types';
import type { PropConfig } from '../models/config/prop-config';
import { getConstructor } from '../util/type-guards';

export function prop(config?: PropConfig) {
  return (target: object, propertyKey: string, _parameterIndex?: number) => {
    const propertyInfo: PropertyInfo = {
      name: propertyKey,
      propertyType: PROPERTY,
      dataPropertyName: config?.name,
      defaultValue: config?.defaultValue,
      ignore: config?.ignore,
      isPrimaryKey: config?.isPrimaryKey,
    };
    defaultContainer.addProperty(getConstructor(target), propertyInfo);
  };
}
