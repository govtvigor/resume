"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_LOCK_MS = 1100;

export function useHomeScroll(sectorCount: number) {
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const activeSectionRef = useRef(0);
  const scrollLockRef = useRef(false);
  const [tourActive, setTourActive] = useState(false);

  const syncActiveIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(sectorCount - 1, index));
      activeSectionRef.current = clamped;
      setActiveSection(clamped);
    },
    [sectorCount]
  );

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
      syncActiveIndex(Math.round(scrollTop / clientHeight));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [syncActiveIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (tourActive || scrollLockRef.current) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      if (Math.abs(delta) < 48) return;
      const next = activeSectionRef.current + (delta > 0 ? 1 : -1);
      if (next < 0 || next >= sectorCount) return;
      scrollToSection(next);
    };

    const onWheel = (e: WheelEvent) => {
      if (tourActive || scrollLockRef.current) {
        if (tourActive || scrollLockRef.current) e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;
      const next = activeSectionRef.current + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= sectorCount) return;
      e.preventDefault();
      scrollToSection(next);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [sectorCount, scrollToSection, tourActive]);

  return {
    containerRef,
    sectionRefs,
    activeSection,
    tourActive,
    setTourActive,
    scrollToSection,
  };
}
