
import Image from "next/image";
import Link from "next/link";
import { ROUTES, companyProfile } from "@/constants";
import { cn } from "@/lib/cn";

interface NavLogoProps {
  size?: "header" | "footer";
  className?: string;
}

export function NavLogo({
  size = "header",
  className,
}: NavLogoProps) {
  const isHeader = size === "header";

  return (
    <Link
      href={ROUTES.home}
      aria-label={`${companyProfile.name} — Home`}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-xl",
        "transition-transform duration-200",
        "hover:scale-[1.02]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "motion-reduce:transition-none",
        className
      )}
    >
      <Image
        src="/images/dmv-tech-logo.jpg"
        alt={`${companyProfile.name} logo`}
        width={150}
        height={150}
        priority={isHeader}
        sizes={
          isHeader
            ? "(min-width: 1024px) 48px, 40px"
            : "64px"
        }
        className={cn(
          "shrink-0 rounded-xl object-contain",
          isHeader
            ? "h-10 w-10 lg:h-12 lg:w-12"
            : "h-16 w-16"
        )}
      />

      <div className="flex min-w-0 flex-col justify-center">
        <span
          className={cn(
            "whitespace-nowrap font-bold tracking-tight text-foreground",
            isHeader
              ? "text-sm leading-tight sm:text-base lg:text-lg"
              : "text-lg leading-tight sm:text-xl"
          )}
        >
          DMV Tech Services
        </span>

        <span
          className={cn(
            "text-muted-foreground",
            isHeader
  ? "hidden sm:block text-[10px] lg:text-xs leading-tight"
  : "text-xs leading-snug"
          )}
        >
          IT Infrastructure & Technology Solutions
        </span>
      </div>
    </Link>
  );
}
