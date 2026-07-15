---
name: add-mutation
description: Scaffold a TanStack Query mutation hook for a POST/PUT/DELETE endpoint, with a zod-validated request schema, a service method, and typed response. Use when adding a write action (e.g. login, verify OTP).
---

# Add a mutation (write) flow

Create the full write path for one endpoint, following `.claude/rules/architecture.md`.

Given an endpoint name and path, produce:

1. **Request schema** in `src/schemas/` — a zod schema for the input; infer the
   `<Name>Request` type from it.
2. **Response type** in `src/types/` — `<Name>Response`.
3. **Service method** in `src/services/<domain>.service.ts` — calls the shared
   `lib/axios` instance, returns the typed response.
4. **Mutation hook** in `src/hooks/mutations/use<Name>Mutation.ts` — wraps the
   service method in `useMutation`; invalidate related query keys on success.

Auth specifics (login / verify-OTP):
- Handle token/session via the patterns in `src/services/auth.service.ts` and
  `src/lib/env.ts`. Never scatter `process.env`.
- Validate user input with the zod schema before sending.

Rules:
- Components trigger the hook, never the service/axios directly.
- Import via `@/...` alias.
- If required deps are not installed, stop and tell the user.
