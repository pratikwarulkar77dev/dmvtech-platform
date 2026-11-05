import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { commitments, commitmentsIntro, testimonials, testimonialsIntro } from "../data";
import { HOME_ICONS } from "../lib/home-icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * Shows verified client testimonials when any exist in `data/testimonials.ts`.
 * Until then it shows the company's service commitments instead — it never
 * displays invented or unverified quotes.
 */
export function TestimonialsSection() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      spacing="none"
      className="bg-gradient-to-b from-hero-ice to-background py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading
          intro={hasTestimonials ? testimonialsIntro : commitmentsIntro}
          id="testimonials-heading"
        />

        {hasTestimonials ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <li key={testimonial.id} className="flex">
                <Reveal className="flex w-full" delay={(index % 3) * 80}>
                  <Card className="flex w-full flex-col p-6">
                    <Quote aria-hidden className="h-6 w-6 text-hero-royal" />
                    <blockquote className="mt-4 flex-1 text-base leading-relaxed text-hero-navy">
                      {testimonial.quote}
                    </blockquote>
                    <p className="mt-6 text-sm">
                      <span className="block font-semibold text-hero-navy">{testimonial.authorName}</span>
                      <span className="text-hero-navy/70">
                        {testimonial.authorRole}, {testimonial.organisation}
                      </span>
                    </p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item, index) => {
              const Icon = HOME_ICONS[item.icon];
              return (
                <li key={item.id} className="flex">
                  <Reveal className="flex w-full" delay={(index % 4) * 80}>
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
        )}
      </Container>
    </Section>
  );
}
