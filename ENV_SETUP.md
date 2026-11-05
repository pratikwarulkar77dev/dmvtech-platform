# Environment setup (Module 8)

The only secrets in the project are the SMTP credentials used by the contact form. They are read **on the server only** (`lib/mailer.ts`, called from the `submitEnquiry` server action). Nothing is prefixed `NEXT_PUBLIC_`, so none of it reaches the browser bundle.

## 1. Create the file
```bash
cp .env.example .env.local
```
`.env` and `.env*.local` are already in `.gitignore`.

## 2. Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URLs, Open Graph, sitemap, JSON-LD. Defaults to `https://dmvtech.in`. |
| `SMTP_HOST` | for email | e.g. `smtp.gmail.com`, your hosting provider's SMTP host |
| `SMTP_PORT` | for email | `587` (STARTTLS, default) or `465` (implicit TLS) |
| `SMTP_SECURE` | no | `true` for port 465. Defaults to `true` only when the port is 465. |
| `SMTP_REQUIRE_TLS` | no | Defaults to `true` when `SMTP_SECURE` is not true |
| `SMTP_USER` | for email | SMTP login |
| `SMTP_PASS` | for email | SMTP password / app password |
| `SMTP_FROM` | no | Sender address; defaults to `SMTP_USER`. Use an address your provider allows. |
| `CONTACT_TO_EMAIL` | no | Recipient; defaults to `info@dmvtech.in` |
| `CONTACT_CC_EMAIL` | no | Optional extra recipient |

If `SMTP_HOST`, `SMTP_USER` or `SMTP_PASS` is missing, the form shows "not available… your message has not been sent" with the phone/WhatsApp fallback. It never shows success unless the SMTP server accepted the message.

## 3. Example: Gmail (info.dmvsoft@gmail.com) or Google Workspace
1. Turn on 2-Step Verification for the account.
2. Create an **App password** (Google Account → Security → App passwords).
3. Set:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<the gmail address>
SMTP_PASS=<the 16-character app password>
CONTACT_TO_EMAIL=info@dmvtech.in
```
Other providers (your domain host, Zoho, Brevo, SendGrid SMTP, Amazon SES SMTP) use the same variables with their own host/credentials.

## 4. Hosting
- **Docker / standalone:** pass the variables to the container at runtime (`docker run --env-file ...`); do not bake them into the image.
- **Vercel / similar:** add them under Project → Settings → Environment Variables, then redeploy.

## 5. Check it works
1. `npm run dev`, open `/contact`, wait 3 seconds, submit a valid enquiry.
2. You should see "Enquiry sent" **and** receive the email at `CONTACT_TO_EMAIL`.
3. Stop the server, remove `SMTP_PASS`, restart: the same submission must show the "not available" error. Delivery failures (wrong password, blocked port) are logged on the server as `[enquiry] email delivery failed: …`.

## 6. Spam protection included
Hidden honeypot field, minimum 3-second fill time, 5 submissions per minute per IP (in-memory, per server instance), server-side validation and length limits, HTML-escaped email body, header-injection protection. For stronger protection on public hosting, add a WAF/edge rate limit or a CAPTCHA service later.
