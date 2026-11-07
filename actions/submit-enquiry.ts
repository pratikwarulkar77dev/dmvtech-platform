"use server";

import { headers } from "next/headers";
import { RATE_LIMIT, companyProfile } from "@/constants";
import { ENQUIRY_MODE_IDS } from "@/features/enquiry/constants/enquiry-options";
import type { EnquiryActionState, EnquiryField, EnquiryFormValues, EnquiryMode } from "@/features/enquiry/types/enquiry";
import { cleanEnquiryValues, validateEnquiry } from "@/features/enquiry/utils/validation";
import { sendEnquiryEmail } from "@/services/enquiry-service";

const MIN_FILL_TIME_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(key: string, now: number): boolean {
  const { limit, windowMs } = RATE_LIMIT.contactForm;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) { hits.set(key, recent); return true; }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return false;
}

const field = (data: FormData, name: string): string => {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
};

export async function submitEnquiry(_previous: EnquiryActionState, formData: FormData): Promise<EnquiryActionState> {
  const rawMode = field(formData, "enquiryType");
  // Reject unknown modes rather than silently interpreting them as general enquiries.
  if (!(ENQUIRY_MODE_IDS as readonly string[]).includes(rawMode)) {
    return { status: "error", message: "Please select a valid enquiry type." };
  }
  const mode = rawMode as EnquiryMode;
  const raw: Partial<Record<EnquiryField, string>> = {};
  for (const key of ["name", "phone", "email", "city", "category", "quantity", "budget", "configuration", "usage", "message", "additional"] as EnquiryField[]) {
    raw[key] = field(formData, key);
  }
  const values: EnquiryFormValues = cleanEnquiryValues(raw);
  const startedRaw = field(formData, "startedAt");
  const startedAt = Number(startedRaw);
  const now = Date.now();
  const age = now - startedAt;
  if (field(formData, "website") || !startedRaw || !Number.isFinite(startedAt) || age < MIN_FILL_TIME_MS || age > MAX_FORM_AGE_MS) {
    return { status: "error", message: "We could not verify this submission. Please wait a moment and try again.", values, mode };
  }
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(ip, now)) {
    return { status: "error", message: "Too many submissions. Please wait and try again.", values, mode };
  }
  const fieldErrors = validateEnquiry(mode, values, "email");
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please correct the highlighted fields and try again.", fieldErrors, values, mode };
  }

  console.log("SMTP CONFIG CHECK:", {
  host: !!process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  user: !!process.env.SMTP_USER,
  pass: !!process.env.SMTP_PASS,
  from: !!process.env.SMTP_FROM,
});

  const result = await sendEnquiryEmail({ mode, values });

  console.log("EMAIL RESULT:", {
  ok: result.ok,
  reason: result.ok ? undefined : result.reason,
});
  if (!result.ok) {
    return result.reason === "not-configured"
      ? { status: "error", emailUnavailable: true, message: `Email enquiries are temporarily unavailable. Please contact us through WhatsApp or call ${companyProfile.phone.display}.`, values, mode }
      : { status: "error", message: `We could not send your email. Please try again or call ${companyProfile.phone.display}.`, values, mode };
  }
  return { status: "success", message: "Thank you. Your enquiry has been accepted by our mail server." };
}
