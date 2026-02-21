import type { BaseConfigFn } from './base-config-fn';

export type FieldConfig = BaseConfigFn & {
  fieldName?: string;
  value?: number | string;
};
