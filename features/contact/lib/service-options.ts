import { servicesConfig } from "@/constants";

export const OTHER_SERVICE_VALUE = "other";

export interface ServiceOption {
  value: string;
  label: string;
}

/** Options for the "Service interested in" field, built from the shared services config. */
export const SERVICE_OPTIONS: readonly ServiceOption[] = [
  ...servicesConfig.map((service) => ({
    value: service.slug,
    label: service.availability === "coming-soon" ? `${service.title} (coming soon)` : service.title,
  })),
  { value: OTHER_SERVICE_VALUE, label: "Other / not sure yet" },
];

export const SERVICE_VALUES: readonly string[] = SERVICE_OPTIONS.map((o) => o.value);

export function getServiceLabel(value: string): string {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? "Other / not sure yet";
}
