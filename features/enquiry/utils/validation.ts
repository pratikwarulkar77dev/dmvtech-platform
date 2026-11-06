import { ENQUIRY_LIMITS, REQUIRED_FIELDS } from "../constants/enquiry-options";
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
  configuration: "Please describe the configuration you need.",
  usage: "Please tell us how you plan to use it.",
  message: "Please enter your message.",
};

/** Validates only the fields relevant to the selected mode. */
export function validateEnquiry(mode: EnquiryMode, values: EnquiryFormValues): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};

  for (const field of REQUIRED_FIELDS[mode]) {
    if (values[field].trim().length === 0) errors[field] = REQUIRED_MESSAGES[field] ?? "This field is required.";
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
