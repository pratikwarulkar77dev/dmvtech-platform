"use server";

import { headers } from "next/headers";
import { RATE_LIMIT, companyProfile } from "@/constants";
import { cleanEnquiry, validateEnquiry } from "@/features/contact/lib/validation";
import type { EnquiryActionState, EnquiryValues } from "@/features/contact/types";
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

const FAILURE_CONTACT = `Please call ${companyProfile.phone.display} or message us on WhatsApp instead.`;

export async function submitEnquiry(
  _previous: EnquiryActionState,
  formData: FormData
): Promise<EnquiryActionState> {
  const values: EnquiryValues = cleanEnquiry({
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    company: field(formData, "company"),
    service: field(formData, "service"),
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
    };
  }

  const fieldErrors = validateEnquiry(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const result = await sendEnquiryEmail(values);
  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? `Our enquiry form is not available right now, and your message has not been sent. ${FAILURE_CONTACT}`
          : `We could not send your message, so it has not been delivered. Please try again shortly. ${FAILURE_CONTACT}`,
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you. Your enquiry has been sent and our team will get back to you soon.",
  };
}

