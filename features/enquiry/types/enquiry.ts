export type EnquiryMode = "configuration" | "recommendation" | "general";

export type EnquiryField =
  | "name"
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
