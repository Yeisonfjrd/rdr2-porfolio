# RDR2 Portfolio — Agent Instructions

## Stack & Commands

- **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4** + **TypeScript**
- **pnpm** (pnpm-lock.yaml present; do not use npm/yarn)
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint only (no typecheck or test scripts in package.json)

## Path Aliases

`@/*` maps to project root (`./`). Components live in `components/`, utils in `lib/`, hooks in `hooks/`.

## Architecture

- **Entry**: `app/page.tsx` orchestrates screen state (`title`, `main`, `portfolio`) via React `useState`.
- **Screens** (`components/screens/`): `TitleScreen`, `MainMenu`, `PortfolioMenu`, `ActivitiesScreen`, `ShotgunBlast`, `LoadingScreen`
- **UI** (`components/ui/`): shadcn/ui-style components (new-york style, zero border-radius)
- **Filters**: `RdrFilters` in `components/screens/rdr-filters.tsx` provides SVG filter defs (`#rdr-paint-sm`, `#rdr-paint-lg`, etc.) applied via `filter: url(#...)` in CSS
- **Assets utility**: `lib/assets.ts` with `ASSET_PATHS` and `getAssetUrl()` — reference `public/ASSETS_GUIDE.md` for expected files

## Design System

- CSS variables defined in `app/globals.css` under `:root` (RDR2 palette: crimson `#bd081a`, gold `#feac01`, sepia tones)
- Fonts: `chinese rocks rg.otf` (local, `@/app/fonts/`), `Crimson_Text` (Google Fonts via next/font/google)
- Key utility classes: `.rdr-grain`, `.rdr-vignette`, `.rdr-paint-border`, `.rdr-panel`, `.rdr-photo-card`, `.rdr-cinematic-bars`
- Western atmosphere classes: `.rdr-menu-atmosphere`, `.rdr-title-warm-wash`, `.bg-western`

## Build Config

- `next.config.mjs`: `typescript.ignoreBuildErrors: true`, `images.unoptimized: true`
- **No tests** configured in this project

## Asset Guidelines

Reference `public/ASSETS_GUIDE.md`. Expected media:
- `/intro/` — `shotgun-blast.mp4` (2-3s, 720p+)
- `/loading/` — `loading-01.jpg` to `loading-04.jpg` (sepia, 800x600)
- `/title/` — `title-video.mp4` or static images
