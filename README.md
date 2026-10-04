# Portfolio

Carter King's personal site. Vite + React + TypeScript + Tailwind, with components from [React Bits](https://reactbits.dev).

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
npm test         # Playwright + axe-core accessibility checks (builds first)
npm run lighthouse   # Lighthouse CI: accessibility, best practices, SEO, performance budgets
```

## Edit

- `src/content.ts` — all copy and data: profile and social links, tools, projects and their case pages, media posts, experience, skills.
  - Add an X profile: set `profile.links.x`. The nav icon appears once it is set.
  - Add a post: append to `media`. X posts need only the URL; LinkedIn posts need the text copied in. The Media nav item appears once there is one post.
  - Add a project: append to `projects`. Give it `repo` (public repo) or `page` (case page at `/projects/<slug>`).
- `src/stats.json` — the lines-of-code figure. Regenerate with `python3 scripts/loc.py` (reads local clones on this Mac).
- `src/activity.json` — the activity squares. Regenerate with `python3 scripts/activity.py` (GitHub through the `gh` CLI, Claude Code from `~/.claude/stats-cache.json` on this Mac). Only a date and a count per day are written.
- `src/pages/` — `Home.tsx`, `Skills.tsx`, `Media.tsx`, `ProjectPage.tsx`.
- `src/components/reactbits/` — React Bits component sources, copied from the registry. To add another:
  download `https://reactbits.dev/r/<Name>-TS-TW.json` and save its file content here, then install its `dependencies`.

## Deploy

Static build in `dist/`. `vercel.json` rewrites every path to `index.html` so `/skills` loads directly.

## Archive

The previous Quarto build (source, built `_site/`, and its GitHub Actions / Vercel deploy config) lives in
`_archive/quarto-site_2026-10-04/`. Last commit with it at the repo root: `e5a244a`.

To rebuild the old site: `cd _archive/quarto-site_2026-10-04 && quarto render`.
