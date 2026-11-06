import { companyProfile } from "@/constants";
import {
  CATEGORY_BY_SERVICE_SLUG,
  ENQUIRY_LIMITS,
  ENQUIRY_MODE_LABEL,
  MAX_ENCODED_MESSAGE_LENGTH,
} from "../constants/enquiry-options";
import type { EnquiryFormValues, EnquiryMode } from "../types/enquiry";
import { normalizeMobile } from "./validation";

/** Removes control characters (keeping line breaks), normalises line endings and trims. */
export function cleanText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const singleLine = (value: string): string => cleanText(value).replace(/\n+/g, " ");

/** https://wa.me/<number>?text=<encoded message> — number comes from the central company profile. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${companyProfile.whatsapp.digits}?text=${encodeURIComponent(message)}`;
}

export function isWithinUrlLimit(message: string): boolean {
  return encodeURIComponent(message).length <= MAX_ENCODED_MESSAGE_LENGTH;
}

const line = (label: string, value: string): string | null => (value ? `${label}: ${value}` : null);
const block = (label: string, value: string): string | null => (value ? `${label}:\n${value}` : null);

/** Builds the structured message customers send on WhatsApp. Empty optional fields are omitted. */
export function buildEnquiryMessage(mode: EnquiryMode, values: EnquiryFormValues): string {
  const v = {
    name: singleLine(values.name),
    phone: normalizeMobile(values.phone) || singleLine(values.phone),
    city: singleLine(values.city),
    category: singleLine(values.category),
    quantity: singleLine(values.quantity),
    budget: singleLine(values.budget),
    configuration: cleanText(values.configuration),
    usage: cleanText(values.usage),
    message: cleanText(values.message),
    additional: cleanText(values.additional),
  };

  const identity = [line("Name", v.name), line("Contact", v.phone), line("Location", v.city)].filter(
    (l): l is string => l !== null
  );
  const topic = [`Enquiry Type: ${ENQUIRY_MODE_LABEL[mode]}`, line("Service Category", v.category)].filter(
    (l): l is string => l !== null
  );

  const details: (string | null)[] =
    mode === "configuration"
      ? [
          block("Required Configuration", v.configuration),
          line("Quantity", v.quantity),
          line("Budget", v.budget),
        ]
      : mode === "recommendation"
        ? [line("Usage", v.usage), line("Quantity", v.quantity), line("Budget", v.budget)]
        : [block("Message", v.message)];

  const detailLines = details.filter((l): l is string => l !== null);
  const additional = mode === "general" ? null : block("Additional Requirements", v.additional);

  const closing =
    mode === "recommendation"
      ? "Please review my requirements and contact me with suitable recommendations."
      : "Please review my requirements and contact me.";

  return [
    "Hello DMV Tech Services,",
    "",
    "I would like to submit an IT requirement.",
    "",
    identity.join("\n"),
    "",
    topic.join("\n"),
    "",
    detailLines.join("\n"),
    ...(additional ? ["", additional] : []),
    "",
    closing,
    "",
    "Thank you.",
  ].join("\n");
}

/** Short pre-filled message for a service page's WhatsApp button. */
export function buildServiceWhatsAppMessage(serviceTitle: string, serviceSlug?: string): string {
  const category = serviceSlug ? CATEGORY_BY_SERVICE_SLUG[serviceSlug] : undefined;
  return [
    "Hello DMV Tech Services,",
    "",
    `I would like to enquire about ${singleLine(serviceTitle).slice(0, ENQUIRY_LIMITS.category + 40)}.`,
    ...(category ? ["", `Service Category: ${category}`] : []),
    "",
    "Please contact me with more details.",
    "",
    "Thank you.",
  ].join("\n");
}

export const buildServiceWhatsAppUrl = (serviceTitle: string, serviceSlug?: string): string =>
  buildWhatsAppUrl(buildServiceWhatsAppMessage(serviceTitle, serviceSlug));

/** Generic opening message for floating / contact-page WhatsApp links. */
export const GENERAL_WHATSAPP_MESSAGE =
  "Hello DMV Tech Services,\n\nI would like to enquire about your IT services. Please contact me.\n\nThank you.";

export const buildGeneralWhatsAppUrl = (): string => buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);
