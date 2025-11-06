# Copilot / AI agent instructions — TheCamaraWatch

Purpose: Give concise, actionable guidance so an AI can be immediately productive editing and extending this repo.

Quick dev commands (repo uses pnpm by lockfile; npm/yarn also work):
- Install deps: `pnpm install`
- Dev server: `pnpm dev` (runs Vite)
- Build: `pnpm build` (runs `tsc -b` then `vite build`)
- Preview production build: `pnpm preview`
- Lint: `pnpm lint` (runs `eslint .`)

Big-picture architecture
- Frontend-only React + Vite TypeScript app (no backend in repo).
- Routing: `src/main.tsx` registers pages with `react-router` and `Layout` as the root route.
- Pages: `src/Home.tsx`, `src/Deps.tsx`, `src/Propositions.tsx` (add new pages and register in `main.tsx`).
- UI primitives live in `src/components/ui/*` — these are shadcn-style components that use `cva`, `clsx`, and the `cn` helper from `src/lib/utils.ts`.
- Global styling is Tailwind (see `tailwindcss` in package.json). Theme toggling is done by `src/components/theme-provider.tsx` which writes a `vite-ui-theme` key to localStorage and toggles `light`/`dark` classes on documentElement.

Project-specific conventions and patterns
- Path alias: import modules with `@/...` (see `tsconfig.*` and `vite.config.ts`).
- UI primitives pattern: use `cva` for style variants and export named components (example: `src/components/ui/button.tsx`). Follow the same pattern for new primitives.
- Use `cn(...)` from `src/lib/utils.ts` to merge Tailwind classes. Avoid raw concatenation.
- Pages/components generally default-export React components. Small UI primitives are named exports.
- Network calls: code fetches data from `https://dadosabertos.camara.leg.br/api/v2/...` directly (see `src/Deps.tsx`). There are commented-out local proxy URLs (`http://localhost:8010/proxy/...`) — there is no proxy config in the repo, so treat these as optional local dev conveniences.
- Pagination handling: the API responses include a `links` array; code finds the `rel==='last'` link and parses the `pagina` query param (see `src/Deps.tsx`). Mirror that approach when adding list endpoints.

Where to add code
- New routes: add component file under `src/` and register a `Route` in `src/main.tsx` inside the existing `Layout` route.
- New UI components: add in `src/components/*` or `src/components/ui/*` depending on role. Match naming and export style.

Tooling and safety
- Strict TypeScript: `tsconfig.app.json` enables `strict` and other checks — keep types tight. Use existing `types/` for shared shapes (e.g., `src/types/deputyProps.tsx`).
- Avoid changing global Tailwind tokens directly; prefer adding variant classes in component CVA definitions.

Useful file examples (read before editing):
- `src/Deps.tsx` — demonstrates API fetch patterns, stateful pagination, and dialog/search UX.
- `src/components/ui/button.tsx` — canonical example of CVA + cn usage for primitives.
- `src/components/theme-provider.tsx` — theme storage key and DOM class toggling.

If unsure, search for these tokens: `cn(`, `cva(`, `dadosabertos.camara.leg.br`, `vite-ui-theme`, `@/components/ui/`.

Questions for author/followups
- Is there a recommended package manager (pnpm, npm) you prefer contributors to use? The project contains `pnpm-lock.yaml`.
- Any intended API proxy or backend that should be documented or added as a local dev server?

If you'd like edits to the wording or more details (tests, commit rules, or codegen hooks), tell me which focus and I'll iterate.
