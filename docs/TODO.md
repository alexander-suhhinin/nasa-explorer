TODO.md – NASA Explorer Project Roadmap

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