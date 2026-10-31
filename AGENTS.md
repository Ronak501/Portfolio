# AGENTS.md

## Repository overview
- This repository is a multi-page personal portfolio built with Next.js App Router.
- Main routes are in `app/`; shared UI components are in `components/`.
- Static assets are in `public/`, including `public/Ronak.jpeg` and `public/Ronak.pdf`.

## Tech stack
- Next.js 14, React 18, TypeScript, and Tailwind CSS.
- Package manager: npm (`package-lock.json`).
- No test suite is currently configured.

## CI/build context
- GitHub Actions runs `npm ci` and `npm run build` on pushes and pull requests to `main`.
- The README documents Vercel deployment with `npm run build`.

## Contribution guidance for agents
- Keep changes minimal and targeted.
- Prefer editing `index.html` directly for UI/content updates.
- Preserve existing visual style and section structure unless explicitly asked to redesign.
- Use absolute repository paths in tooling operations when possible.
- Avoid adding new dependencies or tooling unless explicitly requested.

## Validation guidance
- For documentation-only changes: no build is required.
- For application changes, prefer `npm run build` when validation is requested or appropriate.
- Keep metadata and external links consistent, and verify referenced assets exist.
