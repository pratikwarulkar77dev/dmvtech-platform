export type SocialPlatform = "linkedin" | "twitter" | "facebook" | "instagram" | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}
