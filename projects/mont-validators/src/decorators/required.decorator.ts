import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';

export function required() {
  return baseDecoratorFunction(AnnotationTypes.required, undefined);
}
