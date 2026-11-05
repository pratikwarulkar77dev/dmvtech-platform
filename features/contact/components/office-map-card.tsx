"use client";

import { useState } from "react";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatOfficeAddress } from "@/constants";
import type { CompanyOffice } from "@/types";
import { mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl, officeMapQuery } from "../lib/maps";

/**
 * Office details with a consent-aware map. Google Maps is only contacted after
 * the visitor presses "Load map", so no third-party request is made on page
 * load, and no API key is used (so there is no Maps Platform billing).
 */
export function OfficeMapCard({ office }: { office: CompanyOffice }) {
  const [loaded, setLoaded] = useState(false);
  const query = officeMapQuery(office);
  const titleId = `office-${office.id}-title`;

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0" role="group" aria-labelledby={titleId}>
      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-hero-ice to-hero-sky">
        {loaded ? (
          <iframe
            title={`Google Map — ${office.label}, ${office.shortName}`}
            src={mapsEmbedUrl(query)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <MapPin aria-hidden className="h-8 w-8 text-hero-royal" />
            <p className="max-w-xs text-sm text-hero-navy/75">
              The map loads from Google when you choose to show it.
            </p>
            <Button type="button" variant="outline" size="sm" onClick={() => setLoaded(true)}>
              Load map
              <span className="sr-only"> for {office.label}</span>
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 id={titleId} className="font-display text-lg font-semibold text-hero-navy">
          {office.label} — {office.shortName}
        </h3>
        <address className="mt-2 text-sm not-italic leading-relaxed text-hero-navy/75">
          {formatOfficeAddress(office)}
        </address>
        <p className="mt-3 text-xs text-hero-navy/70">
          Map location is found from the address text and is not yet confirmed as an exact pin.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" size="sm">
            <a href={mapsSearchUrl(query)} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden className="h-4 w-4" />
              Open in Google Maps
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
          <Button asChild size="sm" className="bg-hero-royal text-hero-royal-foreground hover:bg-hero-royal/90">
            <a href={mapsDirectionsUrl(query)} target="_blank" rel="noopener noreferrer">
              <Navigation aria-hidden className="h-4 w-4" />
              Get Directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
