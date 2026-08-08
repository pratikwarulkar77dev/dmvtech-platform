import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "DMV Tech",
  legalName: "DMV Tech Services",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmvtech.in",
  description:
    "Infrastructure you can rely on. Technology you can grow into. DMV Tech provides networking, security, and managed IT services, expanding into software, cloud, and automation.",
  locale: "en_IN",
};
