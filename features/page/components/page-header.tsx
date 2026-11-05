import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  breadcrumb: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  description?: string;
  /** Buttons or other actions shown under the description. */
  actions?: ReactNode;
  /** Optional element shown beside the text on large screens. */
  aside?: ReactNode;
  className?: string;
}

/** Shared top-of-page block for every inner page: breadcrumb, eyebrow, the page's single <h1>, intro and actions. */
export function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-gradient-to-b from-hero-ice via-hero-white to-hero-ice",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-hero-sky blur-3xl"
      />
      <Container className="py-10 sm:py-12 lg:py-16">
        <Breadcrumb items={breadcrumb} />
        <div className={cn("mt-6", aside && "grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]")}>
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-hero-royal">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hero-royal" />
                {eyebrow}
              </p>
            )}
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-hero-navy text-balance sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-hero-navy/75">{description}</p>
            )}
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </header>
  );
}
