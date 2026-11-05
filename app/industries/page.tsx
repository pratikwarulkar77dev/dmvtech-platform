import type { Metadata } from "next";
import { IndustriesIndex } from "@/features/industries";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries We Serve",
  description:
    "How DMV Tech Services' networking, security and managed IT services suit manufacturing, education, banking and cooperative societies, healthcare, retail and professional services.",
  path: "/industries",
});

export default function IndustriesPage() {
  return <IndustriesIndex />;
}
