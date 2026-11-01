"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import type { DetailLink, Metric } from "@/data/types";
import { GithubIcon } from "./Icons";

export type DetailData = {
  id: string;
  kicker: string;
  title: string;
  meta?: string;
  status?: string;
  summary: string;
  bullets: string[];
  metrics: Metric[];
  stack: string[];
  links: DetailLink[];
  /** When set, a GitHub button is always shown first. */
  github?: string;
};

const EASE = [0.76, 0, 0.24, 1] as const;

/** Text-only slide-over. The card image is intentionally not repeated here. */
export default function DetailModal({ item, onClose }: { item: DetailData; onClose: () => void }) {
  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={item.title}>
      <motion.div
        className="absolute inset-0 bg-neutral-950/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.7, ease: EASE }}
        data-lenis-prevent
        className="absolute right-0 top-0 h-full w-full overflow-y-auto border-l border-black bg-stone-50 text-black md:w-[min(760px,92vw)]"
      >
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-black bg-white/95 px-6 md:px-10">
          <span className="font-jet text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">{item.kicker}</span>
          <button onClick={onClose} className="group" aria-label="Close details">
            <span className="font-jet text-xs font-bold uppercase tracking-[0.3em] underline-offset-4 group-hover:text-red-600 group-hover:underline">
              [ CLOSE ]
            </span>
          </button>
        </div>

        <div className="px-6 pb-20 pt-12 md:px-10">
          <div className="flex flex-wrap items-center gap-4 font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
            {item.meta && <span>{item.meta}</span>}
            {item.status && <span className="border border-black px-2 py-1 text-black">{item.status}</span>}
          </div>

          <h2 className="mb-6 mt-5 font-cormorant text-5xl font-light italic leading-[0.95] tracking-tighter md:text-7xl">
            {item.title}
          </h2>
          <p className="max-w-xl font-jet text-xs font-medium uppercase leading-relaxed tracking-wider text-stone-600">
            {item.summary}
          </p>

          {(item.github !== undefined || item.links.length > 0) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {item.github !== undefined && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-black px-6 py-4 font-jet text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-600 hover:text-neutral-50"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
              )}
              {item.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-black px-6 py-4 font-jet text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                >
                  {l.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}

          {item.metrics.length > 0 && (
            <dl className="mt-12 grid grid-cols-2 border-l border-t border-black md:grid-cols-4">
              {item.metrics.map((m) => (
                <div key={m.label} className="border-b border-r border-black p-4">
                  <dd className="font-cormorant text-3xl leading-none text-red-600 md:text-4xl">{m.value}</dd>
                  <dt className="mt-2 font-jet text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          {item.bullets.length > 0 && (
            <>
              <h3 className="mb-5 mt-14 font-jet text-xs font-bold uppercase tracking-[0.3em]">Highlights</h3>
              <ul className="space-y-4 border-t border-black/20 pt-5">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-4 font-jet text-xs leading-relaxed tracking-wide text-stone-700">
                    <span className="mt-[2px] text-red-600">///</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.stack.length > 0 && (
            <>
              <h3 className="mb-5 mt-14 font-jet text-xs font-bold uppercase tracking-[0.3em]">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-black px-3 py-1.5 font-jet text-[10px] font-bold uppercase tracking-widest"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.aside>
    </div>,
    document.body,
  );
}
