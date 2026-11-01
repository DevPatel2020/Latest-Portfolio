"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/types";
import { GithubIcon } from "./Icons";

type Props = {
  items: Project[];
  repoUrl: (p: Project) => string;
  onOpen: (p: Project) => void;
  /** True when a category filter is active (changes how wide the cards are). */
  filtered: boolean;
};

/** Column span (out of 12) for a card on desktop. */
function spanFor(proj: Project, count: number, filtered: boolean) {
  if (!filtered) return proj.category === "Flagship" ? "md:col-span-6 lg:col-span-4" : "md:col-span-6 lg:col-span-3";
  if (count <= 2) return "md:col-span-6";
  if (count === 3) return "md:col-span-6 lg:col-span-4";
  if (count === 4) return "md:col-span-6";
  return "md:col-span-6 lg:col-span-3";
}

/**
 * Clean editorial project grid. Cards only animate `transform` and `opacity` on hover
 * (image scale, a soft gradient, a label) so scrolling and hovering stay smooth.
 */
export default function ProjectGrid({ items, repoUrl, onOpen, filtered }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
      {items.map((proj, i) => (
        <motion.article
          key={proj.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: "easeOut" }}
          className={cn("group", spanFor(proj, items.length, filtered))}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen(proj)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen(proj))}
            aria-label={`Open ${proj.title}`}
            className="relative aspect-[4/3] cursor-pointer overflow-hidden border border-black bg-stone-200 outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proj.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.05]"
            />

            {proj.category === "Flagship" && (
              <span className="absolute left-3 top-3 bg-red-600 px-2 py-1 font-jet text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-50">
                Flagship
              </span>
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 font-jet text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              View project <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                onClick={() => onOpen(proj)}
                className="cursor-pointer font-cormorant text-2xl italic leading-tight transition-colors duration-300 group-hover:text-red-600 md:text-3xl"
              >
                {proj.title}
              </h3>
              <p className="mt-2 font-jet text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-stone-500">
                {proj.kicker}
              </p>
            </div>
            <a
              href={repoUrl(proj)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${proj.title} on GitHub`}
              className="flex flex-none items-center gap-2 border border-black px-3 py-2 font-jet text-[10px] font-bold uppercase tracking-widest transition-colors hover:border-red-600 hover:bg-red-600 hover:text-neutral-50"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
