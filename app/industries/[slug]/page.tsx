import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industriesConfig } from "@/constants";
import { IndustryDetailPage } from "@/features/industries";
import { buildPageMetadata } from "@/utils/seo";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return industriesConfig.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesConfig.find((i) => i.slug === slug);
  if (!industry) return {};
  return buildPageMetadata({
    title: `IT Services for ${industry.title}`,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = industriesConfig.find((i) => i.slug === slug);
  if (!industry) notFound();
  return <IndustryDetailPage industry={industry} />;
}
