import type { AnnotationType } from '../../const/annotation-types';
import type { BaseConfig } from './base-config';
import type { NumberConfig } from './number-config';
import type { FieldConfig } from './field-config';
import type { CompareConfig } from './compare-config';
import type { ChoiceConfig } from './choice-config';
import type { ArrayConfig } from './array-config';
import type { PasswordConfig } from './password-config';

export type MinLengthConfig = BaseConfig & {
  value: number;
};

export type MaxLengthConfig = BaseConfig & {
  value: number;
};

export type PatternConfig = BaseConfig & {
  pattern: string | RegExp;
};

export type DecoratorConfigMap = {
  required: undefined;
  requiredTrue: undefined;
  minLength: MinLengthConfig;
  maxLength: MaxLengthConfig;
  pattern: PatternConfig;
  minNumber: NumberConfig | number;
  maxNumber: NumberConfig | number;
  greaterThan: FieldConfig;
  lessThanEqualTo: FieldConfig;
  compare: CompareConfig;
  email: BaseConfig;
  url: BaseConfig;
  password: PasswordConfig;
  choice: ChoiceConfig;
  oneOf: ArrayConfig;
};

export type DecoratorConfigFor<K extends AnnotationType> = DecoratorConfigMap[K];
