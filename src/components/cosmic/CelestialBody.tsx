"use client";

import dynamic from "next/dynamic";
import type { PlanetVariant } from "@/components/cosmic/AnimatedPlanet";
import { Skeleton } from "@/components/ui/skeleton";

const AnimatedPlanet = dynamic(
  () =>
    import("@/components/cosmic/AnimatedPlanet").then((m) => m.AnimatedPlanet),
  {
    loading: () => (
      <Skeleton className="size-56 rounded-full bg-muted/20 ring-0 md:size-64" />
    ),
    ssr: false,
  }
);

const AnimatedSun = dynamic(
  () => import("@/components/cosmic/AnimatedSun").then((m) => m.AnimatedSun),
  {
    loading: () => (
      <Skeleton className="size-56 rounded-full bg-amber-500/10 ring-0 md:size-64" />
    ),
    ssr: false,
  }
);

type CelestialBodyProps = {
  variant: PlanetVariant;
  glow: string;
  size?: "md" | "lg" | "xl";
};

/** Height > width so orbit ellipse fits above the sphere */
const planetSizeClass: Record<NonNullable<CelestialBodyProps["size"]>, string> = {
  md: "h-40 w-32 sm:h-44 sm:w-36",
  lg: "h-48 w-40 sm:h-52 sm:w-44 md:h-56 md:w-48",
  xl:
    "h-44 w-36 min-[480px]:h-48 min-[480px]:w-40 sm:h-52 sm:w-44 md:h-56 md:w-48 lg:h-60 lg:w-52 xl:h-64 xl:w-56 2xl:h-68 2xl:w-60",
};

export function CelestialBody({ variant, glow, size = "lg" }: CelestialBodyProps) {
  if (variant === "sun") {
    const sunSize =
      size === "xl" ? "section" : size === "lg" ? "md" : "sm";
    return <AnimatedSun size={sunSize} />;
  }
  return (
    <AnimatedPlanet
      variant={variant}
      glow={glow}
      className={planetSizeClass[size]}
    />
  );
}
