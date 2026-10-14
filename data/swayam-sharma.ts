export type ProfileInfo = {
  label: string;
  value: string;
};

export type TocItem = {
  id: string;
  label: string;
};

export const profileInfo: ProfileInfo[] = [
  { label: "Full Name", value: "Swayam Sharma" },
  { label: "Born", value: "24 October 2001" },
  {
    label: "Birth Place",
    value: "Soyat Kala, Agar Malwa, Madhya Pradesh, India",
  },
  { label: "Nationality", value: "Indian" },
  { label: "Position", value: "National Organization General Secretary" },
  {
    label: "Education",
    value: "Bachelor of Naturopathy and Yogic Sciences (BNYS)",
  },
  { label: "Alma Mater", value: "DRSU, Jodhpur, Rajasthan" },
  {
    label: "Organization",
    value: "Rashtriya Vidyarthi Manch; Narendra Modi Vichar Manch (RVM)",
  },
  { label: "Current City", value: "Indore, Madhya Pradesh" },
  {
    label: "Occupation",
    value: "Youth Leader, Social Worker, Public Representative",
  },
  {
    label: "Known For",
    value: "Youth leadership and grassroots development work",
  },
];

export const tocItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "early-life", label: "Early Life" },
  { id: "education", label: "Education" },
  { id: "career", label: "Career" },
  { id: "responsibilities", label: "Key Responsibilities and Work" },
  { id: "vision", label: "Vision" },
  { id: "core-values", label: "Core Values" },
  { id: "personal-life", label: "Personal Life" },
  { id: "social-media", label: "Social Media" },
];

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
