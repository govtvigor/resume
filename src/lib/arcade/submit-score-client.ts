import type { ArcadeGameId } from "@/lib/arcade/types";

export async function submitArcadeScore(
  gameId: ArcadeGameId,
  score: number
): Promise<{ ok: boolean; isNewBest?: boolean }> {
  const res = await fetch("/api/arcade/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, score }),
  });

  if (!res.ok) {
    return { ok: false };
  }

  const data = (await res.json()) as { isNewBest?: boolean };
  return { ok: true, isNewBest: data.isNewBest };
}
