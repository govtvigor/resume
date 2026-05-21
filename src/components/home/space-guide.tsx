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
import { guideSteps } from "@/lib/space-guide-steps";
import { cn } from "@/lib/utils";

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
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-3 sm:px-4 sm:pb-4 md:justify-start md:pl-6 md:pr-8"
      role="dialog"
      aria-labelledby="space-guide-title"
      aria-describedby="space-guide-text"
    >
      <div className="pointer-events-auto flex w-full max-w-[min(100%,28rem)] items-end gap-2 sm:max-w-lg sm:gap-3 md:max-w-xl">
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
            className="relative h-20 w-auto drop-shadow-[0_0_24px_rgba(38,166,154,0.45)] sm:h-28 md:h-36 lg:h-40"
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
                className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-teal-300"
              >
                W Guide
              </p>
              <p className="text-xs text-muted-foreground">
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
            className="min-h-[3.5rem] text-xs leading-relaxed text-foreground/95 sm:min-h-[4.5rem] sm:text-sm"
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
              className="bg-teal-600/90 font-mono text-xs uppercase tracking-wider hover:bg-teal-500"
            >
              {isLast ? "Launch" : "Next"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={dismiss}
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Skip tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
