import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { FieldConfig } from '../models/config/field-config';

export function lessThanEqualTo(config: FieldConfig) {
  return baseDecoratorFunction(AnnotationTypes.lessThanEqualTo, config);
}
