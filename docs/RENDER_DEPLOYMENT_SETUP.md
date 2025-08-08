# Настройка автоматического деплоя на Render

## Обзор

Этот документ описывает настройку автоматического деплоя backend на Render при мердже в master branch через GitHub Actions.

## Требования

1. **Render Account** - аккаунт на [render.com](https://render.com)
2. **GitHub Repository** - репозиторий с настроенными GitHub Actions
3. **Render Service** - созданный Web Service для backend

## Шаг 1: Создание Render Service

1. Зайдите в [Render Dashboard](https://dashboard.render.com)
2. Создайте новый **Web Service**
3. Подключите ваш GitHub репозиторий
4. Настройте параметры:
   - **Name**: `nasa-explorer-backend` (или любое другое)
   - **Root Directory**: `empty`
   - **Build Command**: `npm run build:backend:render`
   - **Start Command**: `cd backend; npm run start`
   - **Environment**: `Node`
   - **Node Version**: `22.16.0` (или последняя LTS)

## Шаг 2: Получение Render API Token

1. В Render Dashboard перейдите в **Account Settings**
2. Выберите вкладку **API Keys**
3. Создайте новый API Key
4. Скопируйте токен (он понадобится для GitHub Secrets)

## Шаг 3: Получение Service ID

1. В Render Dashboard откройте ваш Web Service
2. В URL вы увидите Service ID: `https://dashboard.render.com/web/srv-XXXXXXXXXXXX`
3. Скопируйте `srv-XXXXXXXXXXXX` часть

## Шаг 4: Настройка GitHub Secrets

1. Перейдите в ваш GitHub репозиторий
2. Выберите **Settings** → **Secrets and variables** → **Actions**
3. Добавьте следующие секреты:

### Для Frontend (Vercel):
- `VERCEL_TOKEN` - ваш Vercel API Token
- `VERCEL_ORG_ID` - ID вашей Vercel организации
- `VERCEL_PROJECT_ID` - ID вашего Vercel проекта

### Для Backend (Render):
**Секреты НЕ нужны** - Render автоматически деплоится при push в main branch

## Шаг 5: Настройка Environment Variables в Render

В настройках вашего Render Service добавьте следующие переменные окружения:

### Обязательные:
- `NASA_API_KEY` - ваш NASA API ключ (или оставьте пустым для DEMO_KEY)
- `PORT` - Render автоматически установит

### Опциональные:
- `CACHE_TTL` - время жизни кэша в секундах (по умолчанию 300)
- `NODE_ENV` - `production`

## Шаг 6: Проверка настройки

После настройки:

1. **Сделайте коммит в develop branch** - должен запуститься staging деплой
2. **Сделайте merge в master** - должен запуститься production деплой

## Workflow Описание

### Staging Deploy (develop branch)
- Запускается при push в `develop`
- Деплоит на staging environment (если настроен)

### Production Deploy (master branch)
- Запускается при push в `main`
- Выполняет все тесты и сборку
- Деплоит на production environment

## Troubleshooting

### Ошибка "Could not find a declaration file"
- Убедитесь, что используется правильная build команда: `npm run build:backend:render`
- Проверьте, что все type definitions установлены в backend workspace

### Ошибка "Service not found"
- Проверьте правильность `RENDER_SERVICE_ID`
- Убедитесь, что API Token имеет права на доступ к сервису

### Ошибка "Build failed"
- Проверьте логи сборки в Render Dashboard
- Убедитесь, что все зависимости установлены корректно

## Полезные ссылки

- [Render API Documentation](https://render.com/docs/api)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Environment Variables](https://render.com/docs/environment-variables)
