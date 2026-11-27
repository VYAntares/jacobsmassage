import type { Metadata } from "next";
import { business } from "@/data/business";

export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Jacob's Massage — Relâcher le corps, apaiser l'esprit. Massothérapie à Lonay, 079 450 84 96",
  type: "image/jpeg",
};

/** Per-page metadata with complete Open Graph / Twitter tags for link previews. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} — ${business.name}, ${business.address.city}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_CH",
      siteName: business.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}
