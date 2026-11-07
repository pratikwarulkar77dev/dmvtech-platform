import { ENQUIRY_LIMITS, REQUIRED_FIELDS, EMPTY_ENQUIRY_VALUES } from "../constants/enquiry-options";
import type { EnquiryField, EnquiryFormErrors, EnquiryFormValues, EnquiryMode } from "../types/enquiry";

/** Reduces an Indian mobile number to 10 digits (accepts +91 / 91 / 0 prefixes, spaces and dashes). Returns "" if invalid. */
export function normalizeMobile(raw: string): string {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : "";
}

const REQUIRED_MESSAGES: Partial<Record<EnquiryField, string>> = {
  name: "Please enter your name.",
  email: "Please enter your email address.",
  configuration: "Please describe the configuration you need.",
  usage: "Please tell us how you plan to use it.",
  message: "Please enter your message.",
};

/** Validates only the fields relevant to the selected mode. */
export function validateEnquiry(mode: EnquiryMode, values: EnquiryFormValues, channel: "whatsapp" | "email" = "whatsapp"): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};

  for (const field of REQUIRED_FIELDS[mode]) {
    if (values[field].trim().length === 0) errors[field] = REQUIRED_MESSAGES[field] ?? "This field is required.";
  }

  if (channel === "email") {
    if (!values.email.trim()) errors.email = REQUIRED_MESSAGES.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  }

  if (values.phone.trim() && !normalizeMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number, or leave this blank.";
  }

  for (const field of Object.keys(ENQUIRY_LIMITS) as EnquiryField[]) {
    if (!errors[field] && values[field].length > ENQUIRY_LIMITS[field]) {
      errors[field] = `Please keep this to ${ENQUIRY_LIMITS[field]} characters or fewer.`;
    }
  }

  return errors;
}

/** Normalize only known fields and apply per-field length limits on the server. */
export function cleanEnquiryValues(raw: Partial<Record<EnquiryField, string>>): EnquiryFormValues {
  const result = { ...EMPTY_ENQUIRY_VALUES };
  for (const key of Object.keys(result) as EnquiryField[]) {
    const value = typeof raw[key] === "string" ? raw[key]! : "";
    result[key] = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  }
  return result;
}
