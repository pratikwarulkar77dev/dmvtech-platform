/** Breakpoints mirrored from the default Tailwind scale, for use in JS (e.g. useMediaQuery). */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 50,
} as const;

/** Used by the rate limiter introduced alongside Module 18 (API Layer). */
export const RATE_LIMIT = {
  contactForm: { limit: 5, windowMs: 60_000 },
  newsletter: { limit: 3, windowMs: 60_000 },
} as const;

export const DATE_FORMAT = {
  locale: "en-IN",
  options: { year: "numeric", month: "long", day: "numeric" } as const,
};
