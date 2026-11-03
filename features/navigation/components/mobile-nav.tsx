"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { primaryNav, navCta } from "@/constants";
import { isActivePath, isNavItemActive } from "@/utils/nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import type { NavLinkItem, PrimaryNavItem } from "@/types";
import { NAV_ICONS } from "../lib/nav-icons";

function MobileLink({
  item,
  pathname,
}: {
  item: NavLinkItem;
  pathname: string;
}) {
  const Icon = item.icon ? NAV_ICONS[item.icon] : null;
  const active = isActivePath(pathname, item.href);

  const inner = (
    <>
      {Icon && <Icon aria-hidden className="h-4 w-4 shrink-0 text-accent" />}
      <span className="flex-1">{item.label}</span>
      {item.badge && <Badge variant="outline">{item.badge}</Badge>}
    </>
  );

  if (item.disabled) {
    return (
      <div
        aria-disabled="true"
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground opacity-70"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-muted"
      )}
    >
      {inner}
    </Link>
  );
}

function MobileSection({
  item,
  pathname,
}: {
  item: PrimaryNavItem;
  pathname: string;
}) {
  const active = isNavItemActive(pathname, item);

  return (
    <AccordionItem value={item.id}>
      <AccordionTrigger className={cn("px-3", active && "text-accent")}>
        {item.label}
        {active && <span className="sr-only"> (current section)</span>}
      </AccordionTrigger>
      <AccordionContent className="px-0">
        {item.type === "mega" ? (
          <div className="space-y-4">
            {item.groups.map((group) => (
              <div key={group.title}>
                <p className="text-caption px-3 pb-1">{group.title}</p>
                <ul>
                  {group.items.map((link) => (
                    <li key={link.href}>
                      <MobileLink item={link} pathname={pathname} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {item.items.map((link) => (
              <li key={link.href}>
                <MobileLink item={link} pathname={pathname} />
              </li>
            ))}
          </ul>
        )}

        {item.footerLink && (
          <Link
            href={item.footerLink.href}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.footerLink.label}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

/** Drawer navigation shown below the lg breakpoint. */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close after any client-side navigation.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const activeSection = primaryNav.find((item) => isNavItemActive(pathname, item))?.id;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu aria-hidden className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        side="right"
        className="gap-0 p-0 lg:hidden"
        onClick={(event) => {
          // Closes on activation of any link, including links to the current page.
          if (event.target instanceof Element && event.target.closest("a[href]")) {
            setOpen(false);
          }
        }}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-border pl-4 pr-12">
          <DrawerTitle className="text-h5">Menu</DrawerTitle>
          <DrawerDescription className="sr-only">
            Site navigation, appearance settings and quote request.
          </DrawerDescription>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          <nav aria-label="Mobile">
            <Accordion type="single" collapsible defaultValue={activeSection}>
              {primaryNav.map((item) => (
                <MobileSection key={item.id} item={item} pathname={pathname} />
              ))}
            </Accordion>
          </nav>
        </div>

        <div className="shrink-0 space-y-4 border-t border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-caption">Appearance</span>
            <ThemeToggle />
          </div>
          <Button asChild variant="accent" className="w-full">
            <Link href={navCta.href}>
              {navCta.label}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
