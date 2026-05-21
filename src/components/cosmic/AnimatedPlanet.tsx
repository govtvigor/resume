import { cn } from "@/lib/utils";

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
        "relative flex h-44 w-44 items-center justify-center md:h-48 md:w-48",
        className
      )}
      style={{
        filter: `drop-shadow(0 0 48px ${glow}) drop-shadow(0 0 80px ${glow})`,
      }}
    >
      {variant === "ocean" ? <OceanPlanet glow={glow} /> : null}
      {variant === "vortex" ? <VortexPlanet glow={glow} /> : null}
      {variant === "ember" ? <EmberPlanet glow={glow} /> : null}
    </div>
  );
}

function OceanPlanet({ glow }: { glow: string }) {
  return (
    <>
      <div
        className="absolute h-[90%] w-[90%] animate-planet-spin rounded-full"
        style={{
          background:
            "radial-gradient(circle at 28% 22%, #e0f7ff 0%, #7dd3fc 22%, #38bdf8 45%, #1d4ed8 78%, #0f172a 100%)",
          boxShadow: `0 0 50px ${glow}, inset -12px -8px 30px rgba(255,255,255,0.25)`,
        }}
      />
      <div
        className="absolute h-[118%] w-[118%] animate-planet-ring rounded-[50%] border border-cyan-200/40 opacity-80"
        style={{ transform: "rotateX(68deg)" }}
      />
    </>
  );
}

function VortexPlanet({ glow }: { glow: string }) {
  return (
    <>
      <div
        className="absolute h-[92%] w-[92%] animate-planet-spin rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #faf5ff, #e879f9, #c084fc, #6b21a8, #4c1d95, #c084fc, #f0abfc, #faf5ff)",
          boxShadow: `0 0 56px ${glow}, inset 0 0 40px rgba(255,255,255,0.12)`,
        }}
      />
      <div className="absolute h-[30%] w-[30%] rounded-full bg-black/85 blur-[2px] shadow-[0_0_30px_rgba(192,132,252,0.5)]" />
    </>
  );
}

function EmberPlanet({ glow }: { glow: string }) {
  return (
    <>
      <div
        className="absolute h-[88%] w-[88%] animate-planet-spin rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 26%, #fff7ed 0%, #fde68a 18%, #f59e0b 48%, #ea580c 75%, #7c2d12 100%)",
          boxShadow: `0 0 52px ${glow}, inset -10px -6px 28px rgba(255,237,180,0.35)`,
        }}
      />
      <div
        className="absolute h-[122%] w-[122%] animate-planet-ring rounded-[50%] border border-amber-200/35 opacity-75"
        style={{ transform: "rotateX(72deg) rotateZ(12deg)" }}
      />
    </>
  );
}
