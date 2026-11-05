import type { CompanyOffice } from "@/types";

/**
 * Address-only Google Maps links. No coordinates or Place IDs are used because
 * none have been verified, and none of these URLs need an API key (so there is
 * no Maps Platform billing). Google resolves the address text itself, so the
 * pin should be confirmed by the business before relying on it.
 */
export function officeMapQuery(office: CompanyOffice): string {
  return [
    office.streetAddress,
    office.locality,
    office.city,
    `${office.state} ${office.postalCode}`,
    office.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export const mapsSearchUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const mapsDirectionsUrl = (query: string): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

export const mapsEmbedUrl = (query: string): string =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
