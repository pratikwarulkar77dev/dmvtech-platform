import { cn } from "@/lib/cn";
import type { HeroVisualContent } from "@/types";
import { HERO_ICONS } from "../lib/hero-icons";

interface HeroVisualProps {
  content: HeroVisualContent;
  className?: string;
}

/**
 * Composed illustration: an infrastructure "core" connected to service nodes.
 * Built from inline SVG + CSS (no image requests), so it costs no network
 * round-trip and scales crisply at any size.
 */
export function HeroVisual({ content, className }: HeroVisualProps) {
  const CoreIcon = HERO_ICONS[content.core.icon];

  return (
    <div
      role="img"
      aria-label={content.ariaLabel}
      className={cn("relative mx-auto aspect-square w-full max-w-[34rem]", className)}
    >
      {/* Rings + animated connectors */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <circle cx="50" cy="50" r="24" className="stroke-hero-royal/15" strokeWidth="0.35" />
        <circle
          cx="50"
          cy="50"
          r="40"
          className="stroke-hero-royal/10"
          strokeWidth="0.35"
          strokeDasharray="1 2"
        />
        {content.nodes.map((node) => (
          <line
            key={node.id}
            x1={node.position.x}
            y1={node.position.y}
            x2="50"
            y2="50"
            className="animate-hero-dash stroke-hero-royal/40 motion-reduce:animate-none"
            strokeWidth="0.45"
            strokeLinecap="round"
            strokeDasharray="1.5 2.5"
          />
        ))}
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden
          className="absolute inset-0 animate-hero-pulse rounded-[2rem] bg-hero-royal/30 motion-reduce:hidden"
        />
        <div className="relative flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-[2rem] border border-hero-white/80 bg-hero-white/80 p-3 text-center shadow-premium backdrop-blur-xl sm:h-40 sm:w-40">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-royal to-hero-cyan text-hero-royal-foreground shadow-elevated sm:h-14 sm:w-14">
            <CoreIcon aria-hidden className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="font-display text-sm font-semibold leading-tight text-hero-navy">
            {content.core.label}
          </span>
          <span className="hidden text-xs leading-snug text-hero-navy/70 sm:block">
            {content.core.caption}
          </span>
        </div>
      </div>

      {/* Service nodes */}
      {content.nodes.map((node) => {
        const Icon = HERO_ICONS[node.icon];
        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
          >
            <div
              className="animate-hero-float motion-reduce:animate-none"
              style={{ animationDelay: `${node.delay}s` }}
            >
              <div className="group flex w-[8.25rem] items-center gap-2.5 rounded-2xl border border-hero-white/80 bg-hero-white/75 p-2.5 shadow-elevated backdrop-blur-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-premium motion-reduce:transition-none sm:w-48 sm:gap-3 sm:p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-hero-sky text-hero-royal transition-colors duration-300 group-hover:bg-hero-royal group-hover:text-hero-royal-foreground sm:h-10 sm:w-10">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold leading-tight text-hero-navy">
                    {node.label}
                  </span>
                  <span className="mt-0.5 hidden text-xs leading-snug text-hero-navy/70 sm:block">
                    {node.caption}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
