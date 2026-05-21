import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPilotStats } from "@/lib/arcade/pilot-repository";
import { isMongoConfigured } from "@/lib/mongodb";
import { DEFAULT_STARTING_CREDITS } from "@/lib/arcade/slot-logic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({
      configured: false,
      stats: {
        email: session.user.email,
        name: session.user.name ?? session.user.email,
        credits: DEFAULT_STARTING_CREDITS,
        totalSpins: 0,
        totalWon: 0,
        biggestWin: 0,
      },
    });
  }

  const stats = await getPilotStats(session.user.id);

  return NextResponse.json({
    configured: true,
    stats: stats ?? {
      email: session.user.email,
      name: session.user.name ?? session.user.email,
      credits: DEFAULT_STARTING_CREDITS,
      totalSpins: 0,
      totalWon: 0,
      biggestWin: 0,
    },
  });
}
