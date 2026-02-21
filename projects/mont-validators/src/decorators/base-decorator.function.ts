import { defaultContainer } from '../core/default-container';
import type { AnnotationType } from '../const/annotation-types';

export function baseDecoratorFunction<C = undefined>(
  annotationType: AnnotationType,
  config?: C,
  isAsync = false
): (target: object, propertyKey: string, _parameterIndex?: number) => void {
  return (target: object, propertyKey: string, _parameterIndex?: number) => {
    defaultContainer.init(target, 0, propertyKey, annotationType, config, isAsync);
  };
}
