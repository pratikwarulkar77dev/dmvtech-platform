export interface IndustryDetail {
  slug: string;
  overview: string;
  /** What this sector typically needs from IT. Descriptive of fit, not of past projects. */
  priorities: readonly string[];
  /** Slugs from `servicesConfig` that are commonly relevant to the sector. */
  relevantServices: readonly string[];
}

/**
 * Sector pages are written from the summaries in `industriesConfig`. They
 * describe where our services fit — they make no claims about past clients or
 * completed projects. Review wording before launch.
 */
export const industryDetails: Record<string, IndustryDetail> = {
  manufacturing: {
    slug: "manufacturing",
    overview:
      "Production sites depend on networks and systems that stay up. We help plan dependable connectivity, security and upkeep for factory and plant environments.",
    priorities: [
      "Dependable wired and wireless networking across the site",
      "Surveillance and access control for premises and stores",
      "Scheduled maintenance to reduce avoidable downtime",
    ],
    relevantServices: ["network-design-implementation", "cctv-surveillance", "biometric-access-control", "amc-managed-support"],
  },
  education: {
    slug: "education",
    overview:
      "Schools and institutes need connectivity across buildings and sensible safeguards for people and property.",
    priorities: [
      "Campus networking and Wi-Fi",
      "CCTV coverage for buildings and entry points",
      "Access control for staff and restricted areas",
    ],
    relevantServices: ["network-design-implementation", "cctv-surveillance", "biometric-access-control", "amc-managed-support"],
  },
  "banking-cooperative-societies": {
    slug: "banking-cooperative-societies",
    overview:
      "Financial institutions need secure, resilient infrastructure and controlled access to branches and records.",
    priorities: [
      "Secure, resilient networking",
      "Surveillance and biometric access control for premises",
      "Planned maintenance and technology guidance",
    ],
    relevantServices: ["network-design-implementation", "cctv-surveillance", "biometric-access-control", "amc-managed-support", "it-consulting"],
  },
  healthcare: {
    slug: "healthcare",
    overview:
      "Clinics and care facilities rely on IT being available when needed, alongside sensible control over who can enter which areas.",
    priorities: [
      "Dependable networking and workstations",
      "Access control and surveillance for premises",
      "Ongoing support so issues are resolved quickly",
    ],
    relevantServices: ["network-design-implementation", "amc-managed-support", "cctv-surveillance", "biometric-access-control"],
  },
  retail: {
    slug: "retail",
    overview:
      "Stores need billing systems and networks that work every day, plus visibility over the shop floor and stock areas.",
    priorities: [
      "Reliable store networking for billing and systems",
      "CCTV for shop floor and storage",
      "A business website to help customers find and contact you",
    ],
    relevantServices: ["network-design-implementation", "cctv-surveillance", "amc-managed-support", "website-design-development"],
  },
  "professional-services": {
    slug: "professional-services",
    overview:
      "Offices and growing firms need IT that supports their people without a full-time IT department.",
    priorities: [
      "Day-to-day IT support through a maintenance contract",
      "Office networking and Wi-Fi",
      "A clear technology plan as the firm grows",
    ],
    relevantServices: ["amc-managed-support", "network-design-implementation", "website-design-development", "it-consulting"],
  },
};
