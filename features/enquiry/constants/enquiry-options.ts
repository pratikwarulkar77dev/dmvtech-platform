import type { EnquiryField, EnquiryFormValues, EnquiryMode, EnquiryModeOption } from "../types/enquiry";

export const ENQUIRY_MODES: readonly EnquiryModeOption[] = [
  {
    id: "configuration",
    title: "I Know My Configuration",
    description: "You already know what you need. Share the specification and quantity.",
    icon: "cpu",
  },
  {
    id: "recommendation",
    title: "Recommend a Solution",
    description: "Tell us how you will use it and our team will suggest suitable options.",
    icon: "lightbulb",
  },
  {
    id: "general",
    title: "General Enquiry",
    description: "Send a simple message and we will get back to you.",
    icon: "message-square",
  },
];

export const ENQUIRY_MODE_LABEL: Record<EnquiryMode, string> = {
  configuration: "I Know My Configuration",
  recommendation: "Recommend a Solution",
  general: "General Enquiry",
};

/** Categories aligned with DMV Tech's actual service lines. */
export const ENQUIRY_CATEGORIES = [
  "Desktop / Laptop",
  "Computer Repair & Servicing",
  "Networking / Wi-Fi",
  "CCTV Surveillance",
  "Biometric Security",
  "Printers & Peripherals",
  "AMC / IT Maintenance",
  "Website Design & Development",
  "Other IT Services",
] as const;

export type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

/** Which category each service page pre-fills in its WhatsApp enquiry. */
export const CATEGORY_BY_SERVICE_SLUG: Record<string, EnquiryCategory> = {
  "network-design-implementation": "Networking / Wi-Fi",
  "amc-managed-support": "AMC / IT Maintenance",
  "cctv-surveillance": "CCTV Surveillance",
  "biometric-access-control": "Biometric Security",
  "website-design-development": "Website Design & Development",
  "custom-web-business-applications": "Other IT Services",
  "cloud-migration-architecture": "Other IT Services",
  "it-consulting": "Other IT Services",
};

/** Input limits keep the resulting WhatsApp link a reasonable length. */
export const ENQUIRY_LIMITS: Record<EnquiryField, number> = {
  name: 80,
  phone: 20,
  city: 80,
  category: 60,
  quantity: 40,
  budget: 40,
  configuration: 600,
  usage: 600,
  message: 800,
  additional: 500,
};

/** Maximum length of the encoded message inside the wa.me link. */
export const MAX_ENCODED_MESSAGE_LENGTH = 2000;

export const EMPTY_ENQUIRY_VALUES: EnquiryFormValues = {
  name: "",
  phone: "",
  city: "",
  category: "",
  quantity: "",
  budget: "",
  configuration: "",
  usage: "",
  message: "",
  additional: "",
};

/** Required fields for each mode. */
export const REQUIRED_FIELDS: Record<EnquiryMode, readonly EnquiryField[]> = {
  configuration: ["name", "configuration"],
  recommendation: ["name", "usage"],
  general: ["name", "message"],
};
