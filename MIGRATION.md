# Миграция с @rxweb/reactive-form-validators на @mont/validators

## Обзор

Библиотека `@mont/validators` — порт часто используемых валидаторов и декораторов из `@rxweb/reactive-form-validators` с поддержкой Angular v19+.

## Шаги миграции

### 1. Установка

```bash
npm uninstall @rxweb/reactive-form-validators
npm install @mont/validators
```

### 2. Замена импортов

**В модулях:**
```typescript
// Было
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [RxReactiveFormsModule],
})
export class AppModule {}

// Стало
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule, ...],
})
export class AppModule {}
```
MontFormBuilder доступен через `providedIn: 'root'` — провайдер указывать не нужно.

**В сервисах и компонентах:**
```typescript
// Было
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

// Стало
import { MontFormBuilder, MontValidators } from '@mont/validators';
```

**В классах форм (декораторы):**
```typescript
// Было
import {
  prop,
  propObject,
  propArray,
  required,
  email,
  minLength,
  minNumber,
  compare,
} from '@rxweb/reactive-form-validators';

// Стало
import {
  prop,
  propObject,
  propArray,
  required,
  email,
  minLength,
  minNumber,
  compare,
} from '@mont/validators';
```

### 3. Замена имён сервисов и объектов

| rxweb | @mont/validators |
|-------|------------------|
| `RxFormBuilder` | `MontFormBuilder` |
| `RxwebValidators` | `MontValidators` |

```typescript
// Было
constructor(private fb: RxFormBuilder) {}
this.control = new FormControl('', [RxwebValidators.email()]);

// Стало
constructor(private fb: MontFormBuilder) {}
this.control = new FormControl('', [MontValidators.email()]);
```

### 4. Условная валидация (conditionalExpression)

В rxweb использовались строковые выражения. В @mont/validators — функции:

```typescript
// Было (строка)
@required({ conditionalExpression: 'x => x.type === 1' })
field = '';

// Стало (функция + поля для отслеживания)
@required({
  conditionalExpression: (c) => c.parent?.get('type')?.value === 1,
  conditionalExpressionFields: ['type'],
})
field = '';
```

### 5. Исключённые возможности

Следующее не портировано и требует альтернатив:

- **dynamicConfig** — используйте обычные валидаторы или conditionalExpression
- **and/or/not** — комбинируйте валидаторы через `Validators.compose` или кастомные валидаторы
- **error** — реализуйте обработку ошибок в своём коде

### 6. Алиасы для постепенной миграции

Для постепенной миграции можно создать алиасы:

```typescript
// aliases.ts
export { MontFormBuilder as RxFormBuilder } from '@mont/validators';
export { MontValidators as RxwebValidators } from '@mont/validators';
export { ReactiveFormsModule as RxReactiveFormsModule } from '@angular/forms';
export * from '@mont/validators';
```

Затем замените импорты на `./aliases` и мигрируйте по одному файлу.
