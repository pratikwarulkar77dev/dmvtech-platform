import { ROUTES } from "@/constants";

export type ContactIntent = "quote" | "consultation" | "enquiry";

/** Link to the contact page, optionally pre-selecting the enquiry type and service. */
export function buildContactHref(intent: ContactIntent, serviceSlug?: string): string {
  const params = new URLSearchParams({ intent });
  if (serviceSlug) params.set("service", serviceSlug);
  return `${ROUTES.contact}?${params.toString()}`;
}
