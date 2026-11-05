export interface CompanyLocation {
  label: string;
  city: string;
  state: string;
  country: string;
}

export interface CompanyInfo {
  legalName: string;
  foundedYear: number;
  founderName: string;
  employeeCountApprox: number;
  locations: CompanyLocation[];
  mission: string;
  summary: string;
}

export type CompanyOfficeId = "registered-office" | "main-branch";

/** One physical office. Address parts are stored separately so they can be formatted for display, maps and structured data. */
export interface CompanyOffice {
  id: CompanyOfficeId;
  /** e.g. "Registered Office" */
  label: string;
  /** Short place name for compact UI, e.g. "Lonavla" */
  shortName: string;
  streetAddress: string;
  /** Neighbourhood / area, when different from the city. */
  locality?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  /** ISO 3166-1 alpha-2 */
  countryCode: string;
}

export interface CompanyPhone {
  /** Human-readable, e.g. "+91 83789 55975" */
  display: string;
  /** Digits only with country code, e.g. "918378955975" */
  digits: string;
  /** tel: URI */
  href: string;
}

/**
 * Single source of truth for official business details. Every component,
 * page, metadata object and structured-data block reads from here — do not
 * type addresses, numbers or emails anywhere else.
 */
export interface CompanyProfile {
  name: string;
  legalName: string;
  /** GSTIN / UIN as supplied by the business. */
  gstin: string;
  offices: readonly CompanyOffice[];
  phone: CompanyPhone;
  whatsapp: CompanyPhone;
  emails: { primary: string; alternate: string };
}
