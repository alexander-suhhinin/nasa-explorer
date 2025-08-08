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

Phase 0 — Project Initialization (Day 0)
	•	Create nasa-explorer monorepo with frontend/ and backend/
	•	Configure npm workspaces or separate package.json for frontend and backend
	•	Add .editorconfig, .gitignore, Prettier/ESLint
	•	Configure commitlint + Husky (optional for engineering maturity)

⸻

Phase 1 — Backend MVP (Day 1-2)
	•	Create backend/ with Node.js + Express
	•	Add GET /health endpoint
	•	Implement NASA API proxy:
	•	/api/apod – Astronomy Picture of the Day
	•	/api/mars – Mars Rover Photos
	•	/api/neows – Near Earth Objects
	•	Add basic caching (in-memory, TTL 5 min)
	•	Configure CORS for frontend
	•	Set up Jest + Supertest for unit tests

⸻

Phase 2 — Frontend MVP (Day 2-4)
	•	Create frontend/ with React + Vite
	•	Configure Tailwind or MUI for rapid UI development
	•	Implement pages:
	•	Home: welcome and project description
	•	Gallery: APOD with pagination and dates
	•	Mars Rover: gallery + filters by Sol and camera
	•	Create service for backend requests (services/api.ts)
	•	Add Skeleton Loading and Error Handling
	•	Add Vitest + React Testing Library

⸻

Phase 3 — WOW Feature & Interactivity (Day 5-7)
	•	Add 3D visualization (React Three Fiber + Drei)
	•	Earth/Mars
	•	Asteroids from NeoWs with orbits
	•	Hover/click → data card (size, approach date)
	•	Implement search and filters for images
	•	Add favorites (LocalStorage)
	•	Card appearance animations (Framer Motion)

⸻

Phase 4 — Engineering Excellence (Day 8-10)
	•	Configure Docker for backend and frontend
	•	Multi-stage Dockerfile (prod + dev)
	•	docker-compose for local development
	•	Configure GitHub Actions:
	•	Lint + Test → Build
	•	Deploy backend to Render/Fly.io
	•	Deploy frontend to Vercel
	•	Update README.md with launch and deployment instructions

⸻

Phase 5 — Documentation and Roadmap (Day 11-12)
	•	Create docs/
	•	README.md — quick deployment
	•	ARCHITECTURE.md — frontend/backend schema + NASA API
	•	ROADMAP.md — future development:
	•	Authorization (OAuth NASA)
	•	PWA
	•	ML analysis of asteroids
	•	Record a video demo of the project (optional, greatly enhances impression)

⸻

Phase 6 — Polish & Submission (Day 13-14)
	•	Final code review
	•	Run all tests and deployment
	•	Check responsive design on mobile
	•	Submit links to deployment and GitHub

⸻

💡 Bonuses, if time permits:
	•	Use Redis instead of in-memory cache
	•	SSR for frontend (Next.js)
	•	Dark/light theme
	•	PWA + offline mode

⸻

## Phase 0.5 — Post infra-setup merge plan

After merging the `infra-setup` branch into `main`, the main focus shifts to implementing functionality:

### Backend Priorities
- [ ] Implement basic routes:
  - `GET /api/apod` — Astronomy Picture of the Day
  - `GET /api/mars` — Mars Rover Photos
  - `GET /api/neows` — Near Earth Objects
- [ ] Add basic caching (in-memory, TTL 5 min)
- [ ] Handle errors and timeouts when accessing NASA API
- [ ] Set up Jest + Supertest for unit and integration tests

### Frontend Priorities
- [ ] Create minimal application framework with React + Vite
- [ ] Implement `Gallery` page with APOD and pagination
- [ ] Connect `services/api.ts` service for backend requests
- [ ] Add basic loading and error handling
- [ ] Set up Vitest + React Testing Library for tests

### Integration
- [ ] Connect frontend and backend through Docker Compose dev
- [ ] Update `README.md` with instructions for launching dev stack
- [ ] Configure GitHub Actions to run tests on PR

After successful implementation of these tasks, we can move on to **Phase 1 and 2** of the main roadmap (MVP backend and frontend).

⸻

## Backend MVP Checklist (Phase 1)

Goal: implement a basic backend with NASA API and caching, ready for integration with the frontend.

### 1. Setup & Structure
- [x] Create basic backend structure (Node.js + Express)
- [x] Configure ESLint/Prettier and basic project configuration
- [x] Add `GET /health` endpoint

### 2. NASA API Proxy Endpoints
- [x] `GET /api/apod` — returns Astronomy Picture of the Day
- [x] `GET /api/mars` — returns Mars Rover Photos (parameters sol/earth_date/camera)
- [x] `GET /api/neows` — returns Near Earth Objects (with support for date filters)

### 3. Caching & Performance
- [x] Add in-memory cache (TTL 5 min)
- [ ] Optionally prepare Redis client for future use (install ioredis or redis npm, add config, test connection in dev and through docker-compose)
- [x] Handle timeouts and NASA API errors (retry/fallback)

### 4. Testing
- [x] Set up Jest + Supertest
- [x] Add tests for `/health` and basic API routes
- [ ] Configure CI/CD test runs through GitHub Actions

### 5. Integration & Documentation
- [x] Test functionality with Docker Compose dev
- [ ] Update README.md with backend launch instructions
- [ ] Document API contracts for frontend (JSON response description)

After completing this checklist, the backend will be ready for integration with the frontend and further implementation of WOW features.

⸻

## Frontend MVP Checklist (Phase 2)

Goal: implement a basic frontend on React + Vite, integrated with the backend, ready for adding WOW features.

### 1. Setup & Structure
- [x] Create basic frontend structure with React + Vite
- [x] Configure ESLint/Prettier, add basic project configuration
- [x] Connect TailwindCSS for rapid layout development

### 2. Core Pages & Components
- [x] Implement `Home` / `Dashboard` page with APOD, Mars, NeoWs cards
- [x] Implement `Gallery` (APOD) page with photo/video display and description
- [x] Implement `Mars Rover` page with sol filter
- [x] Implement `NeoWs` page with table, sorting and pagination
- [x] Create reusable components (Card, Layout, Sidebar, Topbar)
- [x] Add Skeleton Loading and error handling (with alerts inside Card)
    - [x] Skeleton loading and correct error alerts implemented for APOD, Mars, NeoWs

### 3. API Integration
- [x] Create `services/api.ts` service for working with backend
- [x] Connect `VITE_API_BASE_URL` from `.env`
- [x] Integrate APOD, Mars Rover, NeoWs galleries with backend
- [x] Implement basic network error handling and retry when necessary
    - [x] For NeoWs, `retry: 0` is set to improve UX during errors (see services/api.ts)

### 4. Dashboard & Future Features
- [x] Dashboard with three gallery cards implemented
- [x] Hidden "Register for more" button added for future authorization
- [x] NASA in Sidebar now links to Dashboard
- [x] Topbar/Sidebar lines aligned for pixel-perfect view
- [x] Hover animations for Dashboard cards and height alignment added
- [x] Fade-in animation for Dashboard via Framer Motion

### 5. Interactivity & UX Polish
- [x] Lightbox with custom `useLightbox` hook integrated into APOD
- [x] Lightbox integrated into Mars Rover (implemented)
- [x] Fade-in animation for APOD
- [x] Fade-in animation for Mars Rover
- [x] Fade-in animation for NeoWs
- [x] Skeleton Loading + error alerts for all galleries
- [x] Skeleton animations (shimmer effect planned to be added)


### 6. 3D NeoWs Enhancements (Phase 3 WOW)
- [x] Basic 3D scene with Earth and asteroids implemented (React Three Fiber + Drei)
- [x] Earth rotation animation and orbital movement of asteroids
- [x] Pause/Resume Rotation now stops orbital movement
- [x] Hover Tooltip with name, diameter and ⚠ for hazardous asteroids
- [x] Asteroid appearance animation (staggered scale-up)
- [x] Textures for Earth and asteroids (`/public/textures/earth_daymap.jpg` and `asteroid.jpg`)
- [x] Scene control panel:
  - [x] "Show Hazardous Only" button
  - [x] "Pause Rotation" button
- [x] Orbital controls (OrbitControls) for free rotation and zoom
- [ ] Add camera focus on selected asteroid
- [ ] Add highlighting for selected asteroid and orbit emphasis
- [ ] Performance optimization for 3D scene (instancing, memo)

---

⸻

## WOW Feature & Interactivity Checklist (Phase 3)

Goal: add visual wow-effect, interactivity and functionality that makes the project unique.

### 1. 3D Visualization
- [ ] Connect React Three Fiber + Drei
- [ ] Create 3D scene with Earth and Mars
- [ ] Display asteroids from NeoWs as objects in orbit
- [ ] Implement hover/click → data card (size, velocity, approach date)
- [ ] Configure camera and lighting for maximum clarity

### 2. User Interactivity
- [ ] Add search and filters for images and objects
- [ ] Implement favorites with saving to LocalStorage
- [ ] Add appearance animations for cards and interface elements (Framer Motion)
- [ ] Optional: drag/rotate for 3D model and camera zoom

### 3. Performance & UX
- [ ] Configure lazy loading and dynamic loading of 3D models
- [ ] Optimize React Three Fiber performance
- [ ] Test functionality on mobile devices and tablets

### 4. Testing & QA
- [x] Add unit tests for components with interactivity
- [x] Add e2e tests for 3D functions and favorites (optionally Playwright)
- [x] Test responsive UX and accessibility

### 5. Integration & Documentation
- [x] Test WOW features through Docker Compose dev
- [ ] Update README.md and ARCHITECTURE.md with description of interactive features
- [ ] Prepare video demo of the project for final presentation

After completing this checklist, the project will look like a full-fledged production-ready MVP with a wow-effect.

### 6. UX / Visual Enhancements
- [x] Add Hero section with NASA visual identity
- [x] Rebuild Dashboard into a more dynamic layout (different card sizes, not 2x2)
- [x] Enhance animations with Framer Motion
- [x] Make cards visually unique (color, preview, icon)
- [x] Ensure full mobile responsiveness
- [x] Add context and trust to footer (powered by NASA API)
- [x] Check Lighthouse and accessibility
- [x] Add a short NASA slogan to enhance engagement (for example, "Exploring the cosmos, one API at a time")


⸻

## Engineering Excellence Checklist (Phase 4)

Goal: bring the project to production-ready level with emphasis on reliability, CI/CD, monitoring and scalability.

### 1. Docker & Environment
- [x] Check and optimize multi-stage Dockerfile (prod/dev)
- [x] Test `docker-compose.prod.yml` on a clean server
- [x] Update `env.example` and `.env` for production configuration
- [x] Add `.dockerignore` check to reduce image size

### 2. CI/CD Pipeline
- [x] Configure GitHub Actions:
  - [x] Lint + Test → Build → Deploy
  - [x] Auto-deploy frontend to Vercel
  - [x] Auto-deploy backend to Render/Fly.io
- [x] Add CI status badges to README.md
- [x] Configure failure notifications (GitHub, Slack/Email)

### 3. Monitoring & Logging
- [ ] Add request logging on the backend (morgan or pino)
- [ ] Configure centralized log collection (optionally Loki/ELK)
- [ ] Check Healthcheck endpoints for CI/CD and Docker

### 4. Security & Best Practices
- [ ] Check the project with `npm audit` and update vulnerable packages
- [ ] Configure security headers through Helmet on the backend
- [ ] Set up HTTPS/SSL (Nginx + Let's Encrypt)
- [ ] Check CORS and API access restrictions

### 5. Documentation & Final Polish
- [ ] Update README.md with final deployment instructions
- [ ] Update ARCHITECTURE.md with production infrastructure description
- [ ] Add CI/CD pipeline diagram
- [ ] Document instructions for project updates and version rollbacks

After completing this checklist, the project will be fully ready for production use and will demonstrate a high level of engineering maturity.

⸻

## Polish & Handover Checklist (Phase 5)

Goal: complete the project, prepare it for handover, demonstration or review.

### 1. Final QA & Review
- [ ] Run all unit and e2e tests
- [ ] Test the application on different devices and browsers
- [ ] Check responsive design on mobile and tablets
- [ ] Final code review and repository cleanup (remove unnecessary files)

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
