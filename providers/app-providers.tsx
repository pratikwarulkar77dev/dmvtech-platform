
"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider delayDuration={200}>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
