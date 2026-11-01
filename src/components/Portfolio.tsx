"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, Menu, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { lockScroll, scrollToTarget, unlockScroll } from "@/lib/lenis";
import { projects, projectCategories } from "@/data/projects";
import { experience } from "@/data/experience";
import { degree, recognition } from "@/data/education";
import { marqueeText, site, skills } from "@/data/site";
import type { ExperienceItem, Project } from "@/data/types";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import ProjectGrid from "./ProjectGrid";
import ThemeToggle from "./ThemeToggle";
import LocationClock from "./LocationClock";
import ScrollProgress from "./ScrollProgress";
import Marquee from "./Marquee";
import Filter from "./Filter";
import ExperienceList from "./ExperienceList";
import DetailModal, { type DetailData } from "./DetailModal";
import { GithubIcon, LinkedinIcon } from "./Icons";

const NAV = [
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
] as const;

const repoUrl = (p: Project) => p.github || site.github;

const toDetail = {
  project: (p: Project): DetailData => ({
    id: p.id,
    kicker: p.kicker,
    title: p.title,
    meta: [p.category, p.year].filter(Boolean).join(" · "),
    status: p.status,
    summary: p.summary,
    bullets: p.highlights.slice(0, 5),
    metrics: p.metrics,
    stack: p.stack,
    links: p.links,
    github: repoUrl(p),
  }),
  experience: (e: ExperienceItem): DetailData => ({
    id: e.id,
    kicker: e.badge,
    title: e.title,
    meta: [e.role, e.period].filter(Boolean).join(" · "),
    summary: e.summary,
    bullets: e.bullets,
    metrics: [],
    stack: [],
    links: e.links,
  }),
};

const mainExperience = experience.filter((e) => e.group === "main");
const partTimeExperience = experience.filter((e) => e.group === "parttime");

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All Projects");
  const [activeSection, setActiveSection] = useState<string>("");
  const [detail, setDetail] = useState<DetailData | null>(null);

  const filteredProjects = useMemo(
    () => (activeFilter === "All Projects" ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    if (!isMenuOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isMenuOpen]);

  // Highlight the nav link of the section currently crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = useCallback((id: string) => {
    setIsMenuOpen(false);
    scrollToTarget(`#${id}`);
  }, []);

  const closeDetail = useCallback(() => setDetail(null), []);

  return (
    <div className="min-h-screen bg-stone-50 font-jet text-black selection:bg-red-600 selection:text-neutral-50">
      <Preloader text="Cooking..." onComplete={() => setLoaded(true)} />
      <SmoothScroll />
      <ScrollProgress />

      {/* NAVIGATION OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-red-600 text-neutral-50"
          >
            <button onClick={() => setIsMenuOpen(false)} className="group absolute right-8 top-8 md:right-12 md:top-12">
              <span className="font-jet text-xs font-bold uppercase tracking-[0.3em] underline-offset-4 group-hover:underline">
                [ CLOSE ]
              </span>
            </button>

            <nav className="relative z-10 w-full space-y-5 text-center md:space-y-7">
              {NAV.map(({ label, id }, i) => (
                <div key={id} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "150%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                    onClick={() => go(id)}
                    className={cn(
                      "block w-full px-12 font-cormorant text-5xl font-light transition-colors hover:italic hover:text-neutral-950 md:text-7xl",
                      activeSection === id ? "font-bold italic" : "",
                    )}
                  >
                    {label}
                  </motion.button>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute bottom-8 z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 font-jet text-[10px] font-bold uppercase tracking-[0.25em] md:bottom-12"
            >
              {site.resumes.map((r) => (
                <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                  {r.label}
                </a>
              ))}
              <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                LinkedIn
              </a>
            </motion.div>

            {/* Decorative background text */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
              <h1 className="whitespace-nowrap font-cormorant text-[20vw] italic leading-none text-neutral-50">DEV PATEL</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING HEADER TOOLS */}
      <div className="fixed left-0 top-0 z-40 flex h-20 w-full items-center justify-between border-b border-black bg-white/95 px-6 md:px-12">
        <button
          className="group flex cursor-pointer items-center gap-4 font-jet text-xs font-bold uppercase tracking-[0.2em]"
          onClick={() => scrollToTarget(0, 0)}
          aria-label="Back to top"
        >
          <span className="flex h-6 w-6 items-center justify-center bg-black font-cormorant text-lg text-white transition-colors group-hover:bg-red-600 group-hover:text-neutral-50">
            D
          </span>
          <span className="hidden md:inline">Dev Patel</span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={cn(
                "font-jet text-xs font-bold uppercase tracking-widest transition-colors hover:text-red-600",
                activeSection === id && "text-red-600",
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-5 md:gap-6">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 font-jet text-xs font-bold uppercase tracking-widest transition-colors hover:text-red-600"
            aria-label="Open menu"
          >
            <span className="hidden md:inline">Menu</span> <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* SPACER FOR FIXED HEADER */}
      <div className="h-20 w-full" />

      {/* HERO */}
      <header className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden border-b border-black bg-stone-100 px-6 pb-12 pt-20 md:px-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(var(--c-black)) 1px, transparent 0)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 w-full">
          <div className="grid w-full items-end gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            {/* Left: where I am right now */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={loaded ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <LocationClock />
            </motion.div>

            {/* Centre: name */}
            <h1 className="order-1 text-center font-cormorant text-[24vw] leading-[0.85] tracking-tighter sm:text-[18vw] lg:order-2 lg:text-[12vw]">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: loaded ? 0 : "105%" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  DEV
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block font-light italic text-red-600"
                  initial={{ y: "105%" }}
                  animate={{ y: loaded ? 0 : "105%" }}
                  transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  PATEL.
                </motion.span>
              </span>
            </h1>

            {/* Right: what I do */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={loaded ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
              className="order-3 max-w-sm pb-4 font-jet text-xs font-medium uppercase leading-relaxed tracking-wider text-stone-600 lg:ml-auto"
            >
              <p>
                Data &amp; machine-learning engineer. I build reliable data systems, full-stack AI products and
                computer-vision research — from healthcare data at Qualifacts to IEEE-published medical imaging.
              </p>
              <div className="mt-8 flex gap-8 border-t border-black/20 pt-4">
                <div>
                  <span className="mb-1 block font-bold text-black">NOW</span>
                  <span>Data Engineer I</span>
                </div>
                <div>
                  <span className="mb-1 block font-bold text-black">B.TECH CSE</span>
                  <span>MMXXVI</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <Marquee text={marqueeText} />

      <main>
        {/* EXPERIENCE & PUBLICATION */}
        <section id="experience" className="scroll-mt-20 border-b border-black bg-white pb-12">
          <div className="flex items-end justify-between border-b border-black px-6 py-12 md:px-12">
            <h2 className="font-jet text-xs font-bold uppercase tracking-[0.3em]">Experience &amp; Publication</h2>
            <span className="hidden items-center gap-2 font-jet text-xs font-bold uppercase tracking-widest text-stone-500 md:flex">
              Click to open <MousePointer2 className="h-4 w-4" />
            </span>
          </div>
          <ExperienceList items={mainExperience} onOpen={(e) => setDetail(toDetail.experience(e))} />

          <div className="flex items-end justify-between border-b border-black bg-stone-50 px-6 py-8 md:px-12">
            <h3 className="font-cormorant text-3xl italic font-light md:text-5xl">Part-Time Remote Internships</h3>
            <span className="hidden font-jet text-xs font-bold uppercase tracking-widest text-stone-500 md:block">
              In continuation
            </span>
          </div>
          <ExperienceList items={partTimeExperience} onOpen={(e) => setDetail(toDetail.experience(e))} />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-20 bg-white">
          {/* Horizontal filters */}
          <div className="no-scrollbar sticky top-20 z-30 overflow-x-auto whitespace-nowrap border-b border-black bg-stone-50">
            <div className="flex px-4 md:px-8">
              {projectCategories.map((cat) => (
                <Filter key={cat} active={activeFilter === cat} onClick={() => setActiveFilter(cat)}>
                  {cat}
                </Filter>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 px-6 py-20 md:px-12">
            <div className="mb-16 flex items-end justify-between border-b border-black/20 pb-4">
              <h2 className="font-cormorant text-5xl font-light italic md:text-7xl">Projects</h2>
              <span className="font-jet text-xs font-bold uppercase tracking-widest text-stone-500">
                {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"}
              </span>
            </div>

            <ProjectGrid
              key={activeFilter}
              filtered={activeFilter !== "All Projects"}
              items={filteredProjects}
              repoUrl={repoUrl}
              onOpen={(p) => setDetail(toDetail.project(p))}
            />
          </div>
        </section>
      </main>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-20 border-t border-black bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-black px-6 py-20 md:px-12 lg:col-span-5 lg:border-b-0 lg:border-r">
            <h2 className="mb-10 font-cormorant text-6xl font-light italic tracking-tighter md:text-8xl">
              About<span className="text-red-600">.</span>
            </h2>
            <div className="space-y-6 font-jet text-xs font-medium uppercase leading-relaxed tracking-wider text-stone-600">
              <p className="text-black">
                I am a Data Engineer I at Qualifacts in Vadodara, working on InSync — Qualifacts&rsquo; cloud EHR,
                practice-management and billing platform used by behavioral-health, substance-use and
                rehabilitative-therapy providers across the US. Healthcare data has no margin for error, so my days go
                into keeping it accurate, consistent and intact as it moves between systems, and into the migration and
                automation work that lets new tenants come on board without friction.
              </p>
              <p>
                Before that I spent my final semester at NielsenIQ building a geospatial ML pipeline that classifies road
                quality across 2.1 million segments, and shipped NextStep AI — a live, full-stack AI career platform — as
                my major project. Alongside the engineering I do research: our YOLOv12 brain-tumor detection paper was
                peer-reviewed and published at IEEE ICICI 2025.
              </p>
              <p>
                Across data, machine learning, full-stack AI and research I care about the same things: honest
                evaluation, catching leakage and shortcut learning, clean architecture, and shipping something people can
                rely on. I graduated with a B.Tech in Computer Science &amp; Engineering from CHARUSAT in 2026 (CGPA 8.6)
                and keep learning through internships, side projects and open source.
              </p>
            </div>
          </div>

          <div className="px-6 py-20 md:px-12 lg:col-span-7">
            <h3 className="mb-10 font-jet text-xs font-bold uppercase tracking-[0.3em]">Toolkit</h3>
            <div className="grid gap-12 md:grid-cols-2">
              {skills.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: gi * 0.08, ease: "easeOut" }}
                >
                  <h4 className="mb-4 border-b border-black pb-3 font-cormorant text-3xl italic">{group.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        className="cursor-default border border-black/30 px-3 py-1.5 font-jet text-[10px] font-bold uppercase tracking-widest transition-colors hover:border-red-600 hover:bg-red-600 hover:text-neutral-50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="scroll-mt-20 border-t border-black bg-stone-50">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-black px-6 py-16 md:px-12 lg:col-span-5 lg:border-b-0 lg:border-r">
            <h2 className="font-cormorant text-5xl font-light italic leading-[0.95] tracking-tighter md:text-7xl">
              Education &amp; <br />
              Certification<span className="text-red-600">.</span>
            </h2>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="border-b border-black px-6 py-12 md:px-12"
            >
              <p className="mb-3 font-jet text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">{degree.meta}</p>
              <h3 className="mb-3 font-cormorant text-3xl italic leading-tight md:text-5xl">{degree.title}</h3>
              <p className="font-jet text-xs font-medium uppercase leading-relaxed tracking-wider text-stone-600">
                {degree.detail}
              </p>
            </motion.div>

            {recognition.map((r) => (
              <div
                key={r.title}
                className="flex flex-col justify-between gap-4 border-b border-black px-6 py-6 last:border-b-0 md:flex-row md:items-center md:px-12"
              >
                <div>
                  <p className="mb-1 font-jet text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">{r.meta}</p>
                  <h4 className="font-cormorant text-2xl italic md:text-3xl">{r.title}</h4>
                  <p className="mt-1 font-jet text-[10px] uppercase tracking-widest text-stone-500">{r.detail}</p>
                </div>
                {r.link && (
                  <a
                    href={r.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-none items-center gap-2 font-jet text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-red-600"
                  >
                    {r.link.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="flex scroll-mt-20 flex-col items-start justify-between gap-12 border-t border-black bg-stone-100 p-12 text-black md:flex-row md:items-end md:p-24"
      >
        <div className="max-w-xl">
          <h2 className="mb-8 font-cormorant text-5xl leading-none tracking-tighter md:text-8xl">
            Let&rsquo;s <br />
            <span className="font-light italic text-red-600">talk.</span>
          </h2>
          <p className="font-jet text-xs font-bold uppercase leading-relaxed tracking-[0.2em] text-stone-600">
            Open to research collaborations, graduate opportunities and machine-learning roles. Reach out and I will get
            back to you.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}`}
              className="bg-black px-8 py-4 font-jet text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-600 hover:text-neutral-50"
            >
              Get in touch
            </a>
            {site.resumes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border border-black px-6 py-4 font-jet text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                <Download className="h-4 w-4" /> {r.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 font-jet text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon className="h-6 w-6 cursor-pointer transition-colors hover:text-red-600" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon className="h-6 w-6 cursor-pointer transition-colors hover:text-red-600" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email">
              <Mail className="h-6 w-6 cursor-pointer transition-colors hover:text-red-600" />
            </a>
          </div>
          <div className="flex flex-col gap-2 text-stone-500">
            <p className="text-black">GUJARAT, INDIA</p>
            <p>{site.email.toUpperCase()}</p>
            <p className="mt-4">© MMXXVI DEV PATEL</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {detail && <DetailModal key={detail.id} item={detail} onClose={closeDetail} />}
      </AnimatePresence>
    </div>
  );
}
