import type { BaseConfig } from './base-config';

/**
 * Config for choice validator. Validates array length.
 */
export type ChoiceConfig = BaseConfig & {
  /** Minimum array length */
  minLength?: number;
  /** Maximum array length (0 = no max) */
  maxLength?: number;
};
