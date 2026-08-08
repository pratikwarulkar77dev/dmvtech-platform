import type { CompanyInfo } from "@/types";

/**
 * Facts here reflect the company as it exists today. Forward-looking claims
 * (certifications, partnerships, team credentials) belong in bracketed
 * placeholder content at the page-copy level, not in this config — do not
 * add unverified data to this file.
 */
export const companyInfo: CompanyInfo = {
  legalName: "DMV Tech Services",
  foundedYear: 2019,
  founderName: "Mohinish Varulkar",
  employeeCountApprox: 15,
  locations: [
    { label: "Lonavla Office", city: "Lonavla", state: "Maharashtra", country: "India" },
    { label: "Talegaon Dabhade Office", city: "Talegaon Dabhade", state: "Maharashtra", country: "India" },
  ],
  mission:
    "To be the one technology partner our clients never have to replace — reliable at the infrastructure level, and building toward genuine software and cloud capability as our clients' needs evolve.",
  summary:
    "DMV Tech began in 2019 with a simple premise: businesses shouldn't have to manage five different vendors for five different technology needs.",
};
