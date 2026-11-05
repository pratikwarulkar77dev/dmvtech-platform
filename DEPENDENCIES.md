# Dependencies — Module 8

## Added (2)
| Package | Version | Type | Why |
|---|---|---|---|
| `nodemailer` | `^10.3.1` | dependency | SMTP delivery of contact-form enquiries (server only) |
| `@types/nodemailer` | `^8.0.2` | devDependency | TypeScript types for the above |

Both versions were checked against the npm registry (latest at build time) and installed; `package-lock.json` is updated and `npm ci --dry-run` succeeds.

```bash
npm install nodemailer@^10.3.1
npm install -D @types/nodemailer@^8.0.2
```
(Or simply extract the ZIP's `package.json` + `package-lock.json` and run `npm ci`.)

## Unchanged
Next.js 15.5.22, React 19.2.8, TypeScript 5.9.3, Tailwind 3.4.19, all Radix packages, lucide-react, and every other version are exactly as before.

## Not added (on purpose)
No form library, validation library, CAPTCHA, map SDK or analytics. Maps use plain keyless Google Maps links/iframes loaded only on user action, so there is no Maps Platform billing.

## Notes
- `nodemailer` is imported only from `lib/mailer.ts` (server-side). It never ships to the browser.
- `npm audit --omit=dev` reports pre-existing findings in `next`/`sharp`; none are in the new packages.
