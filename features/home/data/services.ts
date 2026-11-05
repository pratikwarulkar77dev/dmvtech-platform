import { ROUTES, servicesConfig } from "@/constants";
import type { ActionLink, HomeIconName, SectionIntroContent, ServiceCardContent } from "../types";

const SERVICE_ICONS: Record<string, HomeIconName> = {
  "network-design-implementation": "network",
  "amc-managed-support": "life-buoy",
  "cctv-surveillance": "cctv",
  "biometric-access-control": "fingerprint",
  "website-design-development": "globe",
  "custom-web-business-applications": "code",
  "cloud-migration-architecture": "cloud",
  "it-consulting": "compass",
};

export const servicesIntro: SectionIntroContent = {
  eyebrow: "Our services",
  title: "Practical IT services, delivered by one team",
  description:
    "From networks and surveillance to websites and ongoing support — the services available today, with software and cloud capabilities on the way.",
};

/** Cards are generated from the shared services config so the homepage, navigation and footer never disagree. */
export const serviceCards: readonly ServiceCardContent[] = servicesConfig.map((service) => ({
  slug: service.slug,
  title: service.title,
  category: service.category,
  summary: service.summary,
  icon: SERVICE_ICONS[service.slug] ?? "layers",
  comingSoon: service.availability === "coming-soon",
}));

export const servicesViewAll: ActionLink = { label: "View all services", href: ROUTES.services };
export const serviceHref = (slug: string): string => ROUTES.service(slug);
