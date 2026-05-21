"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { Button } from "@/components/ui/button";
import {
  hasSeenSpaceGuide,
  markSpaceGuideSeen,
} from "@/lib/guide-storage";
import { cn } from "@/lib/utils";

export type GuideStep = {
  id: string;
  /** Section to scroll to and highlight; null = stay on current / no focus */
  sectionIndex: number | null;
  message: string;
};

export const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    sectionIndex: null,
    message:
      "Hey, explorer! I'm your W Guide. Welcome to Igor's cosmic portfolio — three worlds, one orbit.",
  },
  {
    id: "scroll-hint",
    sectionIndex: null,
    message:
      "Use your scroll wheel or swipe — you'll move one planet at a time. I'll walk you through each one.",
  },
  {
    id: "about",
    sectionIndex: 0,
    message:
      "This golden sun is About Me — CV, experience, skills, and a contact form. Tap it when you're ready to land.",
  },
  {
    id: "projects",
    sectionIndex: 1,
    message:
      "The blue ocean world is Projects — repositories, demos, and write-ups from real builds.",
  },
  {
    id: "arcade",
    sectionIndex: 2,
    message:
      "The ember planet is Arcade — casual mini-games are docking soon. Explore what's live today!",
  },
  {
    id: "done",
    sectionIndex: null,
    message:
      "You're cleared for launch. Pick any planet to warp in — I'll stay out of your way. Fly safe!",
  },
];

type SpaceGuideProps = {
  onNavigateToSection: (index: number) => void;
  onTourChange: (state: {
    active: boolean;
    highlightedSection: number | null;
  }) => void;
};

export function SpaceGuide({
  onNavigateToSection,
  onTourChange,
}: SpaceGuideProps) {
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const seen = hasSeenSpaceGuide();
    setVisible(!seen);
  }, []);

  const step = guideSteps[stepIndex] ?? guideSteps[0];
  const typed = useTypewriter(step.message, 24, visible);

  const dismiss = useCallback(() => {
    markSpaceGuideSeen();
    setVisible(false);
    onTourChange({ active: false, highlightedSection: null });
  }, [onTourChange]);

  useEffect(() => {
    if (!visible) {
      onTourChange({ active: false, highlightedSection: null });
      return;
    }

    const current = guideSteps[stepIndex];

    onTourChange({
      active: true,
      highlightedSection: current.sectionIndex,
    });

    if (current.sectionIndex !== null) {
      onNavigateToSection(current.sectionIndex);
    }
  }, [visible, stepIndex, onNavigateToSection, onTourChange]);

  const goNext = () => {
    if (stepIndex >= guideSteps.length - 1) {
      dismiss();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  if (!visible) return null;

  const isLast = stepIndex >= guideSteps.length - 1;
  const progress = ((stepIndex + 1) / guideSteps.length) * 100;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 md:justify-start md:pl-6 md:pr-8"
      role="dialog"
      aria-labelledby="space-guide-title"
      aria-describedby="space-guide-text"
    >
      <div className="pointer-events-auto flex w-full max-w-lg items-end gap-3 md:max-w-xl">
        <div className="relative shrink-0">
          <div
            className="absolute -inset-2 rounded-full bg-teal-500/20 blur-xl"
            aria-hidden
          />
          <Image
            src="/images/space-guide.png"
            alt="W Guide — your portfolio navigator"
            width={140}
            height={180}
            className="relative h-28 w-auto drop-shadow-[0_0_24px_rgba(38,166,154,0.45)] sm:h-36 md:h-44"
            priority
          />
        </div>

        <div
          className={cn(
            "flex-1 rounded-2xl border border-teal-400/30",
            "bg-[#050510]/92 p-4 shadow-[0_0_40px_-8px_rgba(38,166,154,0.35)] backdrop-blur-xl"
          )}
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <p
                id="space-guide-title"
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-300"
              >
                W Guide
              </p>
              <p className="text-[10px] text-muted-foreground">
                Step {stepIndex + 1} / {guideSteps.length}
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg p-1 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              aria-label="Close guide"
            >
              <X className="size-4" />
            </button>
          </div>

          <p
            id="space-guide-text"
            className="min-h-[4.5rem] text-sm leading-relaxed text-foreground/95"
          >
            {typed}
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-orange-400 align-middle" />
          </p>

          <div
            className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/10"
            aria-hidden
          >
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-orange-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              onClick={goNext}
              className="bg-teal-600/90 font-mono text-[10px] uppercase tracking-wider hover:bg-teal-500"
            >
              {isLast ? "Launch" : "Next"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={dismiss}
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              Skip tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
