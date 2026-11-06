"use server";

import { headers } from "next/headers";
import { RATE_LIMIT, companyProfile } from "@/constants";
import { ENQUIRY_MODE_IDS } from "@/features/enquiry/constants/enquiry-options";
import type { EnquiryActionState, EnquiryFormValues, EnquiryMode } from "@/features/enquiry/types/enquiry";
import { cleanEnquiryValues, validateEnquiry } from "@/features/enquiry/utils/validation";
import { sendEnquiryEmail } from "@/services/enquiry-service";

/** Forms submitted faster than this after first render are treated as automated. */
const MIN_FILL_TIME_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * Best-effort, per-instance limiter. It slows down casual abuse; on serverless
 * or multi-instance hosting each instance keeps its own counters, so use an
 * edge/WAF limit for strong protection.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string, now: number): boolean {
  const { limit, windowMs } = RATE_LIMIT.contactForm;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
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

const ALTERNATIVES = `You can still contact our team through WhatsApp or call ${companyProfile.phone.display}.`;

export async function submitEnquiry(
  _previous: EnquiryActionState,
  formData: FormData
): Promise<EnquiryActionState> {
  const rawMode = field(formData, "enquiryType");
  const mode: EnquiryMode = (ENQUIRY_MODE_IDS as readonly string[]).includes(rawMode)
    ? (rawMode as EnquiryMode)
    : "general";
  const values: EnquiryFormValues = cleanEnquiryValues({
    name: field(formData, "name"),
    phone: field(formData, "phone"),
    email: field(formData, "email"),
    city: field(formData, "city"),
    category: field(formData, "category"),
    quantity: field(formData, "quantity"),
    budget: field(formData, "budget"),
    message: field(formData, "message"),
  });

  // Spam checks: honeypot field (humans never see it) and minimum fill time.
  const startedAt = Number(field(formData, "startedAt"));
  const now = Date.now();
  const age = now - startedAt;
  if (
    field(formData, "website").length > 0 ||
    !Number.isFinite(startedAt) ||
    age < MIN_FILL_TIME_MS ||
    age > MAX_FORM_AGE_MS
  ) {
    return {
      status: "error",
      message: "We could not verify this submission. Please wait a moment and try again.",
      values,
      mode,
    };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip, now)) {
    return {
      status: "error",
      message: "Too many submissions in a short time. Please wait a minute and try again.",
      values,
      mode,
    };
  }

  const fieldErrors = validateEnquiry(values, "email");
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
      values,
      mode,
    };
  }

  const result = await sendEnquiryEmail({ mode, values });
  if (!result.ok) {
    // Diagnostics are logged server-side only (see services/enquiry-service.ts); visitors get a friendly message.
    return result.reason === "not-configured"
      ? {
          status: "error",
          emailUnavailable: true,
          message: `Email enquiries are temporarily unavailable. Please contact us through WhatsApp or call ${companyProfile.phone.display}.`,
          values,
          mode,
        }
      : {
          status: "error",
          message: `We could not send your email, so it has not been delivered. Please try again shortly. ${ALTERNATIVES}`,
          values,
          mode,
        };
  }

  return {
    status: "success",
    message: "Thank you. Your enquiry has been emailed to our team and we will get back to you soon.",
  };
}
