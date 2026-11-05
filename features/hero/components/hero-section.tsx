import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import type { HeroContent } from "@/types";
import { HeroBackground } from "./hero-background";
import { HeroVisual } from "./hero-visual";

interface HeroSectionProps {
  content: HeroContent;
}

/** Entrance animation; stays fully visible when the visitor prefers reduced motion. */
const reveal =
  "opacity-0 animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100";

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <HeroBackground />

      <Container className="grid items-center gap-10 pb-8 pt-10 sm:pb-10 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:pb-12 lg:pt-20">
        <div className="max-w-2xl">
          <p
            className={cn(
              reveal,
              "inline-flex items-center gap-2 rounded-full border border-hero-royal/20 bg-hero-white/70 px-3.5 py-1.5 text-sm font-medium text-hero-navy shadow-soft backdrop-blur"
            )}
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-hero-royal" />
            {content.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className={cn(
              reveal,
              "mt-6 font-display text-4xl font-bold tracking-tight text-hero-navy text-balance sm:text-5xl lg:leading-[1.1] xl:text-[3.5rem]"
            )}
            style={{ animationDelay: "80ms" }}
          >
            <span className="block">{content.headlineLead}</span>
            <span className="block text-hero-royal">{content.headlineTail}</span>
          </h1>

          <p
            className={cn(reveal, "mt-6 max-w-xl text-lg leading-relaxed text-hero-navy/75")}
            style={{ animationDelay: "160ms" }}
          >
            {content.description}
          </p>

          <div
            className={cn(reveal, "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center")}
            style={{ animationDelay: "240ms" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-hero-royal text-hero-royal-foreground shadow-elevated transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-hero-royal/90 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Link href={content.primaryCta.href}>
                {content.primaryCta.label}
                <ArrowRight aria-hidden className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-hero-royal/30 bg-hero-white/70 text-hero-navy backdrop-blur transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-hero-royal/50 hover:bg-hero-sky hover:text-hero-navy motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
            </Button>
          </div>

          <ul
            aria-label="What we help with"
            className={cn(reveal, "mt-10 flex flex-wrap gap-x-6 gap-y-3")}
            style={{ animationDelay: "320ms" }}
          >
            {content.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-center gap-2 text-sm font-medium text-hero-navy/80"
              >
                <span
                  aria-hidden
                  className="grid h-5 w-5 place-items-center rounded-full bg-hero-sky text-hero-royal"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className={cn(reveal)} style={{ animationDelay: "200ms" }}>
          <HeroVisual content={content.visual} />
        </div>
      </Container>
    </section>
  );
}
