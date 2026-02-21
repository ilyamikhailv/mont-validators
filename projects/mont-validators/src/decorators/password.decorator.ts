import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { PasswordConfig } from '../models/config/password-config';

export function password(config?: PasswordConfig) {
  return baseDecoratorFunction(AnnotationTypes.password, config ?? {});
}
