"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { companyProfile } from "@/constants";
import { EMPTY_ENQUIRY_VALUES } from "../constants/enquiry-options";
import type { EnquiryField, EnquiryFormErrors, EnquiryFormValues, EnquiryMode } from "../types/enquiry";
import { buildEnquiryMessage, buildWhatsAppUrl, isWithinUrlLimit } from "../utils/whatsapp-message";
import { validateEnquiry } from "../utils/validation";
import { ConfigurationForm } from "./configuration-form";
import { EnquiryModeSelector } from "./enquiry-mode-selector";
import { GeneralEnquiryForm } from "./general-enquiry-form";
import { RecommendationForm } from "./recommendation-form";

const MODE_FORMS = {
  configuration: ConfigurationForm,
  recommendation: RecommendationForm,
  general: GeneralEnquiryForm,
} as const;

/**
 * Homepage "Tell Us What You Need" section. Builds a structured message in the
 * browser and opens WhatsApp. Nothing is sent to or stored on our servers, and
 * success is never claimed: the customer must press Send inside WhatsApp.
 */
export function SmartEnquirySection() {
  const [mode, setMode] = useState<EnquiryMode>("recommendation");
  const [values, setValues] = useState<EnquiryFormValues>(EMPTY_ENQUIRY_VALUES);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [formError, setFormError] = useState("");
  const [openedUrl, setOpenedUrl] = useState("");

  const message = useMemo(() => buildEnquiryMessage(mode, values), [mode, values]);
  const ModeForm = MODE_FORMS[mode];

  const onChange = (field: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError("");
  };

  const onModeChange = (next: EnquiryMode) => {
    setMode(next);
    setErrors({});
    setFormError("");
    setOpenedUrl("");
  };

  const openWhatsApp = () => {
    const found = validateEnquiry(mode, values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFormError("Please fix the highlighted fields before continuing.");
      const first = Object.keys(found)[0] as EnquiryField;
      document.getElementById(`enquiry-wa-${first}`)?.focus();
      return;
    }
    if (!isWithinUrlLimit(message)) {
      setFormError("Your message is too long to send through WhatsApp. Please shorten it and try again.");
      return;
    }
    const url = buildWhatsAppUrl(message);
    setErrors({});
    setFormError("");
    setOpenedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      spacing="none"
      className="scroll-mt-20 bg-gradient-to-b from-hero-ice via-background to-hero-ice py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-hero-royal">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hero-royal" />
            Enquire on WhatsApp
          </p>
          <h2
            id="enquiry-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-hero-navy text-balance sm:text-4xl"
          >
            Tell Us What You Need
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-hero-navy/75">
            Share your requirements, and our team will help you find the right IT solution.
          </p>
        </div>

        <div className="mt-10">
          <EnquiryModeSelector value={mode} onChange={onModeChange} />
        </div>

        <form
          noValidate
          aria-labelledby="enquiry-heading"
          onSubmit={(event) => {
            event.preventDefault();
            openWhatsApp();
          }}
          className="mx-auto mt-6 max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8"
        >
          {/* key restarts the entrance animation each time the mode changes */}
          <div key={mode} className="animate-fade-up opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
            <ModeForm values={values} errors={errors} onChange={onChange} />
          </div>

          <details className="mt-6 rounded-xl border border-border bg-hero-ice/60 p-4 text-sm">
            <summary className="cursor-pointer font-medium text-hero-navy">Preview the WhatsApp message</summary>
            <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-hero-navy/80">{message}</pre>
          </details>

          {formError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-hero-navy"
            >
              <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <p>{formError}</p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-hero-navy/75">
              This opens WhatsApp with your message ready. Your enquiry is only sent when you press{" "}
              <strong className="font-semibold text-hero-navy">Send</strong> inside WhatsApp. We do not store what you
              type here.
            </p>
            <Button
              type="submit"
              size="lg"
              className="w-full shrink-0 bg-hero-royal text-hero-royal-foreground shadow-elevated hover:bg-hero-royal/90 sm:w-auto"
            >
              <MessageCircle aria-hidden className="h-5 w-5" />
              Continue on WhatsApp
            </Button>
          </div>

          {openedUrl && (
            <div role="status" className="mt-6 rounded-lg border border-hero-royal/20 bg-hero-sky/50 p-4 text-sm text-hero-navy">
              <p>
                <strong className="font-semibold">WhatsApp should now be open in a new tab.</strong> Your message has
                not been sent yet. Review it and press <strong className="font-semibold">Send</strong> in WhatsApp to
                deliver it to {companyProfile.name}.
              </p>
              <a
                href={openedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-md font-medium text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Nothing opened? Open WhatsApp again
                <ExternalLink aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          )}
        </form>
      </Container>
    </Section>
  );
}
