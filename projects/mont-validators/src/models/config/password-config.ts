import type { BaseConfigFn } from './base-config-fn';

/**
 * Password strength rules. Each true/number enables that rule.
 */
export type PasswordValidation = {
  digit?: boolean;
  alphabet?: boolean;
  contains?: string;
  lowerCase?: boolean;
  upperCase?: boolean;
  specialCharacter?: boolean;
  minLength?: number;
  maxLength?: number;
};

/**
 * Config for password validator.
 */
export type PasswordConfig = BaseConfigFn & {
  validation?: PasswordValidation;
};
