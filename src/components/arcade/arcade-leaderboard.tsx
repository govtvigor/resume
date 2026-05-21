"use client";

import { useCallback, useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import {
  arcadeGames,
  liveArcadeGames,
  type ArcadeGame,
} from "@/lib/arcade/games";
import type { ArcadeGameId, LeaderboardEntry } from "@/lib/arcade/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const accentTab: Record<ArcadeGame["accent"], string> = {
  amber: "border-amber-400/60 bg-amber-500/15 text-amber-200",
  cyan: "border-cyan-400/60 bg-cyan-500/15 text-cyan-200",
  lime: "border-lime-400/60 bg-lime-500/15 text-lime-200",
};

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, 2);
  return `${visible}***@${domain}`;
}

export function ArcadeLeaderboard({
  initialGameId = "slots",
}: {
  initialGameId?: ArcadeGameId;
}) {
  const [activeGame, setActiveGame] = useState<ArcadeGameId>(initialGameId);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);

  const activeMeta = arcadeGames.find((g) => g.id === activeGame);

  const load = useCallback(async (gameId: ArcadeGameId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/arcade/leaderboard?game=${gameId}`);
      const data = (await res.json()) as {
        configured: boolean;
        entries: LeaderboardEntry[];
      };
      setConfigured(data.configured !== false);
      setEntries(data.entries ?? []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(activeGame);
  }, [activeGame, load]);

  return (
    <aside className="flex h-full flex-col rounded-xl border border-cyan-500/25 bg-[#050510]/90 shadow-[0_0_32px_-12px_rgba(34,211,238,0.25)]">
      <div className="flex items-center gap-2 border-b border-cyan-500/20 px-4 py-3">
        <Trophy className="size-4 text-amber-300" aria-hidden />
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">
          Leaderboard
        </h2>
      </div>

      <div className="flex flex-wrap gap-1.5 p-3" role="tablist" aria-label="Game leaderboard">
        {liveArcadeGames.map((game) => (
          <button
            key={game.id}
            type="button"
            role="tab"
            aria-selected={activeGame === game.id}
            onClick={() => setActiveGame(game.id)}
            className={cn(
              "rounded-md border px-2 py-1 font-mono text-xs uppercase tracking-wide transition",
              activeGame === game.id
                ? accentTab[game.accent]
                : "border-transparent text-muted-foreground hover:bg-white/5"
            )}
          >
            {game.emoji} {game.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {activeMeta ? (
        <p className="px-4 pb-2 font-mono text-xs text-muted-foreground">
          {activeMeta.scoreLabel}
        </p>
      ) : null}

      <div className="min-h-[200px] flex-1 overflow-y-auto px-3 pb-4">
        {!configured ? (
          <p className="text-xs text-muted-foreground">
            MongoDB not configured — scores won&apos;t appear here.
          </p>
        ) : loading ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex gap-2">
                <Skeleton className="h-8 w-6" />
                <Skeleton className="h-8 flex-1" />
              </li>
            ))}
          </ul>
        ) : entries.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            No pilots yet — be the first!
          </p>
        ) : (
          <ol className="space-y-1.5">
            {entries.map((row) => (
              <li
                key={row.userId}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                  row.rank === 1 && "bg-amber-500/10",
                  row.rank === 2 && "bg-white/5",
                  row.rank === 3 && "bg-white/[0.03]"
                )}
              >
                <span
                  className={cn(
                    "w-6 shrink-0 text-center font-mono text-xs font-bold",
                    row.rank === 1 && "text-amber-300",
                    row.rank === 2 && "text-cyan-300/90",
                    row.rank === 3 && "text-lime-300/80",
                    row.rank > 3 && "text-muted-foreground"
                  )}
                >
                  {row.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{row.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {maskEmail(row.email)}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-amber-200">
                  {row.score.toLocaleString()}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </aside>
  );
}
