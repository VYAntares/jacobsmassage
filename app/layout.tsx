import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { business, siteUrl } from "@/data/business";

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/inter-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jacob's Massage — Massothérapeute à Lonay | Massage & Réflexologie",
    template: "%s — Jacob's Massage, Lonay",
  },
  description:
    "Massage classique et réflexologie plantaire et palmaire à Lonay, proche de Morges. Elie Berthet, massothérapeute, adapte chaque séance à votre corps et à votre rythme.",
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: business.name,
    title: "Jacob's Massage — Massothérapeute à Lonay",
    description:
      "Massage classique et réflexologie dans un cabinet simple et chaleureux à Lonay, proche de Morges.",
    images: [{ url: "/images/massage-dos.jpg", width: 1065, height: 1600, alt: "Massage du dos en cabinet" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0B2A36",
  width: "device-width",
  initialScale: 1,
};

// Hides reveal targets before first paint only when motion is allowed;
// falls back to fully visible content if JS never boots.
const motionBoot = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('js-motion')},3000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <JsonLd />
      </head>
      <body>
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <SmoothScroll>
          <SiteHeader />
          <main id="contenu" tabIndex={-1} style={{ outline: "none" }}>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
