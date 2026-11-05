import type { ProcessStep, SectionIntroContent } from "../types";

export const processIntro: SectionIntroContent = {
  eyebrow: "Our working process",
  title: "A clear path from first conversation to ongoing support",
  description: "Five straightforward stages, so you always know what happens next.",
};

export const processSteps: readonly ProcessStep[] = [
  {
    id: "consultation",
    title: "Consultation",
    description: "We listen to your goals, constraints and current setup before suggesting anything.",
    icon: "messages-square",
  },
  {
    id: "assessment",
    title: "Assessment",
    description: "We review your site, equipment and risks to understand what is actually needed.",
    icon: "clipboard-check",
  },
  {
    id: "planning",
    title: "Planning",
    description: "You receive a clear proposal covering scope, approach and timeline.",
    icon: "route",
  },
  {
    id: "implementation",
    title: "Implementation",
    description: "Our team installs, configures and tests the solution, keeping you informed throughout.",
    icon: "rocket",
  },
  {
    id: "support",
    title: "Support",
    description: "Ongoing maintenance and help after go-live, including annual maintenance contracts.",
    icon: "life-buoy",
  },
];
