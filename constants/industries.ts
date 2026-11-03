import type { IndustrySummary } from "@/types";

/**
 * Target sectors DMV Tech serves or is building offerings for. Descriptions
 * explain fit; they make no claims about completed projects or clients.
 */
export const industriesConfig: IndustrySummary[] = [
  {
    slug: "manufacturing",
    title: "Manufacturing",
    summary: "Reliable networks and security for production sites.",
    icon: "factory",
  },
  {
    slug: "education",
    title: "Education",
    summary: "Campus networking, CCTV, and access control.",
    icon: "graduation-cap",
  },
  {
    slug: "banking-cooperative-societies",
    title: "Banking & Cooperative Societies",
    summary: "Secure, resilient infrastructure for financial institutions.",
    icon: "landmark",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary: "Dependable IT for clinics and care facilities.",
    icon: "heart-pulse",
  },
  {
    slug: "retail",
    title: "Retail",
    summary: "Connected stores, billing systems, and surveillance.",
    icon: "shopping-bag",
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    summary: "Managed IT for offices and growing firms.",
    icon: "briefcase",
  },
];
