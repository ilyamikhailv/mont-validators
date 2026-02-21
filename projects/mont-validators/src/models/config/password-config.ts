import type { BaseConfigFn } from './base-config-fn';

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

export type PasswordConfig = BaseConfigFn & {
  validation?: PasswordValidation;
};
