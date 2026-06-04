# 🚀 SETUP GUIDE - React + Vite Portfolio

Follow these steps to set up, run, and customize your portfolio on your local computer.

---

## 📋 Prerequisites

Make sure you have the following installed on your computer:
1. **Node.js** (version 18 or higher recommended) - download from [nodejs.org](https://nodejs.org).
2. **NPM** (comes bundled automatically with Node.js).

---

## ⚡ Step-by-Step Installation

1. **Navigate into the portfolio folder**:
   ```bash
   cd portfolio
   ```

2. **Install all project packages**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Click on the link generated in your terminal (usually **http://localhost:5173**) to view your live, fully interactive portfolio! 🎉

---

## 🛠️ Main Project Architecture

This application consists of modular, reusable files designed to make upgrades simple:

* **`/public/hero-image.png`**: Your pixel art workspace illustration.
* **`/src/index.css`**: Global design systems, vintage vignette overlays, scrollbar themes, and honeycomb hexagons.
* **`/src/App.jsx`**: Main page loader mounting intersection observers for animations.
* **`/src/components/`**: Modular layout sections.

---

## 🚀 Build & Production Deployment

To generate an optimized bundle and host your website live:

### 1. Build Production Site
Run this command inside the `portfolio/` folder:
```bash
npm run build
```
This generates a folder named `dist/` containing highly minified, lightweight, and super-fast static HTML, JS, and CSS files.

### 2. Deploy to Vercel (1-Click)
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Deploy by running:
   ```bash
   vercel
   ```
3. Follow the simple setup prompts. Your site will be online in seconds!

### 3. Deploy to Netlify / GitHub
* Push your `portfolio` directory to a GitHub repository.
* Link the repo in Netlify.
* Set build command to `npm run build` and publish directory to `dist`. Netlify will automatically build and publish your updates every time you push code!
