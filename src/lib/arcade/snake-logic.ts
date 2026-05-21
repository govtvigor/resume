export const SNAKE_GRID = 16;
export const SNAKE_TICK_MS = 140;

export type SnakePoint = { x: number; y: number };
export type SnakeDir = "up" | "down" | "left" | "right";

export const SNAKE_DIR_DELTA: Record<SnakeDir, SnakePoint> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const INITIAL_SNAKE: SnakePoint[] = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];

export function snakePointsEqual(a: SnakePoint, b: SnakePoint) {
  return a.x === b.x && a.y === b.y;
}

export function randomSnakeFood(snake: SnakePoint[]): SnakePoint {
  let p: SnakePoint;
  do {
    p = {
      x: Math.floor(Math.random() * SNAKE_GRID),
      y: Math.floor(Math.random() * SNAKE_GRID),
    };
  } while (snake.some((s) => snakePointsEqual(s, p)));
  return p;
}

export const SNAKE_KEY_MAP: Record<string, SnakeDir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

export function isOppositeDir(current: SnakeDir, next: SnakeDir) {
  return (
    (current === "up" && next === "down") ||
    (current === "down" && next === "up") ||
    (current === "left" && next === "right") ||
    (current === "right" && next === "left")
  );
}
