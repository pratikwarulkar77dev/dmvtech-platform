import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesConfig } from "@/constants";
import { ServiceDetail } from "@/features/services";
import { buildPageMetadata } from "@/utils/seo";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Only slugs defined in `servicesConfig` exist; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesConfig.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesConfig.find((s) => s.slug === slug);
  if (!service) return {};
  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesConfig.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
