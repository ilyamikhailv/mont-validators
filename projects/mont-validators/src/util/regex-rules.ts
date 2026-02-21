export const REGEX_RULES: Record<string, RegExp> = {
  url: /^(https?:\/\/(?:www\.|(?!www)|(?!a-zA-Z))[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www)|(?!a-zA-Z))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/,
  alphaExists: /[a-zA-Z]/,
  isDigitExists: /[0-9]/,
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  specialCharacter: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
};
