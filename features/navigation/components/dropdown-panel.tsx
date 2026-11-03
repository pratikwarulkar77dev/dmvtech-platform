import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/utils/nav";
import type { DropdownNavItem } from "@/types";
import { NavPanelLink } from "./nav-panel-link";

interface DropdownPanelProps {
  item: DropdownNavItem;
  pathname: string;
}

/** Compact panel used by Industries, Resources, and About. */
export function DropdownPanel({ item, pathname }: DropdownPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-2 shadow-premium",
        item.columns === 2 ? "w-[34rem]" : "w-80"
      )}
    >
      <ul className={cn("grid gap-1", item.columns === 2 && "grid-cols-2")}>
        {item.items.map((link) => (
          <li key={link.href}>
            <NavPanelLink item={link} active={isActivePath(pathname, link.href)} />
          </li>
        ))}
      </ul>

      {item.footerLink && (
        <div className="mt-2 border-t border-border px-1 pt-2">
          <Link
            href={item.footerLink.href}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.footerLink.label}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
