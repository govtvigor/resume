import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HoloAccent = "cyan" | "magenta" | "amber" | "lime";

const accentMap: Record<
  HoloAccent,
  { border: string; glow: string; title: string; corner: string }
> = {
  cyan: {
    border: "border-cyan-400/50",
    glow: "shadow-[0_0_28px_-6px_rgba(34,211,238,0.45)]",
    title: "text-cyan-300",
    corner: "bg-cyan-400",
  },
  magenta: {
    border: "border-fuchsia-400/50",
    glow: "shadow-[0_0_28px_-6px_rgba(232,121,249,0.45)]",
    title: "text-fuchsia-300",
    corner: "bg-fuchsia-400",
  },
  amber: {
    border: "border-amber-400/50",
    glow: "shadow-[0_0_28px_-6px_rgba(251,191,36,0.4)]",
    title: "text-amber-300",
    corner: "bg-amber-400",
  },
  lime: {
    border: "border-lime-400/50",
    glow: "shadow-[0_0_28px_-6px_rgba(163,230,53,0.4)]",
    title: "text-lime-300",
    corner: "bg-lime-400",
  },
};

type HoloPanelProps = {
  title: string;
  accent?: HoloAccent;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function HoloPanel({
  title,
  accent = "cyan",
  children,
  className,
  contentClassName,
}: HoloPanelProps) {
  const a = accentMap[accent];

  return (
    <section
      className={cn(
        "relative overflow-hidden border bg-transparent backdrop-blur-[2px]",
        a.border,
        a.glow,
        className
      )}
    >
      <span
        className={cn("absolute left-0 top-0 h-3 w-3", a.corner)}
        aria-hidden
      />
      <span
        className={cn("absolute right-0 top-0 h-3 w-3", a.corner)}
        aria-hidden
      />
      <span
        className={cn("absolute bottom-0 left-0 h-3 w-3", a.corner)}
        aria-hidden
      />
      <span
        className={cn("absolute bottom-0 right-0 h-3 w-3", a.corner)}
        aria-hidden
      />

      <header
        className={cn(
          "border-b border-inherit px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]",
          a.title
        )}
      >
        {title}
      </header>
      <div className={cn("relative px-4 py-5", contentClassName)}>{children}</div>
    </section>
  );
}
