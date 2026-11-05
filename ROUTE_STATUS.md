# Route Status — after Module 8

Method: every internal link on every page was collected in a real browser from the production build and requested over HTTP (crawl of 22 unique paths), plus the unknown-slug and legacy-URL cases below.

## Implemented (all HTTP 200)
`/`, `/services`, `/services/{network-design-implementation, amc-managed-support, cctv-surveillance, biometric-access-control, website-design-development, it-consulting, custom-web-business-applications, cloud-migration-architecture}`, `/industries`, `/industries/{manufacturing, education, banking-cooperative-societies, healthcare, retail, professional-services}`, `/about`, `/contact` (also `?intent=consultation|quote|enquiry` and `?service=<slug>`), `/resources`, `/privacy-policy`, `/terms-and-conditions`, `/sitemap.xml`, `/robots.txt`.

Dynamic routes use `generateStaticParams` + `dynamicParams = false` from `servicesConfig` / `industriesConfig`.

## Genuine 404s (correct)
`/services/<unknown>`, `/industries/<unknown>` and any other undefined URL show the branded 404 page.

## Changed from Module 7 (links removed so nothing points at a missing page)
| Was | Now |
|---|---|
| `/terms` | `/terms-and-conditions` (`ROUTES.terms`). The old `/terms` URL now 404s — add a redirect if it was ever published. |
| Resources menu: Insights (`/blog`), Case Studies, Projects | Resources Overview (`/resources`) and FAQs (`/resources#faq`) |
| About menu / footer: Careers | removed |
| Footer: Insights | removed; footer now has Services, Industries, Company (About, Contact, Resources) and legal links |

## Not built (no links point to them)
`/blog`, `/case-studies`, `/projects`, `/careers`, `/admin/*`. They remain in `ROUTES` for later modules but are not linked or in the sitemap.

## Notes / items to confirm
1. **Coming-soon services** (Custom Web & Business Applications, Cloud Migration & Architecture) have pages that state they are not yet available and offer an enquiry. They stay disabled in the navbar and are non-links on homepage cards.
2. **Contact `intent`** is read in the form: `quote` and `consultation` change the form heading; `?service=` pre-selects the service.
3. **Map pins are address-based and unverified** (no coordinates or Place IDs were supplied). The UI says so. Replace the query with a verified Google Maps link when you have one.
4. **Social links** are still empty in `constants/social.ts`, so none are shown.
5. **Business hours** were not supplied, so none are published.
