import type { SlotSymbol } from "@/lib/arcade/types";

export const SLOT_SYMBOLS: SlotSymbol[] = [
  "cherry",
  "lemon",
  "bell",
  "star",
  "seven",
];

export const SYMBOL_LABELS: Record<SlotSymbol, string> = {
  cherry: "🍒",
  lemon: "🍋",
  bell: "🔔",
  star: "⭐",
  seven: "7",
};

/** Weighted pool — lower value symbols appear more often */
const WEIGHTED_POOL: SlotSymbol[] = [
  "cherry",
  "cherry",
  "cherry",
  "lemon",
  "lemon",
  "lemon",
  "bell",
  "bell",
  "star",
  "seven",
];

const PAYOUTS: Record<SlotSymbol, number> = {
  cherry: 5,
  lemon: 10,
  bell: 20,
  star: 50,
  seven: 100,
};

export const DEFAULT_STARTING_CREDITS = 500;
export const MIN_BET = 10;
export const MAX_BET = 100;

export function randomSymbol(): SlotSymbol {
  const index = Math.floor(Math.random() * WEIGHTED_POOL.length);
  return WEIGHTED_POOL[index] ?? "cherry";
}

export function spinReels(): [SlotSymbol, SlotSymbol, SlotSymbol] {
  return [randomSymbol(), randomSymbol(), randomSymbol()];
}

export function calculatePayout(
  reels: [SlotSymbol, SlotSymbol, SlotSymbol],
  bet: number
): number {
  const [a, b, c] = reels;
  if (a === b && b === c) {
    return bet * PAYOUTS[a];
  }
  if (a === b || b === c || a === c) {
    const pair = a === b ? a : b === c ? b : a;
    return Math.floor(bet * (PAYOUTS[pair] / 5));
  }
  return 0;
}
