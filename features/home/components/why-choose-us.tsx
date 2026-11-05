import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { whyChooseIntro, whyChooseItems, whyChooseStats } from "../data";
import { HOME_ICONS } from "../lib/home-icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function WhyChooseUs() {
  return (
    <Section
      id="why-choose-us"
      aria-labelledby="why-heading"
      spacing="none"
      className="bg-gradient-to-b from-hero-ice to-background py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading intro={whyChooseIntro} id="why-heading" />

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:gap-6">
          {whyChooseStats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl border border-hero-royal/15 bg-hero-white/80 p-4 text-center shadow-soft backdrop-blur sm:p-6"
            >
              <dd className="font-display text-3xl font-bold text-hero-royal sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs leading-snug text-hero-navy/75 sm:text-sm">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseItems.map((item, index) => {
            const Icon = HOME_ICONS[item.icon];
            return (
              <li key={item.id} className="flex">
                <Reveal className="flex w-full" delay={(index % 3) * 80}>
                  <Card className="w-full p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero-sky text-hero-royal">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-hero-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{item.description}</p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
