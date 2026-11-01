"use client";

import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; active: boolean; onClick: () => void };

export default function Filter({ children, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-b-2 px-4 py-2 font-jet text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 md:px-6 md:text-xs",
        active
          ? "border-red-600 text-red-600"
          : "border-transparent text-black/50 hover:border-black/30 hover:text-black",
      )}
    >
      {children}
    </button>
  );
}
