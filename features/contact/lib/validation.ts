import type { EnquiryErrors, EnquiryValues } from "../types";
import { SERVICE_VALUES } from "./service-options";

export const ENQUIRY_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  companyMax: 120,
  messageMin: 10,
  messageMax: 2000,
} as const;

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const LINE_BREAK = /[\r\n]/;

/**
 * Reduces an Indian mobile number to its 10 digits. Accepts spaces, dashes,
 * brackets and an optional +91 / 91 / 0 prefix. Returns "" when it cannot.
 */
export function normalizeIndianMobile(raw: string): string {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return /^\d{10}$/.test(digits) ? digits : "";
}

/** Trims every field and lowercases the email. Run before validating and before sending. */
export function cleanEnquiry(values: EnquiryValues): EnquiryValues {
  return {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    company: values.company.trim(),
    service: values.service.trim(),
    message: values.message.trim(),
  };
}

/**
 * Single set of rules used by both the browser and the server action. The
 * server is the source of truth — client-side use is only for fast feedback.
 */
export function validateEnquiry(input: EnquiryValues): EnquiryErrors {
  const v = cleanEnquiry(input);
  const errors: EnquiryErrors = {};

  if (v.name.length < ENQUIRY_LIMITS.nameMin) errors.name = "Please enter your full name.";
  else if (v.name.length > ENQUIRY_LIMITS.nameMax || LINE_BREAK.test(v.name))
    errors.name = `Name must be a single line of up to ${ENQUIRY_LIMITS.nameMax} characters.`;

  if (!v.email) errors.email = "Please enter your email address.";
  else if (
    v.email.length > ENQUIRY_LIMITS.emailMax ||
    LINE_BREAK.test(v.email) ||
    !EMAIL_PATTERN.test(v.email)
  )
    errors.email = "Please enter a valid email address.";

  if (!v.phone) errors.phone = "Please enter your mobile number.";
  else if (!MOBILE_PATTERN.test(normalizeIndianMobile(v.phone)))
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";

  if (v.company.length > ENQUIRY_LIMITS.companyMax || LINE_BREAK.test(v.company))
    errors.company = `Company name must be a single line of up to ${ENQUIRY_LIMITS.companyMax} characters.`;

  if (!v.service) errors.service = "Please choose the service you are interested in.";
  else if (!SERVICE_VALUES.includes(v.service)) errors.service = "Please choose a service from the list.";

  if (v.message.length < ENQUIRY_LIMITS.messageMin)
    errors.message = `Please tell us a little more (at least ${ENQUIRY_LIMITS.messageMin} characters).`;
  else if (v.message.length > ENQUIRY_LIMITS.messageMax)
    errors.message = `Message must be ${ENQUIRY_LIMITS.messageMax} characters or fewer.`;

  return errors;
}
