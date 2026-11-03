import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { isActivePath } from "@/utils/nav";
import type { MegaNavItem } from "@/types";
import { NAV_ICONS } from "../lib/nav-icons";
import { NavPanelLink } from "./nav-panel-link";

interface MegaMenuPanelProps {
  item: MegaNavItem;
  pathname: string;
}

/** Full-width Services panel: grouped links on the left, a guidance card on the right. */
export function MegaMenuPanel({ item, pathname }: MegaMenuPanelProps) {
  return (
    <div className="border-b border-border bg-background shadow-premium">
      <Container className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {item.groups.map((group) => {
              const GroupIcon = group.icon ? NAV_ICONS[group.icon] : null;
              return (
                <div key={group.title}>
                  <div className="mb-1 flex items-center gap-2 px-3">
                    {GroupIcon && <GroupIcon aria-hidden className="h-4 w-4 text-accent" />}
                    <p className="text-caption">{group.title}</p>
                  </div>
                  <ul>
                    {group.items.map((link) => (
                      <li key={link.href}>
                        <NavPanelLink item={link} active={isActivePath(pathname, link.href)} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <Link
            href={item.footerLink.href}
            className="mt-6 inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.footerLink.label}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <aside className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-soft">
          <div>
            <p className="text-h5">{item.featured.title}</p>
            <p className="text-body-sm mt-2">{item.featured.description}</p>
          </div>
          <Button asChild variant="accent" className="mt-6 w-full">
            <Link href={item.featured.cta.href}>
              {item.featured.cta.label}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Button>
        </aside>
      </Container>
    </div>
  );
}
