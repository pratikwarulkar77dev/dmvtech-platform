import { Cctv, Laptop, Router, Server, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import type { HeroIconName } from "@/types";

export const HERO_ICONS: Record<HeroIconName, LucideIcon> = {
  server: Server,
  router: Router,
  "shield-check": ShieldCheck,
  cctv: Cctv,
  laptop: Laptop,
  wrench: Wrench,
};
