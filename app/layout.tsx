import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers";
import { Navbar } from "@/features/navigation";
import { SiteFooter } from "@/features/footer";
import { themeInitScript } from "@/providers/theme-provider";
import { seoConfig, siteConfig } from "@/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  icons: { icon: seoConfig.ogImage },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        {/* Runs before hydration to apply the correct theme class — prevents
            a flash of the wrong theme on first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <AppProviders>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
