"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavMenuController } from "../hooks/use-nav-menu-controller";

interface NavDisclosureProps {
  id: string;
  label: string;
  /** True when the current route belongs to this menu — shows the active indicator. */
  active: boolean;
  /**
   * "mega" panels span the full header width (anchored to the sticky header);
   * "dropdown" panels hang from the trigger.
   */
  variant: "mega" | "dropdown";
  controller: NavMenuController;
  children: React.ReactNode;
}

/**
 * Accessible disclosure for site navigation (WAI-ARIA "disclosure navigation"
 * pattern). The trigger is a real <button> with aria-expanded/aria-controls
 * and the panel contains ordinary links, which is the correct semantics for
 * navigation (as opposed to an application-style role="menu").
 *
 * Interaction model
 *  - Mouse: hover opens, leaving closes after a short grace delay.
 *  - Touch / keyboard: Enter, Space, or tap toggles.
 *  - ArrowDown on the trigger opens the panel and focuses its first link;
 *    ArrowUp/ArrowDown move between links; Escape closes and restores focus.
 *  - Focus or pointer-down outside closes the panel.
 */
export function NavDisclosure({
  id,
  label,
  active,
  variant,
  controller,
  children,
}: NavDisclosureProps) {
  const panelId = React.useId();
  const isOpen = controller.openId === id;

  const rootRef = React.useRef<HTMLLIElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const pointerTypeRef = React.useRef<string | null>(null);

  const { close } = controller;

  // Dismiss when focus or a pointer lands outside this menu.
  React.useEffect(() => {
    if (!isOpen) return;

    const isOutside = (target: EventTarget | null) =>
      target instanceof Node && !rootRef.current?.contains(target);

    const onFocusIn = (event: FocusEvent) => {
      if (isOutside(event.target)) close();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (isOutside(event.target)) close();
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen, close]);

  const getPanelLinks = (): HTMLAnchorElement[] =>
    Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);

  const handleRootKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.stopPropagation();
      controller.close();
      triggerRef.current?.focus();
    }
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    controller.open(id);
    // Discrete events flush synchronously, so the panel is interactive by the next frame.
    requestAnimationFrame(() => getPanelLinks()[0]?.focus());
  };

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = getPanelLinks();
    if (links.length === 0) return;

    event.preventDefault();
    const current = links.findIndex((link) => link === document.activeElement);
    const goingDown = event.key === "ArrowDown";

    let next: number;
    if (current === -1) {
      next = goingDown ? 0 : links.length - 1;
    } else {
      next = (current + (goingDown ? 1 : -1) + links.length) % links.length;
    }
    links[next]?.focus();
  };

  const handlePanelClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close on any link activation, including links to the page we're already on.
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      controller.close();
    }
  };

  const handleTriggerClick = () => {
    const pointerType = pointerTypeRef.current;
    pointerTypeRef.current = null;
    // A mouse click on a menu that hover already opened must not immediately close it.
    if (pointerType === "mouse") {
      controller.open(id);
    } else {
      controller.toggle(id);
    }
  };

  return (
    <li
      ref={rootRef}
      className={cn("flex items-center", variant === "dropdown" && "relative")}
      onKeyDown={handleRootKeyDown}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") controller.open(id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") controller.scheduleClose(id);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onPointerDown={(event) => {
          pointerTypeRef.current = event.pointerType;
        }}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "relative inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-200 motion-reduce:after:transition-none",
          isOpen || active
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
          isOpen && "bg-muted",
          active && "after:scale-x-100"
        )}
      >
        {label}
        {active && <span className="sr-only"> (current section)</span>}
        <ChevronDown
          aria-hidden
          className={cn(
            "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        role="group"
        aria-label={`${label} menu`}
        inert={!isOpen}
        onKeyDown={handlePanelKeyDown}
        onClick={handlePanelClick}
        className={cn(
          "absolute top-full z-50 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none",
          variant === "mega" ? "inset-x-0" : "left-0 pt-2",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        )}
      >
        {children}
      </div>
    </li>
  );
}
