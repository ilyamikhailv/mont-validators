import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { BaseConfig } from '../models/config/base-config';

export function requiredTrue(config?: BaseConfig) {
  return baseDecoratorFunction(AnnotationTypes.requiredTrue, config);
}
