import { HeroSection } from "@/features/hero";
import {
  ConsultationCta,
  FaqSection,
  IndustriesSection,
  ProcessSection,
  ServicesSection,
  TechnologySection,
  TestimonialsSection,
  WhyChooseUs,
} from "@/features/home";
import { JsonLd } from "@/features/page";
import { buildPageMetadata } from "@/utils/seo";
import { buildLocalBusinessJsonLd } from "@/utils/structured-data";
import { heroConfig, seoConfig } from "@/constants";
import type { Metadata } from "next";

const homeMetadata = buildPageMetadata({
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  path: "/",
});

// The home title already contains the brand name, so it bypasses the "%s | DMV Tech" template.
export const metadata: Metadata = {
  ...homeMetadata,
  title: { absolute: seoConfig.defaultTitle },
  openGraph: { ...homeMetadata.openGraph, title: seoConfig.defaultTitle },
  twitter: { ...homeMetadata.twitter, title: seoConfig.defaultTitle },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <HeroSection content={heroConfig} />
      <ServicesSection />
      <WhyChooseUs />
      <IndustriesSection />
      <ProcessSection />
      <TechnologySection />
      <TestimonialsSection />
      <FaqSection />
      <ConsultationCta />
    </>
  );
}
