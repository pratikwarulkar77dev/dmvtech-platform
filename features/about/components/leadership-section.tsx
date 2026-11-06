import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { founderProfile } from "@/constants";
import { FounderMessage } from "./founder-message";
import { FounderProfile } from "./founder-profile";

/** "Meet our founder" — two columns on desktop: portrait on the left, story and message on the right. */
export function LeadershipSection() {
  const founder = founderProfile;

  return (
    <Section
      id="founder"
      aria-labelledby="founder-heading"
      spacing="none"
      className="bg-gradient-to-b from-hero-ice to-background py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          <FounderProfile founder={founder} />

          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-hero-royal">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hero-royal" />
              Meet our founder
            </p>
            <h2
              id="founder-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-hero-navy sm:text-4xl"
            >
              {founder.name}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-hero-navy/80">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-8 font-display text-xl font-semibold text-hero-navy">Our philosophy</h3>
            <p className="mt-2 text-base leading-relaxed text-hero-navy/80">{founder.philosophy}</p>

            <div className="mt-8">
              <FounderMessage founder={founder} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
