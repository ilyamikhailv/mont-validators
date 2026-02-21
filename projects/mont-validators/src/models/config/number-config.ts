import type { BaseConfigFn } from './base-config-fn';

/**
 * Config for minNumber/maxNumber validators.
 */
export type NumberConfig = BaseConfigFn & {
  /** Minimum or maximum allowed value */
  value?: number;
};
