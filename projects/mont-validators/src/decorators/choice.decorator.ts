import { baseDecoratorFunction } from './base-decorator.function';
import { AnnotationTypes } from '../const/annotation-types';
import type { ChoiceConfig } from '../models/config/choice-config';

export function choice(config?: ChoiceConfig) {
  return baseDecoratorFunction(AnnotationTypes.choice, config ?? {});
}
