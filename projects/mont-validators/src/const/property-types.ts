export const PROPERTY = 'property' as const;
export const OBJECT_PROPERTY = 'objectProperty' as const;
export const ARRAY_PROPERTY = 'arrayProperty' as const;

export type PropertyType =
  | typeof PROPERTY
  | typeof OBJECT_PROPERTY
  | typeof ARRAY_PROPERTY;
