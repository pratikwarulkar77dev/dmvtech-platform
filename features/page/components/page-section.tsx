import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

interface PageSectionProps {
  id?: string;
  labelledBy?: string;
  /** Tinted background for visual rhythm between sections. */
  tinted?: boolean;
  narrow?: boolean;
  className?: string;
  children: ReactNode;
}

/** Standard inner-page section: same vertical rhythm (48/64/80px) as the homepage. */
export function PageSection({ id, labelledBy, tinted, narrow, className, children }: PageSectionProps) {
  return (
    <Section
      id={id}
      aria-labelledby={labelledBy}
      spacing="none"
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        tinted && "bg-gradient-to-b from-hero-ice to-background",
        className
      )}
    >
      <Container size={narrow ? "narrow" : "default"}>{children}</Container>
    </Section>
  );
}
