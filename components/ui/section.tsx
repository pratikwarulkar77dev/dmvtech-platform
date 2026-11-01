import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-12",
      default: "py-16 sm:py-24",
      lg: "py-24 sm:py-32",
    },
    background: {
      none: "",
      muted: "bg-secondary/40",
      card: "bg-card",
      brand: "gradient-brand text-primary-foreground",
    },
  },
  defaultVariants: {
    spacing: "default",
    background: "none",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, as: Comp = "section", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(sectionVariants({ spacing, background }), className)}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";
