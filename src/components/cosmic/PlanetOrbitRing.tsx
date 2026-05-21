import { cn } from "@/lib/utils";

type PlanetOrbitRingProps = {
  stroke: string;
  className?: string;
};

/** Flat ellipse orbit — full ring visible, no 3D clip */
export function PlanetOrbitRing({ stroke, className }: PlanetOrbitRingProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 w-[108%] -translate-x-1/2 overflow-visible",
        className
      )}
      viewBox="0 0 200 88"
      aria-hidden
    >
      <ellipse
        cx="100"
        cy="52"
        rx="92"
        ry="32"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        opacity="0.85"
      />
    </svg>
  );
}
