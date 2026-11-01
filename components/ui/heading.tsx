import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const headingVariants = cva("text-foreground", {
  variants: {
    /** Visual size — independent of the semantic `as` level for cases like a
     * visually small H1 (SEO) that should still look like body-adjacent text. */
    size: {
      display1: "text-display-1",
      display2: "text-display-2",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
    },
  },
  defaultVariants: {
    size: "h2",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic tag — defaults to matching `size`, but can be set independently for accessibility. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SIZE_TO_TAG: Record<NonNullable<HeadingProps["size"]>, HeadingProps["as"]> = {
  display1: "h1",
  display2: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size = "h2", as, ...props }, ref) => {
    const resolvedSize = size ?? "h2";
    const Tag = as ?? SIZE_TO_TAG[resolvedSize] ?? "h2";
    return <Tag ref={ref} className={cn(headingVariants({ size: resolvedSize }), className)} {...props} />;
  }
);
Heading.displayName = "Heading";
