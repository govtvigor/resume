export const MEMORY_SYMBOLS = ["🌙", "⭐", "🪐", "☄️", "🌟", "🔭", "🛸", "🌌"] as const;

export type MemoryCard = { id: number; symbol: string; matched: boolean };

export function buildMemoryDeck(): MemoryCard[] {
  const pairs = MEMORY_SYMBOLS.flatMap((symbol, i) => [
    { id: i * 2, symbol, matched: false },
    { id: i * 2 + 1, symbol, matched: false },
  ]);
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

export function calcMemoryScore(pairs: number, seconds: number, moves: number) {
  const timeBonus = Math.max(0, 90 - seconds) * 4;
  const movePenalty = Math.max(0, moves - pairs * 2) * 2;
  return pairs * 120 + timeBonus - movePenalty;
}
