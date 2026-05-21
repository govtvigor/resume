export type SlotSymbol = "cherry" | "lemon" | "bell" | "star" | "seven";

export type ArcadeGameId = "slots" | "snake" | "memory";

export type PilotDocument = {
  userId: string;
  email: string;
  name: string;
  image?: string | null;
  credits: number;
  totalSpins: number;
  totalWon: number;
  biggestWin: number;
  lastSpinAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SlotSpinDocument = {
  userId: string;
  email: string;
  bet: number;
  reels: [SlotSymbol, SlotSymbol, SlotSymbol];
  payout: number;
  creditsAfter: number;
  createdAt: Date;
};

export type GameScoreDocument = {
  gameId: ArcadeGameId;
  userId: string;
  email: string;
  name: string;
  score: number;
  updatedAt: Date;
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  email: string;
  score: number;
};

export type PilotStats = {
  email: string;
  name: string;
  credits: number;
  totalSpins: number;
  totalWon: number;
  biggestWin: number;
};
