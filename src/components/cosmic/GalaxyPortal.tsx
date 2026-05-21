import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CelestialBody } from "@/components/cosmic/CelestialBody";
import type { PlanetVariant } from "@/components/cosmic/AnimatedPlanet";
import { cn } from "@/lib/utils";

export type GalaxyPortalProps = {
  href: string;
  title: string;
  subtitle: string;
  code: string;
  badge: "live" | "alpha" | "soon";
  accent: "cyan" | "magenta" | "amber" | "lime";
  glow: string;
  planet: PlanetVariant;
};

const badgeLabel: Record<GalaxyPortalProps["badge"], string> = {
  live: "ONLINE",
  alpha: "ALPHA",
  soon: "SOON",
};

const accentText: Record<GalaxyPortalProps["accent"], string> = {
  cyan: "text-cyan-300",
  magenta: "text-fuchsia-300",
  amber: "text-amber-300",
  lime: "text-lime-300",
};

export function GalaxyPortal({
  href,
  title,
  subtitle,
  code,
  badge,
  accent,
  glow,
  planet,
}: GalaxyPortalProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center",
        "rounded-2xl px-4 py-8 outline-none transition duration-500",
        "hover:-translate-y-2 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
        style={{
          background: `radial-gradient(circle at 50% 42%, ${glow}, transparent 72%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center transition-transform duration-700 group-hover:scale-105">
        <CelestialBody variant={planet} glow={glow} size="lg" />
      </div>

      <h3
        className={cn(
          "relative z-10 mt-10 text-center font-mono text-sm font-semibold uppercase tracking-[0.2em] text-foreground/90 transition duration-300",
          "group-hover:text-foreground",
          accentText[accent]
        )}
      >
        {title}
      </h3>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-2 bottom-2 z-20 rounded-xl",
          "bg-black/60 p-4 opacity-0 shadow-[0_0_48px_-12px_var(--glow)] backdrop-blur-lg",
          "translate-y-3 transition-all duration-300 ease-out",
          "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        )}
        style={{ "--glow": glow } as CSSProperties}
      >
        <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider">
          <span className={accentText[accent]}>{code}</span>
          <span className="text-muted-foreground">{badgeLabel[badge]}</span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{subtitle}</p>
        <span
          className={cn(
            "mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest",
            accentText[accent]
          )}
        >
          Enter sector
          <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}
