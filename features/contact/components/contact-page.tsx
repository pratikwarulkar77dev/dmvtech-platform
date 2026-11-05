import { Suspense } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ROUTES, companyProfile } from "@/constants";
import { PageHeader, PageSection } from "@/features/page";
import { ContactActions } from "./contact-actions";
import { ContactForm } from "./contact-form";
import { OfficeMapCard } from "./office-map-card";

export function ContactPage() {
  const { phone, whatsapp, emails, gstin } = companyProfile;

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: "Contact" }]}
        eyebrow="Contact us"
        title="Let’s talk about your technology needs"
        description="Send an enquiry, call, or message us on WhatsApp. Tell us what you are looking for and we will get back to you."
      />

      <PageSection labelledBy="enquiry-form-heading">
        <ContactActions />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* useSearchParams in the form requires a Suspense boundary so the page can stay statically rendered. */}
          <Suspense fallback={<div className="h-96 rounded-2xl border border-border bg-card" aria-hidden />}>
            <ContactForm />
          </Suspense>

          <aside aria-label="Contact details" className="space-y-5">
            <Card className="p-6">
              <h2 className="font-display text-lg font-semibold text-hero-navy">Direct contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-hero-navy/80">
                <li className="flex items-start gap-3">
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hero-royal" />
                  <a href={phone.href} className="hover:text-hero-royal hover:underline">{phone.display}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hero-royal" />
                  <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-hero-royal hover:underline">
                    WhatsApp {whatsapp.display}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                {[emails.primary, emails.alternate].map((email) => (
                  <li key={email} className="flex items-start gap-3">
                    <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hero-royal" />
                    <a href={`mailto:${email}`} className="break-all hover:text-hero-royal hover:underline">{email}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm text-hero-navy/70">
                <span className="font-medium text-hero-navy">GSTIN:</span> {gstin}
              </p>
            </Card>
          </aside>
        </div>
      </PageSection>

      <PageSection tinted labelledBy="locations-heading">
        <h2 id="locations-heading" className="font-display text-2xl font-bold text-hero-navy sm:text-3xl">
          Our offices
        </h2>
        <p className="mt-3 max-w-2xl text-hero-navy/75">
          Visit us at either office. Maps load only when you choose to show them.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {companyProfile.offices.map((office) => (
            <li key={office.id}>
              <OfficeMapCard office={office} />
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
