import { cn } from "@/lib/cn";
import type { SectionIntroContent } from "../types";

interface SectionHeadingProps {
  intro: SectionIntroContent;
  /** id applied to the <h2>, referenced by the parent section's aria-labelledby. */
  id: string;
  align?: "left" | "center";
  className?: string;
}

/** Eyebrow + title + description block shared by every homepage section. */
export function SectionHeading({ intro, id, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-hero-royal"
        )}
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hero-royal" />
        {intro.eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-3xl font-bold tracking-tight text-hero-navy text-balance sm:text-4xl"
      >
        {intro.title}
      </h2>
      {intro.description && (
        <p className="mt-4 text-lg leading-relaxed text-hero-navy/75">{intro.description}</p>
      )}
    </div>
  );
}
