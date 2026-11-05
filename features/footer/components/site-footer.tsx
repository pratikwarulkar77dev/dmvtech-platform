import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { NavLogo } from "@/features/navigation";
import { footerContent } from "../data/footer";

const linkClass =
  "rounded-md text-sm text-hero-navy/75 transition-colors hover:text-hero-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const headingClass = "text-sm font-semibold uppercase tracking-wide text-hero-navy";

export function SiteFooter() {
  const { linkColumns, legalLinks, offices, contact, social } = footerContent;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-hero-ice to-hero-sky/50">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <NavLogo size="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-hero-navy/75">
              {footerContent.tagline}
            </p>
            <p className="mt-4 text-sm text-hero-navy/75">
              <span className="font-semibold text-hero-navy">GSTIN:</span> {footerContent.gstin}
            </p>

            {social.length > 0 && (
              <ul aria-label="Social media" className="mt-5 flex flex-wrap gap-3">
                {social.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-hero-royal/20 bg-hero-white/70 px-3 py-1.5 text-sm font-medium text-hero-navy transition-colors hover:border-hero-royal/50 hover:text-hero-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {linkColumns.map((column) => (
              <div key={column.title}>
                <h2 className={headingClass}>{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator className="my-10 bg-hero-royal/15" />

        <div className="grid gap-8 md:grid-cols-3">
          {offices.map((office) => (
            <address key={office.id} className="not-italic">
              <h2 className={headingClass}>{office.label}</h2>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-hero-navy/80">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hero-royal" />
                {office.address}
              </p>
            </address>
          ))}

          <div>
            <h2 className={headingClass}>Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-hero-navy/80">
              <li>
                <a href={contact.phone.href} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Phone aria-hidden className="h-4 w-4 text-hero-royal" />
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <MessageCircle aria-hidden className="h-4 w-4 text-hero-royal" />
                  WhatsApp {contact.whatsapp.display}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              {contact.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                    <Mail aria-hidden className="h-4 w-4 shrink-0 text-hero-royal" />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-hero-royal/15" />

        <div className="flex flex-col gap-4 text-sm text-hero-navy/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {footerContent.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
