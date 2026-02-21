import type { BaseConfigFn } from './base-config-fn';

/**
 * Config for choice validator. Validates array length.
 */
export type ChoiceConfig = BaseConfigFn & {
  /** Minimum array length */
  minLength?: number;
  /** Maximum array length (0 = no max) */
  maxLength?: number;
};
