"use client";

import { motion } from "framer-motion";

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap border-b border-t border-black bg-white py-4 text-black">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        className="flex w-max items-center will-change-transform"
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="font-jet text-xs font-bold uppercase tracking-[0.3em]">
            {text} <span className="mx-8 text-red-600">///</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
