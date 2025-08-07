# 🚀 NASA Explorer

**Fullstack web application to explore NASA Open APIs**
React + Node.js + Express + Docker + CI/CD + 3D Visualization

[![CI/CD](https://img.shields.io/badge/CI%2FCD-passing-green?style=flat-square&logo=github-actions)](https://github.com/your-username/nasa-explorer/actions)
[![Tests](https://img.shields.io/badge/Tests-passing-green?style=flat-square&logo=jest)](https://github.com/your-username/nasa-explorer/actions)
[![Security](https://img.shields.io/badge/Security-scanned-green?style=flat-square&logo=shield)](https://github.com/your-username/nasa-explorer/security)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📖 Overview

NASA Explorer is a fullstack application that allows users to explore NASA's open data in an interactive and visually engaging way.

### 🌟 Interactive Features

**🎮 3D Interactive Space Visualization**
- **NeoWs 3D Scene**: Explore near-Earth asteroids in an immersive 3D environment
- **Orbit Controls**: Rotate, zoom, and pan around the 3D scene with mouse/touch
- **Real-time Asteroid Data**: Visualize actual asteroid positions and orbits
- **Interactive Elements**: Click on asteroids to view detailed information
- **Smooth Animations**: Fluid camera movements and object transitions

**📸 APOD Gallery with Timeline Navigation**
- **Interactive Timeline**: Navigate through historical astronomy photos
- **Lightbox View**: Full-screen image viewing with smooth transitions
- **Date Picker**: Select specific dates to explore past images
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Loading States**: Smooth loading animations and skeleton screens

**🔴 Mars Rover Photo Explorer**
- **Multi-Rover Support**: Browse photos from Curiosity, Opportunity, Spirit, and Perseverance
- **Advanced Filtering**: Filter by sol (Martian day), camera type, and rover
- **Photo Grid**: Responsive masonry-style layout for optimal viewing
- **Image Details**: View high-resolution images with metadata
- **Search & Sort**: Find specific photos by date or camera

**☄️ Near Earth Objects (NeoWs) Dashboard**
- **Real-time Data**: View current asteroid positions and trajectories
- **Hazard Assessment**: Identify potentially hazardous asteroids
- **Detailed Metrics**: Size, velocity, and closest approach data
- **Interactive Charts**: Visualize asteroid characteristics
- **Date Range Selection**: Explore asteroids over specific time periods

**💫 Enhanced User Experience**
- **Smooth Animations**: Framer Motion powered transitions throughout the app
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Favorites System**: Save and manage favorite images and data
- **Search Functionality**: Find specific content across all modules
- **Loading States**: Elegant loading indicators and skeleton screens

**🎨 Modern UI/UX**
- **TailwindCSS Styling**: Consistent, modern design system
- **Heroicons Integration**: Beautiful, consistent iconography
- **Hover Effects**: Interactive elements with smooth hover states
- **Card-based Layout**: Clean, organized information presentation
- **Typography Hierarchy**: Clear content organization and readability

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

### 🔹 Run in Dev Mode with Docker Compose

This project includes a development Docker Compose setup that runs **backend** and **frontend** with hot reload.

#### 1. Configure environment variables

Create `.env` files:

**backend/.env**
```
NASA_API_KEY=DEMO_KEY
PORT=8000
```

**frontend/.env** *(optional for Vite env variables)*
```
VITE_API_URL=http://localhost:8000
```

#### 2. Start Docker Compose in dev mode

```bash
docker-compose -f docker-compose.dev.yml up --build
```

- **Backend:** http://localhost:8000/health
- **Frontend:** http://localhost:3000/

Any code changes in `backend/` or `frontend/` will trigger automatic hot reload inside the containers.

#### 3. Stop containers

Press `Ctrl+C` and run:

```bash
docker-compose -f docker-compose.dev.yml down
```

---

### 📡 API Endpoints & Response Contracts

The backend exposes three main endpoints for the frontend:

#### 1. `GET /api/apod`
Returns Astronomy Picture of the Day.

**Sample Response:**
```json
{
  "date": "2025-08-01",
  "title": "The Milky Way over the Desert",
  "url": "https://apod.nasa.gov/apod/image/2508/MilkyWayDesert.jpg",
  "explanation": "A beautiful Milky Way panorama captured over the desert sky...",
  "media_type": "image"
}
```

#### 2. `GET /api/mars`
Returns an array of Mars Rover photos. Supports query parameters:
- `sol` (Martian day)
- `earth_date` (YYYY-MM-DD)
- `camera` (optional camera filter)

**Sample Response:**
```json
[
  {
    "id": 102693,
    "sol": 1000,
    "img_src": "http://mars.nasa.gov/msl-raw-images/image1.jpg",
    "earth_date": "2015-05-30",
    "camera": "Front Hazard Avoidance Camera",
    "rover": "Curiosity"
  }
]
```

#### 3. `GET /api/neows`
Returns an array of near-Earth objects (NEO). Supports query parameters:
- `start_date` (YYYY-MM-DD)
- `end_date` (YYYY-MM-DD)

**Sample Response:**
```json
[
  {
    "id": "3542519",
    "name": "2004 XZ130",
    "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
    "absolute_magnitude_h": 20.5,
    "is_potentially_hazardous_asteroid": false,
    "estimated_diameter_m": 250.3,
    "close_approach_date": "2025-08-01",
    "relative_velocity_kph": "38000",
    "miss_distance_km": "745000"
  }
]
```

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