"use client";

import dynamic from "next/dynamic";
import { SectorSkeleton } from "@/components/skeletons/sector-skeleton";
import type { GalaxyPortalProps } from "@/components/cosmic/GalaxyPortal";

const GalaxyPortal = dynamic(
  () =>
    import("@/components/cosmic/GalaxyPortal").then((m) => m.GalaxyPortal),
  { loading: () => <SectorSkeleton /> }
);

type HomeSectorsProps = {
  sectors: GalaxyPortalProps[];
};

export function HomeSectors({ sectors }: HomeSectorsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3 md:gap-6">
      {sectors.map((sector) => (
        <GalaxyPortal key={sector.href} {...sector} />
      ))}
    </section>
  );
}
