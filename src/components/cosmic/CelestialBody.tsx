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

const planetSizeClass: Record<NonNullable<CelestialBodyProps["size"]>, string> = {
  md: "h-36 w-36",
  lg: "h-48 w-48 md:h-52 md:w-52",
  xl: "h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80",
};

export function CelestialBody({ variant, glow, size = "lg" }: CelestialBodyProps) {
  if (variant === "sun") {
    const sunSize =
      size === "xl" ? "lg" : size === "lg" ? "md" : "sm";
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
