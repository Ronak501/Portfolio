# Ronak Talaviya — Modern Portfolio (Next.js & Vercel Ready)

> A modern, high-performance portfolio engineered with **Next.js 14**, **React 18**, **Tailwind CSS**, and **TypeScript**, inspired by [synitx.dev](https://synitx.dev/).

---

## ✨ Features & Architecture

- 🌅 **Dynamic Multi-Theme System**: Live switcher in the navbar between **Sunset** (warm terracotta/amber), **Rainy** (moody midnight cyan), **Matrix** (deep emerald terminal), and **Cyber** (neon violet).
- 🎵 **Interactive Audio Engine**: Floating audio wave button powered by the browser Web Audio API — provides gentle click chimes and ambient feedback without requiring heavy external MP3 files.
- ⚡ **Intro Sequence Screen**: An animated greeting screen inspired by synitx.dev with a smooth progress bar, skip action, and `sessionStorage` persistence.
- 📜 **Scroll Progress Bar**: A glowing real-time scroll indicator attached to the sticky navbar.
- 💻 **Interactive Dev Studio ("Watch Ronak Build")**:
  - **Architecture**: Visual system dataflow blueprint showing client inputs, YOLOv8 vision pipeline, FastAPI core, and database persistence.
  - **AI Pipeline (`AI-Pipeline.ts`)**: Interactive code runner simulating an AI agent claim verification with live console output.
  - **Interactive Terminal**: Real working terminal supporting commands like `help`, `skills`, `projects`, `ventures`, `whoami`, and `clear`.
- 🚀 **Featured Projects & Case Studies**:
  - Filterable by `All`, `AI`, `Full Stack`, and `Real-time`.
  - Search projects by keyword, tech, or topic.
  - Modals for **Live Demo** previews and **Case Study** architecture breakdowns.
  - Real-time GitHub repositories feed pulling dynamically from `https://api.github.com/users/Ronak501/repos`.
- 🏢 **Ventures Showcase**: Highlighting real-world startup solutions: **Swachh Sense** (Smart City Cleanliness), **Vision Sentinel** (Security Surveillance), and **Transit Guard** (YOLOv8 Transport Monitoring).
- 🧩 **Categorized Skills Bento Grid**: Frontend, Backend, AI & Computer Vision, and Databases/DevOps with proficiency levels.
- 📬 **Interactive Contact Section**: 1-click email copy with instant feedback, direct social badges, and working message form with celebratory confetti.

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (Live in Under 2 Minutes)

### Option 1: Automatic Deployment via GitHub (Recommended)

1. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: upgrade portfolio to modern Next.js inspired by synitx.dev"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** > **"Project"**.
4. Select your repository: `Ronak501/Portfolio`.
5. Vercel automatically detects **Next.js**:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click **Deploy**. Your portfolio will be live worldwide on a `.vercel.app` domain with free SSL!

### Option 2: Deploy via Vercel CLI

Run the following command in your terminal:
```bash
npx vercel
```
Follow the quick prompts to link and deploy immediately.

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css        # Multi-theme CSS custom properties & animations
│   ├── layout.tsx         # SEO metadata, OpenGraph, viewport, Google fonts
│   └── page.tsx           # Assembled home page
├── components/
│   ├── AboutSection.tsx   # Bio, education, and highlights
│   ├── ContactSection.tsx # Email copy, form, confetti, social links
│   ├── CustomCursor.tsx   # Smooth trailing cursor
│   ├── Footer.tsx         # Site footer & replay intro
│   ├── Hero.tsx           # Hero section with rotating roles & 3D tilt card
│   ├── InteractiveDevStudio.tsx # Architecture, code runner & interactive terminal
│   ├── IntroLoader.tsx    # Synitx-style intro greeting & progress bar
│   ├── Marquee.tsx        # Infinite horizontal ticker
│   ├── Navbar.tsx         # Sticky navbar with scroll bar & theme switcher
│   ├── ProjectModal.tsx   # Modal for demo and case study breakdown
│   ├── ProjectsSection.tsx# Filterable projects & live GitHub feed
│   ├── SkillsBento.tsx    # Bento grid for tech stack
│   ├── SoundPlayer.tsx    # Audio visualizer toggle button
│   ├── StatsStrip.tsx     # 4 stat cards with key metrics
│   └── VenturesSection.tsx# Startups & ventures showcase
├── lib/
│   └── audio.ts           # Web Audio API synthesizer engine
├── public/
│   ├── Ronak.jpeg         # Profile headshot
│   └── Ronak.pdf # Resume download asset
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # Tailwind design system tokens
└── tsconfig.json          # TypeScript configuration
```
