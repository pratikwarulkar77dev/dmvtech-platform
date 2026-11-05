import type { Metadata } from "next";
import { LegalDocument, termsAndConditions } from "@/features/legal";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.description,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return <LegalDocument document={termsAndConditions} />;
}
