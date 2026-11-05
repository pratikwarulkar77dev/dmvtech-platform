import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <Container className="py-20 text-center sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wide text-hero-royal">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-hero-navy sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-hero-navy/75">
        The page you are looking for does not exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="bg-hero-royal text-hero-royal-foreground hover:bg-hero-royal/90"
        >
          <Link href={ROUTES.home}>Back to home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={ROUTES.contact}>Contact us</Link>
        </Button>
      </div>
    </Container>
  );
}
