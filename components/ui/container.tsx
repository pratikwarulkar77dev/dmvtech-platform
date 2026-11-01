import * as React from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  size?: "default" | "narrow" | "wide";
  as?: React.ElementType;
}

const SIZE_CLASSES: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "container",
  narrow: "container max-w-3xl",
  wide: "container max-w-[1600px]",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", as: Comp = "div", ...props }, ref) => {
    return <Comp ref={ref} className={cn(SIZE_CLASSES[size], className)} {...props} />;
  }
);
Container.displayName = "Container";
