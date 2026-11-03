"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navCta } from "@/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollPosition } from "@/hooks";
import { cn } from "@/lib/cn";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { NavLogo } from "./nav-logo";
import { SkipLink } from "./skip-link";

/** Sticky site header. Transparent at the top of the page, frosted once scrolled. */
export function Navbar() {
  const scrolled = useScrollPosition(8);

  return (
    <>
      <SkipLink />
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none",
          scrolled
            ? "border-border/60 bg-background/80 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-background"
        )}
      >
        <Container className="flex h-16 items-center lg:h-[72px]">
          <NavLogo />
          <DesktopNav />
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
              <Link href={navCta.href}>
                {navCta.label}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
            <MobileNav />
          </div>
        </Container>
      </header>
    </>
  );
}
