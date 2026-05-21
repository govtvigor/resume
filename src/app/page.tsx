import Link from "next/link";
import type { GalaxyPortalProps } from "@/components/cosmic/GalaxyPortal";
import { HomeSectors } from "@/components/home/home-sectors";
import { HoloPanel } from "@/components/cosmic/HoloPanel";
import { SiteHeader } from "@/components/layout/site-header";

const sectors: GalaxyPortalProps[] = [
  {
    href: "/about",
    code: "SECTOR_00 // PROFILE",
    badge: "live",
    title: "About me",
    subtitle: "CV-style profile: education, languages, work history, and projects.",
    accent: "lime",
    glow: "rgba(163, 230, 53, 0.55)",
    planet: "sun",
  },
  {
    href: "/galaxy/projects",
    code: "GALAXY_01 // PROJECT_VAULT",
    badge: "alpha",
    title: "Code nebula",
    subtitle: "Repositories, demos, and short write-ups for each build.",
    accent: "cyan",
    glow: "rgba(56, 189, 248, 0.65)",
    planet: "ocean",
  },
  {
    href: "/galaxy/arcade",
    code: "GALAXY_02 // LUDO_ZONE",
    badge: "soon",
    title: "Constellation arcade",
    subtitle: "Fun mini-games with no real money — sector launching soon.",
    accent: "amber",
    glow: "rgba(251, 191, 36, 0.6)",
    planet: "ember",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-12 px-4 pb-20 pt-8 md:px-8 md:pt-12">
        <section className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-400/90">
            // orbital_portfolio.sys
          </p>
          <h1 className="mt-3 text-balance font-mono text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Three sectors
            <span className="block text-cyan-300">One pilot</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
            Hover a world for mission details. No panels — just void, light, and spin.
          </p>
        </section>

        <HomeSectors sectors={sectors} />

        <HoloPanel
          title="SYSTEM_LOG // STATUS"
          accent="lime"
          className="mx-auto w-full max-w-3xl"
        >
          <p className="font-mono text-xs leading-relaxed text-lime-300/85">
            &gt; CV_PROFILE ................ ONLINE
            <br />
            &gt; LAZY_SECTORS .............. OK
            <br />
            &gt; AUTH_MODULE ............... OK
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-cyan-300 hover:text-cyan-200"
          >
            [OPEN_CV]
          </Link>
        </HoloPanel>
      </main>
    </>
  );
}
