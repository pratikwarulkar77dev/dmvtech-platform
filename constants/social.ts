import type { SocialLink } from "@/types";

/**
 * href values are intentionally empty until real, live profile URLs are
 * confirmed. Rendering code (Module 5+) should skip any entry with an empty
 * href rather than link to "#".
 */
export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "" },
  { platform: "facebook", label: "Facebook", href: "" },
  { platform: "instagram", label: "Instagram", href: "" },
];
