import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { processRule, shouldValidate } from './form-provider';
import { toValidationError, nullError } from './object-maker';

export type WrapOptions = {
  /** When true, skip validation for blank values (use for minLength, maxLength, pattern, email) */
  useShouldValidate?: boolean;
};

type BaseConfigLike = {
  message?: string;
  conditionalExpression?: (c: AbstractControl) => boolean;
};

/**
 * Creates a Mont validator wrapper around an Angular ValidatorFn (no params).
 * Supports BaseConfig (message, conditionalExpression) and converts errors to Mont format.
 */
export function wrapAngularValidator(
  angularValidator: ValidatorFn,
  annotationType: string,
  getRefValues: (control: AbstractControl, angularError: ValidationErrors) => unknown[],
  options: WrapOptions = {}
): (config?: BaseConfigLike) => ValidatorFn {
  const { useShouldValidate = false } = options;

  return (config) => {
    return (control: AbstractControl) => {
      if (!processRule(control, config)) {
        return nullError();
      }
      if (useShouldValidate && !shouldValidate(control, config)) {
        return nullError();
      }
      const result = angularValidator(control);
      if (result) {
        const refValues = getRefValues(control, result);
        return toValidationError(
          annotationType,
          { message: config?.message },
          refValues
        );
      }
      return nullError();
    };
  };
}

/**
 * Creates a Mont validator wrapper around Angular validators that take a parameter
 * (minLength, maxLength, pattern). Config can be the param directly or an object with value/pattern.
 */
export function wrapParametricValidator<
  TParam,
  TConfig extends BaseConfigLike | number = BaseConfigLike & {
    value?: number;
    pattern?: string | RegExp;
  }
>(
  createValidator: (param: TParam) => ValidatorFn,
  annotationType: string,
  getRefValues: (control: AbstractControl, angularError: ValidationErrors) => unknown[],
  getParam: (config: TConfig | undefined) => TParam,
  options: WrapOptions = {}
): (config?: TConfig) => ValidatorFn {
  const { useShouldValidate = false } = options;

  return (config) => {
    const param = getParam(config);
    const angularValidator = createValidator(param);
    const configLike = typeof config === 'object' ? config : undefined;
    return (control: AbstractControl) => {
      if (!processRule(control, configLike)) {
        return nullError();
      }
      if (useShouldValidate && !shouldValidate(control, configLike)) {
        return nullError();
      }
      const result = angularValidator(control);
      if (result) {
        const refValues = getRefValues(control, result);
        return toValidationError(
          annotationType,
          { message: configLike?.message },
          refValues
        );
      }
      return nullError();
    };
  };
}

/** Extract refValues from Angular minlength error: [actualLength, requiredLength] */
export function getMinLengthRefValues(
  _control: AbstractControl,
  error: ValidationErrors
): unknown[] {
  const e = error['minlength'] ?? error['minLength'];
  if (e && typeof e === 'object') {
    return [e.actualLength ?? '', e.requiredLength ?? ''];
  }
  return ['', ''];
}

/** Extract refValues from Angular maxlength error: [actualLength, requiredLength] */
export function getMaxLengthRefValues(
  _control: AbstractControl,
  error: ValidationErrors
): unknown[] {
  const e = error['maxlength'] ?? error['maxLength'];
  if (e && typeof e === 'object') {
    return [e.actualLength ?? '', e.requiredLength ?? ''];
  }
  return ['', ''];
}

/** Extract refValues from Angular pattern error: [actualValue, requiredPattern] */
export function getPatternRefValues(
  control: AbstractControl,
  error: ValidationErrors
): unknown[] {
  const e = error['pattern'];
  if (e && typeof e === 'object') {
    return [e.actualValue ?? control.value, e.requiredPattern ?? ''];
  }
  return [control.value, ''];
}

/** Extract refValues from Angular min error: [actual, min] */
export function getMinRefValues(
  _control: AbstractControl,
  error: ValidationErrors
): unknown[] {
  const e = error['min'];
  if (e && typeof e === 'object') {
    return [e.actual ?? '', e.min ?? ''];
  }
  return ['', ''];
}

/** Extract refValues from Angular max error: [actual, max] */
export function getMaxRefValues(
  _control: AbstractControl,
  error: ValidationErrors
): unknown[] {
  const e = error['max'];
  if (e && typeof e === 'object') {
    return [e.actual ?? '', e.max ?? ''];
  }
  return ['', ''];
}
