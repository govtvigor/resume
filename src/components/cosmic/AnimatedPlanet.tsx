import { cn } from "@/lib/utils";
import { PlanetOrbitRing } from "@/components/cosmic/PlanetOrbitRing";

export type PlanetVariant = "ocean" | "vortex" | "ember" | "sun";

type AnimatedPlanetProps = {
  variant: PlanetVariant;
  glow: string;
  className?: string;
};

export function AnimatedPlanet({ variant, glow, className }: AnimatedPlanetProps) {
  return (
    <div
      className={cn(
        "relative isolate shrink-0 overflow-visible",
        className
      )}
      style={{
        filter: `drop-shadow(0 0 48px ${glow}) drop-shadow(0 0 80px ${glow})`,
      }}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-end overflow-visible pb-[8%]">
        <PlanetOrbitRing
          className="h-[42%] min-h-[3.5rem]"
          stroke={
            variant === "ocean"
              ? "rgba(165, 243, 252, 0.55)"
              : variant === "ember"
                ? "rgba(252, 211, 77, 0.5)"
                : "rgba(200, 180, 255, 0.4)"
          }
        />
        <div className="relative z-10 aspect-square w-[72%] shrink-0">
          {variant === "ocean" ? <OceanPlanet glow={glow} /> : null}
          {variant === "vortex" ? <VortexPlanet glow={glow} /> : null}
          {variant === "ember" ? <EmberPlanet glow={glow} /> : null}
        </div>
      </div>
    </div>
  );
}

function OceanPlanet({ glow }: { glow: string }) {
  return (
    <div
      className="absolute inset-0 animate-planet-spin rounded-full"
      style={{
        background:
          "radial-gradient(circle at 28% 22%, #e0f7ff 0%, #7dd3fc 22%, #38bdf8 45%, #1d4ed8 78%, #0f172a 100%)",
        boxShadow: `0 0 50px ${glow}, inset -12px -8px 30px rgba(255,255,255,0.25)`,
      }}
    />
  );
}

function VortexPlanet({ glow }: { glow: string }) {
  return (
    <>
      <div
        className="absolute inset-0 animate-planet-spin rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #faf5ff, #e879f9, #c084fc, #6b21a8, #4c1d95, #c084fc, #f0abfc, #faf5ff)",
          boxShadow: `0 0 56px ${glow}, inset 0 0 40px rgba(255,255,255,0.12)`,
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/85 blur-[2px] shadow-[0_0_30px_rgba(192,132,252,0.5)]" />
    </>
  );
}

function EmberPlanet({ glow }: { glow: string }) {
  return (
    <div
      className="absolute inset-0 animate-planet-spin rounded-full"
      style={{
        background:
          "radial-gradient(circle at 32% 26%, #fff7ed 0%, #fde68a 18%, #f59e0b 48%, #ea580c 75%, #7c2d12 100%)",
        boxShadow: `0 0 52px ${glow}, inset -10px -6px 28px rgba(255,237,180,0.35)`,
      }}
    />
  );
}
