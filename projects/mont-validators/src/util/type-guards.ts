/** Type guard: value is a plain object (not null, not array) */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Type guard: value is an array of plain objects */
export function isObjectArray(value: unknown): value is Record<string, unknown>[] {
  return Array.isArray(value) && value.every(isRecord);
}

/** Type guard: value is a constructor function */
export function isConstructor(
  value: unknown
): value is new (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Converts object to Record<string, unknown> for form building.
 * All JS object keys are strings, so this is safe for model instances.
 */
export function toRecord(obj: object): Record<string, unknown> {
  return obj as Record<string, unknown>;
}

/** Gets constructor from object instance. Used for decorator-built models. */
export function getConstructor(
  obj: object
): new (...args: unknown[]) => unknown {
  return obj.constructor as new (...args: unknown[]) => unknown;
}
