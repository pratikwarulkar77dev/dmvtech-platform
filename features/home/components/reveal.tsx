"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in milliseconds. */
  delay?: number;
}

type RevealState = "visible" | "hidden" | "shown";

/**
 * Fades and lifts content in as it scrolls into view.
 *
 * Content is fully visible on the server render, with JavaScript disabled, and
 * for visitors who prefer reduced motion. Only elements that start below the
 * fold are hidden after hydration, so nothing flashes or stays invisible.
 */
export function Reveal({ className, delay = 0, style, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<RevealState>("visible");

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        state !== "visible" && "transition-[opacity,transform] duration-700 ease-out",
        state === "hidden" && "translate-y-5 opacity-0",
        state === "shown" && "translate-y-0 opacity-100",
        className
      )}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
