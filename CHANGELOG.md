# Changelog

## Module 10.1 — Enquiry Fixes (maintenance)

### Root causes
1. **Email button disabled.** Reading the code: the button is disabled only when the server's `/api/enquiry/email-status` answers `available: false`, which happens only when `SMTP_HOST`, `SMTP_USER` or `SMTP_PASS` is missing or blank (or `SMTP_PORT` is not a number) in the **running server's environment**. There is no code defect in that check: with valid settings the button was enabled and sent real mail in my tests. So on your machine the SMTP variables are not reaching the server: `.env.local` missing/misnamed/blank, or the dev server was not restarted after editing it, or (in production) the variables were not set on the host. I cannot see your environment, so I cannot confirm which; the server log now names the missing variables (names only), and `SMTP_SETUP.md` has the fix steps. Real SMTP credentials must come from you.
2. **Developer note shown publicly.** Already removed in the previous refinement; verified again that no such text reaches the browser.
3. **Duplicate submissions.** Only the pending state guarded double clicks; a very fast double click could slip through. Added a submit lock.

### Changed
- `app/api/enquiry/email-status/route.ts`: Node.js runtime declared; logs the missing variable names once per process (server only).
- `lib/mailer.ts`: TLS 1.2 minimum; certificate verification remains on (default); timeouts unchanged (10s connect, 10s greeting, 20s socket).
- `services/enquiry-service.ts`: failure log now has only the SMTP code, response code and a redacted reason; customer email addresses are never logged.
- `actions/submit-enquiry.ts` and the form note: wording is now "Email enquiries are temporarily unavailable. Please contact us through WhatsApp or call +91 83789 55975."
- `unified-enquiry-form.tsx`: duplicate-submit lock; the email field label says "(required to send by email)" instead of a separate hint, removing an extra line of whitespace in the grid.
- `enquiry-fields.tsx`: `optionalText` option for labels.
- `.env.example`: complete, with Gmail and Hostinger presets in comments (the real variables stay blank so a placeholder cannot switch the button on by mistake).
- `SMTP_SETUP.md`: rewritten (Gmail, app password, domain SMTP, development, production, verification, real test, troubleshooting).

### Unchanged on purpose
Form design and the three modes, WhatsApp behaviour and message, navbar and logo ("IT Solutions & Support" subtitle kept), About page, offices, all other modules. No dependencies added or changed.
## Module 10 Refinement — Unified Quote Form, Friendly SMTP Errors, Navbar Branding

### Added
- **One unified enquiry form** (`features/enquiry/components/unified-enquiry-form.tsx`) used on the homepage ("Tell Us What You Need") and on `/contact` ("Request a Quote"). The customer fills it in once and chooses **Send Enquiry via WhatsApp** or **Send Enquiry via Email**; both use the same values and the same validation rules (`features/enquiry/utils/validation.ts`).
- Fields: full name*, mobile, email, city, service category, enquiry type (I Know My Configuration / Recommend a Solution / General Enquiry), quantity and budget (hidden for General), requirements/message*. Email is required only for the email option.
- `app/api/enquiry/email-status/route.ts`: returns only `{available: boolean}` so the form can disable just the email button when SMTP is not configured (the pages themselves stay static).
- Navbar: logo (56px on desktop) + "DMV **Tech Services**" + "IT Solutions & Support" tagline (shown from 1200px), the whole area is one link to the homepage.

### Changed
- `actions/submit-enquiry.ts`, `services/enquiry-service.ts`, `lib/mailer.ts` are reused (no duplicate email service) and now accept the unified schema (city, category, enquiry type, quantity, budget).
- **The developer note is gone.** Visitors see: "Email enquiries are temporarily unavailable. You can still contact our team through WhatsApp or call +91 83789 55975." Diagnostics (missing variable names, SMTP error text) are only in the server log.
- WhatsApp message builder (`utils/whatsapp-message.ts`) now includes email and uses the single message field.
- Homepage "Get a Free Consultation" now goes to the on-page enquiry section (`/#enquiry`).
- `features/contact/components/contact-form.tsx` is now a thin wrapper that pre-fills the unified form from `?intent=` and `?service=`.

### Removed
- `features/enquiry/components/{configuration-form,recommendation-form,general-enquiry-form}.tsx` (replaced by the unified form).
- `features/contact/lib/validation.ts`, `features/contact/lib/service-options.ts`, `features/contact/types/index.ts` (replaced by the shared enquiry schema).

### Dependencies
None added or changed.

## Module 10 — About Us, Founder Profile & Smart WhatsApp Enquiry

### Added
- **About page** rebuilt: hero, Our Story (2019 timeline), Meet Our Founder, Mission & Vision, Expertise, Team (~15 professionals by department), Who We Serve, Locations, Contact + WhatsApp CTA.
- **Founder profile** (`features/about/components/{founder-profile,founder-message,leadership-section}.tsx`, `constants/founder.ts`, `types/founder.ts`) using the photo you supplied (`public/images/team/mohinish-varulkar.jpg`). No invented qualifications, experience, awards or quotations. LinkedIn button appears only if `linkedinUrl` is filled in. The suggested message is shown as an unattributed "service commitment" until `message.approved` is set to `true`.
- **Smart WhatsApp enquiry** (`features/enquiry/`): homepage section "Tell Us What You Need" with three modes (I Know My Configuration, Recommend a Solution, General Enquiry), progressive disclosure, validation, input limits, message preview, and `https://wa.me/918378955975?text=…` via `encodeURIComponent`. Opens only on click; never shows "submitted"; tells the customer to press Send in WhatsApp. Nothing is stored; no paid API.
- WhatsApp entry points: homepage section, contact page (prefilled), services index, every service detail page (prefilled with the service), final consultation CTA, and a floating button.
- `scripts/check-smtp.mjs` and `SMTP_SETUP.md`.

### Changed
- `lib/mailer.ts`: blank environment values are treated as unset (a blank `SMTP_PORT=` previously disabled the form); new `getMissingMailSettings()`.
- `services/enquiry-service.ts`: logs the names (never values) of missing SMTP settings.
- `actions/submit-enquiry.ts`: development-only hint in the error message; production text unchanged.
- `PageCta` secondary action supports `external` links; `utils/structured-data.ts` adds founder name (from existing data) to JSON-LD.

### Not changed
- Offices: the verified Lonavla and Akurdi (Pimpri-Chinchwad) addresses are kept. Talegaon Dabhade is not published until you confirm.
- No dependencies added or changed.

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
