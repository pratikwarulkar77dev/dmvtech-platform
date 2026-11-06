import {
  companyInfo,
  companyProfile,
  seoConfig,
  siteConfig,
  socialLinks,
} from "@/constants";
import type { CompanyOffice } from "@/types";
import { absoluteUrl } from "./seo";

function postalAddress(office: CompanyOffice) {
  return {
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    addressLocality: office.locality ? `${office.locality}, ${office.city}` : office.city,
    addressRegion: office.state,
    postalCode: office.postalCode,
    addressCountry: office.countryCode,
  };
}

/**
 * LocalBusiness structured data built only from verified details in
 * `companyProfile`. No coordinates, ratings, opening hours or service areas are
 * included because none have been supplied.
 */
export function buildLocalBusinessJsonLd() {
  const [registered, ...others] = companyProfile.offices;
  const sameAs = socialLinks.map((l) => l.href.trim()).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/")}#business`,
    name: companyProfile.name,
    legalName: companyProfile.legalName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    logo: absoluteUrl(seoConfig.ogImage),
    image: absoluteUrl(seoConfig.ogImage),
    telephone: `+${companyProfile.phone.digits}`,
    email: companyProfile.emails.primary,
    taxID: companyProfile.gstin,
    foundingDate: String(companyInfo.foundedYear),
    founder: { "@type": "Person", name: companyInfo.founderName, jobTitle: "Founder" },
    ...(registered ? { address: postalAddress(registered) } : {}),
    location: [registered, ...others].filter(Boolean).map((office) => ({
      "@type": "Place",
      name: `${companyProfile.name} — ${office!.label}`,
      address: postalAddress(office!),
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
