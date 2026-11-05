import { companyProfile } from "@/constants";
import { getServiceLabel } from "@/features/contact/lib/service-options";
import type { EnquiryValues } from "@/features/contact/types";
import { createMailTransport, getMailConfig } from "@/lib/mailer";

export type SendEnquiryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "delivery-failed" };

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Removes line breaks so user input can never inject extra email headers. */
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Emails a validated enquiry to the business. Resolves `{ ok: true }` only
 * after the SMTP server has accepted the message.
 */
export async function sendEnquiryEmail(values: EnquiryValues): Promise<SendEnquiryResult> {
  const config = getMailConfig(companyProfile.emails.primary);
  if (!config) return { ok: false, reason: "not-configured" };

  const service = getServiceLabel(values.service);
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Mobile", values.phone],
    ["Company", values.company || "—"],
    ["Service", service],
  ];

  const text = [
    "New enquiry from the DMV Tech Services website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    values.message,
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;color:#14243B;line-height:1.5">
<h2 style="margin:0 0 12px">New enquiry from the DMV Tech Services website</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>
<p style="margin:16px 0 4px;font-weight:bold">Message</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(values.message)}</p>
</div>`;

  try {
    const transport = createMailTransport(config);
    await transport.sendMail({
      from: config.from,
      to: config.to,
      cc: config.cc,
      replyTo: { name: singleLine(values.name), address: values.email },
      subject: singleLine(`New website enquiry — ${service} — ${values.name}`),
      text,
      html,
    });
    return { ok: true };
  } catch (error) {
    // Logged on the server only; the visitor sees a generic message.
    console.error("[enquiry] email delivery failed:", error instanceof Error ? error.message : error);
    return { ok: false, reason: "delivery-failed" };
  }
}
