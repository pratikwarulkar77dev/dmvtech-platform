import type { Metadata } from "next";
import { LegalDocument, privacyPolicy } from "@/features/legal";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalDocument document={privacyPolicy} />;
}
