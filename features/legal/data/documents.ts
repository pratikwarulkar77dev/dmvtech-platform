import { companyProfile, formatOfficeAddress } from "@/constants";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
}

export interface LegalDocumentContent {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: readonly LegalSection[];
}

const registeredOffice = companyProfile.offices[0];
const registeredAddress = registeredOffice ? formatOfficeAddress(registeredOffice) : "";
const email = companyProfile.emails.primary;

/**
 * General-purpose policy text drafted from how this website actually works
 * today (enquiry form, theme preference in local storage, consent-based maps,
 * no analytics or advertising cookies). It is not legal advice: have it
 * reviewed by a qualified professional and update it whenever the site's data
 * handling changes.
 */
export const privacyPolicy: LegalDocumentContent = {
  title: "Privacy Policy",
  description: `How ${companyProfile.name} collects, uses and protects information submitted through this website.`,
  lastUpdated: "4 November 2026",
  intro: `This policy explains what personal information ${companyProfile.name} ("we", "us") collects through this website, why, and the choices you have.`,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      paragraphs: [
        `${companyProfile.legalName} (GSTIN ${companyProfile.gstin}). Registered office: ${registeredAddress}.`,
        `For any privacy question, contact us at ${email}.`,
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: ["We collect only what you choose to send us and what is needed to run the website:"],
      items: [
        "Enquiry form details: your name, email address, mobile number, company name (optional), the service you are interested in, and your message.",
        "Technical information that web servers normally record, such as IP address, browser type and pages requested.",
        "Your light/dark/system theme choice, saved in your own browser (local storage). It is not sent to us.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      items: [
        "To read and respond to your enquiry and to prepare quotations or proposals you ask for.",
        "To protect the website from spam and abuse, for example by limiting how often a form can be submitted.",
        "To keep a record of business communications.",
      ],
    },
    {
      id: "email-processing",
      title: "Enquiry emails",
      paragraphs: [
        "When you submit the enquiry form, the details are sent to our team by email through an email service provider that we configure. We only tell you your enquiry was sent when it has actually been handed to that service.",
      ],
    },
    {
      id: "google-maps",
      title: "Google Maps",
      paragraphs: [
        "Our contact page can show office maps provided by Google. A map is loaded only after you choose to show it. Once loaded, Google may collect information under its own privacy policy. Opening a map or directions link takes you to Google Maps.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      paragraphs: [
        "At the time of writing, this website does not use advertising or analytics cookies. If that changes, we will update this policy and ask for consent where required.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing your information",
      paragraphs: [
        "We do not sell your personal information. We share it only with service providers that help us run the website and handle email, and where we are required to by law.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep information",
      paragraphs: [
        "We keep enquiry details for as long as needed to respond to you, to manage any resulting business relationship, and to meet legal and record-keeping obligations.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We take reasonable steps to protect information, including keeping email credentials on the server only. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      title: "Your choices and rights",
      paragraphs: [
        `You may ask us to access, correct or delete the personal information you have given us, and you may withdraw consent where we rely on it, subject to applicable Indian law including the Digital Personal Data Protection Act, 2023. Write to ${email}.`,
      ],
    },
    {
      id: "external-links",
      title: "Links to other websites",
      paragraphs: [
        "This website links to third-party services such as Google Maps and WhatsApp. They have their own privacy practices, which we do not control.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: ["We may update this policy. The date at the top shows when it was last revised."],
    },
  ],
};

export const termsAndConditions: LegalDocumentContent = {
  title: "Terms & Conditions",
  description: `The terms for using the ${companyProfile.name} website.`,
  lastUpdated: "4 November 2026",
  intro: `These terms apply to your use of the ${companyProfile.name} website. By using the website you agree to them.`,
  sections: [
    {
      id: "about",
      title: "About us",
      paragraphs: [
        `${companyProfile.legalName} (GSTIN ${companyProfile.gstin}), registered office: ${registeredAddress}. Contact: ${email}.`,
      ],
    },
    {
      id: "website-information",
      title: "Website information",
      paragraphs: [
        "The content of this website is for general information about our services. It is not an offer or a contract. Services are provided only under a written quotation, proposal or agreement that we have confirmed with you.",
        "Some services are shown as “coming soon”. They are not available until we say so.",
      ],
    },
    {
      id: "enquiries-and-quotations",
      title: "Enquiries and quotations",
      paragraphs: [
        "Submitting an enquiry does not create a contract. Any quotation is based on the information you give us and may change if the requirements change.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: ["When using this website you agree not to:"],
      items: [
        "submit false, misleading or unlawful information;",
        "send spam or automated submissions through our forms;",
        "attempt to interfere with the security or operation of the website.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "The DMV Tech Services name, logo and the content of this website belong to us or are used with permission. You may not copy or reuse them without written consent.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services and links",
      paragraphs: [
        "The website links to third-party services such as Google Maps and WhatsApp. We are not responsible for their content or availability.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer and limitation of liability",
      paragraphs: [
        "The website is provided “as is”. To the extent permitted by law, we are not liable for loss arising from use of, or inability to use, the website or from reliance on its general information.",
      ],
    },
    {
      id: "changes",
      title: "Changes",
      paragraphs: ["We may update these terms. The date at the top shows when they were last revised."],
    },
    {
      id: "governing-law",
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Courts with jurisdiction in Maharashtra, India will have jurisdiction over any dispute.",
      ],
    },
  ],
};
