import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { CompareConfig } from '../models/config/compare-config';

export function compare(config: CompareConfig) {
  return baseDecoratorFunction(AnnotationTypes.compare, config);
}
