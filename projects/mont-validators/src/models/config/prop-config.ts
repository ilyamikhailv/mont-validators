export type PropConfig = {
  name?: string;
  defaultValue?: unknown;
  ignore?: (x: unknown) => boolean;
  isPrimaryKey?: boolean;
};

export type PropObjectConfig = PropConfig & {
  entityProvider?: () => unknown;
};

export type PropArrayConfig = PropConfig & {
  entityProvider?: () => unknown;
};
