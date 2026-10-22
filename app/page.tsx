import type { Metadata } from "next";
import SwayamProfile from "@/components/biography/SwayamProfile";
import {
  siteDescription,
  siteImageUrl,
  siteTitle,
  siteUrl,
} from "@/data/swayam-sharma";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Swayam Sharma",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: siteImageUrl,
        width: 1000,
        height: 1500,
        alt: "Swayam Sharma — Youth Leader, Social Worker and Public Speaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImageUrl],
  },
};

export default function Home() {
  return <SwayamProfile />;
}
