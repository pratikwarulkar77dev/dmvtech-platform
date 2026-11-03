import type { PrimaryNavItem } from "@/types";

/** Strips any query string or hash so "/contact?intent=quote" compares as "/contact". */
function stripQueryAndHash(href: string): string {
  const [path] = href.split(/[?#]/);
  return path && path.length > 0 ? path : "/";
}

/**
 * True when `pathname` is the page at `href` or any page nested beneath it.
 * The home route only matches exactly, otherwise it would match everything.
 */
export function isActivePath(pathname: string, href: string): boolean {
  const target = stripQueryAndHash(href);
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
}

/** Every link href that belongs to a top-level nav item (used for active-state detection). */
export function getNavItemHrefs(item: PrimaryNavItem): string[] {
  if (item.type === "mega") {
    return [item.href, ...item.groups.flatMap((group) => group.items.map((link) => link.href))];
  }
  return [
    ...item.items.map((link) => link.href),
    ...(item.footerLink ? [item.footerLink.href] : []),
  ];
}

/** True when the current page falls under any link of the given top-level nav item. */
export function isNavItemActive(pathname: string, item: PrimaryNavItem): boolean {
  return getNavItemHrefs(item).some((href) => isActivePath(pathname, href));
}
