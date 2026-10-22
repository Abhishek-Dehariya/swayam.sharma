import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/swayam-sharma";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot"],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
