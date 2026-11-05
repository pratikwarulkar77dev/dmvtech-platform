/**
 * Decorative backdrop: white easing into ice/sky blue, with three softly
 * drifting colour washes (sky, cyan, lavender) and a faint dot grid.
 * Purely visual, so it is hidden from assistive technology.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-hero-white via-hero-ice to-hero-sky/60" />

      <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] animate-hero-drift rounded-full bg-hero-sky blur-3xl motion-reduce:animate-none" />
      <div
        className="absolute -left-32 top-1/3 h-[26rem] w-[26rem] animate-hero-drift rounded-full bg-hero-cyan/20 blur-3xl motion-reduce:animate-none"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[22rem] w-[22rem] animate-hero-drift rounded-full bg-hero-lavender/30 blur-3xl motion-reduce:animate-none"
        style={{ animationDelay: "-12s" }}
      />

      <div
        className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--hero-royal) / 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
