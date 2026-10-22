"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowUp,
  AtSign,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  HandHeart,
  HelpCircle,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Phone,
  PlayCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Gallery from "@/components/biography/Gallery";
import {
  aboutParagraphs,
  contactInfo,
  faqs,
  keyEvents,
  organizations,
  profileInfo,
  socialLinks,
  tocItems,
} from "@/data/swayam-sharma";

const navItems = [
  { label: "Home", id: "top" },
  { label: "About", id: "overview" },
  { label: "Biography", id: "biography" },
  { label: "Education", id: "education" },
  { label: "Career", id: "career" },
  { label: "Events", id: "events" },
  { label: "Gallery", id: "gallery" },
  { label: "Vision", id: "vision" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const responsibilities = [
  {
    title: "Youth Leadership",
    description:
      "Leadership activities and public engagement focused on youth participation.",
    icon: UsersRound,
  },
  {
    title: "Community Development",
    description:
      "Community-oriented activities and awareness initiatives across different fields.",
    icon: HandHeart,
  },
  {
    title: "Youth Mobilization",
    description: "Encouraging participation and coordination among young people.",
    icon: Network,
  },
  {
    title: "Solution-Oriented Leadership",
    description:
      "Promoting practical thinking, responsible participation, and a focus on real issues.",
    icon: Lightbulb,
  },
];

const educationEntries = [
  {
    title: "Bachelor of Naturopathy and Yogic Sciences (BNYS)",
    status: "Pursuing",
    institution:
      "Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University (DRSU)",
    location: "Jodhpur, Rajasthan",
    icon: GraduationCap,
  },
  {
    title: "Gaurav Vaibhav School",
    status: "Completed (2020)",
    institution: "Gaurav Vaibhav School",
    location: "Madhya Pradesh",
    icon: Home,
  },
];

const values = [
  { title: "Integrity and Transparency", icon: ShieldCheck },
  { title: "Public Accountability", icon: CheckCircle2 },
  { title: "Youth Empowerment", icon: UsersRound },
  { title: "Nation-First Approach", icon: Target },
];

const socialIcon = {
  Instagram: Camera,
  Facebook: MessageCircle,
  Threads: AtSign,
  YouTube: PlayCircle,
  X,
};

/**
 * Shared surface classes so every card in the page speaks the same visual
 * language. Tokens come from `app/globals.css` — no raw hex values.
 */
const cardBase =
  "rounded-card border border-border bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift";

/** Icon plate used at the top of feature cards. */
const iconPlate =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent";

/** Small uppercase pill used for roles, statuses and categories. */
const pill =
  "inline-flex w-fit rounded-full px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em]";

function scrollToId(id: string, reduceMotion?: boolean) {
  const element = id === "top" ? document.body : document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

function sectionVariants(reduceMotion = false) {
  return {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.55 },
    },
  };
}

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      id={id}
      className={`scroll-mt-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants(reduceMotion)}
    >
      <header className="relative">
        {eyebrow ? (
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <div
          aria-hidden="true"
          className="mt-3 h-1 w-14 rounded-full rule-gradient"
        />
        <h2 className="mt-4 font-heading text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h2>
      </header>
      <div className="mt-6 sm:mt-7">{children}</div>
    </motion.section>
  );
}

const PORTRAIT_IMAGES = [
  {
    src: "/images/01.jpeg",
    alt: "Swayam Sharma — National Executive President of Rashtriya Vidyarthi Manch (RVM) in formal attire",
    position: "object-[center_28%]",
  },
  {
    src: "/images/02.jpeg",
    alt: "Swayam Sharma — Youth Leader and Social Worker during community felicitation",
    position: "object-[center_24%]",
  },
] as const;

let cachedPortraitIndex: number | null = null;

function getClientPortraitIndex(): number {
  if (typeof window === "undefined") return 0;
  if (cachedPortraitIndex !== null) return cachedPortraitIndex;
  try {
    const stored =
      sessionStorage.getItem("swayam_portrait_idx") ??
      localStorage.getItem("swayam_portrait_idx");
    const nextIndex = stored === "0" ? 1 : 0;
    sessionStorage.setItem("swayam_portrait_idx", String(nextIndex));
    localStorage.setItem("swayam_portrait_idx", String(nextIndex));
    cachedPortraitIndex = nextIndex;
    return nextIndex;
  } catch {
    cachedPortraitIndex = 0;
    return 0;
  }
}

const portraitStore = {
  listeners: new Set<() => void>(),
  getSnapshot(): number {
    return getClientPortraitIndex();
  },
  getServerSnapshot(): number {
    return 0;
  },
  subscribe(listener: () => void) {
    portraitStore.listeners.add(listener);
    return () => {
      portraitStore.listeners.delete(listener);
    };
  },
  toggle() {
    const current = getClientPortraitIndex();
    const next = current === 0 ? 1 : 0;
    cachedPortraitIndex = next;
    try {
      sessionStorage.setItem("swayam_portrait_idx", String(next));
      localStorage.setItem("swayam_portrait_idx", String(next));
    } catch {}
    portraitStore.listeners.forEach((listener) => listener());
  },
};

export default function SwayamProfile() {
  const reduceMotion = Boolean(useReducedMotion());
  const portraitIndex = useSyncExternalStore(
    portraitStore.subscribe,
    portraitStore.getSnapshot,
    portraitStore.getServerSnapshot
  );

  const togglePortrait = () => {
    portraitStore.toggle();
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");
  const [showTop, setShowTop] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  /** Ref to the mobile menu trigger so focus can be restored on close. */
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  /** Ref to the mobile menu panel so focus can move into it when opened. */
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Escape closes the mobile menu and returns focus to its trigger.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Move focus into the panel when it opens, and back to the trigger on close.
  const wasMenuOpen = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      wasMenuOpen.current = true;
      menuPanelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      return;
    }
    // Only restore focus if the menu was actually open — never on first mount.
    if (wasMenuOpen.current) {
      wasMenuOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const observedIds = useMemo(
    () => [
      "overview",
      "early-life",
      "education",
      "career",
      "events",
      "gallery",
      "responsibilities",
      "vision",
      "core-values",
      "personal-life",
      "contact",
      "social-media",
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 640);
      if (window.scrollY < 520) setActiveId("top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    observedIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [observedIds]);

  async function shareProfile() {
    const url = window.location.href.split("#")[0];
    setShareStatus("");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Swayam Sharma | Youth Leader, Social Worker & Public Speaker",
          text: "Public profile and biography of Swayam Sharma.",
          url,
        });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("Profile link copied.");
      window.setTimeout(() => setShareStatus(""), 2800);
    } catch {
      setShareStatus("Copy link unavailable.");
    }
  }

  const heroChild = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <a
        href="#biography"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to biography
      </a>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/85 shadow-header backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            className="group flex items-center gap-3 rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            onClick={() => scrollToId("top", reduceMotion)}
            aria-label="Go to top"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground font-heading text-sm font-extrabold leading-none text-white transition group-hover:bg-accent"
            >
              SS
            </span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-base font-extrabold leading-none text-foreground">
                SWAYAM SHARMA
              </span>
              <span className="mt-1 block text-[0.63rem] font-bold uppercase tracking-[0.22em] text-foreground-muted transition group-hover:text-accent">
                Public Profile
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive =
                activeId === item.id ||
                (item.id === "biography" && activeId === "early-life");
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id, reduceMotion)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex min-h-11 items-center rounded-full px-2.5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent xl:px-3.5 ${
                    isActive
                      ? "bg-accent text-white shadow-sm shadow-accent/25"
                      : "text-foreground-muted hover:bg-background hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToId("contact", reduceMotion)}
              className="hidden min-h-11 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-bold text-white transition hover:bg-foreground-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
            >
              <Mail className="h-4 w-4" />
              Connect
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-navigation"
            ref={menuPanelRef}
            className="border-t border-border bg-surface px-5 py-3 lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive =
                  activeId === item.id ||
                  (item.id === "biography" && activeId === "early-life");
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      scrollToId(item.id, reduceMotion);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isActive
                        ? "bg-accent/10 text-accent-ink"
                        : "text-foreground hover:bg-background"
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border hero-wash">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 rule-gradient"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9 }}
          />
          <div
            aria-hidden="true"
            className="paper-grid absolute inset-0"
          />
          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-16">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: reduceMotion ? 0 : 0.1, duration: 0.55 }}
              className="max-w-3xl"
            >
              <motion.p variants={heroChild} className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface/85 px-3.5 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-accent shadow-sm backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Public Profile
              </motion.p>
              <motion.h1 variants={heroChild} className="mt-6 max-w-3xl font-heading text-[clamp(2.75rem,9vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.02em] text-foreground">
                Swayam Sharma
              </motion.h1>
              <motion.p variants={heroChild} className="mt-5 max-w-2xl font-heading text-lg font-bold leading-8 text-foreground-soft sm:text-2xl sm:leading-9">
                Youth Leader. Social Worker. Public Speaker.
              </motion.p>
              <motion.div variants={heroChild} className="mt-7 lg:hidden">
                <PortraitCard
                  reduceMotion={reduceMotion}
                  compact
                  portraitIndex={portraitIndex}
                  onToggle={togglePortrait}
                />
              </motion.div>
              <motion.p variants={heroChild} className="mt-6 max-w-2xl text-base leading-8 text-foreground-muted sm:text-lg">
                Swayam Sharma is an Indian youth leader, social worker and public speaker based in Indore, Madhya Pradesh. He serves as National Executive President (Rashtriya Karyakari Adhyaksh) of Rashtriya Vidyarthi Manch (RVM), which functions under Mission New India, and as Organisation Coordinator in Mission New India.
              </motion.p>
              <motion.div variants={heroChild} className="mt-6 flex flex-wrap gap-2.5">
                {["Indore, Madhya Pradesh", "Youth Mobilization", "Grassroots Development"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface/80 px-3.5 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.11em] text-foreground-muted shadow-sm backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={heroChild} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button type="button" onClick={() => scrollToId("biography", reduceMotion)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-extrabold text-white shadow-xl shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  Explore Biography
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => scrollToId("social-media", reduceMotion)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/90 px-6 text-sm font-extrabold text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  Connect on Social Media
                </button>
              </motion.div>
              <motion.div variants={heroChild} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-semibold text-foreground-muted">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" />Based in Indore, Madhya Pradesh, India</span>
                <button type="button" onClick={shareProfile} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-foreground transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </button>
                {shareStatus ? <span className="text-accent" role="status">{shareStatus}</span> : null}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.75 }}
              className="mx-auto hidden w-full max-w-[430px] sm:max-w-[500px] lg:mr-0 lg:block lg:max-w-[520px]"
            >
              <PortraitCard
                reduceMotion={reduceMotion}
                portraitIndex={portraitIndex}
                onToggle={togglePortrait}
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-soft px-5 py-4 sm:px-7">
              <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-accent-ink">
                Profile Information
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-foreground-muted">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                Verified Public Record
              </span>
            </div>
            <dl className="grid sm:grid-cols-2 xl:grid-cols-3">
              {profileInfo.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-border px-5 py-5 transition hover:bg-surface-soft/70 sm:px-6 xl:[&:nth-child(3n)]:border-r-0"
                >
                  <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-foreground-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-base font-bold leading-7 text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div id="biography" className="scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[264px_1fr] lg:gap-10 lg:px-8">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <details className="rounded-card border border-border bg-surface p-4 shadow-card lg:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-xl px-1 text-sm font-extrabold text-foreground">
                  Contents
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </summary>
                <TocList activeId={activeId} reduceMotion={reduceMotion} />
              </details>
              <nav
                aria-label="On this page"
                className="hidden rounded-card border border-border bg-surface p-4 shadow-card lg:block"
              >
                <p className="px-3 pb-3 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-foreground-muted">
                  Contents
                </p>
                <TocList activeId={activeId} reduceMotion={reduceMotion} />
              </nav>
            </aside>

            <article className="editorial">
              <Section id="overview" title="About Swayam Sharma">
                <div className="max-w-3xl space-y-5">
                  {aboutParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={`text-lg leading-8 text-foreground-muted ${
                        index === 0
                          ? "border-l-2 border-accent pl-5 font-medium text-foreground-soft"
                          : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {["Indore, Madhya Pradesh", "Youth Mobilization", "Grassroots Development"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface px-3.5 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.11em] text-foreground-muted shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Section>

              <Section id="early-life" title="Early Life">
                <div className="grid gap-6 md:grid-cols-[1fr_280px] md:items-start">
                  <p className="text-lg leading-8 text-foreground-muted">
                    Swayam Sharma was born on 24 October 2001 in Soyat Kala, located in the Agar Malwa district of Madhya Pradesh. An early interest in leadership and social responsibility shaped his interest in public service and youth development.
                  </p>
                  <div className={`${cardBase} p-6`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Home className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-foreground-muted">
                      Origin
                    </p>
                    <p className="mt-2 text-lg font-bold leading-7 text-foreground">
                      Soyat Kala, Agar Malwa, Madhya Pradesh
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="education" title="Education">
                <div className="grid gap-5">
                  {educationEntries.map((entry) => {
                    const Icon = entry.icon;
                    return (
                      <div key={entry.title} className={`${cardBase} p-6`}>
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                            <Icon className="h-7 w-7" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-heading text-2xl font-bold text-foreground">
                                {entry.title}
                              </h3>
                              <span className={`${pill} bg-accent/10 text-accent-ink`}>
                                {entry.status}
                              </span>
                            </div>
                            <p className="mt-3 text-base font-bold leading-7 text-foreground-muted">
                              {entry.institution}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground-muted">
                              {entry.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              <Section id="career" title="Career and Organizational Responsibilities">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  Swayam Sharma holds two distinct roles: National Executive President (Rashtriya Karyakari Adhyaksh) of Rashtriya Vidyarthi Manch (RVM), which functions under Mission New India, and Organisation Coordinator in Mission New India.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {organizations.map((org) => (
                    <motion.div
                      key={org.name}
                      variants={sectionVariants(reduceMotion)}
                      className={`${cardBase} flex flex-col p-6`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className={iconPlate}>
                          <BriefcaseBusiness className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">
                        {org.name}
                      </h3>
                      <p className={`${pill} mt-4 bg-accent/10 text-accent-ink`}>
                        {org.role}
                      </p>
                      <p className="mt-5 leading-7 text-foreground-muted">{org.description}</p>

                      {org.steps.length > 0 ? (
                        <div className="mt-7 border-t border-border pt-6">
                          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-foreground-muted">
                            Career Progression
                          </p>
                          <ol className="mt-4 space-y-0">
                            {org.steps.map((step, index) => (
                              <li key={step.role} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <span
                                    aria-hidden="true"
                                    className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.68rem] font-extrabold ${
                                      step.current
                                        ? "bg-accent text-white"
                                        : "bg-accent/12 text-accent-ink"
                                    }`}
                                  >
                                    {index + 1}
                                  </span>
                                  {index < org.steps.length - 1 ? (
                                    <span aria-hidden="true" className="w-px flex-1 bg-border" />
                                  ) : null}
                                </div>
                                <div className="pb-6 last:pb-0">
                                  <p
                                    className={`text-base font-bold leading-6 ${
                                      step.current ? "text-accent-ink" : "text-foreground"
                                    }`}
                                  >
                                    {step.role}
                                    {step.current ? (
                                      <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-accent-ink">
                                        Current
                                      </span>
                                    ) : null}
                                  </p>
                                  {step.period ? (
                                    <p className="mt-1 text-sm font-semibold text-foreground-muted">
                                      {step.period}
                                    </p>
                                  ) : (
                                    <p className="mt-1 text-sm font-semibold text-foreground-faint">
                                      Previous role
                                    </p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </Section>

              <Section id="events" title="Key Events and Achievements">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  Public events and programmes in which Swayam Sharma has organised, spoken and participated.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {keyEvents.map((event) => (
                    <motion.article
                      key={event.title}
                      variants={sectionVariants(reduceMotion)}
                      className={`${cardBase} flex flex-col p-6`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className={iconPlate}>
                          <Award className="h-6 w-6" />
                        </div>
                        <span className={`${pill} bg-accent/10 text-accent-ink`}>
                          {event.role}
                        </span>
                      </div>
                      <h3 className="mt-5 font-heading text-xl font-bold leading-snug text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-foreground-muted">{event.detail}</p>
                      <dl className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-sm">
                        {event.date ? (
                          <div className="flex items-center gap-2 text-foreground-muted">
                            <dt className="sr-only">Date</dt>
                            <CalendarDays className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            <dd className="font-semibold">{event.date}</dd>
                          </div>
                        ) : null}
                        {event.location ? (
                          <div className="flex items-center gap-2 text-foreground-muted">
                            <dt className="sr-only">Location</dt>
                            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            <dd className="font-semibold">{event.location}</dd>
                          </div>
                        ) : null}
                      </dl>
                    </motion.article>
                  ))}
                </div>
              </Section>

              <Section id="gallery" title="Photo Gallery">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  Photographs from public events and felicitation programmes.
                </p>
                <Gallery />
              </Section>

              <Section id="responsibilities" title="Key Responsibilities and Work">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  Swayam Sharma&apos;s work centres on youth leadership, public engagement, community-oriented activities, and solution-focused approaches to social participation.
                </p>
                <motion.div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}>
                  {responsibilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.title} variants={sectionVariants(reduceMotion)} className={`${cardBase} group p-5`}>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-foreground-muted">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </Section>

              <Section id="vision" title="Vision">
                <div className="relative overflow-hidden rounded-card border border-accent/20 bg-accent-soft p-7 sm:p-10">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl"
                  />
                  <div className="relative">
                    <div className="mb-6 h-1 w-20 rounded-full rule-gradient" />
                    <blockquote className="font-heading text-2xl font-bold leading-snug text-foreground sm:text-3xl sm:leading-tight">
                      <p>
                        &quot;To build a responsible, transparent, and youth-driven leadership system that focuses on real issues and long-term development.&quot;
                      </p>
                    </blockquote>
                    <p className="mt-6 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-accent-ink">
                      Vision Statement
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="core-values" title="Core Values">
                <div className="grid gap-5 sm:grid-cols-2">
                  {values.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className={`${cardBase} flex min-h-28 items-center gap-4 p-5`}>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-sm leading-6 text-foreground-muted">
                  These values guide Swayam Sharma&apos;s work in youth leadership and public service.
                </p>
              </Section>

              <Section id="personal-life" title="Personal Life">
                <div className="grid gap-5 md:grid-cols-3">
                  <div className={`${cardBase} p-6 md:col-span-2`}>
                    <p className="text-lg leading-8 text-foreground-muted">
                      Swayam Sharma is based in Indore, Madhya Pradesh, where he is involved in social and public initiatives. He speaks Hindi and Malwi, both fluently.
                    </p>
                  </div>
                  <div className={`${cardBase} p-6`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-foreground-muted">
                      Based in
                    </p>
                    <p className="mt-2 text-lg font-bold leading-7 text-foreground">
                      Indore, Madhya Pradesh
                    </p>
                    <p className="mt-4 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-foreground-muted">
                      Languages
                    </p>
                    <p className="mt-2 text-sm font-semibold text-foreground-muted">
                      Hindi, Malwi
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="faq" title="Frequently Asked Questions">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  Quick answers to common questions about Swayam Sharma, his leadership in Rashtriya Vidyarthi Manch, and his public initiatives.
                </p>
                <div className="mt-8 space-y-4">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`${cardBase} p-6 transition hover:border-accent/40`}
                    >
                      <h3 className="flex items-start gap-3 font-heading text-lg font-bold text-foreground">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <HelpCircle className="h-4 w-4" />
                        </span>
                        <span className="pt-0.5">{faq.question}</span>
                      </h3>
                      <p className="mt-3 pl-10 text-base leading-7 text-foreground-muted">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="contact" title="Contact">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  For speaking engagements, organisational coordination, media enquiries or general correspondence, reach out using the details below.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className={`${cardBase} p-6`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Phone className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                      Mobile
                    </h3>
                    <p className="mt-3 text-base font-semibold text-foreground-muted">
                      <a
                        href={contactInfo.mobileHref}
                        className="inline-flex min-h-11 items-center font-extrabold text-foreground underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {contactInfo.mobile}
                      </a>
                    </p>
                  </div>

                  <div className={`${cardBase} p-6`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                      Email
                    </h3>
                    <p className="mt-3 text-base font-semibold text-foreground-muted">
                      <a
                        href={contactInfo.emailHref}
                        className="inline-flex min-h-11 items-center break-words font-extrabold text-foreground underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {contactInfo.email}
                      </a>
                    </p>
                  </div>

                  <div className={`${cardBase} p-6 sm:col-span-2`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                      Address
                    </h3>
                    <address className="mt-3 not-italic text-base font-semibold leading-7 text-foreground-muted">
                      {contactInfo.addressLine1}
                      <br />
                      {contactInfo.addressLine2}
                    </address>
                    <a
                      href={contactInfo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-surface px-4 text-sm font-extrabold text-foreground transition hover:border-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <MapPin className="h-4 w-4" />
                      View on Google Maps
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Section>

              <Section id="social-media" title="Connect with Swayam Sharma">
                <p className="max-w-3xl text-lg leading-8 text-foreground-muted">
                  Follow Swayam Sharma on social media for updates on his public activities, events and initiatives.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {socialLinks.map((link) => {
                    const Icon = socialIcon[link.name];
                    return (
                      <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${link.name} profile for Swayam Sharma`} className={`${cardBase} group p-5 hover:border-accent`}>
                        <div className="flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-soft text-foreground transition group-hover:bg-accent/10 group-hover:text-accent">
                            <Icon className="h-5 w-5" />
                          </div>
                          <ExternalLink className="h-4 w-4 text-foreground-faint transition group-hover:text-accent" />
                        </div>
                        <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
                          {link.name}
                        </h3>
                        <p className="mt-2 break-words text-sm font-semibold text-foreground-muted">
                          {link.handle}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </Section>
            </article>
          </div>
        </div>
      </main>

      <footer className="mt-10 border-t border-border bg-surface-deep text-foreground-inverse">
        <div
          aria-hidden="true"
          className="h-1 w-full rule-gradient"
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground-inverse/10 font-heading text-sm font-extrabold leading-none text-foreground-inverse ring-1 ring-foreground-inverse/20"
              >
                SS
              </span>
              <p className="font-heading text-lg font-extrabold text-foreground-inverse">
                SWAYAM SHARMA
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground-inverse/70">
              Youth Leader, Social Worker, Public Speaker.
            </p>
            <p className="mt-4 text-sm text-foreground-inverse/60">
              Based in Indore, Madhya Pradesh, India
            </p>
          </div>
          <nav className="grid gap-1 text-sm font-semibold text-foreground-inverse/70" aria-label="Footer navigation">
            <p className="mb-2 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-foreground-inverse/50">
              Explore
            </p>
            {[
              ["Overview", "overview"],
              ["Biography", "early-life"],
              ["Education", "education"],
              ["Career", "career"],
              ["Events", "events"],
              ["Gallery", "gallery"],
              ["Contact", "contact"],
              ["Vision", "vision"],
              ["Social Media", "social-media"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToId(id, reduceMotion)}
                className="min-h-11 rounded-lg px-2 text-left transition hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex flex-col content-start gap-3">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-foreground-inverse/50">
              Follow
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground-inverse/20 px-3.5 py-2 text-sm font-bold text-foreground-inverse transition hover:border-accent hover:bg-accent/15 hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-foreground-inverse/10 px-4 py-5 text-center text-sm text-foreground-inverse/60">
          Public profile and biography of Swayam Sharma.
        </div>
      </footer>

      <button
        type="button"
        onClick={() => scrollToId("top", reduceMotion)}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white shadow-lift transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

function TocList({
  activeId,
  reduceMotion,
}: {
  activeId: string;
  reduceMotion?: boolean;
}) {
  return (
    <nav className="mt-2 grid gap-0.5" aria-label="Table of contents">
      {tocItems.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToId(item.id, Boolean(reduceMotion))}
            aria-current={isActive ? "true" : undefined}
            className={`relative flex min-h-11 items-center rounded-xl py-2 pl-3 pr-2 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "bg-accent/10 text-accent-ink"
                : "text-foreground-muted hover:bg-background hover:text-foreground"
            }`}
          >
            {isActive ? (
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-accent"
              />
            ) : null}
            <span className="pl-2">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function PortraitCard({
  reduceMotion,
  compact = false,
  portraitIndex = 0,
  onToggle,
}: {
  reduceMotion: boolean;
  compact?: boolean;
  portraitIndex?: number;
  onToggle?: () => void;
}) {
  return (
    <div className={`relative mx-auto ${compact ? "max-w-[300px] sm:max-w-[360px]" : ""}`}>
      <motion.div
        aria-hidden="true"
        className="portrait-glow absolute -inset-4 rounded-[28px] opacity-20 blur-2xl"
        animate={reduceMotion ? undefined : { opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`relative overflow-hidden border border-border bg-surface shadow-lift ${
          compact ? "rounded-[22px] p-1.5" : "rounded-[26px] p-2"
        }`}
        whileHover={reduceMotion ? undefined : { y: -6, rotate: -0.35 }}
        transition={{ duration: 0.28 }}
      >
        <div
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle?.();
            }
          }}
          title="Click to switch portrait photo"
          className={`group/portrait relative aspect-[4/5] overflow-hidden bg-surface-soft cursor-pointer select-none ${
            compact ? "rounded-[17px]" : "rounded-[20px]"
          }`}
        >
          {PORTRAIT_IMAGES.map((img, idx) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              priority
              sizes={compact ? "(max-width: 1024px) 82vw" : "(max-width: 1024px) 92vw, 42vw"}
              className={`object-cover ${img.position} transition-all duration-700 group-hover/portrait:scale-[1.035] ${
                portraitIndex === idx
                  ? "opacity-100 z-10 scale-100 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none scale-105"
              }`}
            />
          ))}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/15 transition group-hover/portrait:bg-black/65">
            <Camera className="h-3 w-3 text-white/80" />
            <span>{portraitIndex === 0 ? "Photo 1" : "Photo 2"}</span>
          </div>
          <div className="portrait-scrim absolute inset-x-0 bottom-0 z-20 p-4 text-white sm:p-5 pointer-events-none">
            <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-white/75 sm:text-xs">
              Based in
            </p>
            <p className="mt-1 font-heading text-lg font-extrabold sm:text-xl">
              Indore, Madhya Pradesh
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
