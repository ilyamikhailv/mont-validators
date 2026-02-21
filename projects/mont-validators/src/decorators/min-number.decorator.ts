import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { NumberConfig } from '../models/config/number-config';

export function minNumber(value: number | NumberConfig) {
  const config = typeof value === 'number' ? { value } : value;
  return baseDecoratorFunction(AnnotationTypes.minNumber, config);
}
