
"use client";

import type { ReactNode } from "react";
import { DEFAULT_THEME, ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme={DEFAULT_THEME}>
      <TooltipProvider delayDuration={200}>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
