
"use server";

import { headers } from "next/headers";
import { RATE_LIMIT, companyProfile } from "@/constants";
import {
  cleanEnquiry,
  validateEnquiry,
} from "@/features/contact/lib/validation";
import type {
  EnquiryActionState,
  EnquiryValues,
} from "@/features/contact/types";
import {
  createMailTransport,
  getMailConfig,
} from "@/lib/mailer";

const MIN_FILL_TIME_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

const hits = new Map<string, number[]>();

function isRateLimited(key: string, now: number): boolean {
  const { limit, windowMs } = RATE_LIMIT.contactForm;
  const recent = (hits.get(key) ?? []).filter(
    (time) => now - time < windowMs
  );

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5_000) {
    for (const [ip, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) {
        hits.delete(ip);
      }
    }
  }

  return false;
}

function field(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function submitContactEnquiry(
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

  const now = Date.now();
  const startedAtRaw = field(formData, "startedAt");
  const startedAt = Number(startedAtRaw);
  const age = now - startedAt;

  if (
    field(formData, "website").length > 0 ||
    !startedAtRaw ||
    !Number.isFinite(startedAt) ||
    age < MIN_FILL_TIME_MS ||
    age > MAX_FORM_AGE_MS
  ) {
    return {
      status: "error",
      message: "We could not verify your submission. Please try again.",
      values,
    };
  }

  const fieldErrors = validateEnquiry(values);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const requestHeaders = await headers();

  // Best-effort protection only. For production, configure
  // trusted-proxy handling and edge/WAF rate limiting.
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip, now)) {
    return {
      status: "error",
      message: "Too many submissions. Please try again later.",
      values,
    };
  }

  const config = getMailConfig(companyProfile.emails.primary);

  if (!config) {
    return {
      status: "error",
      message:
        "Email enquiries are temporarily unavailable. Please contact us through WhatsApp or phone.",
      values,
    };
  }

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Company", values.company || "Not specified"],
    ["Service", values.service],
  ];

  const text = [
    "New contact enquiry from DMV Tech Services",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    values.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#14243B;line-height:1.5">
      <h2>New contact enquiry from DMV Tech Services</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>
    </div>
  `;

  try {
    const transport = createMailTransport(config);

    await transport.sendMail({
      from: config.from,
      to: config.to,
      cc: config.cc,
      replyTo: {
        name: singleLine(values.name),
        address: values.email,
      },
      subject: singleLine(
        `New contact enquiry - ${values.service} - ${values.name}`
      ),
      text,
      html,
    });

    return {
      status: "success",
      message:
        "Thank you! Your enquiry has been emailed to our team. We will contact you soon.",
    };
  } catch (error) {
    const err = error as {
      code?: string;
      responseCode?: number;
    };

    console.error(
      "[contact-enquiry] Email delivery failed",
      err?.code ?? "unknown",
      err?.responseCode ?? "unknown"
    );

    return {
      status: "error",
      message:
        "We could not send your enquiry. Please try again or contact us through WhatsApp.",
      values,
    };
  }
}
