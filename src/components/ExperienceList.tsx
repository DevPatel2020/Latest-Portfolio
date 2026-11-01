"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "@/data/types";

type Props = { items: ExperienceItem[]; onOpen: (item: ExperienceItem) => void };

/** Hover-reveal list: a red curtain wipes up behind each row and the title slides in. */
export default function ExperienceList({ items, onOpen }: Props) {
  return (
    <div>
      {items.map((item, i) => (
        <Row key={item.id} item={item} index={i + 1} onOpen={() => onOpen(item)} />
      ))}
    </div>
  );
}

function Row({ item, index, onOpen }: { item: ExperienceItem; index: number; onOpen: () => void }) {
  const [active, setActive] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group relative cursor-pointer overflow-hidden border-b border-black py-8 outline-none md:py-12"
    >
      <div className="relative z-10 flex flex-col items-start justify-between gap-4 px-4 text-black transition-colors duration-500 group-hover:text-neutral-50 group-focus-visible:text-neutral-50 md:flex-row md:items-baseline md:px-12">
        <div className="flex items-baseline gap-5 md:gap-8">
          <span className="font-jet text-xs tracking-widest opacity-50">{String(index).padStart(2, "0")}</span>
          <h3 className="font-cormorant text-4xl font-light italic leading-none tracking-tighter transition-transform duration-500 group-hover:translate-x-4 md:text-6xl lg:text-7xl">
            {item.title}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-jet text-xs uppercase tracking-widest">
          <span className="opacity-60">
            {item.role}
            {item.period ? ` · ${item.period}` : ""}
          </span>
          <span className="whitespace-nowrap border border-current px-2 py-1">{item.badge}</span>
        </div>
      </div>

      {/* The reveal curtain */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 bg-red-600"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: active ? 1 : 0 }}
        style={{ originY: "100%" }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
}
