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
