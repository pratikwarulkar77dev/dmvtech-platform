import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";
import { JsonLd } from "@/features/page";
import { buildPageMetadata } from "@/utils/seo";
import { buildLocalBusinessJsonLd } from "@/utils/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Contact DMV Tech Services by phone, WhatsApp or email, send an enquiry, or visit our Lonavla and Akurdi (Pimpri-Chinchwad) offices.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <ContactPage />
    </>
  );
}
