import { companyProfile } from "@/constants";
import { ENQUIRY_MODE_LABEL, MESSAGE_COPY } from "@/features/enquiry/constants/enquiry-options";
import type { EnquiryPayload } from "@/features/enquiry/types/enquiry";
import { createMailTransport, getMailConfig, getMissingMailSettings } from "@/lib/mailer";

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
export async function sendEnquiryEmail({ mode, values }: EnquiryPayload): Promise<SendEnquiryResult> {
  const config = getMailConfig(companyProfile.emails.primary);
  if (!config) {
    // Names only, never values. Visitors never see this. See SMTP_SETUP.md.
    console.error(`[enquiry] SMTP is not configured. Missing or invalid: ${getMissingMailSettings().join(", ")}`);
    return { ok: false, reason: "not-configured" };
  }

  const category = values.category || "Not specified";
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Mobile", values.phone || "—"],
    ["City / location", values.city || "—"],
    ["Enquiry type", ENQUIRY_MODE_LABEL[mode]],
    ["Service category", category],
    ["Quantity", values.quantity || "—"],
    ["Estimated budget", values.budget || "—"],
  ];
  const messageLabel = MESSAGE_COPY[mode].label;

  const text = [
    "New enquiry from the DMV Tech Services website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `${messageLabel}:`,
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
<p style="margin:16px 0 4px;font-weight:bold">${escapeHtml(messageLabel)}</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(values.message)}</p>
</div>`;

  try {
    const transport = createMailTransport(config);
    await transport.sendMail({
      from: config.from,
      to: config.to,
      cc: config.cc,
      replyTo: { name: singleLine(values.name), address: values.email },
      subject: singleLine(`New website enquiry — ${category} — ${values.name}`),
      text,
      html,
    });
    return { ok: true };
  } catch (error) {
    // Logged on the server only; the visitor sees a generic message.
    // Customer email addresses and credentials are never logged.
    const err = error as { code?: string; responseCode?: number; message?: string };
    const reason = (err?.message ?? "unknown error").replace(/[^\s<>"']+@[^\s<>"']+/g, "[address]").slice(0, 200);
    console.error(`[enquiry] email delivery failed: code=${err?.code ?? "n/a"} smtp=${err?.responseCode ?? "n/a"} reason=${reason}`);
    return { ok: false, reason: "delivery-failed" };
  }
}
