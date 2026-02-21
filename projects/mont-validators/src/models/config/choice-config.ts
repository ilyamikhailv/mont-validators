import type { BaseConfigFn } from './base-config-fn';

export type ChoiceConfig = BaseConfigFn & {
  minLength?: number;
  maxLength?: number;
};
