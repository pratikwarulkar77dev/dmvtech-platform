import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ROUTES, companyInfo, companyProfile, formatOfficeAddress, servicesConfig } from "@/constants";
import { HOME_ICONS, commitments } from "@/features/home";
import { PageCta, PageHeader, PageSection } from "@/features/page";
import { buildContactHref } from "@/utils/contact-links";

export function AboutPage() {
  const facts = [
    { label: "Business name", value: companyProfile.legalName },
    { label: "Founded", value: String(companyInfo.foundedYear) },
    { label: "Founder", value: companyInfo.founderName },
    { label: "GSTIN", value: companyProfile.gstin },
  ];
  const liveServices = servicesConfig.filter((s) => s.availability === "live");

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: "About" }]}
        eyebrow="About us"
        title="One dependable technology partner"
        description={companyInfo.summary}
      />

      <PageSection labelledBy="mission-heading">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="mission-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-hero-navy/75">{companyInfo.mission}</p>
            <p className="mt-4 text-base leading-relaxed text-hero-navy/75">
              Today we provide {liveServices.map((s) => s.title.toLowerCase()).join(", ")}. Software development and
              cloud services are in development.
            </p>
            <Link
              href={ROUTES.services}
              className="mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore our services <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-hero-navy">Business details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-hero-navy/75">{fact.label}</dt>
                  <dd className="font-medium text-hero-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </PageSection>

      <PageSection tinted labelledBy="offices-heading">
        <h2 id="offices-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
          Our offices
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {companyProfile.offices.map((office) => (
            <li key={office.id}>
              <Card className="h-full p-6">
                <h3 className="font-display text-lg font-semibold text-hero-navy">{office.label}</h3>
                <address className="mt-3 text-sm not-italic leading-relaxed text-hero-navy/75">
                  {formatOfficeAddress(office)}
                </address>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href={ROUTES.contact} className="font-medium text-hero-royal hover:underline">
            See maps, directions and contact details
          </Link>
        </p>
      </PageSection>

      <PageSection labelledBy="approach-heading">
        <h2 id="approach-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
          How we work with clients
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => {
            const Icon = HOME_ICONS[item.icon];
            return (
              <li key={item.id}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero-sky text-hero-royal">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-hero-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{item.description}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageCta
        title="Let’s talk about your IT needs"
        description="Tell us about your business and goals. We will help you find a practical starting point."
        primary={{ label: "Get a Free Consultation", href: buildContactHref("consultation") }}
        secondary={{ label: "Contact us", href: ROUTES.contact }}
      />
    </>
  );
}
