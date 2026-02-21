import type { BaseConfigFn } from './base-config-fn';

export type NumberConfig = BaseConfigFn & {
  value?: number;
};
