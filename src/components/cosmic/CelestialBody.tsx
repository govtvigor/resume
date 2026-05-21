"use client";

import dynamic from "next/dynamic";
import type { PlanetVariant } from "@/components/cosmic/AnimatedPlanet";
import { Skeleton } from "@/components/ui/skeleton";

const AnimatedPlanet = dynamic(
  () =>
    import("@/components/cosmic/AnimatedPlanet").then((m) => m.AnimatedPlanet),
  {
    loading: () => (
      <Skeleton className="size-44 rounded-full bg-muted/20 ring-0" />
    ),
    ssr: false,
  }
);

const AnimatedSun = dynamic(
  () => import("@/components/cosmic/AnimatedSun").then((m) => m.AnimatedSun),
  {
    loading: () => (
      <Skeleton className="size-44 rounded-full bg-amber-500/10 ring-0" />
    ),
    ssr: false,
  }
);

type CelestialBodyProps = {
  variant: PlanetVariant;
  glow: string;
  size?: "md" | "lg";
};

export function CelestialBody({ variant, glow, size = "lg" }: CelestialBodyProps) {
  if (variant === "sun") {
    return <AnimatedSun size={size === "lg" ? "md" : "sm"} />;
  }
  return (
    <AnimatedPlanet
      variant={variant}
      glow={glow}
      className={size === "lg" ? "h-48 w-48 md:h-52 md:w-52" : undefined}
    />
  );
}
