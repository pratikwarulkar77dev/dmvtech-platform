import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { NavLinkItem } from "@/types";
import { NAV_ICONS } from "../lib/nav-icons";

interface NavPanelLinkProps {
  item: NavLinkItem;
  active: boolean;
}

/** A single row inside a desktop mega menu or dropdown panel. */
export function NavPanelLink({ item, active }: NavPanelLinkProps) {
  const Icon = item.icon ? NAV_ICONS[item.icon] : null;

  const content = (
    <>
      {Icon && (
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-muted text-accent transition-colors group-hover:border-accent/40"
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          {item.label}
          {item.badge && <Badge variant="outline">{item.badge}</Badge>}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
            {item.description}
          </span>
        )}
      </span>
    </>
  );

  if (item.disabled) {
    return (
      <div aria-disabled="true" className="flex gap-3 rounded-lg p-3 opacity-70">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
        active && "bg-muted"
      )}
    >
      {content}
    </Link>
  );
}
