import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ROUTES, companyProfile, formatOfficeAddress } from "@/constants";
import { buildGeneralWhatsAppUrl } from "@/features/enquiry";
import { SectionHeading } from "@/features/home";
import { PageCta, PageHeader, PageSection } from "@/features/page";
import { buildContactHref } from "@/utils/contact-links";
import {
  aboutHero,
  audiences,
  audiencesIntro,
  expertiseIntro,
  expertiseItems,
  locationsIntro,
  missionVision,
  missionVisionIntro,
  storyIntro,
  storyMilestones,
  teamDepartments,
  teamIntro,
} from "../data/about-content";
import { ABOUT_ICONS } from "../lib/about-icons";
import { LeadershipSection } from "./leadership-section";

const iconTile = "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-hero-sky text-hero-royal";

export function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: "About" }]}
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
      />

      <PageSection labelledBy="story-heading">
        <SectionHeading intro={storyIntro} id="story-heading" />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {storyMilestones.map((milestone) => (
            <li key={milestone.id}>
              <Card className="h-full p-6">
                <p className="font-display text-2xl font-bold text-hero-royal">{milestone.label}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-hero-navy">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-hero-navy/75">{milestone.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </PageSection>

      <LeadershipSection />

      <PageSection labelledBy="mission-heading">
        <SectionHeading intro={missionVisionIntro} id="mission-heading" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-hero-navy">Our mission</h3>
            <p className="mt-3 text-base leading-relaxed text-hero-navy/80">{missionVision.mission}</p>
          </Card>
          <Card className="p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-hero-navy">Our vision</h3>
            <p className="mt-3 text-base leading-relaxed text-hero-navy/80">{missionVision.vision}</p>
          </Card>
        </div>
      </PageSection>

      <PageSection tinted labelledBy="expertise-heading">
        <SectionHeading intro={expertiseIntro} id="expertise-heading" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseItems.map((item) => {
            const Icon = ABOUT_ICONS[item.icon];
            return (
              <li key={item.id}>
                <Card className="flex h-full items-center gap-4 p-5">
                  <span className={iconTile}>
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-hero-navy">{item.title}</span>
                </Card>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-sm">
          <Link href={ROUTES.services} className="inline-flex items-center gap-1.5 font-semibold text-hero-royal hover:underline">
            Explore our services <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </p>
      </PageSection>

      <PageSection labelledBy="team-heading">
        <SectionHeading intro={teamIntro} id="team-heading" />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamDepartments.map((department) => {
            const Icon = ABOUT_ICONS[department.icon];
            return (
              <li key={department.id}>
                <Card className="flex h-full flex-col items-center gap-3 p-6 text-center">
                  <span className={iconTile}>
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="font-display text-base font-semibold text-hero-navy">{department.title}</span>
                </Card>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection tinted labelledBy="audiences-heading">
        <SectionHeading intro={audiencesIntro} id="audiences-heading" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = ABOUT_ICONS[audience.icon];
            const body = (
              <>
                <span className={iconTile}>
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="font-medium text-hero-navy">{audience.title}</span>
              </>
            );
            return (
              <li key={audience.id}>
                <Card className="h-full p-0">
                  {audience.href ? (
                    <Link
                      href={audience.href}
                      className="flex h-full items-center gap-4 rounded-xl p-5 hover:bg-hero-ice/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="flex h-full items-center gap-4 p-5">{body}</div>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection labelledBy="locations-heading">
        <SectionHeading intro={locationsIntro} id="locations-heading" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {companyProfile.offices.map((office) => (
            <li key={office.id}>
              <Card className="h-full p-6">
                <h3 className="font-display text-lg font-semibold text-hero-navy">{office.label}</h3>
                <address className="mt-3 flex items-start gap-2 text-sm not-italic leading-relaxed text-hero-navy/75">
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hero-royal" />
                  {formatOfficeAddress(office)}
                </address>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm">
          <Link href={ROUTES.contact} className="font-medium text-hero-royal hover:underline">
            See maps, directions and contact details
          </Link>
        </p>
      </PageSection>

      <PageCta
        title="Let’s talk about your IT needs"
        description="Tell us what you need and our team will help you find a practical solution."
        primary={{ label: "Get a Free Consultation", href: buildContactHref("consultation") }}
        secondary={{ label: "Message us on WhatsApp", href: buildGeneralWhatsAppUrl(), external: true }}
      />
    </>
  );
}
