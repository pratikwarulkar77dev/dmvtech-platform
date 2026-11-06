import { Quote } from "lucide-react";
import type { FounderProfile } from "@/types";

/**
 * The founder's message is shown as his words only once `message.approved` is
 * true in constants/founder.ts. Until then the same text is presented as the
 * company's service commitment, so no unapproved quotation is attributed to him.
 */
export function FounderMessage({ founder }: { founder: FounderProfile }) {
  const { text, approved } = founder.message;

  if (approved) {
    return (
      <figure className="rounded-2xl border border-hero-royal/15 bg-hero-white/80 p-6 shadow-soft">
        <Quote aria-hidden className="h-6 w-6 text-hero-royal" />
        <blockquote className="mt-3 text-lg leading-relaxed text-hero-navy">{text}</blockquote>
        <figcaption className="mt-4 text-sm font-medium text-hero-navy/75">
          — {founder.name}, {founder.designation}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="rounded-2xl border border-hero-royal/15 bg-hero-white/80 p-6 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-wide text-hero-royal">Our service commitment</p>
      <p className="mt-3 text-lg leading-relaxed text-hero-navy">{text}</p>
    </div>
  );
}
