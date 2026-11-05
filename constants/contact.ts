import type { ContactInfo } from "@/types";
import { companyProfile, formatOfficeAddress } from "./company";

/**
 * Derived from `companyProfile` — edit contact details in constants/company.ts.
 * Business hours have not been supplied, so none are published.
 */
export const contactInfo: ContactInfo = {
  email: companyProfile.emails.primary,
  phoneDisplay: companyProfile.phone.display,
  phoneHref: companyProfile.phone.href,
  whatsappNumber: companyProfile.whatsapp.digits,
  addresses: companyProfile.offices.map((office) => ({
    label: office.label,
    line: formatOfficeAddress(office),
  })),
  businessHours: [],
};
