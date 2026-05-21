"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LEVER_PULL_PX = 72;

type SlotLeverProps = {
  disabled: boolean;
  onPullComplete: () => void;
};

export function SlotLever({ disabled, onPullComplete }: SlotLeverProps) {
  const [leverPull, setLeverPull] = useState(0);
  const dragging = useRef(false);
  const leverStartY = useRef(0);
  const leverPullRef = useRef(0);

  const handleMove = (clientY: number) => {
    const delta = Math.max(0, clientY - leverStartY.current);
    const pull = Math.min(delta, LEVER_PULL_PX);
    leverPullRef.current = pull;
    setLeverPull(pull);
  };

  const handleEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (leverPullRef.current >= LEVER_PULL_PX * 0.85) {
      onPullComplete();
    } else {
      leverPullRef.current = 0;
      setLeverPull(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-end pb-2 sm:w-24">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Pull
      </p>
      <div className="relative flex h-56 w-16 flex-col items-center">
        <div className="h-8 w-3 rounded-full bg-gradient-to-b from-amber-200 to-amber-600 shadow-md" />
        <div
          className="w-2 flex-1 origin-top rounded-full bg-gradient-to-b from-amber-700 to-amber-950 transition-transform duration-150 ease-out"
          style={{ transform: `scaleY(${1 + leverPull / 120})` }}
        />
        <button
          type="button"
          aria-label="Pull slot lever to spin"
          disabled={disabled}
          className={cn(
            "relative z-10 size-14 rounded-full border-4 border-amber-800 bg-gradient-to-br from-red-500 to-red-800 shadow-[0_6px_0_#5c1a0a,0_8px_20px_rgba(0,0,0,0.5)] transition-transform touch-none select-none",
            "active:shadow-[0_2px_0_#5c1a0a] disabled:opacity-50"
          )}
          style={{ transform: `translateY(${leverPull}px)` }}
          onPointerDown={(e) => {
            dragging.current = true;
            leverStartY.current = e.clientY - leverPull;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            handleMove(e.clientY);
          }}
          onPointerUp={handleEnd}
          onPointerCancel={handleEnd}
        >
          <span className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400 to-red-700" />
        </button>
      </div>
    </div>
  );
}
