# 📚 Документация тестового фреймворка

## 🎯 Обзор проекта

Проект автоматизации тестирования на базе **Playwright**. Включает:
- **UI тесты** для интернет-магазина (пример — добавление/удаление товаров из корзины)
- **API тесты** для сервиса PokéAPI (проверка покемонов, способностей, типов)

Язык: **TypeScript**  
Паттерн: **Page Object Model** + **Fixtures** для переиспользования

## 🚀 Запуск тестов

### Установка зависимостей
```bash
npm install
npx playwright install
```


## Команды из package.json
### Команда	Описание
```bash
npm run build	Компиляция TypeScript
npm run api:all	Запуск всех API тестов
npm run ui:all	Запуск всех UI тестов (если добавишь)
npm run show-report	Открыть HTML отчет на порту 8080
```

## Ручной запуск
```bash
# Все тесты
npx playwright test

# Только API тесты
npx playwright test tests/api/

# Только UI тесты
npx playwright test tests/ui/

# Запуск по названию (pattern)
npx playwright test -g "Abilities API Tests"

# Один файл
npx playwright test tests/api/pokemon.spec.ts

# С определенным проектом (если настроен)
npx playwright test --project=api
```

## 📊 Отчеты
После выполнения тестов доступны отчеты в формате:

### 1. HTML Reporter (по умолчанию)
```bash
npx playwright show-report
Откроется браузер с детальным отчетом, фильтрацией по браузерам, временем выполнения и скриншотами (при failures).
```

### 2. JSON Reporter
```bash
npx playwright test --reporter=json > results.json
```

### 3. JUnit Reporter (для CI/CD)
```bash
npx playwright test --reporter=junit
```

### 4. Allure Reporter (установлен в проекте)
```bash
npx playwright test --reporter=line,allure-playwright
allure generate allure-results -o allure-report --clean
allure open allure-report
```

## 🐛 Дебаг (отладка) тестов
### Интерактивный режим (рекомендуется)
```bash
npx playwright test --ui
```

### Режим дебага с паузой на каждой expect
```bash
npx playwright test --debug
```

### Дебаг конкретного теста
```bash
npx playwright test tests/api/pokemon.spec.ts --debug
```

## 🎓 Сценарии тестов
### API тесты (tests/api/)
**pokemon.spec.ts**
- P01: Получение покемона по ID (Пикачу #25)
- P02: Получение покемона по имени (Чаризард)
- P03: Проверка пагинации списка покемонов
- P04: Обработка несуществующего покемона (404)
- P05: Проверка базовых характеристик Мьюту

**abilities.spec.ts**
- A01: Получение способности по ID (Overgrow #65)
- A02: Получение способности по имени (Blaze) с проверкой английского описания
- A03: Проверка структуры списка способностей

**types.spec.ts**
- T01: Получение типа по ID (Fire #10)
- T02: Проверка отношений урона для водного типа
- T03: Проверка списка типов (количество и наличие Gen 1 типов)

**e2e.spec.ts**
- E01: Проверка эволюционной цепочки Пикачу
- E02: Проверка связи способности "static" с покемонами, которые ей обладают

### UI тесты (tests/ui/main.spec.ts)
- Add product to cart: Добавление товара в корзину
- Delete product from cart (tooltip): Удаление товара из корзины через тултип