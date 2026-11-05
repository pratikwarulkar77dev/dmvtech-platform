import Image from "next/image";
import Link from "next/link";
import { ROUTES, companyProfile } from "@/constants";
import { cn } from "@/lib/cn";

interface NavLogoProps {
  /** "header" is compact; "footer" is larger. */
  size?: "header" | "footer";
  className?: string;
}

/**
 * Official DMV Tech Services logo, linked to the homepage. The source file is
 * square (150×150); both intrinsic dimensions are passed to next/image and the
 * rendered box is always square, so the artwork is never stretched or cropped.
 */
export function NavLogo({ size = "header", className }: NavLogoProps) {
  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "inline-flex shrink-0 rounded-xl transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100",
        className
      )}
    >
      <Image
        src="/images/dmv-tech-logo.jpg"
        alt={`${companyProfile.name} — home`}
        width={150}
        height={150}
        priority={size === "header"}
        sizes={size === "header" ? "(min-width: 1024px) 48px, 40px" : "64px"}
        className={cn(
          "rounded-xl",
          size === "header" ? "h-10 w-10 lg:h-12 lg:w-12" : "h-16 w-16"
        )}
      />
    </Link>
  );
}
