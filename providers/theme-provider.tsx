"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** The user's stored preference — may be "system". */
  theme: Theme;
  /** The actual applied theme after resolving "system" to light/dark. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "dmvtech-theme";

/**
 * Theme applied to visitors who have never picked one. The site is designed
 * light-first; Dark and System only apply after an explicit choice, which is
 * persisted under STORAGE_KEY.
 */
export const DEFAULT_THEME: Theme = "light";
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeClass(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = DEFAULT_THEME }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("light");

  // Read the persisted preference on mount. The inline bootstrap script in
  // layout.tsx has already applied the correct class to <html> before this
  // runs, so there is no visible flash — this just syncs React state to it.
  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: Theme =
      stored === "light" || stored === "dark" || stored === "system" ? stored : defaultTheme;
    setThemeState(initial);
    setResolvedTheme(initial === "system" ? getSystemTheme() : initial);
    // Only ever runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track OS-level theme changes while the user's preference is "system".
  React.useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyThemeClass(resolved);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const resolved = next === "system" ? getSystemTheme() : next;
    setResolvedTheme(resolved);
    applyThemeClass(resolved);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Inline script source, injected as a blocking <script> in layout.tsx
 * *before* React hydrates. Without this, the page would render in the
 * default theme for a frame and then flash to the saved one — this runs
 * synchronously during HTML parsing to apply the correct class first.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : '${DEFAULT_THEME}';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    var root = document.documentElement;
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (e) {}
})();
`;
