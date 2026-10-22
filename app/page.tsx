import type { Metadata } from "next";
import SwayamProfile from "@/components/biography/SwayamProfile";
import {
  siteDescription,
  siteImageUrl,
  siteKeywords,
  siteOgImageUrl,
  siteTitle,
  siteUrl,
} from "@/data/swayam-sharma";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Swayam Sharma",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: siteOgImageUrl,
        width: 1200,
        height: 630,
        alt: "Swayam Sharma — National Executive President, Rashtriya Vidyarthi Manch (RVM)",
      },
      {
        url: siteImageUrl,
        width: 1079,
        height: 1280,
        alt: "Swayam Sharma Portrait — Youth Leader and Public Speaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteOgImageUrl],
  },
};

export default function Home() {
  return <SwayamProfile />;
}
