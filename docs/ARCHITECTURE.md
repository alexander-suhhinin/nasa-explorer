# 🛰 NASA Explorer – Architecture Overview

This document describes the architecture of the **NASA Explorer** project, a fullstack web application for exploring NASA Open APIs with rich interactive features and 3D visualizations.

---

## 1. System Overview

NASA Explorer consists of the following components:

1. **Frontend (React + Vite)**
   - Renders interactive UI and 3D visualizations.
   - Communicates only with the backend (no direct NASA API calls from the browser).
   - Provides:
     - APOD gallery and timeline with lightbox functionality
     - Mars Rover photo viewer with advanced filtering
     - 3D visualization of Near-Earth Objects with orbit controls
     - Interactive dashboard with real-time data visualization
     - Responsive design with smooth animations

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

## 2. Interactive Features Architecture

### 🎮 3D Visualization Layer (React Three Fiber)

**Core Components:**
- **Canvas**: Main 3D rendering container with WebGL context
- **OrbitControls**: Mouse/touch camera controls for navigation
- **Asteroid Objects**: 3D spheres representing near-Earth asteroids
- **Orbit Lines**: Visual representation of asteroid trajectories
- **Stars Background**: Immersive space environment

**Interactive Features:**
- **Camera Controls**: Rotate, zoom, and pan around the 3D scene
- **Object Selection**: Click on asteroids to view detailed information
- **Real-time Updates**: Dynamic asteroid position updates
- **Performance Optimization**: Level-of-detail rendering for large datasets

### 📸 APOD Gallery System

**Components:**
- **Timeline Navigation**: Date-based browsing with smooth transitions
- **Lightbox Modal**: Full-screen image viewing with keyboard navigation
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Loading States**: Skeleton screens and progress indicators

**Interactive Features:**
- **Date Picker**: Calendar interface for historical navigation
- **Image Zoom**: Pinch-to-zoom and mouse wheel zoom
- **Keyboard Navigation**: Arrow keys for image navigation
- **Touch Gestures**: Swipe navigation on mobile devices

### 🔴 Mars Rover Photo Explorer

**Components:**
- **Filter System**: Multi-criteria filtering (rover, camera, date)
- **Photo Grid**: Masonry-style responsive layout
- **Image Modal**: High-resolution image viewing
- **Metadata Display**: Detailed photo information

**Interactive Features:**
- **Advanced Filtering**: Real-time filter updates
- **Search Functionality**: Text-based photo search
- **Sort Options**: Multiple sorting criteria
- **Bulk Operations**: Select multiple photos for comparison

### ☄️ NeoWs Dashboard

**Components:**
- **Data Visualization**: Charts and graphs for asteroid data
- **Hazard Assessment**: Visual indicators for potentially hazardous asteroids
- **Real-time Updates**: Live data refresh capabilities
- **Export Functionality**: Data export in various formats

**Interactive Features:**
- **Interactive Charts**: Clickable data points with detailed information
- **Date Range Selection**: Customizable time periods
- **Data Filtering**: Filter by asteroid characteristics
- **Alert System**: Notifications for significant events

---

## 3. High-Level Architecture Diagram

```
          ┌─────────────────────────────────────────────────┐
          │                    Frontend                     │
          │  React + Vite + Tailwind + Framer Motion       │
          │                                                 │
          │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
          │  │   APOD      │ │   Mars      │ │   NeoWs     │ │
          │  │  Gallery    │ │   Rover     │ │   3D View   │ │
          │  │ + Timeline  │ │ + Filters   │ │ + Controls  │ │
          │  └─────────────┘ └─────────────┘ └─────────────┘ │
          │                                                 │
          │  ┌─────────────────────────────────────────────┐ │
          │  │           Interactive Components            │ │
          │  │  • Lightbox Modal                          │ │
          │  │  • 3D Scene (React Three Fiber)            │ │
          │  │  • Responsive Navigation                   │ │
          │  │  • Animation System (Framer Motion)        │ │
          │  └─────────────────────────────────────────────┘ │
          └─────────────────┬───────────────────────────────┘
                            │
                    HTTPS / REST API
                            │
          ┌─────────────────▼───────────────────────────────┐
          │                    Backend                      │
          │ Node.js + Express + Caching                     │
          │                                                 │
          │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
          │  │   /api/apod │ │  /api/mars  │ │ /api/neows  │ │
          │  │ + caching   │ │ + caching   │ │ + caching   │ │
          │  └─────────────┘ └─────────────┘ └─────────────┘ │
          └─────────────────┬───────────────────────────────┘
                            │
                    NASA Open APIs
      (APOD, Mars Rover, NeoWs)
```

---

## 4. Interactive Data Flow

### 3D Visualization Flow:
1. **User Interaction** → Mouse/touch events captured by OrbitControls
2. **Camera Update** → React Three Fiber updates 3D scene
3. **Object Selection** → Click events trigger asteroid detail display
4. **Data Fetch** → Backend API call for detailed asteroid information
5. **UI Update** → Modal or sidebar displays asteroid details

### Gallery Navigation Flow:
1. **Date Selection** → User selects date from timeline
2. **API Request** → Frontend requests APOD data for selected date
3. **Backend Processing** → Backend fetches from NASA API (with caching)
4. **Data Response** → JSON data returned to frontend
5. **UI Rendering** → Image and details displayed with animations

### Filter System Flow:
1. **Filter Change** → User modifies filter criteria
2. **State Update** → React state updates trigger re-render
3. **API Request** → New filtered data requested from backend
4. **Data Processing** → Backend applies filters and returns results
5. **UI Update** → Grid updates with new filtered results

---

## 5. Performance Optimization

### Frontend Optimizations:
- **Code Splitting**: Lazy loading of 3D components and heavy modules
- **Image Optimization**: WebP format and responsive image loading
- **Animation Performance**: Hardware-accelerated CSS transforms
- **3D Rendering**: Level-of-detail system for large asteroid datasets
- **Caching Strategy**: LocalStorage for user preferences and favorites

### Backend Optimizations:
- **API Caching**: In-memory cache with TTL for NASA API responses
- **Request Batching**: Combine multiple API calls where possible
- **Error Handling**: Graceful degradation for API failures
- **Rate Limiting**: Prevent excessive NASA API usage

---

## 6. CI/CD Pipeline

- **GitHub Actions** workflow:
  1. Run lint and tests for frontend & backend.
  2. Build Docker images.
  3. Deploy:
     - Frontend → Vercel
     - Backend → Render / Fly.io

---

## 7. Interactive Component Architecture

### Animation System (Framer Motion):
```typescript
// Example: Card entrance animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};
```

### 3D Scene Management:
```typescript
// Example: Asteroid object creation
const Asteroid = ({ data, onClick }) => (
  <mesh onClick={onClick}>
    <sphereGeometry args={[data.size, 32, 32]} />
    <meshStandardMaterial color={data.isHazardous ? 'red' : 'gray'} />
  </mesh>
);
```

### State Management:
```typescript
// Example: Filter state management
const useFilters = () => {
  const [filters, setFilters] = useState({
    rover: 'curiosity',
    camera: 'all',
    sol: 1000,
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return { filters, updateFilter };
};
```

---

## 8. Future Improvements

- Move to **Next.js** for SSR and better SEO.
- **Redis or DynamoDB caching** for performance.
- **PWA support** with offline mode.
- **WebSocket updates** for real-time NASA data.
- **ML integration** for asteroid classification.
- **VR/AR support** for immersive 3D experiences.
- **Advanced 3D features**: Particle systems, realistic lighting.
- **Collaborative features**: Shared viewing sessions, annotations.

---

*This architecture demonstrates production-level engineering practices for a coding challenge project with rich interactive features and modern web technologies.*

---

## 9. Project Phases Overview

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
