import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Loader } from "./icons";

const spinnerVariants = cva("animate-spin text-current", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label for standalone use (omit when the spinner is decorative inside a labeled button). */
  label?: string;
}

export function Spinner({ className, size, label, ...props }: SpinnerProps) {
  return (
    <>
      <Loader className={cn(spinnerVariants({ size }), className)} {...props} />
      {label && <span className="sr-only">{label}</span>}
    </>
  );
}
