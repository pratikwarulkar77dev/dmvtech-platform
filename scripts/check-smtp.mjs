// Usage (Windows CMD or any shell):
//   node --env-file=.env.local scripts/check-smtp.mjs          -> verifies the SMTP login only
//   node --env-file=.env.local scripts/check-smtp.mjs --send   -> also sends a test email
// Prints variable NAMES and server responses, never the password.
import nodemailer from "nodemailer";

const env = (name) => (process.env[name] ?? "").trim();
const missing = ["SMTP_HOST", "SMTP_USER"].filter((n) => !env(n));
if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");
if (missing.length) {
  console.error(`Missing or blank: ${missing.join(", ")}\nCheck .env.local (see SMTP_SETUP.md).`);
  process.exit(1);
}
const port = Number(env("SMTP_PORT") || 587);
const secure = env("SMTP_SECURE") ? env("SMTP_SECURE").toLowerCase() === "true" : port === 465;
const requireTLS = env("SMTP_REQUIRE_TLS") ? env("SMTP_REQUIRE_TLS").toLowerCase() === "true" : !secure;
const from = env("SMTP_FROM") || env("SMTP_USER");
const to = env("CONTACT_TO_EMAIL") || "info@dmvtech.in";

const transport = nodemailer.createTransport({
  host: env("SMTP_HOST"), port, secure, requireTLS,
  auth: { user: env("SMTP_USER"), pass: process.env.SMTP_PASS },
  connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
});
try {
  await transport.verify();
  console.log(`OK: connected to ${env("SMTP_HOST")}:${port} (secure=${secure}, requireTLS=${requireTLS}) and logged in.`);
  if (process.argv.includes("--send")) {
    const info = await transport.sendMail({ from, to, subject: "DMV Tech SMTP test", text: "SMTP test from scripts/check-smtp.mjs" });
    console.log(`Test email accepted for ${to}: ${info.messageId}`);
  }
} catch (error) {
  console.error(`FAILED: ${error.code ?? ""} ${error.message}`);
  process.exit(2);
}
