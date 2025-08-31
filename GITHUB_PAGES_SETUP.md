# GitHub Pages Setup for Fantasy Hearts

Your game is now ready for GitHub Pages deployment! Here's how to set it up:

## What I've Created

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically builds and deploys your game when you push to the main branch
   - Uses Node.js 18 and installs dependencies
   - Builds the frontend with the special GitHub Pages configuration

2. **GitHub Pages Vite Configuration** (`vite.config.github.ts`)
   - Special build configuration for GitHub Pages
   - Sets the correct base path for your repository

## Steps to Deploy

### 1. Push to GitHub
```bash
git add .
git commit -m "Add GitHub Pages deployment setup"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**

### 3. Update Repository Name
In the file `vite.config.github.ts`, replace `your-repo-name` with your actual repository name:
```typescript
base: '/your-actual-repo-name/',
```

### 4. Wait for Deployment
- The GitHub Action will automatically run when you push to main
- Check the **Actions** tab to see the deployment progress
- Once complete, your game will be available at: `https://yourusername.github.io/your-repo-name/`

## What Works on GitHub Pages

✅ **Full game functionality** - All game features work as a static site
✅ **Audio system** - Background music and sound effects
✅ **Visual assets** - Images, fonts, and styling
✅ **Game saves** - Uses browser localStorage (works offline too!)
✅ **3D graphics** - All React Three Fiber components

## What Doesn't Work (Limitations)

❌ **Backend features** - No Express server or database (but your game doesn't really use these)
❌ **Real-time features** - No WebSocket connections
❌ **Server-side authentication** - Would need external service

## Testing Locally

You can test the GitHub Pages build locally:
```bash
npx vite build --config vite.config.github.ts
npx serve dist/public
```

Your Fantasy Hearts game will work perfectly on GitHub Pages since it's primarily a client-side game!