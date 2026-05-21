"use client";

import dynamic from "next/dynamic";
import type { ArcadeGameId } from "@/lib/arcade/types";
import { Skeleton } from "@/components/ui/skeleton";

function LeaderboardSkeleton() {
  return (
    <aside className="rounded-xl border border-cyan-500/25 bg-[#050510]/90">
      <Skeleton className="h-12 w-full rounded-none rounded-t-xl" />
      <div className="flex gap-2 p-3">
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-7 w-16" />
      </div>
      <div className="space-y-2 px-3 pb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </aside>
  );
}

const ArcadeLeaderboard = dynamic(
  () =>
    import("@/components/arcade/arcade-leaderboard").then(
      (m) => m.ArcadeLeaderboard
    ),
  { loading: () => <LeaderboardSkeleton />, ssr: false }
);

export function ArcadeLeaderboardLazy({
  initialGameId,
}: {
  initialGameId?: ArcadeGameId;
}) {
  return <ArcadeLeaderboard initialGameId={initialGameId} />;
}
