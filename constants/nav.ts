import type {
  NavCta,
  NavGroup,
  NavIconName,
  NavItem,
  NavLinkItem,
  PrimaryNavItem,
  ServiceCategory,
} from "@/types";
import { industriesConfig } from "./industries";
import { ROUTES } from "./routes";
import { servicesConfig } from "./services";

/** Display order and icon for each service category in the Services mega menu. */
const SERVICE_CATEGORY_ORDER: { category: ServiceCategory; icon: NavIconName }[] = [
  { category: "Infrastructure & Managed IT", icon: "network" },
  { category: "Security Solutions", icon: "shield-check" },
  { category: "Digital & Software Solutions", icon: "code" },
  { category: "IT Consulting", icon: "compass" },
];

const serviceNavGroups: NavGroup[] = SERVICE_CATEGORY_ORDER.map(({ category, icon }) => ({
  title: category,
  icon,
  items: servicesConfig
    .filter((service) => service.category === category)
    .map<NavLinkItem>((service) => {
      const comingSoon = service.availability === "coming-soon";
      return {
        label: service.title,
        href: ROUTES.service(service.slug),
        description: service.summary,
        disabled: comingSoon,
        badge: comingSoon ? "Soon" : undefined,
      };
    }),
})).filter((group) => group.items.length > 0);

const industryNavItems: NavLinkItem[] = industriesConfig.map((industry) => ({
  label: industry.title,
  href: ROUTES.industry(industry.slug),
  description: industry.summary,
  icon: industry.icon,
}));

export const primaryNav: PrimaryNavItem[] = [
  {
    type: "mega",
    id: "services",
    label: "Services",
    href: ROUTES.services,
    groups: serviceNavGroups,
    featured: {
      title: "Not sure where to start?",
      description:
        "Tell us about your environment and goals. We'll recommend a practical starting point.",
      cta: { label: "Talk to our team", href: ROUTES.contact },
    },
    footerLink: { label: "View all services", href: ROUTES.services },
  },
  {
    type: "dropdown",
    id: "industries",
    label: "Industries",
    columns: 2,
    items: industryNavItems,
    footerLink: { label: "View all industries", href: ROUTES.industries },
  },
  {
    type: "dropdown",
    id: "resources",
    label: "Resources",
    columns: 1,
    items: [
      {
        label: "Insights",
        href: ROUTES.blog,
        description: "Articles on infrastructure, security, and cloud.",
        icon: "book-open",
      },
      {
        label: "Case Studies",
        href: ROUTES.caseStudies,
        description: "Problem, approach, and outcome write-ups.",
        icon: "file-text",
      },
      {
        label: "Projects",
        href: ROUTES.projects,
        description: "Selected work and the technology behind it.",
        icon: "folder-kanban",
      },
    ],
  },
  {
    type: "dropdown",
    id: "about",
    label: "About",
    columns: 1,
    items: [
      {
        label: "About Us",
        href: ROUTES.about,
        description: "Our story, mission, and approach.",
        icon: "building",
      },
      {
        label: "Careers",
        href: ROUTES.careers,
        description: "Open roles and how we work.",
        icon: "users",
      },
      {
        label: "Contact",
        href: ROUTES.contact,
        description: "Offices, phone, and enquiry form.",
        icon: "mail",
      },
    ],
  },
];

/** Primary call-to-action shown in the navbar and the mobile drawer. */
export const navCta: NavCta = {
  label: "Get a Quote",
  href: ROUTES.quote,
};

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
