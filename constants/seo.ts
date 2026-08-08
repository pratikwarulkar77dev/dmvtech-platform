import type { SeoConfig } from "@/types";
import { siteConfig } from "./site";

export const seoConfig: SeoConfig = {
  defaultTitle: "DMV Tech — Enterprise Technology Partner",
  titleTemplate: "%s | DMV Tech",
  defaultDescription: siteConfig.description,
  keywords: [
    "IT infrastructure company",
    "managed IT services",
    "network installation",
    "CCTV installation services",
    "biometric access control",
    "AMC services provider",
    "IT consulting",
  ],
  twitterHandle: "[Twitter Handle – if applicable]",
  ogImage: "/og-image.jpg",
};
