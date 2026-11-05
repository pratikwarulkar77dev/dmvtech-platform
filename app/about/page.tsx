import type { Metadata } from "next";
import { AboutPage } from "@/features/about";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "About DMV Tech Services: our mission, our offices in Lonavla and Akurdi (Pimpri-Chinchwad), and how we work with clients.",
  path: "/about",
});

export default function About() {
  return <AboutPage />;
}
