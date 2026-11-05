import Link from "next/link";
import { ROUTES } from "@/constants";
import { PageHeader, PageSection } from "@/features/page";
import type { LegalDocumentContent } from "../data/documents";

export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: ROUTES.home }, { label: document.title }]}
        title={document.title}
        description={document.intro}
      />
      <PageSection narrow labelledBy="legal-contents">
        <p className="text-sm text-hero-navy/70">Last updated: {document.lastUpdated}</p>

        <nav aria-label="On this page" className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 id="legal-contents" className="text-sm font-semibold uppercase tracking-wide text-hero-navy">
            Contents
          </h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
            {document.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="rounded-md text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {document.sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
              <h2 id={`${section.id}-heading`} className="font-display text-xl font-semibold text-hero-navy sm:text-2xl">
                {index + 1}. {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-relaxed text-hero-navy/80">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-hero-navy/80">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-hero-navy/70">
          Questions? <Link href={ROUTES.contact} className="font-medium text-hero-royal hover:underline">Contact us</Link>.
        </p>
      </PageSection>
    </>
  );
}
