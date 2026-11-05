# Module 8 — Integration

Base: the Module 7 codebase (commit "feat(home): add Module 7 complete homepage and footer", on top of Module 5 `main` + Module 6).

## Steps
1. Extract `dmvtech-module8.zip` over the repository root, overwriting existing files.
2. **Delete** these now-empty placeholder files if present: `actions/.gitkeep`, `public/.gitkeep`, `services/.gitkeep`.
3. Install dependencies (package.json/lock changed):
   ```bash
   npm ci
   ```
4. Create environment settings — see `ENV_SETUP.md` (`cp .env.example .env.local`, then fill in SMTP values). The site runs without them; the contact form then reports that it is unavailable.
5. `npm run dev` and open http://localhost:3000.

## What changed
- **Company data** is centralised in `constants/company.ts` (`companyProfile`). `constants/contact.ts`, the footer, contact/about pages, maps links, JSON-LD and the enquiry email all derive from it. Types in `types/company.ts`.
- **Logo:** `public/images/dmv-tech-logo.jpg` (your supplied file, unmodified, 150×150) rendered by `features/navigation/components/nav-logo.tsx` with `next/image`, square box, linked to `/`.
- **Pages:** `app/{services,industries,about,contact,resources,privacy-policy,terms-and-conditions}`, `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`.
- **Features:** `features/{page,services,industries,about,contact,resources,legal}`; server action `actions/submit-enquiry.ts`; `services/enquiry-service.ts`; `lib/mailer.ts`.
- **Layout:** `app/layout.tsx` now wraps page content in a single `<main id="main-content">` (pages no longer render their own `<main>`), so every page has exactly one main landmark.
- **Spacing:** homepage sections use 80px (desktop) / 48px (mobile) vertical padding; hero→services visual gap reduced from ~210px to ~86px. The shared `Section` component itself is unchanged.
- **Navigation:** Resources and About menus and the footer no longer link to unbuilt pages (see `ROUTE_STATUS.md`).

## Copy that needs the owner's review before launch
- `features/services/data/service-details.ts` and `features/industries/data/industry-details.ts`: drafted from the existing summaries; check for accuracy.
- `features/legal/data/documents.ts`: privacy policy and terms are general drafts based on how the site works today. They are not legal advice — have them reviewed.
- About page shows the founder name and founding year from the existing `constants/company.ts`.
- Your new offices (Lonavla and Akurdi, Pimpri-Chinchwad) replace the earlier "Talegaon Dabhade" office everywhere.
