import type { FeatureItem, SectionIntroContent, Testimonial } from "../types";

/**
 * Genuine client testimonials only. Add an entry ONLY after the client has
 * approved the exact wording and agreed to be named. While this array is
 * empty the section shows the "commitments" alternative below instead.
 */
export const testimonials: readonly Testimonial[] = [];

export const testimonialsIntro: SectionIntroContent = {
  eyebrow: "Client testimonials",
  title: "What clients say about working with us",
  description: "Words from clients who have agreed to be quoted.",
};

export const commitmentsIntro: SectionIntroContent = {
  eyebrow: "Our commitments",
  title: "What you can expect when you work with us",
  description:
    "Verified client testimonials will be published here once clients have approved their wording. Until then, these are the standards we hold ourselves to.",
};

export const commitments: readonly FeatureItem[] = [
  {
    id: "clear-scope",
    title: "Clear scope before work starts",
    description: "You see what is included, how it will be done and when, before anything begins.",
    icon: "file-text",
  },
  {
    id: "honest-advice",
    title: "Honest recommendations",
    description: "We recommend what suits your situation and tell you when something is not needed.",
    icon: "scale",
  },
  {
    id: "responsive",
    title: "Responsive communication",
    description: "You will know who is handling your project and what the next step is.",
    icon: "message-square",
  },
  {
    id: "documented",
    title: "Documented handover",
    description: "What was installed and how it is configured is written down for your team.",
    icon: "clipboard-check",
  },
];
