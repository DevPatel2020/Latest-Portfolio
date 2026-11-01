"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  text?: string;
  /** Seconds the counter takes to reach 100. */
  duration?: number;
  onComplete?: () => void;
};

/**
 * Native port of the Framer "SmoothPreloader": a full-screen cover with a centred
 * message, a percentage counter in the corner and a smooth slide-up exit.
 */
export default function Preloader({ text = "Cooking...", duration = 3, onComplete }: Props) {
  const [counter, setCounter] = useState(10);
  const [visible, setVisible] = useState(true);
  const done = useRef(onComplete);
  done.current = onComplete;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 0.8 : duration;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";

    const increment = 90 / ((total * 1000) / 50);
    let value = 10;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      value += increment;
      if (value >= 100) {
        clearInterval(interval);
        setCounter(100);
        timeout = setTimeout(() => {
          html.style.overflow = previous;
          setVisible(false);
          done.current?.();
        }, 200);
      } else {
        setCounter(value);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
      html.style.overflow = previous;
    };
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-stone-50 text-black"
          role="status"
          aria-label="Loading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(var(--c-black)) 1px, transparent 0)", backgroundSize: "40px 40px" }}
          />

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative font-cormorant text-6xl font-light italic tracking-tighter md:text-9xl"
          >
            {text}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-8 right-8 font-cormorant text-6xl italic leading-none tracking-tight text-red-600 md:bottom-10 md:right-10 md:text-8xl"
          >
            {Math.round(counter)}%
          </motion.div>

          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black/10">
            <div className="h-full origin-left bg-red-600 transition-transform duration-100 ease-linear" style={{ transform: `scaleX(${counter / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
