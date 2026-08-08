"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Guards against hydration mismatches when a component's render depends on
 * browser-only state (e.g. the theme toggle in Module 3, or matchMedia
 * results from useMediaQuery below).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
