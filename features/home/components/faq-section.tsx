import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { faqIntro, faqItems } from "../data";
import { SectionHeading } from "./section-heading";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function FaqSection() {
  return (
    <Section id="faq" aria-labelledby="faq-heading" spacing="none" className="py-12 sm:py-16 lg:py-20">
      <Container size="narrow">
        <SectionHeading intro={faqIntro} id="faq-heading" />

        <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-border bg-card px-2 shadow-soft sm:px-6">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="last:border-b-0">
              <AccordionTrigger className="gap-4 text-hero-navy hover:text-hero-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-hero-navy/75">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      </Container>
    </Section>
  );
}
