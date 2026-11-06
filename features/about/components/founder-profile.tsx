import Image from "next/image";
import { ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FounderProfile as FounderProfileData } from "@/types";

/** Portrait card: photograph (or a neutral placeholder), name, designation and optional LinkedIn link. */
export function FounderProfile({ founder }: { founder: FounderProfileData }) {
  return (
    <figure className="mx-auto w-full max-w-sm lg:mx-0">
      <div className="relative rounded-[2rem] bg-gradient-to-br from-hero-sky via-hero-ice to-hero-white p-3 shadow-premium">
        <div
          aria-hidden
          className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[2rem] border border-hero-royal/20"
        />
        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-hero-ice">
          {founder.photo ? (
            <Image
              src={founder.photo.src}
              alt={founder.photo.alt}
              width={founder.photo.width}
              height={founder.photo.height}
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 90vw"
              className="h-full w-full object-cover"
            />
          ) : (
            <div role="img" aria-label="Photograph to be added" className="grid h-full w-full place-items-center text-hero-royal/50">
              <User aria-hidden className="h-24 w-24" strokeWidth={1.25} />
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-6 text-center lg:text-left">
        <p className="font-display text-2xl font-bold text-hero-navy">{founder.name}</p>
        <p className="mt-1 text-base text-hero-navy/75">{founder.designation}</p>
        {founder.linkedinUrl.trim() && (
          <Button asChild variant="outline" size="sm" className="mt-4">
            <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn profile
              <ExternalLink aria-hidden className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        )}
      </figcaption>
    </figure>
  );
}
