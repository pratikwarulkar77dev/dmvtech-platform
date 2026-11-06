"use client";

import { Cpu, Lightbulb, MessageSquare, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ENQUIRY_MODES } from "../constants/enquiry-options";
import type { EnquiryIconName, EnquiryMode } from "../types/enquiry";

const ICONS: Record<EnquiryIconName, LucideIcon> = {
  cpu: Cpu,
  lightbulb: Lightbulb,
  "message-square": MessageSquare,
};

interface EnquiryModeSelectorProps {
  value: EnquiryMode;
  onChange: (mode: EnquiryMode) => void;
}

/** Three native radio inputs styled as cards: keyboard and screen-reader behaviour comes from the browser. */
export function EnquiryModeSelector({ value, onChange }: EnquiryModeSelectorProps) {
  return (
    <fieldset>
      <legend className="sr-only">Choose the type of enquiry</legend>
      <div className="grid gap-4 md:grid-cols-3">
        {ENQUIRY_MODES.map((mode) => {
          const Icon = ICONS[mode.icon];
          const selected = value === mode.id;
          return (
            <label
              key={mode.id}
              className={cn(
                "relative flex cursor-pointer flex-col gap-3 rounded-2xl border bg-card p-5 text-left shadow-soft transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-elevated focus-within:ring-2 focus-within:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                selected ? "border-hero-royal ring-1 ring-hero-royal" : "border-border"
              )}
            >
              <input
                type="radio"
                name="enquiry-mode"
                value={mode.id}
                checked={selected}
                onChange={() => onChange(mode.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-xl transition-colors",
                  selected ? "bg-hero-royal text-hero-royal-foreground" : "bg-hero-sky text-hero-royal"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-semibold text-hero-navy">{mode.title}</span>
              <span className="text-sm leading-relaxed text-hero-navy/75">{mode.description}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
