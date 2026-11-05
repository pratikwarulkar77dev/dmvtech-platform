import { ROUTES } from "@/constants";
import type { ConsultationCtaContent } from "../types";

export const consultationCta: ConsultationCtaContent = {
  title: "Ready to talk about your IT needs?",
  description:
    "Tell us about your business and what you want to achieve. We will help you find a practical starting point — no obligation.",
  primary: { label: "Get a Free Consultation", href: ROUTES.consultation },
  secondary: { label: "Request a Quote", href: ROUTES.quote },
};
