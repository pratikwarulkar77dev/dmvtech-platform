import Link from "next/link";
import { ROUTES, siteConfig } from "@/constants";

/** Brand lockup: monogram tile + wordmark. Server Component — no interactivity needed. */
export function NavLogo() {
  const [first = siteConfig.name, ...rest] = siteConfig.name.split(" ");
  const remainder = rest.join(" ");

  return (
    <Link
      href={ROUTES.home}
      aria-label={`${siteConfig.name} — home`}
      className="group inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden
        className="gradient-brand grid h-9 w-9 place-items-center rounded-lg font-display text-lg font-bold text-primary-foreground shadow-soft transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
      >
        {first.charAt(0)}
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        {first}
        {remainder && <span className="ml-1 font-medium text-muted-foreground">{remainder}</span>}
      </span>
    </Link>
  );
}
