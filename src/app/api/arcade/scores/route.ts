import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import {
  submitGameScore,
} from "@/lib/arcade/leaderboard-repository";
import { upsertPilotFromSession } from "@/lib/arcade/pilot-repository";
import { isMongoConfigured } from "@/lib/mongodb";

const bodySchema = z.object({
  gameId: z.enum(["slots", "snake", "memory"]),
  score: z.number().int().min(0).max(10_000_000),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await upsertPilotFromSession({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  });

  const isNewBest = await submitGameScore(
    parsed.data.gameId,
    {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
    parsed.data.score
  );

  return NextResponse.json({ ok: true, isNewBest });
}
