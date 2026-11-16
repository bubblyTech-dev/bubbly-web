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
- Auth: `providers/AuthProvider.tsx` (access token in memory only, refresh via the API's httpOnly cookie) and `components/auth/RoleGate.tsx` around each area layout (Principal `(workspace)`, Teacher `teacher/`, Parent `parent/` = Student login). The server re-checks every permission.
- API: axios instance in `lib/api/client.ts` (interceptors add the Bearer token, refresh it once on a 401, and turn every failure into `ApiError`; 401/402/password-change states are broadcast through `lib/api/events.ts`). Services call `api.get/post/...` only; pass `{ skipAuth: true }` for public auth calls.
- Data and actions: load with `hooks/useApiData.ts`; run every user action (save, delete, mark) through `hooks/useAsyncAction.ts` `run()`, which blocks double submits, shows the snackbar and puts 422 errors on fields. Never leave an `await` outside a try/catch or `run()`.
- Messages: `useSnackbar()` from `providers/SnackbarProvider.tsx` (`success`, `error`, `warning`, `info`, `fromError`); no page-level toasts. School endpoints in `services/school.ts`, types in `types/school.ts`. Demo logins: `npm run seed:demo` in `../bubbly-backend`.
