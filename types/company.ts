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
