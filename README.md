# Portfolio

Carter King's personal site. Vite + React + TypeScript + Tailwind, with components from [React Bits](https://reactbits.dev).

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
npm test         # Playwright + axe-core accessibility checks (builds first)
```

## Edit

- `src/content.ts` — all copy and data: profile, projects, experience, skills.
- `src/stats.json` — the lines-of-code figure. Regenerate with `python3 scripts/loc.py` (reads local clones on this Mac).
- `src/pages/` — `Home.tsx` and `Skills.tsx`.
- `src/components/reactbits/` — React Bits component sources, copied from the registry. To add another:
  download `https://reactbits.dev/r/<Name>-TS-TW.json` and save its file content here, then install its `dependencies`.

## Deploy

Static build in `dist/`. `vercel.json` rewrites every path to `index.html` so `/skills` loads directly.

## Archive

The previous Quarto build (source, built `_site/`, and its GitHub Actions / Vercel deploy config) lives in
`_archive/quarto-site_2026-10-04/`. Last commit with it at the repo root: `e5a244a`.

To rebuild the old site: `cd _archive/quarto-site_2026-10-04 && quarto render`.
