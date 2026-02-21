# @mont/validators

Angular-библиотека валидаторов и декораторов для Reactive Forms. Портирована из `@rxweb/reactive-form-validators` с поддержкой Angular v19+.

## Установка

```bash
npm install @mont/validators
```

## Использование

### Программные валидаторы (MontValidators)

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { MontValidators } from '@mont/validators';

// Отдельные валидаторы
const emailControl = new FormControl('', [
  MontValidators.required(),
  MontValidators.email(),
]);

const amountControl = new FormControl(0, [
  MontValidators.minNumber(0),
  MontValidators.maxNumber(100),
]);

// Сравнение полей
const budgetForm = new FormGroup({
  min: new FormControl(0),
  max: new FormControl(100),
});
budgetForm.get('max')!.setValidators([
  MontValidators.lessThanEqualTo({ fieldName: 'min' }),
]);
```

### Декораторы и MontFormBuilder

```typescript
import {
  prop,
  propObject,
  propArray,
  required,
  email,
  minLength,
  minNumber,
  maxNumber,
  compare,
  MontFormBuilder,
} from '@mont/validators';

class UserForm {
  @prop()
  @required()
  @email()
  email = '';

  @prop()
  @required()
  @minLength(8)
  password = '';

  @prop()
  @required()
  @compare({ fieldName: 'password' })
  confirmPassword = '';
}

// В компоненте
constructor(private formBuilder: MontFormBuilder) {}

ngOnInit() {
  const user = new UserForm();
  user.email = 'test@example.com';
  this.form = this.formBuilder.group(user);
}
```

### Миграция с rxweb

| rxweb | @mont/validators |
|-------|------------------|
| `RxwebValidators` | `MontValidators` |
| `RxFormBuilder` | `MontFormBuilder` |
| `RxReactiveFormsModule` | `ReactiveFormsModule` (из `@angular/forms`) |
| `@required()` | `@required()` |
| `@email()` | `@email()` |
| `@minNumber(n)` | `@minNumber(n)` |
| `@compare({fieldName})` | `@compare({fieldName})` |

1. Замените импорты:
   ```typescript
   // Было
   import { RxwebValidators, RxFormBuilder } from '@rxweb/reactive-form-validators';

   // Стало
   import { MontValidators, MontFormBuilder } from '@mont/validators';
   ```

2. Импортируйте ReactiveFormsModule (если ещё не импортирован):
   ```typescript
   import { ReactiveFormsModule } from '@angular/forms';

   @NgModule({
     imports: [ReactiveFormsModule, ...],
   })
   ```
   MontFormBuilder доступен через `providedIn: 'root'` — отдельный модуль не нужен.

3. Условная валидация: `conditionalExpression` поддерживается как функция:
   ```typescript
   @required({
     conditionalExpression: (c) => c.parent?.get('type')?.value === 'business',
     conditionalExpressionFields: ['type'],
   })
   companyName = '';
   ```

## Поддерживаемые валидаторы

- `required`, `requiredTrue`
- `minLength`, `maxLength`, `pattern`
- `minNumber`, `maxNumber`
- `greaterThan`, `lessThanEqualTo`
- `url`, `email`, `password`
- `compare`, `choice`, `oneOf`

## Конфигурации

### PasswordConfig

```typescript
MontValidators.password({
  validation: {
    digit: true,
    lowerCase: true,
    upperCase: true,
    minLength: 8,
    maxLength: 32,
  },
  message: 'Пароль должен содержать цифры, буквы разного регистра и быть 8–32 символов',
});
```

### ChoiceConfig

```typescript
MontValidators.choice({
  minLength: 1,
  maxLength: 5,
  message: 'Выберите от 1 до 5 элементов',
});
```

### CompareConfig / FieldConfig

```typescript
MontValidators.compare({ fieldName: 'password' });
MontValidators.greaterThan({ fieldName: 'min', message: 'Должно быть больше {{0}}' });
MontValidators.lessThanEqualTo({ fieldName: 'max' });
```

## Кастомизация сообщений

Все валидаторы поддерживают `message` для кастомного текста ошибки. Плейсхолдеры `{{0}}`, `{{1}}` заменяются на значения из `refValues`:

```typescript
MontValidators.minNumber({ value: 18, message: 'Возраст должен быть не менее {{0}} лет' });
MontValidators.compare({ fieldName: 'password', message: 'Пароли не совпадают' });
```

## Очистка подписок (DestroyRef)

При использовании `MontFormBuilder.group()` с перекрёстной валидацией (compare, greaterThan и т.п.) подписки очищаются автоматически, если передать `destroyRef`:

```typescript
import { inject, DestroyRef } from '@angular/core';
import { MontFormBuilder } from '@mont/validators';

constructor(private formBuilder: MontFormBuilder) {}
private destroyRef = inject(DestroyRef);

ngOnInit() {
  const user = new UserForm();
  this.form = this.formBuilder.group(user, { destroyRef: this.destroyRef });
}
```

## Лицензия

MIT
