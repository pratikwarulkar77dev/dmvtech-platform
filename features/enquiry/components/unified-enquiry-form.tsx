"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { submitEnquiry } from "@/actions/submit-enquiry";
import { Button } from "@/components/ui/button";
import { companyProfile } from "@/constants";
import { EMPTY_ENQUIRY_VALUES, MESSAGE_COPY, MODES_WITH_QUANTITY_AND_BUDGET } from "../constants/enquiry-options";
import {
  INITIAL_ENQUIRY_STATE,
  type EnquiryField,
  type EnquiryFormErrors,
  type EnquiryFormValues,
  type EnquiryMode,
} from "../types/enquiry";
import { buildEnquiryMessage, buildWhatsAppUrl, isWithinUrlLimit } from "../utils/whatsapp-message";
import { validateEnquiry } from "../utils/validation";
import { CategoryField, TextAreaField, TextField, fieldId } from "./enquiry-fields";
import { EnquiryModeSelector } from "./enquiry-mode-selector";

interface UnifiedEnquiryFormProps {
  /** Id of the heading that names this form (for the accessible form name). */
  headingId: string;
  initialMode?: EnquiryMode;
  initialCategory?: string;
}

/**
 * The single enquiry form. The customer fills it in once, then chooses how to send the
 * same data: WhatsApp (built in the browser, nothing stored) or email (secure server action).
 * Neither channel falls back to the other without the customer's choice.
 */
export function UnifiedEnquiryForm({ headingId, initialMode = "recommendation", initialCategory = "" }: UnifiedEnquiryFormProps) {
  const [mode, setMode] = useState<EnquiryMode>(initialMode);
  const [values, setValues] = useState<EnquiryFormValues>({ ...EMPTY_ENQUIRY_VALUES, category: initialCategory });
  const [clientErrors, setClientErrors] = useState<EnquiryFormErrors>({});
  const [formError, setFormError] = useState("");
  const [openedUrl, setOpenedUrl] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [dismissedSuccess, setDismissedSuccess] = useState<object | null>(null);

  const submitLock = useRef(false);
  const [state, formAction, pending] = useActionState(submitEnquiry, INITIAL_ENQUIRY_STATE);
  const message = useMemo(() => buildEnquiryMessage(mode, values), [mode, values]);
  const copy = MESSAGE_COPY[mode];
  const showExtras = MODES_WITH_QUANTITY_AND_BUDGET.includes(mode);

  // Recorded in the browser after first render; the server rejects forms submitted implausibly fast.
  useEffect(() => setStartedAt(String(Date.now())), []);

  // Email availability is checked at runtime (the page itself is static). Only the email button depends on it.
  useEffect(() => {
    let active = true;
    fetch("/api/enquiry/email-status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { available?: boolean } | null) => {
        if (active && data && data.available === false) setEmailAvailable(false);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  // Release the double-click lock once the server has answered.
  useEffect(() => {
    if (!pending) submitLock.current = false;
  }, [pending]);

  useEffect(() => {
    if (state.status === "error") {
      if (state.values) setValues(state.values);
      if (state.mode) setMode(state.mode);
      if (state.emailUnavailable) setEmailAvailable(false);
    }
    if (state.status === "success") {
      setValues(EMPTY_ENQUIRY_VALUES);
      setClientErrors({});
      setOpenedUrl("");
    }
  }, [state]);

  const errors: EnquiryFormErrors = { ...(state.status === "error" ? state.fieldErrors : {}), ...clientErrors };
  const groupProps = { values, errors, onChange: (field: EnquiryField, value: string) => update(field, value) };

  function update(field: EnquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError("");
  }

  function changeMode(next: EnquiryMode) {
    setMode(next);
    setClientErrors({});
    setFormError("");
    setOpenedUrl("");
  }

  /** Validates for the chosen channel; focuses the first problem. Returns true when OK. */
  function check(channel: "whatsapp" | "email"): boolean {
    const found = validateEnquiry(values, channel);
    if (Object.keys(found).length === 0) {
      setClientErrors({});
      setFormError("");
      return true;
    }
    setClientErrors(found);
    setFormError("Please fix the highlighted fields before continuing.");
    const first = Object.keys(found)[0] as EnquiryField;
    document.getElementById(fieldId(first))?.focus();
    return false;
  }

  function openWhatsApp() {
    if (!check("whatsapp")) return;
    if (!isWithinUrlLimit(message)) {
      setFormError("Your message is too long to send through WhatsApp. Please shorten it and try again.");
      return;
    }
    const url = buildWhatsAppUrl(message);
    setOpenedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (state.status === "success" && dismissedSuccess !== state) {
    return (
      <div role="status" className="rounded-3xl border border-success/30 bg-success/5 p-8 text-center shadow-soft">
        <CheckCircle2 aria-hidden className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-4 font-display text-2xl font-bold text-hero-navy">Enquiry emailed</h3>
        <p className="mt-2 text-hero-navy/75">{state.message}</p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setDismissedSuccess(state)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const serverError = state.status === "error" && state.message ? state.message : "";
  const alertText = formError || serverError;

  return (
    <div className="min-w-0">
      <EnquiryModeSelector value={mode} onChange={changeMode} />

      <form
        action={formAction}
        noValidate
        aria-labelledby={headingId}
        onSubmit={(event) => {
          // The email button is the only submit button; WhatsApp is handled in the browser.
          if (submitLock.current || !check("email")) {
            event.preventDefault();
            return;
          }
          submitLock.current = true;
        }}
        className="mx-auto mt-6 max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8"
      >
        <input type="hidden" name="enquiryType" value={mode} />

        <div key={mode} className="animate-fade-up opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField {...groupProps} field="name" label="Full name" required autoComplete="name" />
            <TextField {...groupProps} field="phone" label="Mobile number" type="tel" autoComplete="tel" placeholder="10-digit mobile number" />
            <TextField {...groupProps} field="email" label="Email address" optionalText="required to send by email" type="email" autoComplete="email" />
            <TextField {...groupProps} field="city" label="City / location" autoComplete="address-level2" placeholder="e.g. Pune" />
            <CategoryField {...groupProps} />
            {showExtras && (
              <>
                <TextField {...groupProps} field="quantity" label="Quantity" placeholder="e.g. 10 computers" />
                <TextField {...groupProps} field="budget" label="Estimated budget" placeholder="e.g. ₹4,00,000" />
              </>
            )}
            <TextAreaField
              {...groupProps}
              field="message"
              label={copy.label}
              required
              hint={copy.hint}
              placeholder={copy.placeholder}
              className="sm:col-span-2"
            />
          </div>
        </div>

        {/* Spam protection: honeypot (hidden from people and assistive tech) + render timestamp. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="enquiry-website">Leave this field empty</label>
          <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <input type="hidden" name="startedAt" value={startedAt} />

        <details className="mt-6 rounded-xl border border-border bg-hero-ice/60 p-4 text-sm">
          <summary className="cursor-pointer font-medium text-hero-navy">Preview the WhatsApp message</summary>
          <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-hero-navy/80">{message}</pre>
        </details>

        {alertText && (
          <div role="alert" className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-hero-navy">
            <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <p>{alertText}</p>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            size="lg"
            onClick={openWhatsApp}
            className="w-full bg-hero-royal text-hero-royal-foreground shadow-elevated hover:bg-hero-royal/90"
          >
            <MessageCircle aria-hidden className="h-5 w-5" />
            Send Enquiry via WhatsApp
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="outline"
            disabled={pending || startedAt === "" || !emailAvailable}
            className="w-full border-hero-royal/40 text-hero-navy hover:bg-hero-sky hover:text-hero-navy"
          >
            {pending ? (
              <>
                <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Mail aria-hidden className="h-5 w-5" />
                Send Enquiry via Email
              </>
            )}
          </Button>
        </div>

        {!emailAvailable && (
          <p role="note" className="mt-4 flex items-start gap-2 text-sm text-hero-navy/80">
            <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hero-royal" />
            <span>
              Email enquiries are temporarily unavailable. Please contact us through WhatsApp or call{" "}
              <a href={companyProfile.phone.href} className="font-medium text-hero-royal hover:underline">
                {companyProfile.phone.display}
              </a>
              .
            </span>
          </p>
        )}

        <p className="mt-4 text-xs leading-relaxed text-hero-navy/75">
          Fields marked * are required. Choose how to send: WhatsApp opens with your message ready and is sent only when you
          press <strong className="font-semibold text-hero-navy">Send</strong> inside WhatsApp (we do not store what you type);
          email is sent from our server and confirmed here once the mail server accepts it.
        </p>

        {openedUrl && (
          <div role="status" className="mt-4 rounded-lg border border-hero-royal/20 bg-hero-sky/50 p-4 text-sm text-hero-navy">
            <p>
              <strong className="font-semibold">WhatsApp should now be open in a new tab.</strong> Your message has not been
              sent yet. Review it and press <strong className="font-semibold">Send</strong> in WhatsApp to deliver it to{" "}
              {companyProfile.name}.
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
    </div>
  );
}
