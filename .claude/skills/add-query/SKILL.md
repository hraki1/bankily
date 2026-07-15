---
name: add-query
description: Scaffold a TanStack Query read hook for a GET endpoint, wired through a service method and typed request/response. Use when adding data fetching for a new read endpoint.
---

# Add a query (read) flow

Create the full read path for one endpoint, following `.claude/rules/architecture.md`.

Given an endpoint name and path, produce:

1. **Types** in `src/types/` — a `<Name>Response` (and `<Name>Params` if needed).
2. **Service method** in `src/services/<domain>.service.ts` — calls the shared
   `lib/axios` instance, returns the typed response. This is the only layer that
   touches axios.
3. **Query hook** in `src/hooks/queries/use<Name>.ts` — wraps the service method
   in `useQuery`, with a stable query key and typed return.
4. (Optional) a **zod schema** in `src/schemas/` to validate the response.

Rules:
- Components never call the service or axios directly — only the hook.
- Import via `@/...` alias.
- If `axios`/`@tanstack/react-query`/`zod` are not installed, stop and tell the
  user — do not add dependencies without being asked.
