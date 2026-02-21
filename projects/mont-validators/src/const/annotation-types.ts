export const AnnotationTypes = {
  minNumber: 'minNumber',
  maxNumber: 'maxNumber',
  required: 'required',
  requiredTrue: 'requiredTrue',
  minLength: 'minLength',
  maxLength: 'maxLength',
  pattern: 'pattern',
  email: 'email',
  url: 'url',
  password: 'password',
  compare: 'compare',
  choice: 'choice',
  oneOf: 'oneOf',
  greaterThan: 'greaterThan',
  lessThanEqualTo: 'lessThanEqualTo',
} as const;

export type AnnotationType = keyof typeof AnnotationTypes;
