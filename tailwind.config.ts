import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        hero: {
          white: "hsl(var(--hero-white) / <alpha-value>)",
          ice: "hsl(var(--hero-ice) / <alpha-value>)",
          sky: "hsl(var(--hero-sky) / <alpha-value>)",
          royal: "hsl(var(--hero-royal) / <alpha-value>)",
          "royal-foreground": "hsl(var(--hero-royal-foreground) / <alpha-value>)",
          navy: "hsl(var(--hero-navy) / <alpha-value>)",
          cyan: "hsl(var(--hero-cyan) / <alpha-value>)",
          lavender: "hsl(var(--hero-lavender) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.35rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.85rem" }],
        "2xl": ["1.5rem", { lineHeight: "2.1rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.3rem", letterSpacing: "-0.015em" }],
        "4xl": ["2.25rem", { lineHeight: "2.6rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "3.3rem", letterSpacing: "-0.025em" }],
        "6xl": ["3.75rem", { lineHeight: "4rem", letterSpacing: "-0.03em" }],
        "7xl": ["4.5rem", { lineHeight: "4.7rem", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-elevated)",
        premium: "var(--shadow-premium)",
        glow: "var(--shadow-glow)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "hero-float": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "hero-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2.5%, 3%, 0) scale(1.08)" },
        },
        "hero-dash": { to: { strokeDashoffset: "-24" } },
        "hero-pulse": { "0%": { transform: "scale(0.9)", opacity: "0.55" }, "100%": { transform: "scale(1.5)", opacity: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "hero-float": "hero-float 6s ease-in-out infinite",
        "hero-drift": "hero-drift 18s ease-in-out infinite",
        "hero-dash": "hero-dash 2.4s linear infinite",
        "hero-pulse": "hero-pulse 3s ease-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
