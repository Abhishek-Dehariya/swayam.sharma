import type { MetadataRoute } from "next";
import { siteDescription, siteTitle } from "@/data/swayam-sharma";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: "Swayam Sharma",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#172334",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
