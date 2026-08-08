import { DATE_FORMAT } from "@/constants/app";

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString(DATE_FORMAT.locale, DATE_FORMAT.options);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
