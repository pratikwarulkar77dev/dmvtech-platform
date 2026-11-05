/** Icon keys resolved to components in features/home/lib/home-icons.ts (keeps data files free of React). */
export type HomeIconName =
  | "network"
  | "life-buoy"
  | "cctv"
  | "fingerprint"
  | "globe"
  | "code"
  | "cloud"
  | "compass"
  | "layers"
  | "calendar-check"
  | "map-pin"
  | "search-check"
  | "wallet"
  | "message-square"
  | "messages-square"
  | "clipboard-check"
  | "route"
  | "rocket"
  | "server"
  | "wifi"
  | "shield-check"
  | "wrench"
  | "file-text"
  | "scale"
  | "handshake";

export interface SectionIntroContent {
  /** Short label above the heading. */
  eyebrow: string;
  title: string;
  description?: string;
}

export interface ActionLink {
  label: string;
  href: string;
}

export interface ServiceCardContent {
  slug: string;
  title: string;
  category: string;
  summary: string;
  icon: HomeIconName;
  comingSoon: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: HomeIconName;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: HomeIconName;
}

export interface TechnologyArea {
  id: string;
  label: string;
  icon: HomeIconName;
  title: string;
  description: string;
  capabilities: readonly string[];
  /** Optional related service page. */
  relatedService?: ActionLink;
}

/** Only genuine, permission-granted testimonials may be added. `verified` must be literally true. */
export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  organisation: string;
  verified: true;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ConsultationCtaContent {
  title: string;
  description: string;
  primary: ActionLink;
  secondary: ActionLink;
}
