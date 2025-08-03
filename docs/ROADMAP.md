

# 🚀 NASA Explorer – Project Roadmap

This roadmap outlines the future development plan for **NASA Explorer**, showing how we can evolve the coding challenge into a production-grade, feature-rich application.

---

## 1. Short-Term Goals (1–2 weeks)
- [ ] Polish MVP and ensure stable deployment (Vercel + Render/Fly.io)
- [ ] Add more robust caching (Redis or file-based cache)
- [ ] Improve test coverage:
  - Frontend: 70%+ unit tests
  - Backend: 80%+ with integration tests
- [ ] Enhance 3D visualization with better lighting and orbit animations
- [ ] Add basic analytics (page views, API call counts)

---

## 2. Mid-Term Goals (1–2 months)
- [ ] **Authentication & Profiles**
  - OAuth (GitHub / Google / NASA)
  - Allow users to save favorites to their account
- [ ] **Progressive Web App (PWA)**
  - Offline support for APOD gallery
  - Installable on mobile and desktop
- [ ] **Real-Time Data**
  - Integrate NASA live feeds or WebSockets
  - Option to display near-Earth asteroid events in near real-time
- [ ] **Enhanced UI/UX**
  - Dark/light theme toggle
  - Drag-and-zoom in 3D space visualization

---

## 3. Long-Term Goals (3–6 months)
- [ ] **Machine Learning & Data Insights**
  - Classify Near-Earth Objects by risk automatically
  - Predict future asteroid trajectories using historical NASA data
- [ ] **Advanced Data Storage**
  - Move to a persistent database (PostgreSQL or DynamoDB)
  - Store user favorites, search history, and ML results
- [ ] **Serverless & Cloud Scalability**
  - Use AWS Lambda or GCP Cloud Functions for NASA API calls
  - Auto-scale backend based on API usage
- [ ] **Mobile App**
  - React Native or Expo wrapper for native-like experience

---

## 4. Stretch Goals / Experimental Ideas
- [ ] **AR/VR Space Experience**
  - View asteroids and planets in AR through WebXR
- [ ] **Educational Mode**
  - Curated “missions” for students exploring Mars or NEOs
- [ ] **Community Features**
  - Allow users to share favorite photos or discoveries

---

### 📌 Notes
- Roadmap is flexible and will evolve based on user feedback.
- Each phase can be released as a milestone in GitHub Projects for clear progress tracking.