# 🔧 Fixing Vercel Routing Issues

## Problem

When directly accessing a URL (e.g., `https://your-app.vercel.app/mars`), Vercel returns a 404 error.

**Error:**
```
404: NOT_FOUND
Code: NOT_FOUND
```

## Cause

Vercel looks for a `mars` file on the server, but it doesn't exist - this is a React route. Vercel should serve `index.html` for all SPA routes.

## Solution

### 1. Create `vercel.json`

Create a file `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Configure Vite

In `frontend/vite.config.ts` add:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',
  // ... other settings
})
```

### 3. Rebuild and Deploy

```bash
cd frontend
npm run build
```

Then deploy to Vercel.

## Alternative Solutions

### Option 1: Configuration in Vercel Dashboard

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Functions
4. Add `_redirects` function:

```
/*    /index.html   200
```

### Option 2: Using `_redirects` file

Create `frontend/public/_redirects`:

```
/*    /index.html   200
```

## Verification

After applying fixes:

1. ✅ Homepage navigation works
2. ✅ Direct access to `/mars` works
3. ✅ Direct access to `/apod` works
4. ✅ Direct access to `/neows` works
5. ✅ Direct access to `/3d-neows` works

## Troubleshooting

### If the problem persists:

1. **Clear Vercel cache:**
   - In Vercel Dashboard → Deployments → Clear Cache

2. **Check build:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Check `dist/index.html`:**
   - Ensure the file is created correctly

4. **Check React routing:**
   - Ensure `BrowserRouter` is used correctly

## Useful Links

- [Vercel Rewrites Documentation](https://vercel.com/docs/concepts/projects/project-configuration#rewrites)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Configuration](https://vitejs.dev/config/)
