import type Lenis from "lenis";

// Shared handle so any component can pause or drive the smooth scroller.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const scrollToTarget = (target: string | number, offset = -80) => {
  if (instance) instance.scrollTo(target, { offset, duration: 1.4 });
  else if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  } else window.scrollTo({ top: target, behavior: "smooth" });
};

export const lockScroll = () => instance?.stop();
export const unlockScroll = () => instance?.start();
