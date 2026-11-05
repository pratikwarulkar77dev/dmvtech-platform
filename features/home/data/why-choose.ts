import { companyInfo, servicesConfig } from "@/constants";
import type { FeatureItem, SectionIntroContent, StatItem } from "../types";

export const whyChooseIntro: SectionIntroContent = {
  eyebrow: "Why DMV Tech",
  title: "A dependable technology partner for growing businesses",
  description:
    "Businesses shouldn't have to manage five different vendors for five different technology needs. We bring the work together under one accountable team.",
};

const officeCount = companyInfo.locations.length;
const liveServiceCount = servicesConfig.filter((s) => s.availability === "live").length;

/** Every figure below is derived from the shared company and services config. */
export const whyChooseStats: readonly StatItem[] = [
  { id: "founded", value: String(companyInfo.foundedYear), label: "Year DMV Tech was founded" },
  { id: "offices", value: String(officeCount), label: "Offices in Maharashtra" },
  { id: "services", value: String(liveServiceCount), label: "Services available today" },
];

export const whyChooseItems: readonly FeatureItem[] = [
  {
    id: "one-partner",
    title: "One partner, not five vendors",
    description:
      "Networking, surveillance, access control, websites and support are coordinated by a single team, so nothing falls between suppliers.",
    icon: "layers",
  },
  {
    id: "since-2019",
    title: "Infrastructure-first foundation",
    description:
      "Founded in 2019, DMV Tech starts with dependable infrastructure and is building toward software and cloud services as client needs grow.",
    icon: "calendar-check",
  },
  {
    id: "local",
    title: "Offices in Lonavla and Pimpri-Chinchwad",
    description:
      "Our Registered Office in Lonavla and Main Branch in Akurdi, Pimpri-Chinchwad keep our team close to the businesses we support.",
    icon: "map-pin",
  },
  {
    id: "assessment-led",
    title: "Recommendations that fit your site",
    description:
      "We assess your environment before proposing anything, so advice reflects your premises and goals rather than a generic package.",
    icon: "search-check",
  },
  {
    id: "predictable-support",
    title: "Predictable ongoing support",
    description:
      "Annual maintenance contracts keep upkeep scheduled and budgets predictable instead of reacting to every failure.",
    icon: "wallet",
  },
  {
    id: "plain-language",
    title: "Plain-language communication",
    description:
      "We explain options and trade-offs in terms business owners can act on, without unnecessary jargon.",
    icon: "message-square",
  },
];
