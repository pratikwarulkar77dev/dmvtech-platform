import type { Metadata } from "next";
import { ResourcesPage } from "@/features/resources";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Where to start with DMV Tech Services: how we work, answers to common questions, and ways to get in touch.",
  path: "/resources",
});

export default function Resources() {
  return <ResourcesPage />;
}
