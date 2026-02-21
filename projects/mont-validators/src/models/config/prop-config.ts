export type PropConfig = {
  name?: string;
  defaultValue?: unknown;
  ignore?: (x: unknown) => boolean;
  isPrimaryKey?: boolean;
};

/**
 * Config for propObject and propArray decorators (nested objects/arrays).
 */
export type PropNestedConfig = PropConfig & {
  entityProvider?: () => unknown;
};

/** @deprecated Use PropNestedConfig instead */
export type PropObjectConfig = PropNestedConfig;

/** @deprecated Use PropNestedConfig instead */
export type PropArrayConfig = PropNestedConfig;
