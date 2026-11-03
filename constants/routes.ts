/**
 * Central route map. Every internal href in the app should be built from
 * this object rather than a hardcoded string, so a URL change is a one-line
 * edit instead of a find-and-replace across the codebase.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  industries: "/industries",
  industry: (slug: string) => `/industries/${slug}`,
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  caseStudies: "/case-studies",
  caseStudy: (slug: string) => `/case-studies/${slug}`,
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  careers: "/careers",
  career: (slug: string) => `/careers/${slug}`,
  contact: "/contact",
  /** Same page as `contact`; the intent query lets the Contact module pre-select the quote form. */
  quote: "/contact?intent=quote",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  admin: {
    root: "/admin",
    login: "/admin/login",
    dashboard: "/admin/dashboard",
  },
} as const;
