import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/swayam-sharma";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
