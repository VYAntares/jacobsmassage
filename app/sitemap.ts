import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/business";
import { navigation } from "@/data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((n) => ({
    url: `${siteUrl}${n.href === "/" ? "" : n.href}`,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.8,
  }));
}
