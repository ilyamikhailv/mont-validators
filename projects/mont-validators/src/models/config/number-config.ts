import type { BaseConfig } from './base-config';

/**
 * Config for minNumber/maxNumber validators.
 */
export type NumberConfig = BaseConfig & {
  /** Minimum or maximum allowed value */
  value?: number;
};
