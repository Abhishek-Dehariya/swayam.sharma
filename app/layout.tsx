import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import {
  faqs,
  siteDescription,
  siteImageUrl,
  siteKeywords,
  siteOgImageUrl,
  siteTitle,
  siteUrl,
} from "@/data/swayam-sharma";

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
  keywords: siteKeywords,
  authors: [{ name: "Swayam Sharma", url: siteUrl }],
  creator: "Swayam Sharma",
  publisher: "Swayam Sharma",
  applicationName: "Swayam Sharma",
  category: "Public Figure / Youth Leadership",
  classification: "Social Worker, Public Speaker, Youth Leader",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
      "hi-IN": siteUrl,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "profile",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
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
        type: "image/png",
      },
      {
        url: siteImageUrl,
        width: 1079,
        height: 1280,
        alt: "Swayam Sharma Portrait — Youth Leader and Public Speaker",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SWAYAMINDORE",
    creator: "@SWAYAMINDORE",
    title: siteTitle,
    description: siteDescription,
    images: [siteOgImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Indore",
    "geo.position": "22.7533;75.8937",
    ICBM: "22.7533, 75.8937",
    rating: "General",
    "revisit-after": "7 days",
  },
};

const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Swayam Sharma",
      alternateName: ["Swayam Sharma Official", "स्वयं शर्मा", "Swayam Sharma Indore"],
      description: siteDescription,
      inLanguage: ["en-IN", "hi-IN"],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#primaryimage`,
        url: siteImageUrl,
        caption: "Swayam Sharma — Youth Leader, Social Worker & Public Speaker",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Swayam Sharma",
      alternateName: ["स्वयं शर्मा", "Swayam Sharma Indore"],
      url: siteUrl,
      image: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#primaryimage`,
        url: siteImageUrl,
        caption: "Swayam Sharma",
      },
      jobTitle: "National Executive President (Rashtriya Karyakari Adhyaksh)",
      description: siteDescription,
      gender: "Male",
      nationality: {
        "@type": "Country",
        name: "India",
      },
      birthDate: "2001-10-24",
      birthPlace: {
        "@type": "Place",
        name: "Soyat Kalan, Agar Malwa, Madhya Pradesh, India",
      },
      homeLocation: {
        "@type": "Place",
        name: "Indore, Madhya Pradesh, India",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shri Aurobindo Hospital Campus",
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
            "Rashtriya Vidyarthi Manch (RVM) functions under Mission New India as a national student and youth empowerment movement.",
        },
        {
          "@type": "Organization",
          name: "Mission New India",
          description:
            "Mission New India brings together 29 shakhas actively working across public service and nation-building.",
        },
      ],
      knowsLanguage: ["Hindi", "Malwi", "English"],
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
      knowsAbout: [
        "Youth Leadership",
        "Social Work",
        "Community Mobilization",
        "Public Speaking",
        "Student Welfare",
        "Naturopathy & Yogic Sciences",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Youth Leader, Social Worker & Public Speaker",
        occupationalCategory: "Community and Social Service",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "public office",
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
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
        />
      </body>
    </html>
  );
}
