export type ProfileInfo = {
  label: string;
  value: string;
};

export type TocItem = {
  id: string;
  label: string;
};

export type CareerStep = {
  role: string;
  period: string;
  current?: boolean;
};

export type OrganizationRole = {
  name: string;
  role: string;
  description: string;
  steps: CareerStep[];
};

export type KeyEvent = {
  title: string;
  date: string;
  location?: string;
  role: string;
  detail: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: string;
  image?: string;
  alt: string;
  date?: string;
  objectPosition?: string;
};

/** Production domain used for canonical URLs and social sharing metadata. */
export const siteUrl = "https://swayam-sharma.vercel.app";

/** Absolute production URL of the shared social image. */
export const siteImageUrl = `${siteUrl}/images/01.jpeg`;

export const siteTitle =
  "Swayam Sharma | Youth Leader, Social Worker & Public Speaker";

export const siteDescription =
  "Learn about Swayam Sharma, youth leader, social worker and public speaker based in Indore, Madhya Pradesh. Explore his organizational responsibilities, education, career progression and public events.";

export const profileInfo: ProfileInfo[] = [
  { label: "Name", value: "Swayam Sharma" },
  {
    label: "Current Position",
    value:
      "National Executive President (Rashtriya Karyakari Adhyaksh), Rashtriya Vidyarthi Manch (RVM)",
  },
  {
    label: "Organization",
    value: "Rashtriya Vidyarthi Manch (RVM), under Mission New India",
  },
  { label: "Mission New India Position", value: "Organisation Coordinator" },
  {
    label: "Education",
    value: "Bachelor of Naturopathy and Yogic Sciences (BNYS) — Pursuing",
  },
  {
    label: "University",
    value:
      "Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University (DRSU), Jodhpur, Rajasthan",
  },
  { label: "Schooling", value: "Gaurav Vaibhav School (2020)" },
  { label: "Occupation", value: "Youth Leader, Social Worker, Public Speaker" },
  { label: "Base", value: "Indore, Madhya Pradesh" },
  { label: "Languages", value: "Hindi and Malwi (Fluent)" },
];

export const tocItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "early-life", label: "Early Life" },
  { id: "education", label: "Education" },
  { id: "career", label: "Career" },
  { id: "events", label: "Key Events" },
  { id: "gallery", label: "Gallery" },
  { id: "responsibilities", label: "Key Responsibilities" },
  { id: "vision", label: "Vision" },
  { id: "core-values", label: "Core Values" },
  { id: "personal-life", label: "Personal Life" },
  { id: "contact", label: "Contact" },
  { id: "social-media", label: "Social Media" },
];

export const aboutParagraphs: string[] = [
  "Swayam Sharma is an Indian youth leader, social worker and public speaker based in Indore, Madhya Pradesh. Born on 24 October 2001 in Soyat Kala, in the Agar Malwa district of Madhya Pradesh, he is currently pursuing a Bachelor of Naturopathy and Yogic Sciences (BNYS) from Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University (DRSU), Jodhpur.",
  "He serves as National Executive President (Rashtriya Karyakari Adhyaksh) of Rashtriya Vidyarthi Manch (RVM), a student organization that functions under Mission New India, and as Organisation Coordinator in Mission New India, which brings together 29 shakhas working in different fields. His journey in the organization began as District President in 2022. He then served as Provincial General Secretary and National Organization General Secretary before taking up his present national responsibility.",
  "His work focuses on youth mobilization, grassroots development and the responsible participation of young people in public life. He has organized the Virat Hindu Sammelan in Indore (11 January 2026), spoken on the panel at the Akhil Bhartiya Pratinidhi Sabha in Visakhapatnam (August 2026), and taken part in public programmes such as the Dussehra Mahotsav. Through RVM, he works to connect the student community with the shakhas of Mission New India and to give young people a platform to lead with integrity and transparency.",
];

export const organizations: OrganizationRole[] = [
  {
    name: "Rashtriya Vidyarthi Manch (RVM)",
    role: "National Executive President (Rashtriya Karyakari Adhyaksh)",
    description:
      "Swayam Sharma began as District President in 2022, then served as Provincial General Secretary and National Organization General Secretary, and now serves as National Executive President. He coordinates organizational activities, guides student and youth participation, and supports organizational growth across regions.",
    steps: [
      { role: "District President", period: "2022" },
      { role: "Provincial General Secretary", period: "" },
      { role: "National Organization General Secretary", period: "" },
      {
        role: "National Executive President",
        period: "Current",
        current: true,
      },
    ],
  },
  {
    name: "Mission New India",
    role: "Organisation Coordinator",
    description:
      "Mission New India is the larger organization under which Rashtriya Vidyarthi Manch functions. It has 29 shakhas working in different fields. Swayam Sharma works to connect the student community with these shakhas through RVM.",
    steps: [],
  },
];

export const keyEvents: KeyEvent[] = [
  {
    title: "Virat Hindu Sammelan",
    date: "11 January 2026",
    location: "Indore, Madhya Pradesh",
    role: "Organizer",
    detail: "Organized the Virat Hindu Sammelan in Indore, Madhya Pradesh.",
  },
  {
    title: "Akhil Bhartiya Pratinidhi Sabha",
    date: "8–9 August 2026",
    location: "Visakhapatnam",
    role: "Speaker on the panel",
    detail:
      "Spoke on the panel at the Akhil Bhartiya Pratinidhi Sabha in Visakhapatnam.",
  },
  {
    title: "Mission Nav Bharat Yuva Morcha Foundation Day",
    date: "22nd Foundation Day",
    role: "Felicitated",
    detail: "Felicitated with a garland and memento on the 22nd Foundation Day.",
  },
  {
    title: "Dussehra Mahotsav",
    date: "",
    role: "Attended and felicitated",
    detail: "Attended the Dussehra Mahotsav and was felicitated.",
  },
];

export const galleryCategories = [
  "Visakhapatnam — Akhil Bhartiya Pratinidhi Sabha",
  "Dussehra Mahotsav",
  "Felicitation events",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "visakhapatnam-sabha",
    title: "Akhil Bhartiya Pratinidhi Sabha",
    caption: "Panel Speaker Address at Visakhapatnam National Meet",
    category: "Visakhapatnam — Akhil Bhartiya Pratinidhi Sabha",
    image: "/images/05.jpeg",
    objectPosition: "object-[center_28%]",
    date: "8–9 August 2026",
    alt: "Swayam Sharma speaking on the panel at the Akhil Bhartiya Pratinidhi Sabha in Visakhapatnam",
  },
  {
    id: "dussehra-mahotsav",
    title: "Dussehra Mahotsav",
    caption: "Felicitation and stage address during the Dussehra Mahotsav celebrations",
    category: "Dussehra Mahotsav",
    image: "/images/08.jpeg",
    objectPosition: "object-[center_28%]",
    date: "Festive Season",
    alt: "Swayam Sharma taking part in the Dussehra Mahotsav on stage",
  },
  {
    id: "felicitation-events",
    title: "Felicitation and Recognition",
    caption: "Garland & Memento Ceremony by Community Dignitaries",
    category: "Felicitation events",
    image: "/images/02.jpeg",
    objectPosition: "object-[center_20%]",
    date: "Recognition Event",
    alt: "Swayam Sharma receiving a garland and memento at a felicitation ceremony",
  },
];

export const contactInfo = {
  mobile: "97137 48719",
  mobileHref: "tel:+919713748719",
  email: "swayamsharmaoffice@gmail.com",
  emailHref: "mailto:swayamsharmaoffice@gmail.com",
  address: "Shri Aurobindo Hospital, Indore, Madhya Pradesh 453555",
  addressLine1: "Shri Aurobindo Hospital",
  addressLine2: "Indore, Madhya Pradesh 453555",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Shri Aurobindo Hospital, Indore, Madhya Pradesh 453555"),
};

export const socialLinks = [
  {
    name: "Instagram",
    handle: "@swayamsharmaofficial",
    href: "https://instagram.com/swayamsharmaofficial",
  },
  {
    name: "Facebook",
    handle: "Swayam Sharma",
    href: "https://www.facebook.com/share/1JHuGbypWX/",
  },
  {
    name: "Threads",
    handle: "@swayamsharmaofficial",
    href: "https://www.threads.com/@swayamsharmaofficial",
  },
  {
    name: "YouTube",
    handle: "@swayamsharmaofficial",
    href: "https://youtube.com/@swayamsharmaofficial",
  },
  {
    name: "X",
    handle: "@SWAYAMINDORE",
    href: "https://x.com/SWAYAMINDORE",
  },
] as const;
