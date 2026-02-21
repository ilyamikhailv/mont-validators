import type { BaseConfigFn } from './base-config-fn';

/**
 * Config for oneOf validator. Value must be in the allowed list.
 */
export type ArrayConfig = BaseConfigFn & {
  /** Allowed values */
  matchValues?: unknown[];
};
