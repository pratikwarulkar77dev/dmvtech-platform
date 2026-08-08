export interface BusinessHours {
  days: string;
  hours: string;
}

export interface ContactInfo {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  addresses: {
    label: string;
    line: string;
  }[];
  businessHours: BusinessHours[];
}
