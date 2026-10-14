"use client";

import Image from "next/image";
import {
  ArrowUp,
  AtSign,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  HandHeart,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  PlayCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { profileInfo, socialLinks, tocItems } from "@/data/swayam-sharma";

const navItems = [
  { label: "Home", id: "top" },
  { label: "About", id: "overview" },
  { label: "Biography", id: "biography" },
  { label: "Education", id: "education" },
  { label: "Career", id: "career" },
  { label: "Vision", id: "vision" },
  { label: "Contact", id: "social-media" },
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
      "Community-oriented activities and awareness initiatives described in the supplied profile.",
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
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#16835B]">
          {eyebrow}
        </p>
      ) : null}
      <div className="mb-7 h-1 w-14 rounded-full bg-[#D97706]" />
      <h2 className="font-heading text-3xl font-bold leading-tight text-[#152536] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}

export default function SwayamProfile() {
  const reduceMotion = Boolean(useReducedMotion());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");
  const [showTop, setShowTop] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  const observedIds = useMemo(
    () => ["overview", "early-life", "education", "career", "responsibilities", "vision", "core-values", "personal-life", "social-media"],
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
          title: "Swayam Sharma Public Profile",
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
    <div id="top" className="min-h-screen bg-[#F7F8FA] text-[#152536]">
      <header className="sticky top-0 z-50 border-b border-[#E2E8F0]/80 bg-white/88 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            className="group text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
            onClick={() => scrollToId("top", reduceMotion)}
            aria-label="Go to top"
          >
            <span className="block font-heading text-base font-extrabold leading-none text-[#152536]">
              SWAYAM SHARMA
            </span>
            <span className="mt-1 block text-[0.63rem] font-bold uppercase tracking-[0.22em] text-[#64748B] transition group-hover:text-[#D97706]">
              Public Profile
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id, reduceMotion)}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                  activeId === item.id || (item.id === "biography" && activeId === "early-life")
                    ? "bg-[#D97706] text-white shadow-sm shadow-[#D97706]/25"
                    : "text-[#64748B] hover:bg-[#F7F8FA] hover:text-[#152536]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToId("social-media", reduceMotion)}
              className="hidden min-h-11 items-center gap-2 rounded-full bg-[#152536] px-4 text-sm font-bold text-white transition hover:bg-[#24384D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] sm:inline-flex"
            >
              <Mail className="h-4 w-4" />
              Connect
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#152536] transition hover:border-[#D97706] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-[#E2E8F0] bg-white px-5 py-3 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToId(item.id, reduceMotion);
                  }}
                  className="min-h-11 rounded-xl px-3 text-left text-sm font-bold text-[#152536] transition hover:bg-[#F7F8FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-[linear-gradient(135deg,#F7F8FA_0%,#FFFFFF_46%,#EEF7F2_100%)]">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#16835B,#D97706,#152536)]"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9 }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(#152536_1px,transparent_1px),linear-gradient(90deg,#152536_1px,transparent_1px)] [background-size:54px_54px]"
          />
          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.98fr_1.02fr] lg:px-8 lg:py-16">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: reduceMotion ? 0 : 0.1, duration: 0.55 }}
              className="max-w-3xl"
            >
              <motion.p variants={heroChild} className="inline-flex items-center gap-2 rounded-full border border-[#16835B]/20 bg-white/80 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#16835B] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Public Profile
              </motion.p>
              <motion.h1 variants={heroChild} className="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[0.98] text-[#152536] sm:text-6xl lg:text-7xl xl:text-8xl">
                Swayam Sharma
              </motion.h1>
              <motion.p variants={heroChild} className="mt-5 max-w-2xl text-xl font-extrabold leading-8 text-[#24384D] sm:text-2xl">
                Youth Leader. Social Worker. Public Representative.
              </motion.p>
              <motion.div variants={heroChild} className="mt-7 lg:hidden">
                <PortraitCard reduceMotion={reduceMotion} compact />
              </motion.div>
              <motion.p variants={heroChild} className="mt-6 max-w-2xl text-base leading-8 text-[#64748B] sm:text-lg">
                Swayam Sharma is an Indian youth leader, social worker, and public representative based in Indore, Madhya Pradesh. His supplied profile highlights involvement in grassroots development, youth mobilization, and public engagement initiatives, with an emphasis on practical problem-solving and responsible participation of young individuals in public life.
              </motion.p>
              <motion.div variants={heroChild} className="mt-6 flex flex-wrap gap-2.5">
                {["Indore, Madhya Pradesh", "Youth Mobilization", "Grassroots Development"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#E2E8F0] bg-white/78 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.11em] text-[#475569] shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={heroChild} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToId("biography", reduceMotion)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D97706] px-6 text-sm font-extrabold text-white shadow-xl shadow-[#D97706]/25 transition hover:-translate-y-0.5 hover:bg-[#B75F05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]">
                  Explore Biography
                </button>
                <button type="button" onClick={() => scrollToId("social-media", reduceMotion)} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-white/90 px-6 text-sm font-extrabold text-[#152536] shadow-sm transition hover:-translate-y-0.5 hover:border-[#D97706] hover:text-[#9A4D03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]">
                  Connect on Social Media
                </button>
              </motion.div>
              <motion.div variants={heroChild} className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#64748B]">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#16835B]" />Based in Indore, Madhya Pradesh, India</span>
                <button type="button" onClick={shareProfile} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 text-[#152536] transition hover:border-[#D97706] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </button>
                {shareStatus ? <span className="text-[#16835B]" role="status">{shareStatus}</span> : null}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.75 }}
              className="mx-auto hidden w-full max-w-[430px] sm:max-w-[500px] lg:mr-0 lg:block lg:max-w-[530px]"
            >
              <PortraitCard reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="rounded-[18px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="border-b border-[#E2E8F0] px-5 py-5 sm:px-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D97706]">
                Profile Information
              </p>
            </div>
            <dl className="grid md:grid-cols-2 xl:grid-cols-3">
              {profileInfo.map((item) => (
                <div key={item.label} className="border-b border-[#E2E8F0] px-5 py-5 last:border-b-0 md:border-r md:last:border-b xl:[&:nth-child(3n)]:border-r-0">
                  <dt className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[#64748B]">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-base font-bold leading-7 text-[#152536]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div id="biography" className="scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-9 px-5 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
            <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
              <details className="rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-sm lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-extrabold text-[#152536]">
                  Contents
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <TocList activeId={activeId} reduceMotion={reduceMotion} />
              </details>
              <div className="hidden rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-sm lg:block">
                <p className="px-3 pb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#64748B]">
                  Contents
                </p>
                <TocList activeId={activeId} reduceMotion={reduceMotion} />
              </div>
            </aside>

            <article className="space-y-20">
              <Section id="overview" title="About Swayam Sharma">
                <p className="max-w-3xl text-lg leading-8 text-[#475569]">
                  Swayam Sharma is an Indian youth leader, social worker, and public representative based in Indore, Madhya Pradesh. His profile describes involvement in grassroots development, youth mobilization, and public engagement initiatives. His stated approach emphasizes practical problem-solving and responsible participation of young individuals in public life.
                </p>
              </Section>

              <Section id="early-life" title="Early Life">
                <div className="grid gap-6 md:grid-cols-[1fr_280px]">
                  <p className="text-lg leading-8 text-[#475569]">
                    Swayam Sharma was born on 24 October 2001 in Soyat Kala, located in the Agar Malwa district of Madhya Pradesh. According to the supplied biography, an early interest in leadership and social responsibility influenced his interest in public service and youth development.
                  </p>
                  <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-6">
                    <Home className="h-8 w-8 text-[#D97706]" />
                    <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.16em] text-[#64748B]">
                      Origin
                    </p>
                    <p className="mt-2 text-lg font-bold leading-7 text-[#152536]">
                      Soyat Kala, Agar Malwa, Madhya Pradesh
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="education" title="Education">
                <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#16835B]/10 text-[#16835B]">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-[#152536]">
                        Bachelor of Naturopathy and Yogic Sciences (BNYS)
                      </h3>
                      <p className="mt-3 text-base font-bold text-[#475569]">
                        DRSU
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#64748B]">
                        Jodhpur, Rajasthan
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section id="career" title="Career and Organizational Responsibilities">
                <p className="max-w-3xl text-lg leading-8 text-[#475569]">
                  The supplied profile describes Swayam Sharma&apos;s involvement in youth-based initiatives, community-oriented work, social awareness programs, and leadership activities.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {[
                    {
                      name: "Rashtriya Vidyarthi Manch",
                      text: "The supplied profile describes responsibilities related to coordinating organizational activities, guiding youth participation, and supporting organizational development across different regions.",
                    },
                    {
                      name: "Narendra Modi Vichar Manch (RVM)",
                      text: "The supplied profile associates Swayam Sharma with organizational outreach, ideological awareness, coordination, and youth participation.",
                    },
                  ].map((org) => (
                    <motion.div key={org.name} variants={sectionVariants(reduceMotion)} className="rounded-[18px] border border-[#E2E8F0] bg-white p-6 shadow-sm">
                      <BriefcaseBusiness className="h-7 w-7 text-[#D97706]" />
                      <h3 className="mt-5 font-heading text-2xl font-bold text-[#152536]">
                        {org.name}
                      </h3>
                      <p className="mt-4 inline-flex rounded-full bg-[#16835B]/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#126B4B]">
                        National Organization General Secretary
                      </p>
                      <p className="mt-5 leading-7 text-[#64748B]">{org.text}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-[#64748B]">
                  These organizational details are presented as supplied biography information and do not imply endorsement by Narendra Modi, the Government of India, or any public authority.
                </p>
              </Section>

              <Section id="responsibilities" title="Key Responsibilities and Work">
                <p className="max-w-3xl text-lg leading-8 text-[#475569]">
                  The supplied profile highlights youth leadership, public engagement, community-oriented activities, and solution-focused approaches to social participation.
                </p>
                <motion.div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}>
                  {responsibilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.title} variants={sectionVariants(reduceMotion)} className="group rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <Icon className="h-7 w-7 text-[#16835B] transition group-hover:text-[#D97706]" />
                        <h3 className="mt-5 font-heading text-xl font-bold text-[#152536]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-[#64748B]">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </Section>

              <Section id="vision" title="Vision">
                <div className="rounded-[18px] border border-[#E2E8F0] bg-[#FFF8EE] p-7 sm:p-10">
                  <div className="mb-6 h-1 w-20 rounded-full bg-[#D97706]" />
                  <p className="font-heading text-3xl font-bold leading-tight text-[#152536] sm:text-4xl">
                    &quot;To build a responsible, transparent, and youth-driven leadership system that focuses on real issues and long-term development.&quot;
                  </p>
                </div>
              </Section>

              <Section id="core-values" title="Core Values">
                <div className="grid gap-5 sm:grid-cols-2">
                  {values.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex min-h-28 items-center gap-4 rounded-[18px] border border-[#E2E8F0] bg-white p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D97706]/10 text-[#D97706]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-[#152536]">
                          {item.title}
                        </h3>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-sm leading-6 text-[#64748B]">
                  These are values stated in the supplied profile, not a verified assessment of personal conduct.
                </p>
              </Section>

              <Section id="personal-life" title="Personal Life">
                <p className="max-w-3xl text-lg leading-8 text-[#475569]">
                  The supplied profile identifies Indore, Madhya Pradesh, as Swayam Sharma&apos;s current city and describes his involvement in social and public initiatives.
                </p>
              </Section>

              <Section id="social-media" title="Connect with Swayam Sharma">
                <p className="max-w-3xl text-lg leading-8 text-[#475569]">
                  Follow the supplied social media profiles for updates and public activities.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {socialLinks.map((link) => {
                    const Icon = socialIcon[link.name];
                    return (
                      <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${link.name} profile for Swayam Sharma`} className="group rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#D97706] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]">
                        <div className="flex items-center justify-between">
                          <Icon className="h-6 w-6 text-[#152536] transition group-hover:text-[#D97706]" />
                          <ExternalLink className="h-4 w-4 text-[#94A3B8]" />
                        </div>
                        <h3 className="mt-6 font-heading text-lg font-bold text-[#152536]">
                          {link.name}
                        </h3>
                        <p className="mt-2 break-words text-sm font-semibold text-[#64748B]">
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

      <footer className="mt-10 border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1fr_1fr_1fr] lg:px-8">
          <div>
            <p className="font-heading text-lg font-extrabold text-[#152536]">
              SWAYAM SHARMA
            </p>
            <p className="mt-2 text-sm text-[#64748B]">Public profile and biography.</p>
          </div>
          <nav className="grid gap-2 text-sm font-semibold text-[#64748B]" aria-label="Footer navigation">
            {[
              ["Overview", "overview"],
              ["Biography", "early-life"],
              ["Education", "education"],
              ["Career", "career"],
              ["Vision", "vision"],
              ["Social Media", "social-media"],
            ].map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollToId(id, reduceMotion)} className="text-left transition hover:text-[#D97706] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]">
                {label}
              </button>
            ))}
          </nav>
          <div className="flex flex-wrap content-start gap-2">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#E2E8F0] px-3 py-2 text-sm font-bold text-[#152536] transition hover:border-[#D97706] hover:text-[#D97706] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]">
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-[#E2E8F0] px-5 py-5 text-center text-sm text-[#64748B]">
          Profile information is presented for informational purposes.
        </div>
      </footer>

      <button
        type="button"
        onClick={() => scrollToId("top", reduceMotion)}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#152536] text-white shadow-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
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
    <nav className="mt-2 grid gap-1" aria-label="Table of contents">
      {tocItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => scrollToId(item.id, Boolean(reduceMotion))}
          className={`relative rounded-xl px-3 py-2.5 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
            activeId === item.id
              ? "bg-[#D97706]/10 text-[#9A4D03]"
              : "text-[#64748B] hover:bg-[#F7F8FA] hover:text-[#152536]"
          }`}
        >
          {activeId === item.id ? (
            <span className="absolute left-0 top-2.5 h-5 w-1 rounded-full bg-[#D97706]" />
          ) : null}
          <span className="pl-2">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function PortraitCard({
  reduceMotion,
  compact = false,
}: {
  reduceMotion: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`relative mx-auto ${compact ? "max-w-[300px] sm:max-w-[360px]" : ""}`}>
      <motion.div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[28px] bg-[linear-gradient(135deg,#16835B,#D97706)] opacity-20 blur-2xl"
        animate={reduceMotion ? undefined : { opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`relative overflow-hidden border border-white bg-white shadow-2xl shadow-slate-900/18 ${
          compact ? "rounded-[22px] p-1.5" : "rounded-[26px] p-2"
        }`}
        whileHover={reduceMotion ? undefined : { y: -6, rotate: -0.35 }}
        transition={{ duration: 0.28 }}
      >
        <div className={`relative aspect-[4/5] overflow-hidden bg-[#E2E8F0] ${compact ? "rounded-[17px]" : "rounded-[20px]"}`}>
          <Image
            src="/images/swayam-sharma.jpg"
            alt="Portrait of Swayam Sharma"
            fill
            priority
            sizes={compact ? "(max-width: 1024px) 82vw" : "(max-width: 1024px) 92vw, 42vw"}
            className="object-cover object-[center_34%] transition duration-700 hover:scale-[1.035]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(21,37,54,0.72))] p-4 text-white sm:p-5">
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
