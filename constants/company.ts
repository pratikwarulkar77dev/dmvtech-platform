import type { CompanyInfo, CompanyOffice, CompanyProfile } from "@/types";

/**
 * Official business details supplied by DMV Tech Services. This is the one
 * place to change an address, number or email — everything else derives from it.
 */
export const companyProfile: CompanyProfile = {
  name: "DMV Tech Services",
  legalName: "DMV Tech Services",
  gstin: "27AGHPV2296C1Z5",
  offices: [
    {
      id: "registered-office",
      label: "Registered Office",
      shortName: "Lonavla",
      streetAddress: "Flat No. 1, Yogeshwar Housing Society, Behind ICICI Bank",
      city: "Lonavla",
      state: "Maharashtra",
      postalCode: "410401",
      country: "India",
      countryCode: "IN",
    },
    {
      id: "main-branch",
      label: "Main Branch",
      shortName: "Akurdi, Pimpri-Chinchwad",
      streetAddress: "Office No. 81, Mayur Samruddhi Phase II",
      locality: "Akurdi",
      city: "Pimpri-Chinchwad",
      state: "Maharashtra",
      postalCode: "411035",
      country: "India",
      countryCode: "IN",
    },
  ],
  phone: { display: "+91 83789 55975", digits: "918378955975", href: "tel:+918378955975" },
  whatsapp: {
    display: "+91 83789 55975",
    digits: "918378955975",
    href: "https://wa.me/918378955975",
  },
  emails: { primary: "info@dmvtech.in", alternate: "info.dmvsoft@gmail.com" },
};

/** Single-line address for display, e.g. in the footer. */
export function formatOfficeAddress(office: CompanyOffice): string {
  return [
    office.streetAddress,
    office.locality,
    office.city,
    `${office.state} – ${office.postalCode}`,
  ]
    .filter(Boolean)
    .join(", ");
}

/**
 * Facts here reflect the company as it exists today. Forward-looking claims
 * (certifications, partnerships, team credentials) must not be added here.
 */
export const companyInfo: CompanyInfo = {
  legalName: companyProfile.legalName,
  foundedYear: 2019,
  founderName: "Mohinish Varulkar",
  employeeCountApprox: 15,
  locations: companyProfile.offices.map((office) => ({
    label: office.label,
    city: office.id === "main-branch" ? "Akurdi (Pimpri-Chinchwad)" : office.city,
    state: office.state,
    country: office.country,
  })),
  mission:
    "To be the one technology partner our clients never have to replace — reliable at the infrastructure level, and building toward genuine software and cloud capability as our clients' needs evolve.",
  summary:
    "DMV Tech began in 2019 with a simple premise: businesses shouldn't have to manage five different vendors for five different technology needs.",
};
