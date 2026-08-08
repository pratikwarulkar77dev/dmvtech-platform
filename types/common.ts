/**
 * Generic result shape returned by Server Actions and service functions.
 * Used from Module 13 (Contact) onward once forms are wired up.
 */
export interface ActionResult<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
  fieldErrors?: Record<string, string[]>;
}

export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

/** Standard shape for paginated list responses (used from Module 18 — API Layer). */
export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
