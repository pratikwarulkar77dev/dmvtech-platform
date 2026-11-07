export type EnquiryMode = "configuration" | "recommendation" | "general";

export type EnquiryField =
  | "name"
  | "email"
  | "phone"
  | "city"
  | "category"
  | "quantity"
  | "budget"
  | "configuration"
  | "usage"
  | "message"
  | "additional";

/** One value set shared by all three modes, so typed details survive switching modes. */
export type EnquiryFormValues = Record<EnquiryField, string>;
export type EnquiryFormErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryIconName = "cpu" | "lightbulb" | "message-square";

export interface EnquiryModeOption {
  id: EnquiryMode;
  title: string;
  description: string;
  icon: EnquiryIconName;
}

/** State returned by the server action; no SMTP secrets are sent to the client. */
export type EnquiryActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: EnquiryFormErrors;
  values?: EnquiryFormValues;
  mode?: EnquiryMode;
  emailUnavailable?: boolean;
};

export const INITIAL_ENQUIRY_STATE: EnquiryActionState = { status: "idle" };

export interface EnquiryPayload {
  mode: EnquiryMode;
  values: EnquiryFormValues;
}
