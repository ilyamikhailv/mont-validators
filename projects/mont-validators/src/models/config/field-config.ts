import type { BaseConfig } from './base-config';

/**
 * Config for validators comparing to another field or fixed value.
 */
export type FieldConfig = BaseConfig & {
  /** Name of the sibling form control to compare with */
  fieldName?: string;
  /** Fixed value when fieldName is not in the form */
  value?: number | string;
};
