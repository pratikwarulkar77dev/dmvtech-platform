import { ROUTES } from "@/constants";
import type { SectionIntroContent, TechnologyArea } from "../types";

export const technologyIntro: SectionIntroContent = {
  eyebrow: "Technology solutions",
  title: "The foundations your business runs on",
  description: "Four connected areas that keep your people online, protected and productive.",
};

export const technologyAreas: readonly TechnologyArea[] = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: "server",
    title: "IT infrastructure",
    description:
      "The servers, devices and cabling at the core of your business, set up properly and documented.",
    capabilities: [
      "Office and site IT setup",
      "Server and workstation configuration",
      "Structured cabling and rack organisation",
      "Handover documentation",
    ],
    relatedService: { label: "IT consulting", href: ROUTES.service("it-consulting") },
  },
  {
    id: "networking",
    label: "Networking",
    icon: "wifi",
    title: "Networking",
    description: "Wired and wireless networks planned around how your teams actually work.",
    capabilities: [
      "LAN and Wi-Fi design",
      "Cabling and deployment",
      "Switching, routing and firewall configuration",
      "Multi-site connectivity planning",
    ],
    relatedService: {
      label: "Network design & implementation",
      href: ROUTES.service("network-design-implementation"),
    },
  },
  {
    id: "security",
    label: "Security",
    icon: "shield-check",
    title: "Security & surveillance",
    description: "Physical security that protects people, premises and assets.",
    capabilities: [
      "CCTV system design and installation",
      "Biometric access control",
      "Coverage planned around real risk points",
      "Integration with your existing network",
    ],
    relatedService: { label: "CCTV surveillance", href: ROUTES.service("cctv-surveillance") },
  },
  {
    id: "maintenance",
    label: "IT maintenance",
    icon: "wrench",
    title: "IT maintenance & support",
    description: "Scheduled upkeep and responsive help so small issues stay small.",
    capabilities: [
      "Scheduled preventive maintenance",
      "Rapid-response issue resolution",
      "Annual maintenance contracts (AMC)",
      "Hardware and network health checks",
    ],
    relatedService: { label: "AMC & managed support", href: ROUTES.service("amc-managed-support") },
  },
];
