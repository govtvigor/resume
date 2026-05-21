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
  live: "Live",
  alpha: "In progress",
  soon: "Soon",
};

const accentText: Record<GalaxyPortalProps["accent"], string> = {
  cyan: "text-cyan-300",
  magenta: "text-fuchsia-300",
  amber: "text-amber-300",
  lime: "text-lime-300",
};

type GalaxyPortalExtraProps = {
  layout?: "card" | "section";
  isActive?: boolean;
  isHighlighted?: boolean;
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
  layout = "card",
  isActive = false,
  isHighlighted = false,
}: GalaxyPortalProps & GalaxyPortalExtraProps) {
  const isSection = layout === "section";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center outline-none transition duration-500",
        "focus-visible:ring-2 focus-visible:ring-cyan-400/60",
        isSection
          ? "min-h-0 w-full rounded-3xl px-6 py-4 hover:scale-[1.02]"
          : "min-h-[340px] rounded-2xl px-4 py-8 hover:-translate-y-2"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500",
          isSection ? "opacity-70" : "rounded-2xl opacity-50 group-hover:opacity-100",
          (isActive || isHighlighted) && isSection && "opacity-100"
        )}
        aria-hidden
        style={{
          background: `radial-gradient(circle at 50% 40%, ${glow}, transparent ${isSection ? "68%" : "72%"})`,
        }}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-transform duration-700",
          isSection ? "scale-100 group-hover:scale-[1.03]" : "group-hover:scale-105"
        )}
      >
        <CelestialBody variant={planet} glow={glow} size={isSection ? "xl" : "lg"} />
      </div>

      <h3
        className={cn(
          "relative z-10 text-center font-mono font-semibold uppercase tracking-[0.2em] text-foreground/90 transition duration-300",
          "group-hover:text-foreground",
          isSection ? "mt-12 text-base md:text-lg" : "mt-10 text-sm",
          accentText[accent],
          (isActive || isHighlighted) && isSection && "text-foreground"
        )}
      >
        {title}
      </h3>

      {isSection ? (
        <div
          className="relative z-10 mt-6 max-w-md text-center"
          style={{ "--glow": glow } as CSSProperties}
        >
          <div className="mb-3 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-wider">
            <span className={accentText[accent]}>{code}</span>
            <span className="text-muted-foreground">{badgeLabel[badge]}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          <span
            className={cn(
              "mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest",
              accentText[accent]
            )}
          >
            Enter sector
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      ) : (
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
            Open
            <ArrowRight className="size-3" />
          </span>
        </div>
      )}
    </Link>
  );
}
