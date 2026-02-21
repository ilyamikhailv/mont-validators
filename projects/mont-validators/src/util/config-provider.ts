import type { NumberConfig } from '../models/config/number-config';

export function getNumberConfig(
  config: NumberConfig | number | undefined
): { value: number; message?: string; conditionalExpression?: (c: unknown) => boolean } {
  if (config === undefined || config === null) {
    return { value: 0 };
  }
  if (typeof config === 'number') {
    return { value: config };
  }
  return {
    value: config.value ?? 0,
    message: config.message,
    conditionalExpression: config.conditionalExpression as ((c: unknown) => boolean) | undefined,
  };
}

export function getConfig<T extends Record<string, unknown>>(
  config: T | undefined
): T & { message?: string; conditionalExpression?: (c: unknown) => boolean } {
  const base = (config ?? {}) as Record<string, unknown>;
  return {
    ...base,
    message: base['message'],
    conditionalExpression: base['conditionalExpression'] as ((c: unknown) => boolean) | undefined,
  } as T & { message?: string; conditionalExpression?: (c: unknown) => boolean };
}
