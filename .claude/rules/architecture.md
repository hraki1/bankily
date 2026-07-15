# Architecture & Folder Conventions

The app lives under `src/` and uses the `@/*` path alias (maps to `src/*`).

```
src/
  app/          Next.js App Router (routes, layouts, pages)
    login/          phone/identifier entry
      otp/          OTP verification (Telegram code)
  assets/       static icons, images, fonts imported by code
  components/
    ui/             generic, reusable, presentational
    auth/           login/OTP-specific components
    common/         shared app-wide components (headers, layout bits)
  hooks/
    queries/        TanStack Query read hooks (useX)
    mutations/      TanStack Query write hooks (useXMutation)
  services/       API modules; the ONLY place that calls the axios instance
  lib/            axios instance, utils, constants, env access
  providers/      React context providers (e.g. QueryProvider)
  types/          shared TypeScript types (api.ts, auth.ts, index barrel)
  schemas/        zod validation schemas
  config/         app configuration
  styles/         global/shared styles
```

## Layering rules (one direction only)

`components / app`  →  `hooks`  →  `services`  →  `lib/axios`

- Components and pages **never** call axios or `fetch` directly — they use hooks.
- Hooks (`queries`/`mutations`) call **service** methods, never the network directly.
- Services are the only layer that touches `lib/axios`. They return typed data.
- Validate external input/output with **zod** schemas from `src/schemas/`.
- Import via `@/...`, never long relative paths (`../../../lib/...`).
- Read env only through `src/lib/env.ts`; never `process.env` scattered in code.

## Naming

- Query hooks: `useCard`, `useProfile` in `hooks/queries/`.
- Mutation hooks: `useLoginMutation`, `useVerifyOtpMutation` in `hooks/mutations/`.
- Services: `auth.service.ts`, `<domain>.service.ts`.
- Types: PascalCase; request/response types suffixed `Request` / `Response`.

## Not yet installed

`axios`, `@tanstack/react-query`, and `zod` are the intended stack but are **not
installed yet**. Do not add dependencies without being asked.
