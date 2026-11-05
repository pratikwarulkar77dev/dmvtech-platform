import {
  ROUTES,
  companyProfile,
  footerNav,
  formatOfficeAddress,
  socialLinks,
} from "@/constants";

const LEGAL_TITLE = "Legal";

/** Everything the footer renders, derived from the central company profile and nav config. */
export const footerContent = {
  legalName: companyProfile.legalName,
  gstin: companyProfile.gstin,
  tagline:
    "Dependable networking, surveillance, security and managed IT for businesses across Maharashtra — with software and cloud capabilities on the way.",
  linkColumns: Object.entries(footerNav)
    .filter(([title]) => title !== LEGAL_TITLE)
    .map(([title, links]) => ({ title, links })),
  legalLinks: footerNav[LEGAL_TITLE] ?? [],
  offices: companyProfile.offices.map((office) => ({
    id: office.id,
    label: office.label,
    address: formatOfficeAddress(office),
  })),
  contact: {
    phone: companyProfile.phone,
    whatsapp: companyProfile.whatsapp,
    emails: [companyProfile.emails.primary, companyProfile.emails.alternate],
    contactHref: ROUTES.contact,
  },
  /** Links with an empty href are skipped until real profile URLs are confirmed. */
  social: socialLinks.filter((link) => link.href.trim().length > 0),
};
