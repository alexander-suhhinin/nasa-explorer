TODO.md – NASA Explorer Project Roadmap

## Backend Layered Architecture (Overview)

The backend is organized into a layered structure to separate responsibilities and simplify testing:

```
Request → Router → Controller → Service → Utils/Cache → External API (NASA)
```

### Layers

1. **Routes (`routes/`)**
   - Defines API endpoints and HTTP methods
   - Delegates logic to controllers
   - Can apply route-specific middleware (auth, validation)

2. **Controllers (`controllers/`)**
   - Receives parsed request and sends response
   - Handles input validation and error wrapping
   - Calls corresponding service functions

3. **Services (`services/`)**
   - Contains core business logic
   - Handles integration with external APIs (NASA APOD, Mars, NeoWs)
   - Returns pure data objects without Express dependency

4. **Utils / Cache (`utils/`)**
   - Shared helpers, caching (NodeCache / Redis)
   - Logging or retry utilities

---

### Advantages of this approach
- **Separation of concerns** – each layer has a single responsibility
- **Testability** – services and controllers can be tested independently
- **Scalability** – easy to add new API routes and features
- **Clean express setup** – routes remain small, controllers hold logic, services remain framework-agnostic

Phase 0 — Инициализация проекта (Day 0)
	•	Создать монорепу nasa-explorer с frontend/ и backend/
	•	Настроить npm workspaces или отдельные package.json для фронта и бэка
	•	Добавить .editorconfig, .gitignore, Prettier/ESLint
	•	Настроить commitlint + Husky (опционально для инжен. зрелости)

⸻

Phase 1 — Backend MVP (Day 1-2)
	•	Создать backend/ на Node.js + Express
	•	Добавить GET /health endpoint
	•	Реализовать NASA API proxy:
	•	/api/apod – Astronomy Picture of the Day
	•	/api/mars – Mars Rover Photos
	•	/api/neows – Near Earth Objects
	•	Добавить базовое кэширование (in-memory, TTL 5 min)
	•	Настроить CORS для фронтенда
	•	Подключить Jest + Supertest для юнит-тестов

⸻

Phase 2 — Frontend MVP (Day 2-4)
	•	Создать frontend/ на React + Vite
	•	Настроить Tailwind или MUI для быстрого UI
	•	Реализовать страницы:
	•	Home: приветствие и описание проекта
	•	Gallery: APOD с пагинацией и датами
	•	Mars Rover: галерея + фильтры по Sol и камере
	•	Создать сервис для запросов к backend (services/api.ts)
	•	Добавить Skeleton Loading и Error Handling
	•	Добавить Vitest + React Testing Library

⸻

Phase 3 — WOW Feature & Interactivity (Day 5-7)
	•	Добавить 3D-визуализацию (React Three Fiber + Drei)
	•	Земля/Марс
	•	Астероиды из NeoWs с орбитами
	•	Hover/click → карточка с данными (размер, дата сближения)
	•	Реализовать поиск и фильтры для изображений
	•	Добавить избранное (LocalStorage)
	•	Анимации появления карточек (Framer Motion)

⸻

Phase 4 — Engineering Excellence (Day 8-10)
	•	Настроить Docker для backend и frontend
	•	Multi-stage Dockerfile (prod + dev)
	•	docker-compose для локальной разработки
	•	Настроить GitHub Actions:
	•	Lint + Test → Build
	•	Deploy backend на Render/Fly.io
	•	Deploy frontend на Vercel
	•	Обновить README.md с инструкциями запуска и деплоя

⸻

Phase 5 — Документация и Roadmap (Day 11-12)
	•	Создать docs/
	•	README.md — быстрое развертывание
	•	ARCHITECTURE.md — схема фронт/бэк + NASA API
	•	ROADMAP.md — будущее развитие:
	•	Авторизация (OAuth NASA)
	•	PWA
	•	ML-анализ астероидов
	•	Записать видео-демо работы проекта (опционально, сильно повышает впечатление)

⸻

Phase 6 — Polish & Submission (Day 13-14)
	•	Финальный код-ревью
	•	Прогон всех тестов и деплоя
	•	Проверка responsive design на мобилке
	•	Отправка ссылок на деплой и GitHub

⸻

💡 Бонусы, если останется время:
	•	Использовать Redis вместо in-memory кэша
	•	SSR для фронтенда (Next.js)
	•	Темная/светлая тема
	•	PWA + оффлайн-режим

⸻

## Phase 0.5 — Post infra-setup merge plan

После слияния ветки `infra-setup` в `main` основной фокус смещается на реализацию функционала:

### Backend Priorities
- [ ] Реализовать базовые маршруты:
  - `GET /api/apod` — Astronomy Picture of the Day
  - `GET /api/mars` — Mars Rover Photos
  - `GET /api/neows` — Near Earth Objects
- [ ] Добавить базовое кэширование (in-memory, TTL 5 min)
- [ ] Обработать ошибки и таймауты при обращении к NASA API
- [ ] Подключить Jest + Supertest для юнит и интеграционных тестов

### Frontend Priorities
- [ ] Создать минимальный каркас приложения на React + Vite
- [ ] Реализовать страницу `Gallery` с APOD и пагинацией
- [ ] Подключить сервис `services/api.ts` для запросов к backend
- [ ] Добавить базовую обработку загрузки и ошибок
- [ ] Подключить Vitest + React Testing Library для тестов

### Integration
- [ ] Связать frontend и backend через Docker Compose dev
- [ ] Обновить `README.md` с инструкциями по запуску dev-стека
- [ ] Настроить GitHub Actions для прогонки тестов при PR

После успешной реализации этих задач можно переходить к **Phase 1 и 2** основной дорожной карты (MVP backend и frontend).

⸻

## Backend MVP Checklist (Phase 1)

Цель: реализовать базовый backend с API к NASA и кэшированием, готовый для интеграции с frontend.

### 1. Setup & Structure
- [x] Создать базовую структуру backend (Node.js + Express)
- [x] Настроить ESLint/Prettier и базовую конфигурацию проекта
- [x] Добавить `GET /health` endpoint

### 2. NASA API Proxy Endpoints
- [x] `GET /api/apod` — возвращает Astronomy Picture of the Day
- [x] `GET /api/mars` — возвращает Mars Rover Photos (параметры sol/earth_date/camera)
- [x] `GET /api/neows` — возвращает Near Earth Objects (с поддержкой фильтров по дате)

### 3. Caching & Performance
- [x] Добавить in-memory cache (TTL 5 min)
- [ ] Опционально подготовить Redis-клиент для будущего использования (установить ioredis или redis npm, добавить config, протестировать подключение в dev и через docker-compose)
- [x] Обработать таймауты и ошибки NASA API (retry/fallback)

### 4. Testing
- [x] Настроить Jest + Supertest
- [x] Добавить тесты для `/health` и базовых API маршрутов
- [ ] Настроить CI/CD прогон тестов через GitHub Actions

### 5. Integration & Documentation
- [x] Проверить работу с Docker Compose dev
- [ ] Обновить README.md с инструкциями запуска backend
- [ ] Зафиксировать API контракты для frontend (описание JSON ответа)

После выполнения этого чеклиста backend будет готов для интеграции с фронтендом и дальнейшей реализации WOW-фич.

⸻

## Frontend MVP Checklist (Phase 2)

Цель: реализовать базовый frontend на React + Vite, интегрированный с backend, готовый для добавления WOW-фич.

### 1. Setup & Structure
- [x] Создать базовую структуру фронтенда на React + Vite
- [x] Настроить ESLint/Prettier, добавить базовую конфигурацию проекта
- [x] Подключить TailwindCSS для быстрой верстки

### 2. Core Pages & Components
- [x] Реализовать страницу `Home` / `Dashboard` с карточками APOD, Mars, NeoWs
- [x] Реализовать страницу `Gallery` (APOD) с отображением фото/видео и описанием
- [x] Реализовать страницу `Mars Rover` с фильтром по sol
- [x] Реализовать страницу `NeoWs` с таблицей, сортировкой и пагинацией
- [x] Создать переиспользуемые компоненты (Card, Layout, Sidebar, Topbar)
- [x] Добавить Skeleton Loading и обработку ошибок (с алертами внутри Card)
    - [x] Skeleton loading и корректные алерты ошибок реализованы для APOD, Mars, NeoWs

### 3. API Integration
- [x] Создать сервис `services/api.ts` для работы с backend
- [x] Подключить `VITE_API_BASE_URL` из `.env`
- [x] Интегрировать галереи APOD, Mars Rover, NeoWs с backend
- [x] Реализовать базовую обработку сетевых ошибок и retry при необходимости
    - [x] Для NeoWs установлен `retry: 0` для улучшения UX при ошибках (см. services/api.ts)

### 4. Dashboard & Future Features
- [x] Реализован дашборд с карточками трех галерей
- [x] Добавлена скрытая кнопка "Register for more" для будущей авторизации
- [x] NASA в Sidebar теперь ссылается на Dashboard
- [x] Выровнены линии Topbar/Sidebar для pixel-perfect вида
- [x] Добавлены hover-анимации карточек Dashboard и выравнивание по высоте
- [x] Fade-in анимация для Dashboard через Framer Motion

### 5. Interactivity & UX Polish
- [x] Lightbox с кастомным хуком `useLightbox` интегрирован в APOD
- [x] Lightbox интегрировать в Mars Rover (реализовано)
- [x] Fade-in анимация для APOD
- [x] Fade-in анимация для Mars Rover
- [x] Fade-in анимация для NeoWs
- [x] Skeleton Loading + error alerts для всех галерей
- [x] Анимации Skeleton (планируется добавить shimmer эффект)


### 6. 3D NeoWs Enhancements (Phase 3 WOW)
- [x] Реализована базовая 3D-сцена с Землей и астероидами (React Three Fiber + Drei)
- [x] Анимация вращения Земли и орбитальное движение астероидов
- [x] Pause/Resume Rotation теперь останавливает орбитальное движение
- [x] Hover Tooltip с названием, диаметром и ⚠ для опасных астероидов
- [x] Анимация появления астероидов (staggered scale-up)
- [x] Текстуры для Земли и астероидов (`/public/textures/earth_daymap.jpg` и `asteroid.jpg`)
- [x] Панель управления сценой:
  - [x] Кнопка "Show Hazardous Only"
  - [x] Кнопка "Pause Rotation"
- [x] Орбитальные контролы (OrbitControls) для свободного вращения и зума
- [ ] Добавить фокус камеры на выбранный астероид
- [ ] Добавить подсветку выбранного астероида и выделение орбиты
- [ ] Оптимизация производительности для 3D сцены (instancing, memo)

---

⸻

## WOW Feature & Interactivity Checklist (Phase 3)

Цель: добавить визуальный вау-эффект, интерактивность и функциональность, делающую проект уникальным.

### 1. 3D Visualization
- [ ] Подключить React Three Fiber + Drei
- [ ] Создать 3D-сцену с Землей и Марсом
- [ ] Отобразить астероиды из NeoWs как объекты на орбите
- [ ] Реализовать hover/click → карточка с данными (размер, скорость, дата сближения)
- [ ] Настроить камеру и освещение для максимальной наглядности

### 2. User Interactivity
- [ ] Добавить поиск и фильтры для изображений и объектов
- [ ] Реализовать избранное с сохранением в LocalStorage
- [ ] Добавить анимации появления карточек и элементов интерфейса (Framer Motion)
- [ ] Опционально: drag/rotate для 3D-модели и зум камеры

### 3. Performance & UX
- [ ] Настроить lazy loading и динамическую подгрузку 3D-моделей
- [ ] Оптимизировать производительность React Three Fiber
- [ ] Проверить работу на мобильных устройствах и планшетах

### 4. Testing & QA
- [x] Добавить unit-тесты для компонентов с интерактивностью
- [ ] Добавить e2e-тесты для 3D-функций и избранного (опционально Playwright)
- [ ] Протестировать responsive UX и доступность

### 5. Integration & Documentation
- [ ] Проверить работу WOW-фич через Docker Compose dev
- [ ] Обновить README.md и ARCHITECTURE.md с описанием интерактивных возможностей
- [ ] Подготовить видео-демо проекта для финальной презентации

После выполнения этого чеклиста проект будет выглядеть как полноценное production-ready MVP с вау-эффектом.

### 6. UX / Visual Enhancements
- [x] Добавить Hero-секцию с визуальной идентичностью NASA
- [x] Перестроить Dashboard в более динамичный layout (разные размеры карточек, не 2x2)
- [x] Усилить анимации с помощью Framer Motion
- [x] Сделать карточки визуально уникальными (цвет, превью, иконка)
- [x] Обеспечить полную адаптивность под мобилку
- [x] Добавить в подвал контекст и доверие (powered by NASA API)
- [x] Проверить Lighthouse и доступность
- [x] Добавить краткий слоган NASA для усиления вовлечения (например, "Exploring the cosmos, one API at a time")


⸻

## Engineering Excellence Checklist (Phase 4)

Цель: довести проект до уровня production-ready с упором на надежность, CI/CD, мониторинг и масштабируемость.

### 1. Docker & Environment
- [ ] Проверить и оптимизировать multi-stage Dockerfile (prod/dev)
- [ ] Проверить работу `docker-compose.prod.yml` на чистом сервере
- [ ] Обновить `env.example` и `.env` для продакшн конфигурации
- [ ] Добавить проверку `.dockerignore` для уменьшения размера образа

### 2. CI/CD Pipeline
- [ ] Настроить GitHub Actions:
  - [ ] Lint + Test → Build → Deploy
  - [ ] Автодеплой фронтенда на Vercel
  - [ ] Автодеплой бэкенда на Render/Fly.io
- [ ] Добавить статус-бейджи CI в README.md
- [ ] Настроить уведомления о сбоях (GitHub, Slack/Email)

### 3. Monitoring & Logging
- [ ] Добавить логирование запросов на бэкенде (morgan или pino)
- [ ] Настроить централизованный сбор логов (опционально Loki/ELK)
- [ ] Проверить работу Healthcheck эндпоинтов для CI/CD и Docker

### 4. Security & Best Practices
- [ ] Проверить проект через `npm audit` и обновить уязвимые пакеты
- [ ] Настроить заголовки безопасности через Helmet на бэкенде
- [ ] Настроить HTTPS/SSL (Nginx + Let's Encrypt)
- [ ] Проверить CORS и ограничения доступа к API

### 5. Documentation & Final Polish
- [ ] Обновить README.md с финальными инструкциями деплоя
- [ ] Обновить ARCHITECTURE.md с описанием продакшн-инфраструктуры
- [ ] Добавить диаграмму CI/CD пайплайна
- [ ] Зафиксировать инструкции по обновлению проекта и откату версий

После выполнения этого чеклиста проект будет полностью готов к использованию в продакшне и продемонстрирует высокий уровень инженерной зрелости.

⸻

## Polish & Handover Checklist (Phase 5)

Цель: завершить проект, подготовить его к передаче, демонстрации или ревью.

### 1. Final QA & Review
- [ ] Прогнать все юнит- и e2e-тесты
- [ ] Протестировать приложение на разных устройствах и браузерах
- [ ] Проверить responsive design на мобильных и планшетах
- [ ] Финальный код-ревью и чистка репозитория (удаление ненужных файлов)

### 2. Documentation
- [ ] Обновить README.md с финальными скриншотами и GIF/видео демо
- [ ] Добавить ссылку на деплой проекта (Vercel/Render)
- [ ] Обновить ARCHITECTURE.md и ROADMAP.md с итоговым состоянием проекта
- [ ] Зафиксировать инструкции по локальному запуску, деплою и обновлению проекта

### 3. Presentation Materials
- [ ] Подготовить короткое видео-демо проекта (1-2 минуты)
- [ ] Сделать скриншоты ключевых страниц (галерея APOD, Mars Rover, 3D-визуализация)
- [ ] Опционально: оформить слайды или Notion-страницу с описанием проекта

### 4. Handover / Submission
- [ ] Проверить работу GitHub Actions и CI/CD
- [ ] Зафиксировать последнюю стабильную версию (git tag v1.0.0)
- [ ] Подготовить короткий текст о проекте для README и LinkedIn
- [ ] Передать ссылки на GitHub и деплой (или загрузить в систему тестового задания)

После выполнения этого чеклиста проект будет готов к демонстрации и передаче как production-ready MVP.
