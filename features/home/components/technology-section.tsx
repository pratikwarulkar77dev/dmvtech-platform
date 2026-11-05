import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { technologyAreas, technologyIntro } from "../data";
import { HOME_ICONS } from "../lib/home-icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function TechnologySection() {
  const first = technologyAreas[0];

  return (
    <Section
      id="technology"
      aria-labelledby="technology-heading"
      spacing="none"
      className="py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading intro={technologyIntro} id="technology-heading" />

        <Reveal className="mt-10">
          <Tabs defaultValue={first?.id} className="mx-auto max-w-5xl">
            <TabsList
              aria-label="Technology areas"
              className="grid h-auto w-full grid-cols-2 gap-1 bg-hero-sky/60 p-1.5 sm:grid-cols-4"
            >
              {technologyAreas.map((area) => {
                const Icon = HOME_ICONS[area.icon];
                return (
                  <TabsTrigger
                    key={area.id}
                    value={area.id}
                    className="gap-2 py-2.5 text-hero-navy/80 data-[state=active]:bg-hero-white data-[state=active]:text-hero-royal"
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    {area.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {technologyAreas.map((area) => {
              const Icon = HOME_ICONS[area.icon];
              return (
                <TabsContent key={area.id} value={area.id} className="mt-6">
                  <div className="grid gap-8 rounded-2xl border border-border bg-gradient-to-br from-hero-white to-hero-ice p-6 shadow-soft sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                    <div>
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-hero-royal text-hero-royal-foreground shadow-elevated">
                        <Icon aria-hidden className="h-7 w-7" />
                      </span>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-hero-navy">
                        {area.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-hero-navy/75">
                        {area.description}
                      </p>
                      {area.relatedService && (
                        <Link
                          href={area.relatedService.href}
                          className="mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {area.relatedService.label}
                          <ArrowRight aria-hidden className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    <ul className="space-y-3 self-center">
                      {area.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-hero-navy shadow-soft"
                        >
                          <span
                            aria-hidden
                            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-hero-sky text-hero-royal"
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </Reveal>
      </Container>
    </Section>
  );
}
