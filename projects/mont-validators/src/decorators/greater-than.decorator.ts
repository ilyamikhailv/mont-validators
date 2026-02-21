import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

export function greaterThan(config: FieldConfig) {
  return baseDecoratorFunction(AnnotationTypes.greaterThan, config);
}
