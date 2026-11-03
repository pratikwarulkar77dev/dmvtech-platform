export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * Icon keys used by the navigation config. Kept as plain string keys so that
 * `constants/` never imports React/icon components — the key → component
 * mapping lives in `features/navigation/lib/nav-icons.ts`.
 */
export type NavIconName =
  | "network"
  | "shield-check"
  | "code"
  | "compass"
  | "factory"
  | "graduation-cap"
  | "landmark"
  | "heart-pulse"
  | "shopping-bag"
  | "briefcase"
  | "book-open"
  | "folder-kanban"
  | "file-text"
  | "users"
  | "building"
  | "mail";

/** A single link inside a mega menu, dropdown, or the mobile drawer. */
export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
  icon?: NavIconName;
  /** Small label shown beside the title, e.g. "Soon". */
  badge?: string;
  /** Rendered as non-interactive text (used for services not yet live). */
  disabled?: boolean;
}

export interface NavGroup {
  title: string;
  icon?: NavIconName;
  items: NavLinkItem[];
}

export interface NavFooterLink {
  label: string;
  href: string;
}

export interface NavFeatured {
  title: string;
  description: string;
  cta: NavFooterLink;
}

export interface MegaNavItem {
  type: "mega";
  id: string;
  label: string;
  /** Landing page for the whole section (also surfaced as "View all"). */
  href: string;
  groups: NavGroup[];
  featured: NavFeatured;
  footerLink: NavFooterLink;
}

export interface DropdownNavItem {
  type: "dropdown";
  id: string;
  label: string;
  items: NavLinkItem[];
  /** Number of columns for the dropdown panel on desktop. */
  columns: 1 | 2;
  footerLink?: NavFooterLink;
}

export type PrimaryNavItem = MegaNavItem | DropdownNavItem;

export interface NavCta {
  label: string;
  href: string;
}
