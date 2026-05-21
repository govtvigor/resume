"use client";

import { useSession } from "next-auth/react";
import { MIN_BET, MAX_BET } from "@/lib/arcade/slot-logic";
import { PilotLoginGate } from "@/components/arcade/pilot-login-gate";
import { PilotStatsBar } from "@/components/arcade/slot/pilot-stats-bar";
import { SlotLever } from "@/components/arcade/slot/slot-lever";
import { SlotReel } from "@/components/arcade/slot/slot-reel";
import { Button } from "@/components/ui/button";
import { useSlotMachine } from "@/hooks/use-slot-machine";

export function SlotMachine() {
  const { status } = useSession();
  const enabled = status === "authenticated";
  const { stats, bet, setBet, reels, spinning, message, mongoReady, runSpin } =
    useSlotMachine(enabled);

  if (status === "loading") {
    return <p className="text-sm text-muted-foreground">Loading pilot console…</p>;
  }

  if (!enabled) {
    return (
      <PilotLoginGate
        callbackUrl="/galaxy/arcade/slots"
        message="Sign in with Google to play and save your credits to the arcade database."
      />
    );
  }

  if (!stats) {
    return <p className="text-sm text-muted-foreground">Syncing pilot profile…</p>;
  }

  if (!mongoReady) {
    return (
      <p className="text-sm text-amber-200/90">
        MongoDB is not configured. Add MONGODB_URI to enable saves.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PilotStatsBar stats={stats} />

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
        <div className="relative w-full max-w-md rounded-2xl border-4 border-amber-600/70 bg-gradient-to-b from-[#4a2812] via-[#2d1608] to-[#1a0c04] p-4 shadow-[0_12px_48px_rgba(0,0,0,0.6),inset_0_2px_0_rgba(255,200,100,0.15)] sm:p-6">
          <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-amber-200/80">
            <span>Cosmic slots</span>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-100">
              ×3 match
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <SlotReel symbol={reels[0]} spinning={spinning} />
            <SlotReel symbol={reels[1]} spinning={spinning} />
            <SlotReel symbol={reels[2]} spinning={spinning} />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <label className="font-mono text-xs uppercase tracking-wider text-amber-200/80">
              Bet
              <select
                className="ml-2 rounded border border-amber-700/50 bg-black/40 px-2 py-1 text-sm text-foreground"
                value={bet}
                disabled={spinning}
                onChange={(e) => setBet(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <Button
              size="sm"
              variant="outline"
              disabled={spinning}
              onClick={() => void runSpin()}
              className="border-amber-500/40 font-mono text-xs uppercase"
            >
              Spin
            </Button>
          </div>

          {message ? (
            <p className="mt-3 text-center font-mono text-xs text-amber-100 sm:text-sm">
              {message}
            </p>
          ) : null}
        </div>

        <SlotLever
          disabled={spinning || stats.credits < bet}
          onPullComplete={() => void runSpin()}
        />
      </div>

      <p className="text-center text-xs text-muted-foreground sm:text-sm">
        🍒×5 · 🍋×10 · 🔔×20 · ⭐×50 · 7×100 on triple match. Pair pays smaller
        bonus. Min bet {MIN_BET}, max {MAX_BET}.
      </p>
    </div>
  );
}
