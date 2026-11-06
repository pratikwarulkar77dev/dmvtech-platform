import { NextResponse } from "next/server";
import { getMissingMailSettings } from "@/lib/mailer";

// Nodemailer needs the Node.js runtime (not Edge). Evaluated per request so it reflects the live server environment.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let logged = false;

/** Tells the enquiry form whether email delivery is available. The browser only ever receives a boolean. */
export function GET() {
  const missing = getMissingMailSettings();
  if (missing.length > 0 && !logged) {
    // Server log only, once per process, names never values. This is the first place to look if the email button is disabled.
    logged = true;
    console.error(`[enquiry] Email is disabled: missing or invalid SMTP settings: ${missing.join(", ")}. See SMTP_SETUP.md.`);
  }
  return NextResponse.json({ available: missing.length === 0 }, { headers: { "Cache-Control": "no-store" } });
}
