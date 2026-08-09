import { ThemeToggle } from "@/components/theme-toggle";

const SWATCHES = [
  { className: "bg-primary", label: "Primary" },
  { className: "bg-secondary", label: "Secondary" },
  { className: "bg-accent", label: "Accent" },
  { className: "bg-muted", label: "Muted" },
  { className: "bg-success", label: "Success" },
  { className: "bg-warning", label: "Warning" },
  { className: "bg-destructive", label: "Destructive" },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="container flex items-center justify-between">
        <p className="text-caption">Module 3 — Theme System</p>
        <ThemeToggle />
      </div>

      <div className="container mt-12 space-y-16">
        <section>
          <p className="text-h1">DMV Tech Platform</p>
          <p className="text-body-lg mt-4 max-w-2xl text-muted-foreground">
            Color system, typography, shadows, and light/dark theming are wired up.
            The Navbar, Hero, and homepage sections arrive in later modules.
          </p>
        </section>

        <section>
          <p className="text-h3">Color System</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SWATCHES.map((swatch) => (
              <div key={swatch.label} className="overflow-hidden rounded-xl border border-border shadow-soft">
                <div className={`h-20 ${swatch.className}`} />
                <div className="bg-card p-3">
                  <p className="text-sm font-medium">{swatch.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-h3">Typography</p>
          <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-8 shadow-soft">
            <p className="text-display-1">Display 1</p>
            <p className="text-display-2">Display 2</p>
            <p className="text-h1">Heading 1</p>
            <p className="text-h2">Heading 2</p>
            <p className="text-h3">Heading 3</p>
            <p className="text-h4">Heading 4</p>
            <p className="text-h5">Heading 5</p>
            <p className="text-h6">Heading 6</p>
            <p className="text-body-lg">Body large — used for lead paragraphs and intros.</p>
            <p className="text-body">Body — the default paragraph size across the site.</p>
            <p className="text-body-sm">Body small — secondary or supporting text.</p>
            <p className="text-caption">Caption / eyebrow text</p>
            <p className="text-button">Button label</p>
          </div>
        </section>

        <section>
          <p className="text-h3">Shadows &amp; Surfaces</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="flex h-24 items-center justify-center rounded-xl bg-card shadow-soft">
              <span className="text-body-sm">soft</span>
            </div>
            <div className="flex h-24 items-center justify-center rounded-xl bg-card shadow-elevated">
              <span className="text-body-sm">elevated</span>
            </div>
            <div className="flex h-24 items-center justify-center rounded-xl bg-card shadow-premium">
              <span className="text-body-sm">premium</span>
            </div>
            <div className="flex h-24 items-center justify-center rounded-xl bg-card shadow-glow">
              <span className="text-body-sm">glow</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="gradient-brand flex h-24 items-center justify-center rounded-xl text-primary-foreground shadow-elevated">
              <span className="text-button">gradient-brand</span>
            </div>
            <div className="glass relative flex h-24 items-center justify-center overflow-hidden rounded-xl">
              <div className="gradient-brand absolute inset-0 -z-10 opacity-40" />
              <span className="text-button">.glass effect</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
