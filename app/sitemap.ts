import type { MetadataRoute } from "next";
import { ROUTES, industriesConfig, servicesConfig } from "@/constants";
import { absoluteUrl } from "@/utils/seo";

/** Lists every public page that actually exists. Add new routes here when later modules create them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    ROUTES.home,
    ROUTES.services,
    ROUTES.industries,
    ROUTES.about,
    ROUTES.contact,
    ROUTES.resources,
    ROUTES.privacyPolicy,
    ROUTES.terms,
  ];
  const paths = [
    ...staticPaths,
    ...servicesConfig.map((s) => ROUTES.service(s.slug)),
    ...industriesConfig.map((i) => ROUTES.industry(i.slug)),
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === ROUTES.home ? "weekly" : "monthly",
    priority: path === ROUTES.home ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
