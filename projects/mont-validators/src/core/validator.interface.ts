import type { AnnotationType } from '../const/annotation-types';
import type { PropertyType } from '../const/property-types';
import type { DecoratorConfigFor } from '../models/config/decorator-config-map';

/** Constructor type for class instances */
export type Constructor<T = unknown> = new (...args: unknown[]) => T;

export type BaseDecoratorConfiguration = {
  propertyName: string;
  propertyIndex: number;
  isAsync: boolean;
  isValidator?: boolean;
};

export type DecoratorConfiguration = {
  [K in AnnotationType]: BaseDecoratorConfiguration & {
    annotationType: K;
    config?: DecoratorConfigFor<K>;
  };
}[AnnotationType];

export type PropertyInfo = {
  name: string;
  propertyType: PropertyType;
  entity?: Constructor;
  dataPropertyName?: string;
  defaultValue?: unknown;
  ignore?: (x: unknown) => boolean;
  isPrimaryKey?: boolean;
  entityProvider?: () => Constructor | unknown;
};

export type InstanceContainer = {
  instance: Constructor;
  propertyAnnotations: DecoratorConfiguration[];
  properties: PropertyInfo[];
  conditionalValidationProps?: Record<string, string[]>;
};
