import { getDb, isMongoConfigured } from "@/lib/mongodb";
import type { ArcadeGameId, GameScoreDocument, LeaderboardEntry } from "@/lib/arcade/types";

const SCORES = "game_scores";
const LEADERBOARD_LIMIT = 10;

export async function submitGameScore(
  gameId: ArcadeGameId,
  user: { id: string; email: string; name?: string | null },
  score: number
): Promise<boolean> {
  if (!isMongoConfigured() || score < 0) return false;

  const db = await getDb();
  const now = new Date();
  const displayName = user.name?.trim() || user.email;

  const existing = await db.collection<GameScoreDocument>(SCORES).findOne({
    gameId,
    userId: user.id,
  });

  if (existing && score <= existing.score) {
    await db.collection<GameScoreDocument>(SCORES).updateOne(
      { gameId, userId: user.id },
      {
        $set: {
          email: user.email,
          name: displayName,
          updatedAt: now,
        },
      }
    );
    return false;
  }

  await db.collection<GameScoreDocument>(SCORES).updateOne(
    { gameId, userId: user.id },
    {
      $set: {
        gameId,
        userId: user.id,
        email: user.email,
        name: displayName,
        score,
        updatedAt: now,
      },
    },
    { upsert: true }
  );

  return true;
}

export async function getLeaderboard(
  gameId: ArcadeGameId,
  limit = LEADERBOARD_LIMIT
): Promise<LeaderboardEntry[]> {
  if (!isMongoConfigured()) return [];

  const db = await getDb();
  const rows = await db
    .collection<GameScoreDocument>(SCORES)
    .find({ gameId })
    .sort({ score: -1 })
    .limit(limit)
    .toArray();

  return rows.map((row, index) => ({
    rank: index + 1,
    userId: row.userId,
    name: row.name,
    email: row.email,
    score: row.score,
  }));
}
