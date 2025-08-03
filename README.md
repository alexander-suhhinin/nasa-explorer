

# 🚀 NASA Explorer

**Fullstack web application to explore NASA Open APIs**
React + Node.js + Express + Docker + CI/CD + 3D Visualization

---

## 📖 Overview

NASA Explorer is a fullstack application that allows users to explore NASA's open data in an interactive and visually engaging way.

Key features:
- **3D Interactive Space Visualization** – explore near-Earth asteroids and Mars in a 3D scene (React Three Fiber)
- **APOD Gallery** – Astronomy Picture of the Day with timeline navigation
- **Mars Rover Photos** – Browse photos by sol, camera, and rover
- **Near Earth Objects** – Visualize asteroid orbits and details
- **User Interactivity** – filters, search, favorites (stored in LocalStorage)
- **Responsive UI** – optimized for desktop and mobile
- **Engineering Excellence** – Dockerized, CI/CD with GitHub Actions, unit & e2e tests, documented roadmap

---

## 🛠 Tech Stack

**Frontend:**
- React + Vite
- TailwindCSS / MUI
- Zustand / Redux Toolkit
- React Three Fiber + Drei (3D)
- Framer Motion (animations)
- Vitest + React Testing Library + Playwright

**Backend:**
- Node.js + Express
- Axios / node-fetch for NASA API calls
- Jest + Supertest for testing
- In-memory caching (optional Redis)

**Infrastructure:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Vercel (frontend) + Render/Fly.io (backend)

---

## 📂 Project Structure

```
nasa-explorer/
├── frontend/                     # React + Vite
│   ├── src/
│   │   ├── components/           # UI components
│   │   ├── pages/                # Pages (Home, Gallery, Mars)
│   │   ├── services/             # API clients
│   │   ├── store/                # Zustand or Redux store
│   │   └── utils/                # Helpers
│   ├── tests/                    # Unit & e2e tests
│   └── package.json
│
├── backend/                      # Node.js + Express
│   ├── src/
│   │   ├── routes/               # Express routes
│   │   ├── controllers/          # Request handlers
│   │   ├── services/             # NASA API calls
│   │   └── utils/                # Helpers (cache, logger)
│   ├── tests/                     # Jest + Supertest
│   └── package.json
│
├── infra/                        # DevOps
│   ├── docker/                    # Dockerfiles
│   ├── github-actions/            # CI/CD workflows
│   └── docker-compose.yml
│
├── docs/
│   ├── README.md                  # This file
│   ├── ROADMAP.md                 # Future improvements
│   └── ARCHITECTURE.md            # Architecture overview
│
└── package.json                   # Monorepo root
```

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/username/nasa-explorer.git
cd nasa-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder:

```
NASA_API_KEY=DEMO_KEY
PORT=5000
```

---

### 4. Run locally with Docker

```bash
docker-compose up --build
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

---

### 5. Run tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

**e2e (Playwright):**
```bash
npm run test:e2e
```

---

## 🚀 Deployment

- **Frontend** → Vercel (`npm run build` in `frontend/`)
- **Backend** → Render / Fly.io (Dockerfile in `backend/`)

GitHub Actions workflow:
1. Lint + Tests
2. Build
3. Deploy (frontend → Vercel, backend → Render)

---

## 📌 Roadmap

See [`docs/ROADMAP.md`](ROADMAP.md) for planned features:
- Authentication & user accounts (OAuth NASA / GitHub)
- Progressive Web App (PWA)
- ML-powered asteroid classification
- Real-time NASA data via WebSockets

---

## 🤝 Contributing

See [`docs/CONTRIBUTING.md`](CONTRIBUTING.md) for setup and contribution guidelines.

---

## 📜 License

MIT License © 2025