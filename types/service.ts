export type ServiceCategory =
  | "Infrastructure & Managed IT"
  | "Security Solutions"
  | "Digital & Software Solutions"
  | "IT Consulting";

export type ServiceAvailability = "live" | "coming-soon";

/**
 * Static, build-time service metadata used for navigation and the homepage
 * services grid before the database layer exists. Module 17 (Database) and
 * Module 18 (API Layer) introduce the Prisma-backed `Service` model that
 * will eventually replace this as the source of truth for editable content;
 * this config remains useful afterward as the fallback/default data set.
 */
export interface ServiceSummary {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  availability: ServiceAvailability;
}
