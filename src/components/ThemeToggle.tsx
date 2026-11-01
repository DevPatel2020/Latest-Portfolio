"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Small light/dark switch. The saved choice is applied before paint by the script in layout.tsx. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  };

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-6 w-11 flex-none items-center border border-black px-0.5 transition-colors hover:border-red-600"
    >
      <span
        className="flex h-4 w-4 items-center justify-center bg-black text-white transition-transform duration-300 ease-out"
        style={{ transform: dark ? "translateX(20px)" : "translateX(0)" }}
      >
        {dark ? <Moon className="h-2.5 w-2.5" /> : <Sun className="h-2.5 w-2.5" />}
      </span>
    </button>
  );
}
