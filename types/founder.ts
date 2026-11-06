export interface FounderPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** Founder details. Only facts supplied by the business belong here. */
export interface FounderProfile {
  name: string;
  designation: string;
  foundedYear: number;
  /** null renders a neutral placeholder until a photograph is supplied. */
  photo: FounderPhoto | null;
  /** Optional. The LinkedIn button is shown only when this is a non-empty URL. */
  linkedinUrl: string;
  bio: readonly string[];
  /** Business philosophy, in the company's own words. */
  philosophy: string;
  /** Editorial message. Shown as the founder's words only when `approved` is true. */
  message: { text: string; approved: boolean };
}
