import type { ArcadeGameId } from "@/lib/arcade/types";

export type ArcadeGameStatus = "live" | "soon";

export type ArcadeGame = {
  id: ArcadeGameId;
  title: string;
  description: string;
  href: string;
  status: ArcadeGameStatus;
  emoji: string;
  accent: "amber" | "cyan" | "lime";
  /** Leaderboard column label */
  scoreLabel: string;
};

export const arcadeGames: ArcadeGame[] = [
  {
    id: "slots",
    title: "Cosmic Slots",
    description:
      "Classic one-armed bandit with a pull lever. Bet credits, match symbols, climb the leaderboard.",
    href: "/galaxy/arcade/slots",
    status: "live",
    emoji: "🎰",
    accent: "amber",
    scoreLabel: "Total won",
  },
  {
    id: "snake",
    title: "Cosmic Snake",
    description:
      "Pilot a neon serpent through the asteroid field. Eat stardust, grow longer, beat your high score.",
    href: "/galaxy/arcade/snake",
    status: "live",
    emoji: "🐍",
    accent: "cyan",
    scoreLabel: "High score",
  },
  {
    id: "memory",
    title: "Nebula Match",
    description:
      "Flip cards and pair constellations before time runs out. Sharp memory wins bonus credits.",
    href: "/galaxy/arcade/memory",
    status: "live",
    emoji: "✨",
    accent: "lime",
    scoreLabel: "Best run",
  },
];

export const liveArcadeGames = arcadeGames.filter((g) => g.status === "live");

export function getArcadeGame(id: ArcadeGameId): ArcadeGame | undefined {
  return arcadeGames.find((g) => g.id === id);
}
