# AGENTS.md

## Repository Overview
- This repository hosts a static personal portfolio site.
- The primary page is `/home/runner/work/Portfolio/Portfolio/index.html`.
- There is no application framework or package-manager-based build setup in the repo.

## Key Files
- `/home/runner/work/Portfolio/Portfolio/index.html` — main portfolio page markup, styles, and scripts.
- `/home/runner/work/Portfolio/Portfolio/Ronak.jpeg` — profile image used by the site.
- `/home/runner/work/Portfolio/Portfolio/Ronak Talaviya Resume.pdf` — resume asset.
- `/home/runner/work/Portfolio/Portfolio/.github/workflows/jekyll-docker.yml` — CI workflow using Jekyll builder container.

## CI and Validation
- Existing CI runs a Jekyll build in Docker:
  - `jekyll/builder:latest ... jekyll build --future`
- There are no repository-defined unit tests or lint scripts.
- For content-only changes, validate by reviewing the updated HTML/asset references and ensuring formatting remains consistent.

## Editing Guidelines for Agents
- Keep changes minimal and targeted to the requested task.
- Preserve existing page structure and inline styling conventions unless explicitly asked to refactor.
- When editing `index.html`, avoid unrelated formatting churn.
- Use absolute repository paths when referencing files in task output.
