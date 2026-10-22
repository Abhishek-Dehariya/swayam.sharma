import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteDescription, siteImageUrl, siteTitle, siteUrl } from "@/data/swayam-sharma";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Swayam Sharma",
  },
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Swayam Sharma",
  url: siteUrl,
  image: siteImageUrl,
  jobTitle: "Youth Leader, Social Worker, Public Speaker",
  description: siteDescription,
  nationality: "Indian",
  birthDate: "2001-10-24",
  birthPlace: {
    "@type": "Place",
    name: "Soyat Kala, Agar Malwa, Madhya Pradesh, India",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shri Aurobindo Hospital",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "453555",
    addressCountry: "IN",
  },
  worksFor: [
    {
      "@type": "Organization",
      name: "Rashtriya Vidyarthi Manch (RVM)",
      description:
        "Rashtriya Vidyarthi Manch (RVM) functions under Mission New India.",
    },
    {
      "@type": "Organization",
      name: "Mission New India",
      description:
        "Mission New India brings together 29 shakhas working in different fields.",
    },
  ],
  knowsLanguage: ["Hindi", "Malwi"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University (DRSU)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jodhpur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "public",
      telephone: "+91-97137-48719",
      email: "swayamsharmaoffice@gmail.com",
    },
  ],
  sameAs: [
    "https://instagram.com/swayamsharmaofficial",
    "https://www.facebook.com/share/1JHuGbypWX/",
    "https://www.threads.com/@swayamsharmaofficial",
    "https://youtube.com/@swayamsharmaofficial",
    "https://x.com/SWAYAMINDORE",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
