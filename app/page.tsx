import type { Metadata } from "next";
import SwayamProfile from "@/components/biography/SwayamProfile";

export const metadata: Metadata = {
  title: "Swayam Sharma | Public Profile",
  description:
    "Public profile and biography of Swayam Sharma, youth leader, social worker, and public representative based in Indore, Madhya Pradesh.",
  openGraph: {
    title: "Swayam Sharma | Public Profile",
    description:
      "Public profile and biography of Swayam Sharma, youth leader, social worker, and public representative based in Indore, Madhya Pradesh.",
    images: [{ url: "/images/swayam-sharma.jpg", width: 1000, height: 1500 }],
  },
};

export default function Home() {
  return <SwayamProfile />;
}
