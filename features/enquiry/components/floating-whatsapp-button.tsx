import { MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp-message";

/** A single, unobtrusive WhatsApp shortcut. Server-rendered: no client JavaScript. */
export function FloatingWhatsAppButton() {
  return (
    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-hero-royal text-hero-royal-foreground shadow-premium transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100 sm:bottom-6 sm:right-6"
    >
      <MessageCircle aria-hidden className="h-6 w-6" />
      <span className="sr-only">Chat with DMV Tech Services on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
