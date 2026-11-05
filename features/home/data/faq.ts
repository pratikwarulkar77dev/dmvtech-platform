import { companyInfo, industriesConfig, servicesConfig } from "@/constants";
import type { FaqItem, SectionIntroContent } from "../types";

export const faqIntro: SectionIntroContent = {
  eyebrow: "FAQ",
  title: "Frequently asked questions",
  description: "Straight answers to the questions we hear most often.",
};

const listFormatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

const liveServices = servicesConfig.filter((s) => s.availability === "live").map((s) => s.title);
const comingSoonServices = servicesConfig
  .filter((s) => s.availability === "coming-soon")
  .map((s) => s.title);
const offices = companyInfo.locations.map((l) => l.city);
const industries = industriesConfig.map((i) => i.title);

export const faqItems: readonly FaqItem[] = [
  {
    id: "services",
    question: "What services does DMV Tech offer today?",
    answer: `We currently offer ${listFormatter.format(liveServices)}.`,
  },
  {
    id: "coming-soon",
    question: "Do you offer software development and cloud services?",
    answer: `Website design and development is available now. ${listFormatter.format(
      comingSoonServices
    )} are in development and are marked as coming soon.`,
  },
  {
    id: "location",
    question: "Where is DMV Tech based?",
    answer: `We have offices in ${listFormatter.format(offices)}, Maharashtra, India.`,
  },
  {
    id: "quote",
    question: "How do I request a quote or consultation?",
    answer:
      "Use the Get a Quote button or request a free consultation and tell us about your site and requirements. We will follow up to discuss next steps.",
  },
  {
    id: "consultation",
    question: "What happens during a consultation?",
    answer:
      "We talk through your goals and current setup, then move to an assessment of your site and a clear proposal. There is no obligation to proceed.",
  },
  {
    id: "support",
    question: "Do you provide support after installation?",
    answer:
      "Yes. Ongoing maintenance and support are available, including annual maintenance contracts (AMC) that keep upkeep scheduled and predictable.",
  },
  {
    id: "industries",
    question: "Which industries do you work with?",
    answer: `Our services suit ${listFormatter.format(industries)}.`,
  },
];
