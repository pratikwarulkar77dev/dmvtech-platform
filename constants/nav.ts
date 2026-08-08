import type { NavItem } from "@/types";
import { ROUTES } from "./routes";
import { servicesConfig } from "./services";

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: ROUTES.services,
    children: servicesConfig
      .filter((s) => s.availability === "live")
      .map((s) => ({
        label: s.title,
        href: ROUTES.service(s.slug),
        description: s.summary,
      })),
  },
  { label: "Industries", href: ROUTES.industries },
  { label: "About", href: ROUTES.about },
  { label: "Careers", href: ROUTES.careers },
  { label: "Insights", href: ROUTES.blog },
  { label: "Contact", href: ROUTES.contact },
];

export const footerNav: Record<string, NavItem[]> = {
  Services: servicesConfig
    .filter((s) => s.availability === "live")
    .map((s) => ({ label: s.title, href: ROUTES.service(s.slug) })),
  Company: [
    { label: "About Us", href: ROUTES.about },
    { label: "Careers", href: ROUTES.careers },
    { label: "Industries", href: ROUTES.industries },
    { label: "Insights", href: ROUTES.blog },
  ],
  Legal: [
    { label: "Privacy Policy", href: ROUTES.privacyPolicy },
    { label: "Terms of Service", href: ROUTES.terms },
  ],
};
