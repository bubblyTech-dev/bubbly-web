# CLAUDE.md

Bubbly Web: Next.js (App Router, TS strict) + Tailwind v4 + SCSS frontend for the Bubbly preschool SaaS
(public site, auth, subscription journey, school workspace). Backend: `../bubbly-backend` (`NEXT_PUBLIC_API_BASE_URL`).
Super-admin console is a separate repo (`../bubbly-admin`); do not build admin features here.
Scope: `../School_Management_System_Web_SOW_SaaS_Preschool_Draft.pdf`.

## Commands
Node 24 (`.nvmrc`), npm only. `npm run dev` (port 3001), `npm run build`, `npm run check` (typecheck + lint + prettier), `npm run audit:prod`.

## Conventions
- Absolute imports via `@/` (= `src/`). Routes only in `src/app`; logic in `features/`, `services/`, `lib/`.
- Tokens only in `src/styles/tokens.css`; theme roles in `src/styles/themes/`. Do not hard-code colors.
- Tailwind for layout, SCSS BEM for reusable components. SCSS partials use `@use '../abstracts' as *;`.
- All URLs from `config/paths.ts`. API calls via `lib/api/client.ts` inside `services/`.
- Keep dependencies minimal; run `npm audit` after any install.
