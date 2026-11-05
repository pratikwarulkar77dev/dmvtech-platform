import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { processIntro, processSteps } from "../data";
import { HOME_ICONS } from "../lib/home-icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ProcessSection() {
  return (
    <Section
      id="process"
      aria-labelledby="process-heading"
      spacing="none"
      className="bg-gradient-to-b from-background via-hero-ice to-hero-sky/40 py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading intro={processIntro} id="process-heading" />

        <ol className="relative mt-10 grid gap-8 lg:grid-cols-5 lg:gap-6">
          {/* Connector line behind the step badges (desktop only) */}
          <span
            aria-hidden
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-hero-royal/30 to-transparent lg:block"
          />
          {processSteps.map((step, index) => {
            const Icon = HOME_ICONS[step.icon];
            return (
              <li key={step.id} className="relative">
                <Reveal delay={index * 90} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-hero-royal/20 bg-hero-white text-hero-royal shadow-elevated">
                    <Icon aria-hidden className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-hero-royal text-xs font-bold text-hero-royal-foreground">
                      <span className="sr-only">Step </span>
                      {index + 1}
                    </span>
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="font-display text-lg font-semibold text-hero-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
