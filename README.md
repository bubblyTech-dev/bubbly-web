# Bubbly Web

Public website, subscription journey and school workspace for **Bubbly** (multi-tenant preschool SaaS).
Stack: Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4 + SCSS. API: `bubbly-backend`.

## Getting started

```bash
nvm use            # Node 24 (>= 20.9 required)
cp .env.example .env.local
npm install
npm audit          # must report 0 vulnerabilities
npm run dev        # http://localhost:3001
```

Quality gate: `npm run check` (typecheck + lint + prettier) and `npm run build`.

## Structure

```
src/
  app/                 Routes only (App Router). Route groups: (marketing) (auth) (workspace)
  components/
    ui/                Design-system primitives (Button, Card, Input, Badge)
    layout/            Header, Footer, Sidebar, Container
    common/            Shared pieces (Logo, ...)
  features/            Feature modules (auth, subscription, attendance, ...) - own components/hooks/types
  services/            API service functions (one file per backend resource)
  lib/                 cn(), API client
  hooks/ providers/    React hooks and context providers
  config/              site, env, paths (all URLs), navigation
  constants/ types/    Shared constants and types
  styles/
    tailwind.css       Tailwind entry
    tokens.css         Design tokens (@theme) = single source of truth
    main.scss          SCSS entry (emits into Tailwind cascade layers)
    abstracts/         SCSS functions, mixins, breakpoints (no CSS output)
    themes/            Light / dark runtime variables (--bb-*)
    base/              Global, typography, accessibility
    components/        BEM component styles (.btn, .card, .input, .badge)
    layouts/           Header, footer, container, workspace shell, auth shell
    pages/             Page-specific styles
    vendors/ utilities/
```

## Styling rules

1. Colors, fonts, radii, shadows are defined **once** in `styles/tokens.css`. Change the Figma theme there.
2. Theme-aware roles (`background`, `surface`, `foreground`, `primary`, ...) are set in `styles/themes/`.
   Dark mode: set `data-theme="dark"` on `<html>`.
3. Use Tailwind utilities for layout/spacing; use SCSS (BEM) for reusable components.
   In SCSS use `sem('surface')`, `palette('brand-500')`, `radius('lg')`, `@include up('md')`.
4. SCSS is emitted into the `base` / `components` layers, so Tailwind utilities always win.
5. Never hard-code URLs: use `config/paths.ts`.
