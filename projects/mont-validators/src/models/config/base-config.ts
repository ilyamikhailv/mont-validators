import type { AbstractControl } from '@angular/forms';

/**
 * Base configuration for validators supporting conditional validation.
 */
export type BaseConfig = {
  /** Optional error message. Use {{0}}, {{1}} for value placeholders. Empty when not provided. */
  message?: string;
  /** When false, validator is skipped */
  conditionalExpression?: (control: AbstractControl) => boolean;
};
