"use client";

import { useSession } from "next-auth/react";
import { SNAKE_GRID } from "@/lib/arcade/snake-logic";
import { PilotLoginGate } from "@/components/arcade/pilot-login-gate";
import { Button } from "@/components/ui/button";
import { useSnakeGame } from "@/hooks/use-snake-game";
import { cn } from "@/lib/utils";

export function CosmicSnake() {
  const { status } = useSession();
  const saveScores = status === "authenticated";
  const { snake, food, score, best, phase, reset } = useSnakeGame(saveScores);

  if (status === "loading") {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!saveScores) {
    return (
      <PilotLoginGate
        callbackUrl="/galaxy/arcade/snake"
        message="Sign in to play and save your high score."
        accentClass="border-cyan-400/30 bg-cyan-500/5"
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-md justify-between font-mono text-xs uppercase tracking-wider text-cyan-300/90 sm:text-sm">
        <span>Score: {score}</span>
        <span>Best: {best}</span>
        <span>Length: {snake.length}</span>
      </div>

      <div
        className="relative grid w-full max-w-md gap-px rounded-lg border-2 border-cyan-500/40 bg-[#050510] p-1 shadow-[0_0_40px_-8px_rgba(34,211,238,0.35)]"
        style={{
          gridTemplateColumns: `repeat(${SNAKE_GRID}, minmax(0, 1fr))`,
          aspectRatio: "1",
        }}
      >
        {Array.from({ length: SNAKE_GRID * SNAKE_GRID }).map((_, i) => {
          const x = i % SNAKE_GRID;
          const y = Math.floor(i / SNAKE_GRID);
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isBody = snake.some((s, idx) => idx > 0 && s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-[2px]",
                isFood && "bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
                isHead && "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]",
                isBody && "bg-cyan-600/70",
                !isFood && !isHead && !isBody && "bg-white/[0.03]"
              )}
            />
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground sm:text-sm">
        Arrow keys or WASD · Eat stardust (+10) · Don&apos;t crash
      </p>

      <div className="flex items-center gap-3">
        {phase !== "playing" && (
          <Button size="sm" onClick={reset}>
            {phase === "over" ? "Play again" : "Start"}
          </Button>
        )}
        {phase === "over" && (
          <span className="font-mono text-xs text-cyan-300">Score saved</span>
        )}
      </div>
    </div>
  );
}
