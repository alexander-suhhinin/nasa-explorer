# 🤝 Contributing to NASA Explorer

Thank you for considering contributing to **NASA Explorer**!
We welcome contributions of all kinds: bug reports, feature requests, code, and documentation improvements.

---

## 🛠 How to Set Up the Project

### 1. Fork & Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nasa-explorer.git
cd nasa-explorer
```

### 2. Install Dependencies

```bash
# Install root and workspaces
npm install
```

### 3. Configure Environment Variables

Create `.env` in the root folder:

```
NASA_API_KEY=DEMO_KEY
PORT=5000
```

---

## 🚀 Local Development

### 1. Start Backend

```bash
cd backend
npm run dev
```

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

### 3. Run with Docker Compose (Optional)

```bash
docker-compose up --build
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

---

## ✅ Testing

We use:

- **Frontend:** Vitest + React Testing Library + Playwright (e2e)
- **Backend:** Jest + Supertest

Run tests:

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test

# e2e tests
npm run test:e2e
```

---

## 🔀 Pull Request Guidelines

1. **Create a new branch** for each feature or fix:
   ```
   git checkout -b feature/3d-asteroids
   ```
2. Follow conventional commits if possible (e.g., `feat: add asteroid 3D view`).
3. Ensure tests pass locally before opening a PR.
4. Keep pull requests focused and small if possible.
5. Update documentation if your change affects usage or setup.

---

## 💡 Suggestions for Contributors

- Check `TODO.md` for pending tasks.
- Look at `ROADMAP.md` for planned features.
- New contributors can start with documentation or tests.

---

Thank you for helping improve **NASA Explorer**! 🚀
