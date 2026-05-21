"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { submitArcadeScore } from "@/lib/arcade/submit-score-client";
import {
  MEMORY_SYMBOLS,
  buildMemoryDeck,
  calcMemoryScore,
  type MemoryCard,
} from "@/lib/arcade/memory-logic";
import { PilotLoginGate } from "@/components/arcade/pilot-login-gate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NebulaMatch() {
  const { status } = useSession();
  const [cards, setCards] = useState<MemoryCard[]>(() => buildMemoryDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [lock, setLock] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const submittedRef = useRef(false);

  const reset = useCallback(() => {
    setCards(buildMemoryDeck());
    setFlipped([]);
    setMoves(0);
    setPairs(0);
    setSeconds(0);
    setStarted(false);
    setWon(false);
    setLock(false);
    setFinalScore(null);
    submittedRef.current = false;
  }, []);

  useEffect(() => {
    if (!started || won) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [started, won]);

  useEffect(() => {
    if (pairs !== MEMORY_SYMBOLS.length || submittedRef.current) return;
    submittedRef.current = true;
    setWon(true);
    const score = calcMemoryScore(pairs, seconds, moves);
    setFinalScore(score);
    if (status === "authenticated") void submitArcadeScore("memory", score);
  }, [pairs, seconds, moves, status]);

  const onCardClick = useCallback(
    (index: number) => {
      if (lock || won) return;
      const card = cards[index];
      if (card.matched || flipped.includes(index)) return;
      if (!started) setStarted(true);

      const nextFlipped = [...flipped, index];
      setFlipped(nextFlipped);
      if (nextFlipped.length < 2) return;

      setLock(true);
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      const match = cards[a].symbol === cards[b].symbol;

      window.setTimeout(() => {
        if (match) {
          setCards((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, matched: true } : c
            )
          );
          setPairs((p) => p + 1);
        }
        setFlipped([]);
        setLock(false);
      }, 600);
    },
    [cards, flipped, lock, won, started]
  );

  if (status === "loading") {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (status !== "authenticated") {
    return (
      <PilotLoginGate
        callbackUrl="/galaxy/arcade/memory"
        message="Sign in to play and save your best run."
        accentClass="border-lime-400/30 bg-lime-500/5"
      />
    );
  }

  const liveScore = calcMemoryScore(pairs, seconds, moves);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-lg flex-wrap justify-between gap-2 font-mono text-xs uppercase tracking-wider text-lime-300/90 sm:text-sm">
        <span>Time: {seconds}s</span>
        <span>Moves: {moves}</span>
        <span>
          Pairs: {pairs}/{MEMORY_SYMBOLS.length}
        </span>
        <span>Run: {liveScore}</span>
      </div>

      <div className="grid w-full max-w-lg grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card, index) => {
          const isUp = card.matched || flipped.includes(index);
          return (
            <button
              key={`${card.id}-${index}`}
              type="button"
              disabled={lock || card.matched}
              onClick={() => onCardClick(index)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg border-2 text-2xl transition duration-300 sm:text-3xl",
                isUp
                  ? "border-lime-400/50 bg-lime-500/10"
                  : "border-lime-700/40 bg-[#0a0f18] hover:border-lime-400/40",
                card.matched && "opacity-60"
              )}
            >
              {isUp ? card.symbol : "?"}
            </button>
          );
        })}
      </div>

      {won && finalScore !== null ? (
        <p className="font-mono text-sm text-lime-300">
          Nebula cleared! Score {finalScore} saved.
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Match all constellation pairs · Fewer moves and faster time = higher
          score
        </p>
      )}

      <Button size="sm" variant="outline" onClick={reset}>
        New board
      </Button>
    </div>
  );
}
