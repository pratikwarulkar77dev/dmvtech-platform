import { companyProfile } from "@/constants";
import { ENQUIRY_MODE_LABEL, MESSAGE_COPY } from "@/features/enquiry/constants/enquiry-options";
import type { EnquiryPayload } from "@/features/enquiry/types/enquiry";
import { createMailTransport, getMailConfig, getMissingMailSettings } from "@/lib/mailer";

export type SendEnquiryResult = { ok: true } | { ok: false; reason: "not-configured" | "delivery-failed" };
const escapeHtml = (value: string): string => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

export async function sendEnquiryEmail({ mode, values }: EnquiryPayload): Promise<SendEnquiryResult> {
  const config = getMailConfig(companyProfile.emails.primary);
  if (!config) {
    console.error(`[enquiry] SMTP is not configured. Missing or invalid: ${getMissingMailSettings().join(", ")}`);
    return { ok: false, reason: "not-configured" };
  }
  const category = values.category || "Not specified";
  const details = mode === "configuration" ? values.configuration : mode === "recommendation" ? values.usage : values.message;
  const rows: [string, string][] = [
    ["Name", values.name], ["Email", values.email], ["Mobile", values.phone || "—"],
    ["City / location", values.city || "—"], ["Enquiry type", ENQUIRY_MODE_LABEL[mode]],
    ["Service category", category], ["Quantity", values.quantity || "—"],
    ["Estimated budget", values.budget || "—"],
  ];
  const messageLabel = MESSAGE_COPY[mode].label;
  const text = ["New enquiry from the DMV Tech Services website", "", ...rows.map(([label, value]) => `${label}: ${value}`), "", `${messageLabel}:`, details, "", "Additional requirements:", values.additional || "—"].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#14243B;line-height:1.5"><h2>New enquiry from the DMV Tech Services website</h2><table cellpadding="6">${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join("")}</table><p><strong>${escapeHtml(messageLabel)}</strong></p><p style="white-space:pre-wrap">${escapeHtml(details)}</p><p><strong>Additional requirements</strong></p><p style="white-space:pre-wrap">${escapeHtml(values.additional || "—")}</p></div>`;
  try {
    const transport = createMailTransport(config);
    await transport.sendMail({
      from: config.from, to: config.to, cc: config.cc,
      replyTo: { name: singleLine(values.name), address: values.email },
      subject: singleLine(`New website enquiry — ${category} — ${values.name}`), text, html,
    });
    return { ok: true };
  } catch (error) {
    const err = error as { code?: string; responseCode?: number };
    console.error(`[enquiry] email delivery failed: code=${err?.code ?? "n/a"} smtp=${err?.responseCode ?? "n/a"}`);
    return { ok: false, reason: "delivery-failed" };
  }
}
