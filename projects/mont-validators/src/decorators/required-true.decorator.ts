import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';

export function requiredTrue() {
  return baseDecoratorFunction(AnnotationTypes.requiredTrue, undefined);
}
