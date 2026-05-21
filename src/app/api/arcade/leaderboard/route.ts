import { NextResponse } from "next/server";
import { z } from "zod";
import { getLeaderboard } from "@/lib/arcade/leaderboard-repository";
import { isMongoConfigured } from "@/lib/mongodb";
import type { ArcadeGameId } from "@/lib/arcade/types";

const querySchema = z.object({
  game: z.enum(["slots", "snake", "memory"]),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    game: searchParams.get("game"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid game id" }, { status: 400 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({ configured: false, entries: [] });
  }

  const entries = await getLeaderboard(parsed.data.game as ArcadeGameId);

  return NextResponse.json({
    configured: true,
    gameId: parsed.data.game,
    entries,
  });
}
