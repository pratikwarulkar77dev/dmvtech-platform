export interface ServiceDetail {
  slug: string;
  /** One or two sentences expanding on the summary in `servicesConfig`. */
  overview: string;
  /** What the service covers. Descriptive only — no outcomes, guarantees or client claims. */
  includes: readonly string[];
}

/**
 * Page content for each service, keyed by the slugs in `servicesConfig`.
 * Titles, categories, summaries and availability come from `servicesConfig`
 * so they cannot drift. These descriptions are drafted from those summaries:
 * review them for accuracy before launch.
 */
export const serviceDetails: Record<string, ServiceDetail> = {
  "network-design-implementation": {
    slug: "network-design-implementation",
    overview:
      "A reliable network is planned before it is built. We look at your premises, devices and how your teams work, then design, cable and deploy a network to match.",
    includes: [
      "Network planning for your premises and users",
      "LAN and Wi-Fi design",
      "Cabling and deployment",
      "Switching, routing and firewall configuration",
      "Testing and handover documentation",
    ],
  },
  "amc-managed-support": {
    slug: "amc-managed-support",
    overview:
      "An annual maintenance contract (AMC) keeps your IT looked after on a schedule, with support available when something goes wrong, for a predictable yearly cost.",
    includes: [
      "Scheduled preventive maintenance",
      "Rapid-response issue resolution",
      "Hardware and network health checks",
      "A predictable annual contract",
    ],
  },
  "cctv-surveillance": {
    slug: "cctv-surveillance",
    overview:
      "Surveillance works best when cameras are placed for a reason. We review your site's risk points and design a camera system around them.",
    includes: [
      "Site review and risk-point identification",
      "CCTV system design and installation",
      "Integration with your existing network",
      "Documentation of the installed system",
    ],
  },
  "biometric-access-control": {
    slug: "biometric-access-control",
    overview:
      "Biometric authentication ties access to a person rather than a shared password or key, helping you control who can enter or use what.",
    includes: [
      "Fingerprint and biometric access devices",
      "Access rules set up around your premises",
      "Installation and testing",
      "Integration with your existing setup where possible",
    ],
  },
  "website-design-development": {
    slug: "website-design-development",
    overview:
      "A business website should explain what you do and make it easy to get in touch. We build sites focused on clarity and enquiries, not just presence.",
    includes: [
      "Page structure planned around your business goals",
      "Responsive design for phones, tablets and desktops",
      "Enquiry and contact forms",
      "Basic search-engine-friendly setup",
    ],
  },
  "custom-web-business-applications": {
    slug: "custom-web-business-applications",
    overview:
      "Custom software, from internal tools to client-facing platforms. This service is in development and is not yet available.",
    includes: [
      "Requirements discussion",
      "Internal business tools",
      "Client-facing web platforms",
    ],
  },
  "cloud-migration-architecture": {
    slug: "cloud-migration-architecture",
    overview:
      "Support with assessing, migrating to and designing cloud environments. This service is in development and is not yet available.",
    includes: [
      "Assessment of your current setup",
      "Migration planning",
      "Cloud architecture guidance",
    ],
  },
  "it-consulting": {
    slug: "it-consulting",
    overview:
      "Independent guidance on where to invest in infrastructure and how to plan your technology over the coming years.",
    includes: [
      "Review of your current infrastructure",
      "Technology roadmap",
      "Guidance on prioritising IT investment",
    ],
  },
};
