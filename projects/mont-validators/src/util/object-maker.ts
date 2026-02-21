import type { AnnotationType } from '../const/annotation-types';

export type ValidationErrorDetail = {
  message: string;
  refValues: unknown[];
};

export type ValidationErrors = {
  [K in AnnotationType]?: ValidationErrorDetail;
} & Record<string, ValidationErrorDetail>;

export function toValidationError(
  key: string,
  config: { message?: string },
  values: unknown[]
): ValidationErrors {
  let message = config?.message ?? '';
  values.forEach((v, index) => {
    const str = v instanceof Date ? v.toISOString() : String(v ?? '');
    message = message.replace(`{{${index}}}`, str);
  });
  const result: ValidationErrors = {
    [key]: {
      message,
      refValues: values,
    },
  };
  return result;
}

export function nullError(): null {
  return null;
}
