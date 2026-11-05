export interface EnquiryValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  /** A service slug from `servicesConfig`, or "other". */
  service: string;
  message: string;
}

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** Result returned by the server action. "success" is only ever returned after the email was accepted by the mail server. */
export interface EnquiryActionState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: EnquiryErrors;
  /** Echoed back so the form keeps what the visitor typed after a failed submission. */
  values?: EnquiryValues;
}

export const INITIAL_ENQUIRY_STATE: EnquiryActionState = { status: "idle" };
