import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { serviceCards, serviceHref, servicesIntro, servicesViewAll } from "../data";
import { HOME_ICONS } from "../lib/home-icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      spacing="none"
      className="pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12"
    >
      <Container>
        <SectionHeading intro={servicesIntro} id="services-heading" />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service, index) => {
            const Icon = HOME_ICONS[service.icon];
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-hero-sky text-hero-royal transition-colors duration-300 group-hover:bg-hero-royal group-hover:text-hero-royal-foreground motion-reduce:transition-none">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  {service.comingSoon ? (
                    <Badge variant="outline">Coming soon</Badge>
                  ) : (
                    <ArrowUpRight
                      aria-hidden
                      className="h-5 w-5 text-hero-navy/40 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hero-royal motion-reduce:transition-none"
                    />
                  )}
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-hero-navy/75">
                  {service.category}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-hero-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{service.summary}</p>
              </>
            );

            return (
              <li key={service.slug} className="flex">
                <Reveal className="flex w-full" delay={(index % 4) * 80}>
                  {service.comingSoon ? (
                    <Card className="flex w-full flex-col p-6 opacity-90 hover:shadow-soft">
                      <div className="group">{body}</div>
                    </Card>
                  ) : (
                    <Card
                      className={cn(
                        "group relative flex w-full flex-col p-0 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-hero-royal/30 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      )}
                    >
                      <Link
                        href={serviceHref(service.slug)}
                        className="flex h-full flex-col rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        {body}
                      </Link>
                    </Card>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="border-hero-royal/30 text-hero-navy hover:border-hero-royal/50 hover:bg-hero-sky hover:text-hero-navy">
            <Link href={servicesViewAll.href}>
              {servicesViewAll.label}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
