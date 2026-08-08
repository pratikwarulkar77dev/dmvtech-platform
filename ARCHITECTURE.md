# Architecture

## Folder purpose

| Folder | Purpose | Populated in |
|---|---|---|
| `app/` | Next.js App Router routes, layouts, and route-level metadata only. No business logic. | Module 1 onward |
| `components/` | Reusable, presentational UI components with no feature-specific logic (e.g. Button, Card, Navbar). | Module 4–5 |
| `features/` | Self-contained feature modules (e.g. `features/contact-form/`) bundling a feature's components, hooks, and logic together. | Module 8+ |
| `hooks/` | Cross-cutting React hooks with no feature-specific knowledge (e.g. `useMediaQuery`, `useDebounce`). | Module 2 (this module) |
| `lib/` | Thin wrappers around third-party integrations (Prisma client, Cloudinary, Nodemailer). | Module 17+ |
| `services/` | Data-fetching / business-logic functions consumed by Server Components and Server Actions. | Module 17+ |
| `actions/` | Next.js Server Actions (`"use server"`), one file per form/mutation. | Module 13/19 |
| `providers/` | React context provider composition (theme, auth session, query client). | Module 2 (foundation) → 3, 14 |
| `constants/` | Static configuration: routes, nav, services list, company/contact info, SEO defaults. | Module 2 (this module) |
| `types/` | Shared TypeScript types/interfaces used across more than one folder. | Module 2 (this module) |
| `utils/` | Small, pure, dependency-free helper functions (formatting, slugs, validation). | Module 2 (this module) |
| `prisma/` | Database schema, migrations, seed script. | Module 17 |
| `public/` | Static assets served as-is. | As needed |

## Import rules (enforced by convention, not yet by lint rule)

1. Always import via the absolute `@/` alias — never relative paths across folders (`../../../lib/x`).
2. Dependency direction is one-way: `types` ← `constants` ← `utils` ← everything else. `types` never imports from `constants` or `utils`; `constants` never imports from `utils`, `hooks`, `components`, or `providers`. This is what guarantees no circular dependencies as the app grows.
3. Prefer the folder's barrel (`@/constants`, `@/types`, `@/hooks`, `@/utils`, `@/providers`) for external consumers. Within a folder, files may import siblings directly (e.g. `constants/nav.ts` importing `constants/routes.ts` directly rather than through the barrel) to avoid needless indirection.
4. Server Components are the default for anything in `app/`. A file only gets `"use client"` when it genuinely needs browser APIs, state, or event handlers (see `hooks/*.ts`, all of which are client-only and marked accordingly).
