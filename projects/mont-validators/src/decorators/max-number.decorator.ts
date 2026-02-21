import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { NumberConfig } from '../models/config/number-config';

export function maxNumber(value: number | NumberConfig) {
  const config = typeof value === 'number' ? { value } : value;
  return baseDecoratorFunction(AnnotationTypes.maxNumber, config);
}
