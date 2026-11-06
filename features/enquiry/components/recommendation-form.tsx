"use client";

import { CommonFields, TextAreaField, TextField, type ModeFormProps } from "./enquiry-fields";

/** Mode B — the customer wants the DMV Tech team to recommend suitable options. */
export function RecommendationForm(props: ModeFormProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <CommonFields {...props} />
      <TextAreaField
        {...props}
        field="usage"
        label="Intended usage"
        required
        rows={4}
        className="sm:col-span-2"
        placeholder="e.g. 10 desktop computers for accounting and billing in my office."
        hint="Our team will review your requirements and suggest suitable options."
      />
      <TextField {...props} field="quantity" label="Quantity" placeholder="e.g. 10 computers" />
      <TextField {...props} field="budget" label="Estimated budget" placeholder="e.g. ₹4,00,000" />
      <TextAreaField
        {...props}
        field="additional"
        label="Additional requirements"
        rows={3}
        className="sm:col-span-2"
      />
    </div>
  );
}
