

# 🚀 NASA Explorer – Deployment Guide

This document explains how to deploy the **NASA Explorer** project in production using **Vercel** (frontend) and **Render/Fly.io** (backend), along with Docker and GitHub Actions CI/CD.

---

## 1. Frontend Deployment (Vercel)

**Tech stack:** React + Vite

1. Create a **Vercel account** (if you don’t have one).
2. Connect your **GitHub repository**.
3. Select the `frontend/` folder as the project root.
4. Configure environment variables:
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
5. Trigger deployment:
   - On push to `main`, Vercel will auto-deploy.
   - Or deploy manually from the Vercel dashboard.

✅ **Frontend URL Example:**
`https://nasa-explorer.vercel.app`

---

## 2. Backend Deployment (Render or Fly.io)

**Tech stack:** Node.js + Express

### Option 1: Render
1. Create a **Render account** and connect your **GitHub repository**.
2. Add a **Web Service**:
   - Root directory: `backend/`
   - Build command: `npm install && npm run build || echo "No build step"`
   - Start command: `npm start`
3. Add environment variables:
   - `NASA_API_KEY=YOUR_KEY`
   - `PORT=5000` (Render automatically assigns `$PORT`)
4. Render will provide a public URL like:
   `https://nasa-backend.onrender.com`

### Option 2: Fly.io (Docker-based)
1. Install Fly CLI: `brew install flyctl` (macOS)
2. Run `fly launch` from `backend/` folder.
3. Use provided `Dockerfile.backend` for the image.
4. Configure environment variables in Fly dashboard.
5. Deploy:
   ```bash
   fly deploy
   ```

✅ **Backend URL Example:**
`https://nasa-backend.fly.dev`

---

## 3. Docker Deployment (Local or Production Server)

### Local Development
```bash
docker-compose up --build
```
Services:
- `http://localhost:3000` → frontend
- `http://localhost:5000` → backend
- `localhost:6379` → Redis cache

### Production with Docker
1. Copy `.env` to production server.
2. Use the same `docker-compose.yml` or separate prod configuration.
3. Configure reverse proxy (e.g., **NGINX**) for HTTPS.

---

## 4. GitHub Actions CI/CD

The project includes `.github/workflows/ci.yml` which:

1. Installs dependencies
2. Runs lint and tests
3. Builds frontend & backend
4. Provides placeholders for:
   - **Frontend deploy to Vercel**
   - **Backend deploy to Render/Fly.io**

**Tip:** Replace placeholder deploy steps with real commands or GitHub Actions marketplace integrations:
- [Vercel Action](https://github.com/marketplace/actions/vercel-action)
- [Render Deploy Action](https://github.com/marketplace/actions/render-deploy-action)

---

## 5. Checklist Before Production

- [ ] All environment variables set on Vercel/Render/Fly
- [ ] `.env` file excluded from repository (`.gitignore`)
- [ ] SSL configured (Vercel and Render provide it by default)
- [ ] Tests passing on CI/CD
- [ ] GitHub Actions auto-deploy works

---

With this setup, **NASA Explorer** is ready for production deployment with automated CI/CD 🚀