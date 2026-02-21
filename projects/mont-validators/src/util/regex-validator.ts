import { REGEX_RULES } from './regex-rules';
import type { PasswordValidation } from '../models/config/password-config';

const PASSWORD_VALIDATION_KEYS: (keyof PasswordValidation)[] = [
  'digit',
  'alphabet',
  'contains',
  'lowerCase',
  'upperCase',
  'specialCharacter',
  'minLength',
  'maxLength',
];

export class RegexValidator {
  static isNotBlank(value: unknown, isRemoveSpace = false): boolean {
    if (value === 0) return true;
    if (value === undefined || value === null) return false;
    if (isRemoveSpace) {
      return String(value).trim() !== '';
    }
    return value !== '';
  }

  static isValid(value: unknown, regex: RegExp): boolean {
    return regex.test(String(value ?? ''));
  }

  static isExists(value: unknown, regex: RegExp): boolean {
    return String(value ?? '').match(regex) != null;
  }

  static isValidPassword(
    passwordValidation: PasswordValidation | undefined,
    value: string
  ): { isValid: boolean; keyName: string } {
    if (!passwordValidation || Object.keys(passwordValidation).length === 0) {
      return { isValid: true, keyName: 'status' };
    }

    for (const propertyName of PASSWORD_VALIDATION_KEYS) {
      if (!(propertyName in passwordValidation)) continue;
      const configValue = passwordValidation[propertyName];
      if (configValue === undefined) continue;

      let isValid = false;
      let keyName = 'status';

      switch (propertyName) {
        case 'alphabet':
          isValid = RegexValidator.isExists(value, REGEX_RULES['alphaExists']);
          keyName = 'alphabet';
          break;
        case 'digit':
          isValid = RegexValidator.isValid(value, REGEX_RULES['isDigitExists']);
          keyName = 'digit';
          break;
        case 'contains':
          isValid = value.indexOf(String(configValue)) !== -1;
          keyName = 'contains';
          break;
        case 'lowerCase':
          isValid = RegexValidator.isValid(value, REGEX_RULES['lowerCase']);
          keyName = 'lowerCase';
          break;
        case 'upperCase':
          isValid = RegexValidator.isValid(value, REGEX_RULES['upperCase']);
          keyName = 'upperCase';
          break;
        case 'specialCharacter':
          isValid = RegexValidator.isExists(value, REGEX_RULES['specialCharacter']);
          keyName = 'specialCharacter';
          break;
        case 'minLength':
          isValid = value.length >= Number(configValue);
          keyName = 'minLength';
          break;
        case 'maxLength':
          isValid = value.length <= Number(configValue);
          keyName = 'maxLength';
          break;
      }

      if (!isValid) {
        return { isValid: false, keyName };
      }
    }
    return { isValid: true, keyName: 'status' };
  }
}
