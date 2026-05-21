import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { DEFAULT_STARTING_CREDITS } from "@/lib/arcade/slot-logic";
import type { PilotDocument, PilotStats } from "@/lib/arcade/types";

const PILOTS = "pilots";

export async function upsertPilotFromSession(user: {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}): Promise<void> {
  if (!isMongoConfigured()) return;

  const db = await getDb();
  const now = new Date();

  await db.collection<PilotDocument>(PILOTS).updateOne(
    { userId: user.id },
    {
      $setOnInsert: {
        userId: user.id,
        credits: DEFAULT_STARTING_CREDITS,
        totalSpins: 0,
        totalWon: 0,
        biggestWin: 0,
        createdAt: now,
      },
      $set: {
        email: user.email,
        name: user.name ?? user.email,
        image: user.image ?? null,
        updatedAt: now,
      },
    },
    { upsert: true }
  );
}

export async function getPilotStats(userId: string): Promise<PilotStats | null> {
  if (!isMongoConfigured()) return null;

  const db = await getDb();
  const pilot = await db.collection<PilotDocument>(PILOTS).findOne({ userId });
  if (!pilot) return null;

  return {
    email: pilot.email,
    name: pilot.name,
    credits: pilot.credits,
    totalSpins: pilot.totalSpins,
    totalWon: pilot.totalWon,
    biggestWin: pilot.biggestWin,
  };
}
