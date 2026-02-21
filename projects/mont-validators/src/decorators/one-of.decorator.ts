import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { ArrayConfig } from '../models/config/array-config';

export function oneOf(config: ArrayConfig) {
  return baseDecoratorFunction(AnnotationTypes.oneOf, config);
}
