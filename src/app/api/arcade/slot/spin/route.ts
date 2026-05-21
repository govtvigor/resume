import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { upsertPilotFromSession } from "@/lib/arcade/pilot-repository";
import { playSlotSpin } from "@/lib/arcade/slot-repository";
import { isMongoConfigured } from "@/lib/mongodb";
import { MIN_BET, MAX_BET } from "@/lib/arcade/slot-logic";

const bodySchema = z.object({
  bet: z.number().int().min(MIN_BET).max(MAX_BET),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in environment." },
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

  try {
    const result = await playSlotSpin(
      session.user.id,
      session.user.email,
      parsed.data.bet
    );

    if (!result) {
      return NextResponse.json({ error: "Spin failed" }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Spin failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
