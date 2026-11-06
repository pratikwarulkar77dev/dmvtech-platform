"use client";

import { CommonFields, TextAreaField, type ModeFormProps } from "./enquiry-fields";

/** Mode C — a simple message. */
export function GeneralEnquiryForm(props: ModeFormProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <CommonFields {...props} />
      <TextAreaField
        {...props}
        field="message"
        label="Message"
        required
        rows={4}
        className="sm:col-span-2"
        placeholder="e.g. I need CCTV installation for my office. Please contact me."
      />
    </div>
  );
}
