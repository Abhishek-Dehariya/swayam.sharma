import type { MetadataRoute } from "next";
import { siteImageUrl, siteOgImageUrl, siteUrl } from "@/data/swayam-sharma";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        siteImageUrl,
        siteOgImageUrl,
        `${siteUrl}/images/05.jpeg`,
        `${siteUrl}/images/08.jpeg`,
        `${siteUrl}/images/02.jpeg`,
      ],
    },
  ];
}
