"use client";

import { CommonFields, TextAreaField, TextField, type ModeFormProps } from "./enquiry-fields";

/** Mode A — the customer already knows the configuration they want. */
export function ConfigurationForm(props: ModeFormProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <CommonFields {...props} />
      <TextAreaField
        {...props}
        field="configuration"
        label="Required configuration"
        required
        rows={4}
        className="sm:col-span-2"
        placeholder="e.g. 5 desktop computers with Intel Core i5 processors, 16GB RAM and 512GB SSD storage."
      />
      <TextField {...props} field="quantity" label="Quantity" placeholder="e.g. 5 computers" />
      <TextField {...props} field="budget" label="Estimated budget" placeholder="e.g. ₹3,00,000" />
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
