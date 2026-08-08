import type { ContactInfo } from "@/types";

/**
 * Bracketed values (e.g. business hours) are not yet confirmed — replace
 * with real data before this ships. Do not fill them with invented values.
 */
export const contactInfo: ContactInfo = {
  email: "hello@dmvtech.in",
  phoneDisplay: "[Phone Number – confirm before launch]",
  phoneHref: "tel:+91XXXXXXXXXX",
  whatsappNumber: "91XXXXXXXXXX",
  addresses: [
    { label: "Lonavla", line: "Lonavla, Maharashtra, India" },
    { label: "Talegaon Dabhade", line: "Talegaon Dabhade, Maharashtra, India" },
  ],
  businessHours: [{ days: "[Business Hours – confirm before launch]", hours: "" }],
};
