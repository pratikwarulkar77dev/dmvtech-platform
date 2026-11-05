import type { MetadataRoute } from "next";
import { ROUTES } from "@/constants";
import { absoluteUrl } from "@/utils/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [ROUTES.admin.root, "/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
