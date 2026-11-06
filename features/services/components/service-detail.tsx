import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES, servicesConfig } from "@/constants";
import { companyProfile } from "@/constants";
import { buildServiceWhatsAppUrl } from "@/features/enquiry";
import { JsonLd, PageCta, PageHeader, PageSection } from "@/features/page";
import { processSteps } from "@/features/home";
import { HOME_ICONS } from "@/features/home";
import { absoluteUrl } from "@/utils/seo";
import { buildContactHref } from "@/utils/contact-links";
import type { ServiceSummary } from "@/types";
import { serviceDetails } from "../data";

interface ServiceDetailProps {
  service: ServiceSummary;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const detail = serviceDetails[service.slug];
  const comingSoon = service.availability === "coming-soon";
  const related = servicesConfig.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absoluteUrl(ROUTES.service(service.slug)),
          serviceType: service.category,
          provider: { "@type": "LocalBusiness", "@id": `${absoluteUrl("/")}#business`, name: companyProfile.name },
        }}
      />
      <PageHeader
        breadcrumb={[
          { label: "Home", href: ROUTES.home },
          { label: "Services", href: ROUTES.services },
          { label: service.title },
        ]}
        eyebrow={service.category}
        title={service.title}
        description={service.summary}
        actions={
          comingSoon ? (
            <Button asChild size="lg" className="bg-hero-royal text-hero-royal-foreground hover:bg-hero-royal/90">
              <Link href={buildContactHref("enquiry", service.slug)}>
                Ask about this service <ArrowRight aria-hidden className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="bg-hero-royal text-hero-royal-foreground hover:bg-hero-royal/90">
                <Link href={buildContactHref("quote", service.slug)}>
                  Request a Quote <ArrowRight aria-hidden className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-hero-royal/30 bg-hero-white/70 text-hero-navy hover:border-hero-royal/50 hover:bg-hero-white hover:text-hero-navy"
              >
                <Link href={buildContactHref("consultation", service.slug)}>Free Consultation</Link>
              </Button>
            </>
          )
        }
      />

      <PageSection labelledBy="overview-heading">
        {comingSoon && (
          <div
            role="note"
            className="mb-8 flex items-start gap-3 rounded-xl border border-hero-royal/20 bg-hero-sky/50 p-4 text-sm text-hero-navy"
          >
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-hero-royal" />
            <p>
              <Badge variant="outline" className="mr-2">
                Coming soon
              </Badge>
              This service is in development and is not available yet. You are welcome to get in touch to
              ask about it.
            </p>
          </div>
        )}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="overview-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
              Overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-hero-navy/75">
              {detail?.overview ?? service.summary}
            </p>
          </div>
          {detail && (
            <div>
              <h2 className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
                {comingSoon ? "Planned scope" : "What’s included"}
              </h2>
              <ul className="mt-4 space-y-3">
                {detail.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-hero-navy shadow-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-hero-sky text-hero-royal"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </PageSection>

      <PageSection tinted labelledBy="process-heading">
        <h2 id="process-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
          How we work
        </h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = HOME_ICONS[step.icon];
            return (
              <li key={step.id}>
                <Card className="h-full p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-hero-sky text-hero-royal">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-hero-navy">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{step.description}</p>
                </Card>
              </li>
            );
          })}
        </ol>
      </PageSection>

      {related.length > 0 && (
        <PageSection labelledBy="related-heading">
          <h2 id="related-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
            Related services
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Card className="h-full p-5">
                  <h3 className="font-display text-base font-semibold text-hero-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{item.summary}</p>
                  {item.availability === "coming-soon" ? (
                    <Badge variant="outline" className="mt-4">
                      Coming soon
                    </Badge>
                  ) : null}
                  <Link
                    href={ROUTES.service(item.slug)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View {item.title}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <PageCta
        title={comingSoon ? "Interested in this service?" : `Talk to us about ${service.title}`}
        description="Tell us about your business and what you need. We will get back to you to discuss the next steps."
        primary={{
          label: comingSoon ? "Ask about this service" : "Get a Free Consultation",
          href: buildContactHref(comingSoon ? "enquiry" : "consultation", service.slug),
        }}
        secondary={{
          label: "Enquire on WhatsApp",
          href: buildServiceWhatsAppUrl(service.title, service.slug),
          external: true,
        }}
      />
    </>
  );
}
