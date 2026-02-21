import { defaultContainer } from '../core/default-container';
import { OBJECT_PROPERTY } from '../const/property-types';
import type { PropObjectConfig } from '../models/config/prop-config';

export function propObject(entity?: new (...args: unknown[]) => unknown, config?: PropObjectConfig) {
  return (target: object, propertyKey: string, _parameterIndex?: number) => {
    defaultContainer.initPropertyObject(
      propertyKey,
      OBJECT_PROPERTY,
      entity,
      target,
      config
    );
  };
}
