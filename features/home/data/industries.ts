import { ROUTES, industriesConfig } from "@/constants";
import type { ActionLink, SectionIntroContent } from "../types";

export const industriesIntro: SectionIntroContent = {
  eyebrow: "Industries we serve",
  title: "Technology that fits how your sector works",
  description:
    "Different environments have different priorities. These are the sectors our infrastructure, security and support services are built to suit.",
};

/** Industry entries come straight from the shared config (also used by the navigation menu). */
export const industryCards = industriesConfig;

export const industriesViewAll: ActionLink = { label: "View all industries", href: ROUTES.industries };
export const industryHref = (slug: string): string => ROUTES.industry(slug);
