# Next.js rules (READ THIS FIRST)

This project pins **Next.js 16** and React 19. The version here has breaking
changes vs. older Next.js — APIs, conventions, and file layout may differ from
training data.

**Before writing any Next.js code**, read the relevant guide under
`node_modules/next/dist/docs/`. Heed deprecation notices. Do not assume an API
exists because it did in an older version.

- App Router only (`src/app/`). No `pages/` directory.
- Server Components by default; add `'use client'` only where interactivity or
  hooks require it (forms, OTP inputs, providers).
- The UI is **Arabic / RTL** (BMCI "مصرفي / Masrvi"). Keep `dir="rtl"` and
  `lang="ar"` on the root `<html>`, and design components RTL-first.
- Styling is **Tailwind CSS v4** via `@tailwindcss/postcss`.
