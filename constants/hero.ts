import type { HeroContent } from "@/types";
import { ROUTES } from "./routes";

/** Homepage hero copy and illustration content. Edit here, not in the components. */
export const heroConfig: HeroContent = {
  eyebrow: "Professional IT solutions for business",
  headlineLead: "Technology That Works.",
  headlineTail: "Support You Can Trust.",
  description:
    "DMV Tech Services helps businesses stay connected, secure, and productive through professional IT infrastructure, networking, surveillance, maintenance, and technology solutions.",
  primaryCta: { label: "Get a Free Consultation", href: ROUTES.consultation },
  secondaryCta: { label: "Explore Our Services", href: ROUTES.services },
  capabilities: [
    "IT infrastructure",
    "Networking",
    "Surveillance",
    "Maintenance & support",
  ],
  visual: {
    ariaLabel:
      "Illustration of business IT infrastructure connected to networking, security, surveillance and maintenance services",
    core: {
      label: "IT infrastructure",
      caption: "Servers, devices & systems",
      icon: "server",
    },
    nodes: [
      {
        id: "networking",
        label: "Networking",
        caption: "Wired & wireless networks",
        icon: "router",
        position: { x: 22, y: 19 },
        delay: 0,
      },
      {
        id: "security",
        label: "Security",
        caption: "Access control & protection",
        icon: "shield-check",
        position: { x: 78, y: 22 },
        delay: 1.2,
      },
      {
        id: "surveillance",
        label: "Surveillance",
        caption: "CCTV design & installation",
        icon: "cctv",
        position: { x: 78, y: 79 },
        delay: 2.4,
      },
      {
        id: "maintenance",
        label: "Maintenance",
        caption: "Ongoing support & upkeep",
        icon: "wrench",
        position: { x: 22, y: 81 },
        delay: 3.6,
      },
    ],
  },
};
