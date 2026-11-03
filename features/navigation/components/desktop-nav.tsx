"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/constants";
import { isNavItemActive } from "@/utils/nav";
import { useNavMenuController } from "../hooks/use-nav-menu-controller";
import { DropdownPanel } from "./dropdown-panel";
import { MegaMenuPanel } from "./mega-menu-panel";
import { NavDisclosure } from "./nav-disclosure";

/** Desktop (lg and up) primary navigation. */
export function DesktopNav() {
  const pathname = usePathname();
  const controller = useNavMenuController();
  const { close } = controller;

  // Always collapse open panels after a client-side navigation.
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <nav aria-label="Primary" className="ml-6 hidden self-stretch lg:flex xl:ml-10">
      <ul className="flex items-stretch gap-0.5">
        {primaryNav.map((item) => (
          <NavDisclosure
            key={item.id}
            id={item.id}
            label={item.label}
            active={isNavItemActive(pathname, item)}
            variant={item.type === "mega" ? "mega" : "dropdown"}
            controller={controller}
          >
            {item.type === "mega" ? (
              <MegaMenuPanel item={item} pathname={pathname} />
            ) : (
              <DropdownPanel item={item} pathname={pathname} />
            )}
          </NavDisclosure>
        ))}
      </ul>
    </nav>
  );
}
