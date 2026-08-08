/**
 * Single composition point for every app-wide React context provider.
 * Keeping this separate from `app/layout.tsx` means new providers (theme in
 * Module 3, auth session in Module 14, React Query in a later module) are
 * added here, not by re-editing the root layout each time.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
