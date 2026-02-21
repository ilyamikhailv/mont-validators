import type { BaseConfig } from './base-config';

/**
 * Config for oneOf validator. Value must be in the allowed list.
 */
export type ArrayConfig = BaseConfig & {
  /** Allowed values */
  matchValues?: unknown[];
};
