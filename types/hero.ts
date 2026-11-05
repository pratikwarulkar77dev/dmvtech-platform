/** Icon keys resolved to components inside features/hero (keeps `constants/` free of React). */
export type HeroIconName =
  | "server"
  | "router"
  | "shield-check"
  | "cctv"
  | "laptop"
  | "wrench";

export interface HeroAction {
  label: string;
  href: string;
}

export interface HeroVisualNode {
  id: string;
  label: string;
  caption: string;
  icon: HeroIconName;
  /** Centre of the node as a percentage of the visual's width/height (0–100). */
  position: { x: number; y: number };
  /** Float-animation delay in seconds, so the nodes drift out of phase. */
  delay: number;
}

export interface HeroVisualContent {
  /** Accessible description of the decorative illustration. */
  ariaLabel: string;
  core: { label: string; caption: string; icon: HeroIconName };
  nodes: readonly HeroVisualNode[];
}

export interface HeroContent {
  eyebrow: string;
  headlineLead: string;
  headlineTail: string;
  description: string;
  primaryCta: HeroAction;
  secondaryCta: HeroAction;
  capabilities: readonly string[];
  visual: HeroVisualContent;
}
