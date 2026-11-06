import { ROUTES, companyInfo } from "@/constants";

export type AboutIconName =
  | "laptop"
  | "wrench"
  | "wifi"
  | "cctv"
  | "fingerprint"
  | "printer"
  | "life-buoy"
  | "globe"
  | "server"
  | "home"
  | "factory"
  | "landmark"
  | "graduation-cap"
  | "briefcase"
  | "settings"
  | "megaphone"
  | "compass";

/**
 * About page copy. Every statement comes from details supplied by the business
 * (founding year, founder, family ownership, ~15 professionals, services and
 * customer types). Do not add achievements, awards, certifications or client names.
 */
export const aboutHero = {
  eyebrow: "About us",
  title: "A family-owned IT partner, since 2019",
  description: `DMV Tech Services was founded in ${companyInfo.foundedYear} by ${companyInfo.founderName}. We help homes, businesses and institutions with dependable, practical IT solutions.`,
};

export const storyIntro = {
  eyebrow: "Our story",
  title: `Our journey since ${companyInfo.foundedYear}`,
  description:
    "DMV Tech Services is family-owned and operated, and has grown step by step around what our customers needed.",
};

export const storyMilestones = [
  {
    id: "founded",
    label: String(companyInfo.foundedYear),
    title: "Where we started",
    text: `${companyInfo.founderName} founded DMV Tech Services, initially providing computer servicing, computer repairing and networking services.`,
  },
  {
    id: "grew",
    label: "Over time",
    title: "How we grew",
    text: "We expanded into computer sales, desktop and laptop solutions, Wi-Fi and networking infrastructure, CCTV and biometric security, printers and peripherals, website design and development, and annual maintenance contracts.",
  },
  {
    id: "today",
    label: "Today",
    title: "Who we are now",
    text: "A team of approximately 15 professionals supporting customers with IT infrastructure and technical support, with a focus on understanding requirements and delivering dependable, practical, high-quality solutions.",
  },
] as const;

export const missionVisionIntro = {
  eyebrow: "Mission & vision",
  title: "What we are working towards",
};

export const missionVision = {
  mission: companyInfo.mission,
  /** Drafted from the company's stated approach — confirm the wording with the founder before launch. */
  vision:
    "A business where every customer's technology needs are understood and met with dependable solutions, responsive service and long-term support.",
};

export const expertiseIntro = {
  eyebrow: "Our expertise",
  title: "What we do",
  description: "The services our team provides today.",
};

export const expertiseItems: readonly { id: string; title: string; icon: AboutIconName }[] = [
  { id: "computers", title: "Computer sales, servicing and repairing", icon: "wrench" },
  { id: "desktops-laptops", title: "Desktop and laptop solutions", icon: "laptop" },
  { id: "networking", title: "Networking and Wi-Fi infrastructure", icon: "wifi" },
  { id: "cctv", title: "CCTV surveillance systems", icon: "cctv" },
  { id: "biometric", title: "Biometric security systems", icon: "fingerprint" },
  { id: "printers", title: "Printer and peripheral solutions", icon: "printer" },
  { id: "websites", title: "Website design and development", icon: "globe" },
  { id: "amc", title: "Annual Maintenance Contracts (AMC)", icon: "life-buoy" },
  { id: "infrastructure", title: "IT infrastructure and technical support", icon: "server" },
];

export const teamIntro = {
  eyebrow: "Our team",
  title: `Approximately ${companyInfo.employeeCountApprox} professionals`,
  description:
    "Our dedicated team works across operations, technical services, marketing and consulting to support our customers.",
};

export const teamDepartments: readonly { id: string; title: string; icon: AboutIconName }[] = [
  { id: "operations", title: "Operations", icon: "settings" },
  { id: "technical", title: "Technical services", icon: "wrench" },
  { id: "marketing", title: "Marketing", icon: "megaphone" },
  { id: "consulting", title: "Consulting", icon: "compass" },
];

export const audiencesIntro = {
  eyebrow: "Who we serve",
  title: "Industries and customers we serve",
  description: "From individual users to institutions, we support customers of different sizes.",
};

export const audiences: readonly { id: string; title: string; icon: AboutIconName; href?: string }[] = [
  { id: "home", title: "Home users", icon: "home" },
  { id: "manufacturing", title: "Manufacturing companies", icon: "factory", href: ROUTES.industry("manufacturing") },
  {
    id: "cooperative-banks",
    title: "Cooperative banks and credit societies",
    icon: "landmark",
    href: ROUTES.industry("banking-cooperative-societies"),
  },
  {
    id: "education",
    title: "Educational institutes and schools",
    icon: "graduation-cap",
    href: ROUTES.industry("education"),
  },
  { id: "small-business", title: "Small offices and businesses", icon: "briefcase" },
];

export const locationsIntro = {
  eyebrow: "Our locations",
  title: "Where to find us",
};
