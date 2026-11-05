import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES, industriesConfig, servicesConfig } from "@/constants";
import { NAV_ICONS } from "@/features/navigation";
import { PageCta, PageHeader, PageSection } from "@/features/page";
import { buildContactHref } from "@/utils/contact-links";
import type { IndustrySummary } from "@/types";
import { industryDetails } from "../data/industry-details";

export function IndustriesIndex() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: "Industries" }]}
        eyebrow="Industries we serve"
        title="Technology that fits your sector"
        description="Different environments have different priorities. These are the sectors our infrastructure, security and support services are built to suit."
      />
      <PageSection labelledBy="industries-list-heading">
        <h2 id="industries-list-heading" className="sr-only">
          Industries
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industriesConfig.map((industry) => {
            const Icon = NAV_ICONS[industry.icon];
            return (
              <li key={industry.slug} className="flex">
                <Card className="group relative flex w-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-hero-royal/30 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-hero-sky text-hero-royal">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-hero-navy">
                    <Link
                      href={ROUTES.industry(industry.slug)}
                      className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                    >
                      {industry.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-hero-navy/75">{industry.summary}</p>
                  <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-hero-royal">
                    View sector <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </li>
            );
          })}
        </ul>
      </PageSection>
      <PageCta
        title="Tell us about your sector"
        description="Share what your site needs and we will suggest a practical starting point."
        primary={{ label: "Get a Free Consultation", href: buildContactHref("consultation") }}
        secondary={{ label: "View services", href: ROUTES.services }}
      />
    </>
  );
}

export function IndustryDetailPage({ industry }: { industry: IndustrySummary }) {
  const detail = industryDetails[industry.slug];
  const Icon = NAV_ICONS[industry.icon];
  const services = (detail?.relevantServices ?? [])
    .map((slug) => servicesConfig.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: ROUTES.home },
          { label: "Industries", href: ROUTES.industries },
          { label: industry.title },
        ]}
        eyebrow="Industry"
        title={industry.title}
        description={industry.summary}
        aside={
          <span aria-hidden className="hidden h-28 w-28 place-items-center justify-self-center rounded-3xl bg-hero-sky text-hero-royal shadow-elevated lg:grid">
            <Icon className="h-14 w-14" />
          </span>
        }
      />

      <PageSection labelledBy="sector-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="sector-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
              Overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-hero-navy/75">{detail?.overview ?? industry.summary}</p>
          </div>
          {detail && (
            <div>
              <h2 className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">Typical priorities</h2>
              <ul className="mt-4 space-y-3">
                {detail.priorities.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-hero-navy shadow-soft">
                    <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-hero-sky text-hero-royal">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </PageSection>

      {services.length > 0 && (
        <PageSection tinted labelledBy="relevant-services-heading">
          <h2 id="relevant-services-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
            Services commonly relevant to this sector
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Card className="h-full p-5">
                  <h3 className="font-display text-base font-semibold text-hero-navy">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{service.summary}</p>
                  {service.availability === "coming-soon" && (
                    <Badge variant="outline" className="mt-4">
                      Coming soon
                    </Badge>
                  )}
                  <Link
                    href={ROUTES.service(service.slug)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View {service.title}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <PageCta
        title={`IT support for ${industry.title.toLowerCase()}`}
        description="Tell us about your premises and priorities. We will suggest a practical starting point."
        primary={{ label: "Get a Free Consultation", href: buildContactHref("consultation") }}
        secondary={{ label: "All industries", href: ROUTES.industries }}
      />
    </>
  );
}
