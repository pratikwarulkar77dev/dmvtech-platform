import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { companyInfo, contactInfo } from "@/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { consultationCta } from "../data";
import { Reveal } from "./reveal";

export function ConsultationCta() {
  return (
    <Section id="consultation" aria-labelledby="cta-heading" spacing="none" className="pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-hero-royal/15 bg-gradient-to-br from-hero-white via-hero-ice to-hero-sky px-6 py-10 text-center shadow-premium sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 -z-10 h-64 w-64 animate-hero-drift rounded-full bg-hero-cyan/20 blur-3xl motion-reduce:animate-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-10 -z-10 h-64 w-64 animate-hero-drift rounded-full bg-hero-lavender/40 blur-3xl motion-reduce:animate-none"
              style={{ animationDelay: "-8s" }}
            />

            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-hero-navy text-balance sm:text-4xl"
            >
              {consultationCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-hero-navy/75">
              {consultationCta.description}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-hero-royal text-hero-royal-foreground shadow-elevated transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-hero-royal/90 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Link href={consultationCta.primary.href}>
                  {consultationCta.primary.label}
                  <ArrowRight aria-hidden className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-hero-royal/30 bg-hero-white/70 text-hero-navy backdrop-blur hover:border-hero-royal/50 hover:bg-hero-white hover:text-hero-navy"
              >
                <Link href={consultationCta.secondary.href}>{consultationCta.secondary.label}</Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-hero-navy/80 sm:flex-row">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-2 rounded-md font-medium hover:text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail aria-hidden className="h-4 w-4 text-hero-royal" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin aria-hidden className="h-4 w-4 text-hero-royal" />
                {companyInfo.locations.map((l) => l.city).join(" · ")}, Maharashtra
              </li>
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
