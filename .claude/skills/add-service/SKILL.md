---
name: add-service
description: Add a new API service module wired to the shared axios instance, with typed request/response and no logic leaking into components. Use when introducing a new backend domain.
---

# Add an API service

Create a new service module under `src/services/<domain>.service.ts` following
`.claude/rules/architecture.md`.

- Import the shared axios instance from `@/lib/axios` — do NOT create a new one.
- Each function takes typed params and returns a typed `Promise<...Response>`.
- Keep endpoint paths in one place (top of the file or `@/lib/constants`).
- No React, no hooks, no side effects beyond the HTTP call — services are pure
  data access. Hooks in `hooks/queries` and `hooks/mutations` consume them.
- Define request/response types in `src/types/` and validate with zod schemas
  from `src/schemas/` where the payload crosses a trust boundary.
