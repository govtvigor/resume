"use client";

import { useCallback, useState } from "react";
import type { GalaxyPortalProps } from "@/components/cosmic/GalaxyPortal";
import { GalaxyPortal } from "@/components/cosmic/GalaxyPortal";
import { SpaceGuide } from "@/components/home/space-guide";
import { useHomeScroll } from "@/hooks/use-home-scroll";
import { cn } from "@/lib/utils";

type HomeScrollSectionsProps = {
  sectors: GalaxyPortalProps[];
};

export function HomeScrollSections({ sectors }: HomeScrollSectionsProps) {
  const [highlightedSection, setHighlightedSection] = useState<number | null>(
    null
  );

  const {
    containerRef,
    sectionRefs,
    activeSection,
    tourActive,
    setTourActive,
    scrollToSection,
  } = useHomeScroll(sectors.length);

  const handleTourChange = useCallback(
    (state: { active: boolean; highlightedSection: number | null }) => {
      setTourActive(state.active);
      setHighlightedSection(state.highlightedSection);
    },
    [setTourActive]
  );

  return (
    <>
      {tourActive && highlightedSection !== null ? (
        <div
          className="pointer-events-none fixed inset-0 z-[55] bg-[#050510]/55 backdrop-blur-[2px] transition-opacity duration-500"
          aria-hidden
        />
      ) : null}

      <div
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
        aria-hidden
      >
        {sectors.map((sector, i) => (
          <button
            key={sector.href}
            type="button"
            tabIndex={-1}
            aria-label={`Go to ${sector.title}`}
            className={cn(
              "pointer-events-auto h-2.5 w-2.5 rounded-full border border-cyan-400/40 transition-all duration-500",
              activeSection === i
                ? "scale-150 bg-cyan-400 shadow-[0_0_14px_rgba(56,189,248,0.85)]"
                : "bg-transparent hover:border-cyan-300/70"
            )}
            onClick={() => scrollToSection(i)}
          />
        ))}
      </div>

      <section
        ref={containerRef}
        className={cn(
          "home-scroll-sections h-[calc(100dvh-var(--site-header-h))] overflow-y-auto overscroll-y-contain",
          "snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "scroll-smooth"
        )}
        aria-label="Portfolio sectors"
      >
        {sectors.map((sector, index) => {
          const isHighlighted = tourActive && highlightedSection === index;
          const isDimmed =
            tourActive &&
            highlightedSection !== null &&
            highlightedSection !== index;

          return (
            <article
              key={sector.href}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={cn(
                "relative flex min-h-[calc(100dvh-var(--site-header-h))] snap-start snap-always flex-col items-center justify-start overflow-visible",
                "px-4 pb-36 pt-12 transition-[opacity,filter] duration-700 ease-out",
                "sm:px-6 sm:pb-40 sm:pt-14 md:px-8 md:pb-44 md:pt-16 lg:pb-40 lg:pt-14 xl:pb-36 2xl:pb-32",
                isDimmed && "opacity-35 saturate-50",
                isHighlighted && "z-[56] opacity-100 saturate-100"
              )}
            >
              {isHighlighted ? (
                <div
                  className="pointer-events-none absolute inset-4 rounded-[2rem] border-2 border-teal-400/70 shadow-[0_0_60px_12px_rgba(45,212,191,0.25),inset_0_0_40px_rgba(45,212,191,0.08)] ring-4 ring-orange-400/20 animate-pulse md:inset-8"
                  aria-hidden
                />
              ) : null}

              <div
                className={cn(
                  "relative flex w-full max-w-md flex-col items-center transition-transform duration-700 ease-out",
                  "sm:max-w-lg md:max-w-xl lg:max-w-2xl",
                  "translate-y-0 xl:translate-y-6 2xl:translate-y-10",
                  isHighlighted && "scale-[1.02]"
                )}
              >
                <GalaxyPortal
                  {...sector}
                  layout="section"
                  isActive={activeSection === index}
                  isHighlighted={isHighlighted}
                />
              </div>
            </article>
          );
        })}
      </section>

      <SpaceGuide
        onNavigateToSection={scrollToSection}
        onTourChange={handleTourChange}
      />
    </>
  );
}
