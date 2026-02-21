import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';

export function minLength(value: number, config?: { message?: string; conditionalExpression?: (c: unknown) => boolean; conditionalExpressionFields?: string[] }) {
  return baseDecoratorFunction(AnnotationTypes.minLength, { value, ...config });
}
