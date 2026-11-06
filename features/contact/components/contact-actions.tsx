import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyProfile } from "@/constants";
import { buildGeneralWhatsAppUrl } from "@/features/enquiry";

/** Direct Call, WhatsApp and Email actions, all built from the central company profile. */
export function ContactActions() {
  const { phone, emails } = companyProfile;
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      <li>
        <Button asChild size="lg" className="w-full bg-hero-royal text-hero-royal-foreground hover:bg-hero-royal/90">
          <a href={phone.href}>
            <Phone aria-hidden className="h-5 w-5" />
            Call {phone.display}
          </a>
        </Button>
      </li>
      <li>
        <Button asChild size="lg" variant="outline" className="w-full border-hero-royal/30 text-hero-navy hover:bg-hero-sky hover:text-hero-navy">
          <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden className="h-5 w-5" />
            WhatsApp us
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Button>
      </li>
      <li>
        <Button asChild size="lg" variant="outline" className="w-full border-hero-royal/30 text-hero-navy hover:bg-hero-sky hover:text-hero-navy">
          <a href={`mailto:${emails.primary}`}>
            <Mail aria-hidden className="h-5 w-5" />
            Email us
          </a>
        </Button>
      </li>
    </ul>
  );
}
