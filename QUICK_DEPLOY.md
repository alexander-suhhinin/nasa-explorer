# 🚀 Quick Render Deployment Setup

## 1. Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `nasa-explorer-backend`
   - **Root Directory**: `empty`
   - **Build Command**: `npm run build:backend:render`
   - **Start Command**: `cd backend; npm run start`
   - **Environment**: `Node`
   - **Node Version**: `22.16.0`

## 2. Get API Credentials

1. **API Token**: Account Settings → API Keys → Create new key
2. **Service ID**: From service URL `srv-XXXXXXXXXXXX`

## 3. Add GitHub Secrets (Optional)

For frontend deployment to Vercel, add these secrets:

- `VERCEL_TOKEN` = your Vercel API token
- `VERCEL_ORG_ID` = your Vercel org ID
- `VERCEL_PROJECT_ID` = your Vercel project ID

**Note:** Backend deploys automatically via Render - no secrets needed!

## 4. Set Environment Variables

In Render service settings:

- `NASA_API_KEY` = your NASA API key (or leave empty for DEMO_KEY)
- `NODE_ENV` = `production`

## 5. Test Deployment

1. Make a commit to `develop` branch → staging deploy
2. Merge to `main` branch → production deploy

## ✅ Done!

Your backend will now automatically deploy on every merge to master!

---

**Need help?** See [detailed setup guide](docs/RENDER_DEPLOYMENT_SETUP.md)
