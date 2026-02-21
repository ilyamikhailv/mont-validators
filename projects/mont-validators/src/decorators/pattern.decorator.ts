import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';

export function pattern(
  pattern: string | RegExp,
  config?: { message?: string; conditionalExpression?: (c: unknown) => boolean; conditionalExpressionFields?: string[] }
) {
  return baseDecoratorFunction(AnnotationTypes.pattern, { pattern, ...config });
}
