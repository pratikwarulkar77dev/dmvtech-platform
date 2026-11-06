import type { FounderProfile } from "@/types";
import { companyInfo } from "./company";

/**
 * Founder profile. Facts below were supplied by the business. Do not add
 * qualifications, years of personal experience, awards or personal quotations
 * unless the founder has provided and approved them.
 */
export const founderProfile: FounderProfile = {
  name: companyInfo.founderName,
  designation: "Founder, DMV Tech Services",
  foundedYear: companyInfo.foundedYear,
  photo: {
    src: "/images/team/mohinish-varulkar.jpg",
    width: 365,
    height: 365,
    alt: `Portrait of ${companyInfo.founderName}, Founder of DMV Tech Services`,
  },
  linkedinUrl: "",
  bio: [
    `${companyInfo.founderName} founded DMV Tech Services in ${companyInfo.foundedYear}. The company began with computer servicing, computer repairing and networking.`,
    "Over time the business grew to cover computer sales, desktop and laptop solutions, Wi-Fi and networking infrastructure, CCTV and biometric security systems, printers and peripherals, website design and development, annual maintenance contracts, and IT infrastructure and technical support.",
    "DMV Tech Services is a family-owned and operated business, and it continues to be built around understanding what each customer needs.",
  ],
  philosophy:
    "Understand the customer's requirement first, then deliver dependable, practical and high-quality IT solutions, backed by responsive service and long-term support.",
  /**
   * Suggested editorial copy. Set `approved` to true only after the founder
   * has confirmed this wording. Until then the About page presents it as the
   * company's service commitment, not as a quotation from the founder.
   */
  message: {
    text: "At DMV Tech Services, our goal is to understand every customer's technology needs and provide dependable solutions backed by responsive service and long-term support.",
    approved: false,
  },
};
