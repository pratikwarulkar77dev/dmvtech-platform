# SMTP setup — email enquiries

You (the website owner) must supply real SMTP credentials. Nothing in this project contains working credentials, and the website never claims an email was sent unless the mail server accepted it.

## How the email button decides
The enquiry forms (homepage and Contact page) ask the server `/api/enquiry/email-status` whether email is configured. It answers yes only when `SMTP_HOST`, `SMTP_USER` and `SMTP_PASS` are non-blank (and `SMTP_PORT`, if set, is a number). If not, **Send Enquiry via Email** is disabled, with the message "Email enquiries are temporarily unavailable. Please contact us through WhatsApp or call +91 83789 55975." WhatsApp keeps working. No enquiry is ever silently discarded or faked.

The server log (never the browser) states exactly which variable names are missing: `[enquiry] Email is disabled: missing or invalid SMTP settings: SMTP_HOST, SMTP_PASS`.

## 1. Gmail SMTP
1. Use a Gmail or Google Workspace account that will send the mail.
2. Turn on 2-Step Verification: Google Account, Security.
3. Create an App Password (section 2). Your normal Google password does not work.
4. Settings:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USER=your-address@gmail.com
SMTP_PASS=abcdefghijklmnop
SMTP_FROM=your-address@gmail.com
```
Gmail rewrites the sender to the authenticated account, so keep `SMTP_FROM` equal to `SMTP_USER`.

## 2. Google App Password
Google Account, Security, 2-Step Verification, App passwords (search "App passwords" if hidden). Name it "DMV Tech website", click Create, and copy the 16 characters. Paste them without spaces. If App passwords is missing, 2-Step Verification is off or the account is managed by an admin who disabled it.

## 3. Domain email (Hostinger or another provider)
Create the mailbox (for example `info@your-domain`) in the provider's panel and use the host and port from its "Email, Configuration" page. Hostinger usually:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@your-domain
SMTP_PASS=the-mailbox-password
SMTP_FROM=info@your-domain
```
Port 587 with `SMTP_SECURE=false` and `SMTP_REQUIRE_TLS=true` also works with most providers. `SMTP_FROM` should be the mailbox or an address your provider allows.

## 4. Development (Windows CMD)
```cmd
cd C:\path\to\dmvtech-platform
copy .env.example .env.local
notepad .env.local
```
No quotes, no spaces around `=`. Save as UTF-8. Never commit `.env.local`. **Restart** `npm run dev` after every change: environment files are read only at start-up.

## 5. Production hosting
Set the same variables in the host and restart/redeploy; `.env.local` is not uploaded.
- Vercel: Project, Settings, Environment Variables (Production), then Redeploy. Server actions and route handlers run on the Node.js runtime, which Nodemailer needs.
- Node server / VPS / Hostinger Node hosting: set them in the process environment or the panel, then restart. If you start with `node .next/standalone/server.js`, `.env.local` is **not** read; use real environment variables.
- Docker: `docker run --env-file .env.production ...` or `environment:` in compose.
- Static-only hosting (plain shared hosting that only serves HTML, or `next export`) cannot run the email feature. Use Node hosting (VPS, Vercel and similar). WhatsApp still works on any hosting.
- The spam rate limit is held in memory per server instance. It is effective on one Node process; on many serverless instances it limits per instance only.

## 6. Verify the SMTP connection
```cmd
node --env-file=.env.local scripts/check-smtp.mjs
```
Prints `OK: connected ... and logged in` or the failure. Add `--send` to email a test message to `CONTACT_TO_EMAIL`. Needs Node 20.6 or newer. Certificate checking is never disabled.

## 7. Test a real enquiry
1. Restart the server. Open the homepage, scroll to "Tell Us What You Need".
2. **Send Enquiry via Email** must be enabled. Fill name, email and message, and submit.
3. A spinner shows. "Enquiry emailed" appears only after the mail server accepts the message.
4. Check the inbox of `CONTACT_TO_EMAIL` (and spam). Repeat once from `/contact`.

## 8. Troubleshooting
| Symptom | Cause and fix |
|---|---|
| Email button disabled | The server cannot see `SMTP_HOST`, `SMTP_USER` or `SMTP_PASS`. Read the server log line to see which; check the file is named `.env.local`, sits next to `package.json`, has no blank values, and you restarted. On a host, add the variables there and redeploy. |
| Still disabled after setting them | Server was not restarted; hosting dashboard variables not applied to the Production environment; `.env.local` saved with a BOM or wrong name (`.env.local.txt`). |
| "We could not send your email" | The server log has `code=` and `smtp=`. `EAUTH` / 535: wrong user or password (Gmail needs an app password). `ECONNECTION` / `ETIMEDOUT`: wrong host/port or the host blocks outbound SMTP. `ESOCKET` with TLS errors: use 465 with `SMTP_SECURE=true`, or 587 with `SMTP_SECURE=false`. |
| 553 / 550 sender rejected | `SMTP_FROM` is not allowed for that account; use the mailbox address. |
| Mail goes to spam | Add SPF/DKIM for your domain at the provider; send from a domain mailbox. |
| Works locally, not in production | Variables not set on the host, or the host blocks outbound SMTP ports (many shared hosts block 25; 465/587 are normally open). |

## Security
Credentials are read only on the server and are never sent to the browser, never prefixed `NEXT_PUBLIC_`, and never logged. Customer addresses are redacted from failure logs.
