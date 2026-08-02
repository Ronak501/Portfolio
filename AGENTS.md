# AGENTS.md

## Repository overview
- This repository is a single-page personal portfolio site.
- Main source file: `/home/runner/work/Portfolio/Portfolio/index.html`
- Static assets in repo root:
  - `/home/runner/work/Portfolio/Portfolio/Ronak.jpeg`
  - `/home/runner/work/Portfolio/Portfolio/Ronak Talaviya Resume.pdf`

## Tech stack
- Plain HTML with inline CSS and JavaScript.
- No package manager, no local build system, and no test suite in the repository.

## CI/build context
- GitHub Actions workflow: `/home/runner/work/Portfolio/Portfolio/.github/workflows/jekyll-docker.yml`
- CI builds with Jekyll in Docker using:
  - `jekyll/builder:latest`
  - `jekyll build --future`

## Contribution guidance for agents
- Keep changes minimal and targeted.
- Prefer editing `index.html` directly for UI/content updates.
- Preserve existing visual style and section structure unless explicitly asked to redesign.
- Use absolute repository paths in tooling operations when possible.
- Avoid adding new dependencies or tooling unless explicitly requested.

## Validation guidance
- For documentation-only changes: no build/test run is required.
- For HTML/content changes, at minimum:
  - verify the file remains valid and complete,
  - ensure referenced asset paths still exist,
  - keep metadata and external links consistent.
