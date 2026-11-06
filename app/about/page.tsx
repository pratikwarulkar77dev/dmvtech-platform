import type { Metadata } from "next";
import { AboutPage } from "@/features/about";
import { buildPageMetadata } from "@/utils/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "About DMV Tech Services, a family-owned IT services business founded in 2019 by Mohinish Varulkar: our story, founder, expertise, team and locations.",
  path: "/about",
});

export default function About() {
  return <AboutPage />;
}
