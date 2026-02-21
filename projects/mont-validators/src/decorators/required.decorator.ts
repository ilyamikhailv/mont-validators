import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { BaseConfig } from '../models/config/base-config';

export function required(config?: BaseConfig) {
  return baseDecoratorFunction(AnnotationTypes.required, config);
}
