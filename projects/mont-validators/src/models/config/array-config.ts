import type { BaseConfigFn } from './base-config-fn';

export type ArrayConfig = BaseConfigFn & {
  matchValues?: unknown[];
};
