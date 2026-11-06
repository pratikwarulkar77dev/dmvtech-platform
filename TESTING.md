# Testing — Module 10.1

## Executed in the build environment
| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed |
| `npx eslint .` | Passed |
| `npm run build` (Google Fonts mocked: the sandbox cannot reach them) | Passed |
| Browser run (Playwright/Chromium), 73 checks against three production servers: no SMTP; a local test SMTP server; one rejecting the login | 73 passed, 0 failed |
| axe WCAG A/AA on `/` and `/contact`, light and dark | No violations |

Covered: homepage heading; navbar at 375/768/1024/1280/1440px (logo 56px on desktop, name shown, no overlap, CTA and theme toggle kept); all three enquiry modes and their fields; WhatsApp URL to `918378955975` with encoded special characters and newlines; no false success after WhatsApp opens; email button disabled with the friendly message and no developer text when SMTP is missing; enabled when configured; email sent from the **homepage** and from the **Contact page** with the form data; success shown only after SMTP accepts; double click sends exactly one email; rejected login shows an honest failure message with no technical text; server log has only code, SMTP response code and a redacted reason; a tampered request containing a line break and `Bcc:` in the name was rejected and sent nothing; consultation CTA to `/#enquiry`; no horizontal scroll at 375px on `/`, `/contact`, `/about`, `/services`.

## Not executed
- A real Gmail/Hostinger account (no credentials available here). Run `scripts/check-smtp.mjs` and the real-enquiry steps in `SMTP_SETUP.md`.
- Real WhatsApp delivery (the wa.me request was intercepted).
- Your hosting environment; real phones; Safari and Firefox.
- A full re-run of every Module 1–9 page; see `REGRESSION_CHECKLIST.md`.
- The latest screenshot you mentioned was not attached to the message, so UI spacing was checked against my own screenshots.
