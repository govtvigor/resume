"use client";

import { useCallback, useEffect, useState } from "react";
import type { PilotStats, SlotSymbol } from "@/lib/arcade/types";

type SpinResponse = {
  reels: [SlotSymbol, SlotSymbol, SlotSymbol];
  payout: number;
  credits: number;
};

const RANDOM_SYMBOLS: SlotSymbol[] = ["cherry", "lemon", "bell", "star", "seven"];

function randomReels(): [SlotSymbol, SlotSymbol, SlotSymbol] {
  return [
    RANDOM_SYMBOLS[Math.floor(Math.random() * RANDOM_SYMBOLS.length)]!,
    RANDOM_SYMBOLS[Math.floor(Math.random() * RANDOM_SYMBOLS.length)]!,
    RANDOM_SYMBOLS[Math.floor(Math.random() * RANDOM_SYMBOLS.length)]!,
  ];
}

export function useSlotMachine(enabled: boolean) {
  const [stats, setStats] = useState<PilotStats | null>(null);
  const [bet, setBet] = useState(25);
  const [reels, setReels] = useState<[SlotSymbol, SlotSymbol, SlotSymbol]>([
    "cherry",
    "lemon",
    "bell",
  ]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mongoReady, setMongoReady] = useState(true);

  const loadStats = useCallback(async () => {
    const res = await fetch("/api/arcade/player");
    if (!res.ok) return;
    const data = (await res.json()) as {
      configured: boolean;
      stats: PilotStats;
    };
    setMongoReady(data.configured);
    setStats(data.stats);
  }, []);

  const runSpin = useCallback(async () => {
    if (spinning || !enabled) return;

    setSpinning(true);
    setMessage(null);
    setReels(["cherry", "lemon", "bell"]);

    const spinInterval = window.setInterval(() => {
      setReels(randomReels());
    }, 80);

    try {
      const res = await fetch("/api/arcade/slot/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bet }),
      });

      const data = (await res.json()) as SpinResponse & { error?: string };
      window.clearInterval(spinInterval);

      if (!res.ok) {
        setMessage(data.error ?? "Spin failed");
        return;
      }

      setReels(data.reels);
      setStats((prev) =>
        prev
          ? {
              ...prev,
              credits: data.credits,
              totalSpins: prev.totalSpins + 1,
              totalWon: prev.totalWon + data.payout,
              biggestWin: Math.max(prev.biggestWin, data.payout),
            }
          : prev
      );
      setMessage(
        data.payout > 0
          ? `Jackpot flow! +${data.payout} credits`
          : "No match — try again, pilot."
      );
    } catch {
      window.clearInterval(spinInterval);
      setMessage("Connection error");
    } finally {
      setSpinning(false);
    }
  }, [bet, spinning, enabled]);

  useEffect(() => {
    if (enabled) void loadStats();
  }, [enabled, loadStats]);

  return {
    stats,
    bet,
    setBet,
    reels,
    spinning,
    message,
    mongoReady,
    runSpin,
  };
}
