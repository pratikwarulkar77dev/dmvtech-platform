import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ROUTES, servicesConfig } from "@/constants";
import { HOME_ICONS } from "@/features/home";
import { PageCta, PageHeader, PageSection } from "@/features/page";
import { buildContactHref } from "@/utils/contact-links";
import type { ServiceCategory } from "@/types";
import { SERVICE_ICON_BY_SLUG } from "../lib/icons";

const CATEGORY_ORDER: readonly ServiceCategory[] = [
  "Infrastructure & Managed IT",
  "Security Solutions",
  "Digital & Software Solutions",
  "IT Consulting",
];

export function ServicesIndex() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: "Services" }]}
        eyebrow="Our services"
        title="IT services for your business"
        description="Networking, surveillance, access control, support, websites and consulting from one team. Software and cloud services are in development."
      />

      {CATEGORY_ORDER.map((category, index) => {
        const items = servicesConfig.filter((s) => s.category === category);
        if (items.length === 0) return null;
        const headingId = `category-${index}`;
        return (
          <PageSection key={category} labelledBy={headingId} tinted={index % 2 === 1}>
            <h2 id={headingId} className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
              {category}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((service) => {
                const Icon = HOME_ICONS[SERVICE_ICON_BY_SLUG[service.slug] ?? "layers"];
                return (
                  <li key={service.slug} className="flex">
                    <Card className="group relative flex w-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-hero-royal/30 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-hero-sky text-hero-royal">
                          <Icon aria-hidden className="h-6 w-6" />
                        </span>
                        {service.availability === "coming-soon" && <Badge variant="outline">Coming soon</Badge>}
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-hero-navy">
                        <Link
                          href={ROUTES.service(service.slug)}
                          className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-hero-navy/75">{service.summary}</p>
                      <span
                        aria-hidden
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-hero-royal"
                      >
                        {service.availability === "coming-soon" ? "Learn more" : "View service"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                      </span>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </PageSection>
        );
      })}

      <PageCta
        title="Not sure which service you need?"
        description="Describe your site and your goals. We will recommend a practical starting point."
        primary={{ label: "Get a Free Consultation", href: buildContactHref("consultation") }}
        secondary={{ label: "Request a Quote", href: buildContactHref("quote") }}
      />
    </>
  );
}
