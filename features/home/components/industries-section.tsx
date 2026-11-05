import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAV_ICONS } from "@/features/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { industriesIntro, industriesViewAll, industryCards, industryHref } from "../data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function IndustriesSection() {
  return (
    <Section
      id="industries"
      aria-labelledby="industries-heading"
      spacing="none"
      className="py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading intro={industriesIntro} id="industries-heading" />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industryCards.map((industry, index) => {
            const Icon = NAV_ICONS[industry.icon];
            return (
              <li key={industry.slug} className="flex">
                <Reveal className="flex w-full" delay={(index % 3) * 80}>
                  <Card className="group relative w-full p-0 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-hero-royal/30 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <Link
                      href={industryHref(industry.slug)}
                      className="flex h-full items-start gap-4 rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-hero-sky text-hero-royal transition-colors duration-300 group-hover:bg-hero-royal group-hover:text-hero-royal-foreground motion-reduce:transition-none">
                        <Icon aria-hidden className="h-6 w-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-lg font-semibold leading-snug text-hero-navy">
                            {industry.title}
                          </span>
                          <ArrowRight
                            aria-hidden
                            className="h-4 w-4 shrink-0 text-hero-navy/40 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-hero-royal motion-reduce:transition-none"
                          />
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-hero-navy/75">
                          {industry.summary}
                        </span>
                      </span>
                    </Link>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="border-hero-royal/30 text-hero-navy hover:border-hero-royal/50 hover:bg-hero-sky hover:text-hero-navy">
            <Link href={industriesViewAll.href}>
              {industriesViewAll.label}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
