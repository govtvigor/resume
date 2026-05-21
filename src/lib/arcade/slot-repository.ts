import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { submitGameScore } from "@/lib/arcade/leaderboard-repository";
import { calculatePayout, spinReels, MIN_BET, MAX_BET } from "@/lib/arcade/slot-logic";
import type { PilotDocument, SlotSpinDocument, SlotSymbol } from "@/lib/arcade/types";

const PILOTS = "pilots";
const SPINS = "slot_spins";

export async function playSlotSpin(
  userId: string,
  email: string,
  bet: number
): Promise<{
  reels: [SlotSymbol, SlotSymbol, SlotSymbol];
  payout: number;
  credits: number;
} | null> {
  if (!isMongoConfigured()) return null;

  if (bet < MIN_BET || bet > MAX_BET) {
    throw new Error(`Bet must be between ${MIN_BET} and ${MAX_BET}`);
  }

  const db = await getDb();
  const pilots = db.collection<PilotDocument>(PILOTS);
  const pilot = await pilots.findOne({ userId });

  if (!pilot) {
    throw new Error("Pilot profile not found");
  }

  if (pilot.credits < bet) {
    throw new Error("Not enough credits");
  }

  const reels = spinReels();
  const payout = calculatePayout(reels, bet);
  const creditsAfter = pilot.credits - bet + payout;
  const now = new Date();

  await pilots.updateOne(
    { userId },
    {
      $set: {
        credits: creditsAfter,
        lastSpinAt: now,
        updatedAt: now,
        ...(payout > pilot.biggestWin ? { biggestWin: payout } : {}),
      },
      $inc: {
        totalSpins: 1,
        totalWon: payout,
      },
    }
  );

  await db.collection<SlotSpinDocument>(SPINS).insertOne({
    userId,
    email,
    bet,
    reels,
    payout,
    creditsAfter,
    createdAt: now,
  });

  const updatedPilot = await pilots.findOne({ userId });
  if (updatedPilot) {
    await submitGameScore(
      "slots",
      { id: userId, email, name: updatedPilot.name },
      updatedPilot.totalWon
    );
  }

  return { reels, payout, credits: creditsAfter };
}
