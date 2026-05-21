"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { submitArcadeScore } from "@/lib/arcade/submit-score-client";
import {
  INITIAL_SNAKE,
  isOppositeDir,
  randomSnakeFood,
  SNAKE_DIR_DELTA,
  SNAKE_GRID,
  SNAKE_KEY_MAP,
  SNAKE_TICK_MS,
  snakePointsEqual,
  type SnakeDir,
  type SnakePoint,
} from "@/lib/arcade/snake-logic";

export function useSnakeGame(saveScores: boolean) {
  const [snake, setSnake] = useState<SnakePoint[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<SnakePoint>({ x: 10, y: 8 });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");

  const nextDirRef = useRef<SnakeDir>("right");
  const dirRef = useRef<SnakeDir>("right");
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const scoreRef = useRef(0);
  const phaseRef = useRef(phase);

  snakeRef.current = snake;
  foodRef.current = food;
  scoreRef.current = score;
  phaseRef.current = phase;

  const finishGame = useCallback(async () => {
    if (phaseRef.current === "over") return;
    setPhase("over");
    phaseRef.current = "over";
    const final = scoreRef.current;
    setBest((b) => Math.max(b, final));
    if (saveScores) await submitArcadeScore("snake", final);
  }, [saveScores]);

  const reset = useCallback(() => {
    const start = [...INITIAL_SNAKE];
    setSnake(start);
    snakeRef.current = start;
    setFood(randomSnakeFood(start));
    setScore(0);
    scoreRef.current = 0;
    setPhase("playing");
    phaseRef.current = "playing";
    nextDirRef.current = "right";
    dirRef.current = "right";
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const tick = () => {
      const d = nextDirRef.current;
      const prev = snakeRef.current;
      const head = prev[0];
      const next = {
        x: head.x + SNAKE_DIR_DELTA[d].x,
        y: head.y + SNAKE_DIR_DELTA[d].y,
      };

      if (
        next.x < 0 ||
        next.y < 0 ||
        next.x >= SNAKE_GRID ||
        next.y >= SNAKE_GRID ||
        prev.some((s) => snakePointsEqual(s, next))
      ) {
        void finishGame();
        return;
      }

      dirRef.current = d;
      const ate = snakePointsEqual(next, foodRef.current);
      const grown = [next, ...prev];
      const nextSnake = ate ? grown : [next, ...prev.slice(0, -1)];

      if (ate) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        const nf = randomSnakeFood(nextSnake);
        foodRef.current = nf;
        setFood(nf);
      }

      snakeRef.current = nextSnake;
      setSnake(nextSnake);
    };

    const id = window.setInterval(tick, SNAKE_TICK_MS);
    return () => window.clearInterval(id);
  }, [phase, finishGame]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const nd = SNAKE_KEY_MAP[e.key];
      if (!nd) return;
      e.preventDefault();
      if (!isOppositeDir(dirRef.current, nd)) nextDirRef.current = nd;
      if (phaseRef.current === "idle") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  return { snake, food, score, best, phase, reset };
}
