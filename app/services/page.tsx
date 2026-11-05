import type { Metadata } from "next";
import { ServicesIndex } from "@/features/services";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Services",
  description:
    "Network design and implementation, AMC and managed support, CCTV surveillance, biometric access control, website development and IT consulting from DMV Tech Services.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesIndex />;
}
