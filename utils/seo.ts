import type { Metadata } from "next";
import { seoConfig, siteConfig } from "@/constants";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/services". Used for the canonical URL and og:url. */
  path: string;
}

/** Absolute URL for a site path (uses NEXT_PUBLIC_SITE_URL). */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Unique title, description, canonical URL, Open Graph and Twitter metadata for a page.
 * The root layout supplies `metadataBase` and the "%s | DMV Tech" title template.
 */
export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const image = {
    url: seoConfig.ogImage,
    width: 150,
    height: 150,
    alt: `${siteConfig.legalName} logo`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image.url],
    },
  };
}
