"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalaxyPortalProps } from "@/components/cosmic/GalaxyPortal";
import { GalaxyPortal } from "@/components/cosmic/GalaxyPortal";
import { SpaceGuide } from "@/components/home/space-guide";
import { cn } from "@/lib/utils";

const SCROLL_LOCK_MS = 1100;

type HomeScrollSectionsProps = {
  sectors: GalaxyPortalProps[];
};

export function HomeScrollSections({ sectors }: HomeScrollSectionsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const activeSectionRef = useRef(0);
  const scrollLockRef = useRef(false);
  const [tourActive, setTourActive] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<number | null>(
    null
  );

  const syncActiveIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(sectors.length - 1, index));
    activeSectionRef.current = clamped;
    setActiveSection(clamped);
  }, [sectors.length]);

  const scrollToSection = useCallback(
    (index: number) => {
      const section = sectionRefs.current[index];
      const container = containerRef.current;
      if (!section || !container) return;

      scrollLockRef.current = true;
      syncActiveIndex(index);

      section.scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        scrollLockRef.current = false;
      }, SCROLL_LOCK_MS);
    },
    [syncActiveIndex]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (scrollLockRef.current) return;

      const { scrollTop, clientHeight } = container;
      if (clientHeight <= 0) return;

      const index = Math.round(scrollTop / clientHeight);
      syncActiveIndex(index);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [syncActiveIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      if (tourActive) {
        event.preventDefault();
        return;
      }

      if (scrollLockRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      if (Math.abs(delta) < 4) return;

      const direction = delta > 0 ? 1 : -1;
      const next = activeSectionRef.current + direction;

      if (next < 0 || next >= sectors.length) return;

      event.preventDefault();
      scrollToSection(next);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [sectors.length, scrollToSection, tourActive]);

  const handleTourChange = useCallback(
    (state: { active: boolean; highlightedSection: number | null }) => {
      setTourActive(state.active);
      setHighlightedSection(state.highlightedSection);
    },
    []
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
          "home-scroll-sections h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-y-contain",
          "snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "scroll-smooth"
        )}
        aria-label="Portfolio sectors"
      >
        {sectors.map((sector, index) => {
          const isHighlighted =
            tourActive && highlightedSection === index;
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
                "relative flex min-h-[calc(100dvh-3.5rem)] snap-start snap-always items-center justify-center px-4 pb-44 pt-8 transition-[opacity,filter] duration-700 ease-out md:px-8 md:pb-48",
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
                  "relative flex w-full max-w-2xl flex-col items-center transition-transform duration-700 ease-out",
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
