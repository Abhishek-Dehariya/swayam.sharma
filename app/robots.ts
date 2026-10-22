import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/swayam-sharma";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
