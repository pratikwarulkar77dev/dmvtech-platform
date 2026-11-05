"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitEnquiry } from "@/actions/submit-enquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ENQUIRY_LIMITS, validateEnquiry } from "../lib/validation";
import { SERVICE_OPTIONS, SERVICE_VALUES } from "../lib/service-options";
import {
  INITIAL_ENQUIRY_STATE,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "../types";

const EMPTY_VALUES: EnquiryValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

const INTENT_COPY: Record<string, { title: string; description: string }> = {
  quote: {
    title: "Request a quote",
    description: "Tell us what you need and we will come back with a quotation.",
  },
  consultation: {
    title: "Request a free consultation",
    description: "Tell us about your business and goals. We will arrange a conversation.",
  },
};
const DEFAULT_COPY = {
  title: "Send us an enquiry",
  description: "Fill in the form and our team will get back to you.",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {optional ? (
        <span className="font-normal text-muted-foreground"> (optional)</span>
      ) : (
        <span aria-hidden className="text-destructive">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent") ?? "";
  const presetService = searchParams.get("service") ?? "";
  const copy = INTENT_COPY[intent] ?? DEFAULT_COPY;

  const [state, formAction, pending] = useActionState(submitEnquiry, INITIAL_ENQUIRY_STATE);
  const [values, setValues] = useState<EnquiryValues>(EMPTY_VALUES);
  const [clientErrors, setClientErrors] = useState<EnquiryErrors>({});
  const [startedAt, setStartedAt] = useState("");

  // Recorded in the browser after first render; the server rejects forms submitted implausibly fast.
  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (SERVICE_VALUES.includes(presetService)) {
      setValues((current) => (current.service ? current : { ...current, service: presetService }));
    }
  }, [presetService]);

  // Keep what the visitor typed when the server reports an error.
  useEffect(() => {
    if (state.status === "error" && state.values) setValues(state.values);
    if (state.status === "success") {
      setValues(EMPTY_VALUES);
      setClientErrors({});
    }
  }, [state]);

  const errors: EnquiryErrors = { ...(state.status === "error" ? state.fieldErrors : {}), ...clientErrors };

  const update = (field: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const describedBy = (field: EnquiryField) => (errors[field] ? `${field}-error` : undefined);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center"
      >
        <CheckCircle2 aria-hidden className="mx-auto h-10 w-10 text-success" />
        <h2 className="mt-4 font-display text-2xl font-bold text-hero-navy">Enquiry sent</h2>
        <p className="mt-2 text-hero-navy/75">{state.message}</p>
        <p className="mt-6 text-sm text-hero-navy/70">
          Need to send another message? Reload this page to start a new enquiry.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-labelledby="enquiry-form-heading"
      onSubmit={(event) => {
        const found = validateEnquiry(values);
        if (Object.keys(found).length > 0) {
          event.preventDefault();
          setClientErrors(found);
          const first = (Object.keys(found) as EnquiryField[])[0];
          if (first) document.getElementById(`enquiry-${first}`)?.focus();
        } else {
          setClientErrors({});
        }
      }}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <h2 id="enquiry-form-heading" className="font-display text-2xl font-bold text-hero-navy">
        {copy.title}
      </h2>
      <p className="mt-2 text-sm text-hero-navy/75">{copy.description}</p>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-hero-navy"
        >
          <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p>{state.message}</p>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="enquiry-name">Full name</Label>
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            value={values.name}
            maxLength={ENQUIRY_LIMITS.nameMax}
            onChange={(e) => update("name", e.target.value)}
            invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            aria-required
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="enquiry-email">Email address</Label>
          <Input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            maxLength={ENQUIRY_LIMITS.emailMax}
            onChange={(e) => update("email", e.target.value)}
            invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            aria-required
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <Label htmlFor="enquiry-phone">Mobile number</Label>
          <Input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            aria-required
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <Label htmlFor="enquiry-company" optional>
            Company name
          </Label>
          <Input
            id="enquiry-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            maxLength={ENQUIRY_LIMITS.companyMax}
            onChange={(e) => update("company", e.target.value)}
            invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="enquiry-service">Service interested in</Label>
          <Select name="service" value={values.service} onValueChange={(v) => update("service", v)}>
            <SelectTrigger
              id="enquiry-service"
              aria-required
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
              className={errors.service ? "border-destructive" : undefined}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="service-error" message={errors.service} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="enquiry-message">Message</Label>
          <Textarea
            id="enquiry-message"
            name="message"
            rows={5}
            value={values.message}
            maxLength={ENQUIRY_LIMITS.messageMax}
            onChange={(e) => update("message", e.target.value)}
            invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            aria-required
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      {/* Spam protection: honeypot (hidden from people and assistive tech) + render timestamp. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-hero-navy/70">
          Fields marked * are required. We use your details only to respond to your enquiry.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending || startedAt === ""}
          className="bg-hero-royal text-hero-royal-foreground hover:bg-hero-royal/90"
        >
          {pending ? (
            <>
              <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send aria-hidden className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
