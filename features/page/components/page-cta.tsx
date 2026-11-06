import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface PageCtaProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  /** `external` opens in a new tab (e.g. WhatsApp). */
  secondary?: { label: string; href: string; external?: boolean };
}

/** Closing call-to-action band used at the bottom of inner pages. */
export function PageCta({ title, description, primary, secondary }: PageCtaProps) {
  return (
    <section aria-labelledby="page-cta-heading" className="pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <div className="rounded-3xl border border-hero-royal/15 bg-gradient-to-br from-hero-white via-hero-ice to-hero-sky px-6 py-10 text-center shadow-premium sm:px-12 sm:py-12">
          <h2
            id="page-cta-heading"
            className="mx-auto max-w-2xl font-display text-2xl font-bold tracking-tight text-hero-navy text-balance sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-hero-navy/75">
            {description}
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-hero-royal text-hero-royal-foreground shadow-elevated hover:bg-hero-royal/90"
            >
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight aria-hidden className="h-5 w-5" />
              </Link>
            </Button>
            {secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-hero-royal/30 bg-hero-white/70 text-hero-navy hover:border-hero-royal/50 hover:bg-hero-white hover:text-hero-navy"
              >
                {secondary.external ? (
                  <a href={secondary.href} target="_blank" rel="noopener noreferrer">
                    {secondary.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={secondary.href}>{secondary.label}</Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
