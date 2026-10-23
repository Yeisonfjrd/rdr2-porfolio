# RDR2 Portfolio · frontend

My portfolio, built to feel like the menus of Red Dead Redemption 2: a shotgun intro, the title screen, a sepia loading screen and the pause menu, where each item opens a section of the portfolio.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · TypeScript · pnpm. Live at https://v0-yeison-fajardo-portfolio.vercel.app

```
GET  /api/github     public repos, total stars, top language and last push (cached 5 min)
GET  /api/wakatime   last 7 days of coding: daily average, top language, project, editor (cached 10 min)
```

## How it works

- **One page, a screen state machine.** `app/page.tsx` switches between `title`, `main` and `portfolio` with React state. The shotgun intro plays once per browser session (`sessionStorage` key `rdr2_intro_played`). The loading screen only shows if a transition takes longer than 200 ms, and then it stays at least 2 s so it does not flash.
- **The look is CSS and SVG, not images.** The red dry-brush column and the torn edges are SVG filters (`#rdr-paint-sm`, `#rdr-paint-lg`, in `components/screens/rdr-filters.tsx`) applied with `filter: url(...)`. The palette lives in `app/globals.css` (crimson `#bd081a`, gold `#feac01`, sepia), with the Chinese Rocks font for menu items and Crimson Text for body copy.
- **Pause menu.** Perfil, Proyectos, Habilidades, Experiencia, Contacto, Actividad and Salir. A pocket watch shows the real time.
- **API keys stay on the server.** The Actividad screen calls the two route handlers above, which talk to GitHub and WakaTime. The tokens never reach the browser. Without a WakaTime key the endpoint answers 503 and the screen says "Sin datos" instead of showing made-up numbers.

## Running it

```bash
pnpm install
pnpm dev
```

With pnpm 11, `pnpm dev` stops on ignored build scripts (msw, sharp). Approve them with `pnpm approve-builds`, or run `node node_modules/next/dist/bin/next dev`.

Environment variables (all optional):

- `GITHUB_USERNAME` (default `yeisonfjrd`)
- `GITHUB_TOKEN` (without it, GitHub allows 60 requests per hour)
- `WAKATIME_API_KEY`

## Things I'd change

- `next.config.mjs` has `typescript.ignoreBuildErrors: true`, so a type error does not fail the build, and CI only runs `pnpm build`. Fix: remove the flag and add `tsc --noEmit` to CI.
- There are no tests yet, even though Vitest, Testing Library and MSW are installed. The two API routes are the first thing worth testing, with MSW faking GitHub and WakaTime.
- The project started from a v0 scaffold: `components/ui` has 58 components and the screens import 2 of them (`rdr` and `toast`), so most Radix dependencies in `package.json` are unused. The package is still named `my-project`.
- `/api/github` reads only the first 100 repos (`per_page=100`). That is fine with 29 public repos, but stars and top language would be off past 100.
