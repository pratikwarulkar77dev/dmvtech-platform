"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ENQUIRY_CATEGORIES, ENQUIRY_LIMITS } from "../constants/enquiry-options";
import type { EnquiryField, EnquiryFormErrors, EnquiryFormValues } from "../types/enquiry";

export interface FieldGroupProps {
  values: EnquiryFormValues;
  errors: EnquiryFormErrors;
  onChange: (field: EnquiryField, value: string) => void;
}

/** One enquiry form exists per page, so ids are stable and can be focused by validation. */
export const fieldId = (field: EnquiryField) => `enquiry-${field}`;

function FieldShell({
  field,
  label,
  required,
  optionalText = "optional",
  error,
  hint,
  className,
  children,
}: {
  field: EnquiryField;
  label: string;
  required?: boolean;
  optionalText?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={fieldId(field)} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden className="text-destructive">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted-foreground"> ({optionalText})</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${fieldId(field)}-hint`} className="mt-1.5 text-xs text-hero-navy/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${fieldId(field)}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (field: EnquiryField, error?: string, hint?: string) =>
  error ? `${fieldId(field)}-error` : hint ? `${fieldId(field)}-hint` : undefined;

interface TextFieldProps extends FieldGroupProps {
  field: EnquiryField;
  label: string;
  required?: boolean;
  optionalText?: string;
  hint?: string;
  placeholder?: string;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  className?: string;
}

export function TextField({
  field,
  label,
  required,
  optionalText,
  hint,
  placeholder,
  type = "text",
  autoComplete,
  className,
  values,
  errors,
  onChange,
}: TextFieldProps) {
  const error = errors[field];
  return (
    <FieldShell field={field} label={label} required={required} optionalText={optionalText} error={error} hint={hint} className={className}>
      <Input
        id={fieldId(field)}
        name={field}
        type={type}
        inputMode={type === "tel" ? "tel" : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={values[field]}
        maxLength={ENQUIRY_LIMITS[field] + 20}
        onChange={(e) => onChange(field, e.target.value)}
        invalid={Boolean(error)}
        aria-required={required || undefined}
        aria-describedby={describedBy(field, error, hint)}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps extends FieldGroupProps {
  field: EnquiryField;
  label: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function TextAreaField({
  field,
  label,
  required,
  hint,
  placeholder,
  rows = 5,
  className,
  values,
  errors,
  onChange,
}: TextAreaFieldProps) {
  const error = errors[field];
  return (
    <FieldShell field={field} label={label} required={required} error={error} hint={hint} className={className}>
      <Textarea
        id={fieldId(field)}
        name={field}
        rows={rows}
        placeholder={placeholder}
        value={values[field]}
        maxLength={ENQUIRY_LIMITS[field] + 50}
        onChange={(e) => onChange(field, e.target.value)}
        invalid={Boolean(error)}
        aria-required={required || undefined}
        aria-describedby={describedBy(field, error, hint)}
      />
      <p className="mt-1 text-right text-xs text-hero-navy/75" aria-hidden>
        {values[field].length}/{ENQUIRY_LIMITS[field]}
      </p>
    </FieldShell>
  );
}

export function CategoryField({ values, errors, onChange }: FieldGroupProps) {
  return (
    <FieldShell field="category" label="Service category" error={errors.category} className="sm:col-span-2">
      <Select name="category" value={values.category} onValueChange={(v) => onChange("category", v)}>
        <SelectTrigger id={fieldId("category")} aria-describedby={describedBy("category", errors.category)}>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {ENQUIRY_CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}
