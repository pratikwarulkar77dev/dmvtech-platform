import Link from "next/link";
import { ArrowRight, Building2, Layers, MessagesSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants";
import { FaqSection, HOME_ICONS, processSteps } from "@/features/home";
import { PageCta, PageHeader, PageSection } from "@/features/page";
import { buildContactHref } from "@/utils/contact-links";

const startHere = [
  {
    title: "Explore our services",
    description: "See what we offer today and what is coming soon.",
    href: ROUTES.services,
    icon: Layers,
  },
  {
    title: "Find your industry",
    description: "See how our services fit the way your sector works.",
    href: ROUTES.industries,
    icon: Building2,
  },
  {
    title: "Talk to our team",
    description: "Ask a question or request a free consultation.",
    href: buildContactHref("consultation"),
    icon: MessagesSquare,
  },
] as const;

export function ResourcesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: "Resources" }]}
        eyebrow="Resources"
        title="Helpful starting points"
        description="Where to begin, how we work with clients, and answers to common questions."
      />

      <PageSection labelledBy="start-heading">
        <h2 id="start-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
          Start here
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {startHere.map((item) => (
            <li key={item.title} className="flex">
              <Card className="group relative flex w-full flex-col p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-premium motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero-sky text-hero-royal">
                  <item.icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-hero-navy">
                  <Link
                    href={item.href}
                    className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-hero-navy/75">{item.description}</p>
                <span aria-hidden className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-hero-royal">
                  Go <ArrowRight className="h-4 w-4" />
                </span>
              </Card>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection tinted labelledBy="how-we-work-heading">
        <h2 id="how-we-work-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
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
        <p className="mt-8 text-sm text-hero-navy/70">
          Articles, case studies and project write-ups will be added here once there is approved content to share.
        </p>
      </PageSection>

      <FaqSection />

      <PageCta
        title="Still have a question?"
        description="Send us a message or call us — we are happy to help."
        primary={{ label: "Contact us", href: ROUTES.contact }}
        secondary={{ label: "Get a Free Consultation", href: buildContactHref("consultation") }}
      />
    </>
  );
}
