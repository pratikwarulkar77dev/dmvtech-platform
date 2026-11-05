# Changelog

## Module 8 — Refinement, company information and essential pages

### Added
- Pages: `/services`, `/services/[slug]` (8), `/industries`, `/industries/[slug]` (6), `/about`, `/contact`, `/resources`, `/privacy-policy`, `/terms-and-conditions`, branded 404, `sitemap.xml`, `robots.txt`.
- Contact: enquiry form (name, email, mobile, optional company, service, message) with shared client/server validation, honeypot + minimum-fill-time + rate limit, accessible labels/errors, and real SMTP delivery via nodemailer. Success is shown only after the mail server accepts the message.
- Direct Call / WhatsApp / Email actions; two office cards with consent-gated lazy Google Maps embeds, "Open in Google Maps" and "Get Directions" links (address-based, unverified pins, no API key).
- Central `companyProfile` (GSTIN, two offices, phone, WhatsApp, emails) feeding all components.
- Official logo via `next/image`.
- SEO: unique title/description, canonical URL and Open Graph/Twitter metadata per page; LocalBusiness JSON-LD (verified details only); sitemap; robots.
- Footer rebuilt: logo, description, Services/Industries/Company links, both addresses, phone, WhatsApp, both emails, GSTIN, year, Privacy and Terms links.
- Docs: `INTEGRATION.md`, `DEPENDENCIES.md`, `ROUTE_STATUS.md`, `ENV_SETUP.md`, `.env.example`.

### Changed
- Homepage spacing standardised (80px desktop / 48px mobile sections; hero→services gap ~210px → ~86px).
- `app/layout.tsx`: single `<main>` landmark; favicon uses the logo.
- Navigation/footer: removed links to unbuilt pages; `/terms` → `/terms-and-conditions`.
- Offices: Talegaon Dabhade replaced by Akurdi, Pimpri-Chinchwad; primary email `info@dmvtech.in`.
- `FaqSection`, homepage cards etc. now exported/reused by inner pages.

### Dependencies
- Added `nodemailer@^10.3.1`, `@types/nodemailer@^8.0.2`. Nothing else changed.

## Module 7 — Complete Premium Homepage

### Added
- `features/home/` — Services, Why Choose DMV Tech, Industries, Working Process, Technology Solutions, Client Testimonials (see below), FAQ and Consultation CTA sections, plus `SectionHeading` and `Reveal` (scroll-in animation; content stays visible with no JavaScript or with reduced motion).
- `features/footer/` — site-wide footer (contact, Services/Company/Legal navigation, social links).
- Content is kept in `features/home/data/*` and `features/footer/data/*`; presentation components contain no copy.
- Services, industries, FAQ answers and statistics are derived from the shared `servicesConfig`, `industriesConfig` and `companyInfo`, so homepage, navbar and footer cannot drift apart.
- FAQ structured data (JSON-LD `FAQPage`).
- `ROUTE_STATUS.md`, `INTEGRATION.md`.

### Changed
- `app/page.tsx` — renders Hero followed by the new sections.
- `app/layout.tsx` — mounts `<SiteFooter />` after the page content.
- `features/navigation/index.ts` — additionally exports `NavLogo` and `NAV_ICONS` (reused by footer and Industries section; no behaviour change).

### Content integrity
- No client testimonials exist, so the Testimonials section shows "Our commitments" instead. Add approved quotes to `features/home/data/testimonials.ts` and the section switches automatically.
- Only facts already in the shared config are stated (founded 2019, offices in Lonavla and Talegaon Dabhade, the listed services/industries). No certifications, staff credentials, client names or achievements were added.
- Placeholder phone, business hours and empty social URLs are not rendered.

### Unchanged
Navbar, Hero, ThemeProvider, TooltipProvider, all `components/ui`, `package.json`, `package-lock.json`, Light/Dark/System behaviour, links to routes that do not exist yet.

## Module 6 — Light-themed Hero
## Module 5 — Premium Navigation System
## Module 4 — Design System
