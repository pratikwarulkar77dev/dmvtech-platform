# Integration — Module 10.1 (Windows CMD)

Applies on top of Module 10 plus the Module 10 refinement. If you have not applied those, apply them first (their deletions listed below).

```cmd
cd C:\path\to\dmvtech-platform
rem extract DMV-Tech-Module-10.1-Enquiry-Fixes.zip over the project folder (allow overwrite)
npm ci
copy .env.example .env.local        & rem only if .env.local does not exist; otherwise edit it
notepad .env.local                  & rem fill SMTP_* (see SMTP_SETUP.md)
node --env-file=.env.local scripts/check-smtp.mjs
npm run dev                         & rem restart after every .env.local change
npm run build
npx tsc --noEmit
```

## Environment variables
`NEXT_PUBLIC_SITE_URL` (public), and server-only `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_REQUIRE_TLS`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO_EMAIL` (default info@dmvtech.in), `CONTACT_CC_EMAIL` (e.g. info.dmvsoft@gmail.com).

## Files changed
`app/api/enquiry/email-status/route.ts`, `lib/mailer.ts`, `services/enquiry-service.ts`, `actions/submit-enquiry.ts`, `features/enquiry/components/unified-enquiry-form.tsx`, `features/enquiry/components/enquiry-fields.tsx`, `.env.example`, `SMTP_SETUP.md`, `CHANGELOG.md`, `INTEGRATION.md`, `DEPENDENCIES.md`, `TESTING.md`, `REGRESSION_CHECKLIST.md`.

## Manual configuration still required
Real SMTP credentials in `.env.local` (development) and in the hosting dashboard (production), then a restart/redeploy. Node.js hosting is required for email (not static-only hosting).

## Regression risks
Low: the form components changed only in label text, a submit lock and wording; the mailer gained a TLS minimum (a provider that only offers TLS 1.0/1.1 would now fail: none of Gmail, Hostinger or common providers do).

---
# Earlier notes (Module 10 refinement)



Apply on top of the Module 10 files (or on main: this ZIP includes everything needed).

```cmd
cd C:\path\to\dmvtech-platform
rem extract dmvtech-module10-refinement.zip over the project folder (allow overwrite)
del features\enquiry\components\configuration-form.tsx
del features\enquiry\components\recommendation-form.tsx
del features\enquiry\components\general-enquiry-form.tsx
del features\contact\lib\validation.ts
del features\contact\lib\service-options.ts
rmdir /s /q features\contact\types
npm ci
npm run dev
npm run build
npx tsc --noEmit
```
(If a `del` says the file is not found, it is already gone: continue.) Then see `SMTP_SETUP.md` to create `.env.local`.

## New files
`app/api/enquiry/email-status/route.ts`, `features/enquiry/components/unified-enquiry-form.tsx`.

## Modified files
`actions/submit-enquiry.ts`, `services/enquiry-service.ts`, `lib/mailer.ts`, `features/enquiry/{types/enquiry.ts,constants/enquiry-options.ts,utils/validation.ts,utils/whatsapp-message.ts,components/enquiry-fields.tsx,components/smart-enquiry-section.tsx}`, `features/contact/components/contact-form.tsx`, `features/navigation/components/nav-logo.tsx`, `features/home/data/cta.ts`, `CHANGELOG.md`, `SMTP_SETUP.md`, `TESTING.md`, `INTEGRATION.md`, `DEPENDENCIES.md`.

## Deleted files
`features/enquiry/components/{configuration-form,recommendation-form,general-enquiry-form}.tsx`, `features/contact/lib/validation.ts`, `features/contact/lib/service-options.ts`, `features/contact/types/index.ts`.

## Notes
- Mobile is now optional on the Contact page (it was required before); email is required only when sending by email.
- Service pages link to `/contact?intent=…&service=<slug>`, which pre-fills the category; they keep their own WhatsApp buttons.
- Offices and all other Module 10 decisions are unchanged (see the Module 10 notes below).

---
# Module 10 notes



Apply on top of your current main (Modules 1–9).

```cmd
cd C:\path\to\dmvtech-platform
git checkout -b module-10
rem extract dmvtech-module10.zip over the project folder (allow overwrite)
npm ci
copy .env.example .env.local
npm run dev
npm run build
npx tsc --noEmit
```
If `.env.local` already exists, do not overwrite it; compare with `.env.example`. See `SMTP_SETUP.md`.

## Added files
`constants/founder.ts`, `types/founder.ts`, `public/images/team/mohinish-varulkar.jpg`, `scripts/check-smtp.mjs`, `features/about/data/about-content.ts`, `features/about/lib/about-icons.ts`, `features/about/components/{founder-profile,founder-message,leadership-section}.tsx`, `features/enquiry/**` (components, constants, types, utils, index), `SMTP_SETUP.md`, `TESTING.md`.

## Modified files
`actions/submit-enquiry.ts`, `app/about/page.tsx`, `app/layout.tsx`, `app/page.tsx`, `constants/index.ts`, `types/index.ts`, `features/about/components/about-page.tsx`, `features/contact/components/contact-actions.tsx`, `features/home/components/consultation-cta.tsx`, `features/home/index.ts`, `features/page/components/page-cta.tsx`, `features/services/components/{service-detail,services-index}.tsx`, `lib/mailer.ts`, `services/enquiry-service.ts`, `utils/structured-data.ts`, `.env.example`, `CHANGELOG.md`, `DEPENDENCIES.md`, `INTEGRATION.md`.

## Items for you to confirm
- The attached photo is Mohinish Varulkar's.
- Founder message: set `message.approved` to `true` in `constants/founder.ts` once he approves it; add `linkedinUrl` if wanted.
- Vision wording in `features/about/data/about-content.ts` is drafted.
- Locations: Lonavla and Akurdi kept; Talegaon Dabhade not published. Tell me the current locations.
- About page audiences follow your list; the industries pages still include healthcare, retail and professional services.


---
# Earlier integration notes (Module 8)

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

