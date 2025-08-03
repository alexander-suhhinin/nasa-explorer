# 🛰 NASA Explorer – Architecture Overview

This document describes the architecture of the **NASA Explorer** project, a fullstack web application for exploring NASA Open APIs.

---

## 1. System Overview

NASA Explorer consists of the following components:

1. **Frontend (React + Vite)**
   - Renders interactive UI and 3D visualizations.
   - Communicates only with the backend (no direct NASA API calls from the browser).
   - Provides:
     - APOD gallery and timeline
     - Mars Rover photo viewer with filters
     - 3D visualization of Near-Earth Objects

2. **Backend (Node.js + Express)**
   - Acts as a proxy and data aggregator for NASA APIs.
   - Implements endpoints:
     - `/api/apod` – Astronomy Picture of the Day
     - `/api/mars` – Mars Rover Photos
     - `/api/neows` – Near Earth Objects
   - Handles caching (in-memory or Redis) to reduce NASA API requests.
   - Responsible for error handling and consistent JSON responses.

3. **External Services**
   - **NASA Open APIs**
   - **Vercel / Render / Fly.io** for hosting
   - **GitHub Actions** for CI/CD
   - **Docker** for local dev and production builds

---

## 2. High-Level Architecture Diagram

```
          ┌────────────────────┐
          │      Frontend      │
          │  React + Vite +    │
          │  Tailwind / MUI    │
          └─────────┬──────────┘
                    │
          HTTPS / REST API
                    │
          ┌─────────▼──────────┐
          │      Backend       │
          │ Node.js + Express  │
          │  - /api/apod       │
          │  - /api/mars       │
          │  - /api/neows      │
          │ + caching & errors │
          └─────────┬──────────┘
                    │
            NASA Open APIs
      (APOD, Mars Rover, NeoWs)
```

---

## 3. Data Flow

1. **User Action** → triggers API request in the frontend.
2. **Frontend → Backend** → REST call (`/api/...`).
3. **Backend → NASA API** (if cache miss) → fetch & normalize data.
4. **Backend → Frontend** → return JSON data.
5. **Frontend** renders UI (gallery, timeline, 3D objects).

---

## 4. CI/CD Pipeline

- **GitHub Actions** workflow:
  1. Run lint and tests for frontend & backend.
  2. Build Docker images.
  3. Deploy:
     - Frontend → Vercel
     - Backend → Render / Fly.io

---

## 5. Future Improvements

- Move to **Next.js** for SSR and better SEO.
- **Redis or DynamoDB caching** for performance.
- **PWA support** with offline mode.
- **WebSocket updates** for real-time NASA data.
- **ML integration** for asteroid classification.

---


*This architecture demonstrates production-level engineering practices for a coding challenge project.*

---

## 6. Project Phases Overview

The project development is organized into **five main phases**, each with clear checklists for structured progress:

1. **Phase 0.5 – Post infra-setup merge**
   - Initial backend & frontend skeleton
   - Docker Compose dev setup
   - CI/CD basic validation

2. **Phase 1 – Backend MVP**
   - Core API endpoints (`/api/apod`, `/api/mars`, `/api/neows`)
   - In-memory caching and error handling
   - Jest + Supertest testing and CI integration

3. **Phase 2 – Frontend MVP**
   - React + Vite SPA with APOD gallery and Mars Rover page
   - API service integration and error handling
   - Vitest + React Testing Library unit tests

4. **Phase 3 – WOW Feature & Interactivity**
   - 3D visualization with React Three Fiber
   - User interactivity: filters, favorites, animations
   - Performance optimization and UX polish

5. **Phase 4 – Engineering Excellence**
   - Production-ready Docker & `docker-compose.prod.yml`
   - GitHub Actions CI/CD with auto-deploy
   - Monitoring, logging, and security best practices

6. **Phase 5 – Polish & Handover**
   - Final QA and responsive testing
   - Updated documentation with screenshots and demo video
   - Project ready for presentation, submission, or handover

---

### Visual Summary of Phases

```
Phase 0.5 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
Infra setup   Backend     Frontend    WOW & 3D    Prod Ready  Final Polish
              MVP         MVP         Features    & CI/CD     & Handover
```

This phased approach ensures the project evolves from infrastructure setup to a production-ready MVP with a clear wow factor and professional handover.
