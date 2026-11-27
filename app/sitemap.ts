export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/business";
import { navigation } from "@/data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navigation.map((n) => ({
    url: `${siteUrl}${n.href === "/" ? "" : n.href}`,
    changeFrequency: "monthly" as const,
    priority: n.href === "/" ? 1 : 0.8,
  }));
  return [
    ...pages,
    { url: `${siteUrl}/mentions-legales`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${siteUrl}/confidentialite`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];
}
