import type { GalaxyPortalProps } from "@/components/cosmic/GalaxyPortal";
import { GalaxyPortal } from "@/components/cosmic/GalaxyPortal";

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
