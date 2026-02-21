import type { ValidatorFn } from '@angular/forms';
import { requiredValidator } from '../validators/required.validator';
import { requiredTrueValidator } from '../validators/required-true.validator';
import { minLengthValidator } from '../validators/min-length.validator';
import { maxLengthValidator } from '../validators/max-length.validator';
import { patternValidator } from '../validators/pattern.validator';
import { minNumberValidator } from '../validators/min-number.validator';
import { maxNumberValidator } from '../validators/max-number.validator';
import { greaterThanValidator } from '../validators/greater-than.validator';
import { lessThanEqualToValidator } from '../validators/less-than-equal-to.validator';
import { urlValidator } from '../validators/url.validator';
import { emailValidator } from '../validators/email.validator';
import { passwordValidator } from '../validators/password.validator';
import { compareValidator } from '../validators/compare.validator';
import { choiceValidator } from '../validators/choice.validator';
import { oneOfValidator } from '../validators/one-of.validator';
import { AnnotationTypes } from './annotation-types';
import type { AnnotationType } from './annotation-types';
import type { DecoratorConfigMap } from '../models/config/decorator-config-map';

type ValidatorFactoryMap = {
  [K in AnnotationType]: (
    config?: DecoratorConfigMap[K]
  ) => ValidatorFn;
};

export const APP_VALIDATORS: ValidatorFactoryMap = {
  [AnnotationTypes.required]: (c) => requiredValidator(c),
  [AnnotationTypes.requiredTrue]: (c) => requiredTrueValidator(c),
  [AnnotationTypes.minLength]: (c) => minLengthValidator(c ?? { value: 0 }),
  [AnnotationTypes.maxLength]: (c) => maxLengthValidator(c ?? { value: 0 }),
  [AnnotationTypes.pattern]: (c) => patternValidator(c ?? { pattern: '' }),
  [AnnotationTypes.minNumber]: (c) => minNumberValidator(c ?? 0),
  [AnnotationTypes.maxNumber]: (c) => maxNumberValidator(c ?? 0),
  [AnnotationTypes.greaterThan]: (c) =>
    greaterThanValidator(c ?? { fieldName: '' }),
  [AnnotationTypes.lessThanEqualTo]: (c) =>
    lessThanEqualToValidator(c ?? { fieldName: '' }),
  [AnnotationTypes.url]: (c) => urlValidator(c),
  [AnnotationTypes.email]: (c) => emailValidator(c),
  [AnnotationTypes.password]: (c) => passwordValidator(c),
  [AnnotationTypes.compare]: (c) =>
    compareValidator(c ?? { fieldName: '' }),
  [AnnotationTypes.choice]: (c) => choiceValidator(c),
  [AnnotationTypes.oneOf]: (c) =>
    oneOfValidator(c ?? { matchValues: [] }),
};
