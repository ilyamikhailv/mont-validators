import type { AbstractControl } from '@angular/forms';

export type BaseConfig = {
  message?: string;
  conditionalExpression?: (control: AbstractControl) => boolean;
  /** Field names to watch for revalidation when conditionalExpression is used */
  conditionalExpressionFields?: string[];
  messageKey?: string;
};
