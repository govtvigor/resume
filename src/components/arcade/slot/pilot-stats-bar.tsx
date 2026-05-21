import type { PilotStats } from "@/lib/arcade/types";

export function PilotStatsBar({ stats }: { stats: PilotStats }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-lg border border-amber-400/20 bg-black/30 px-4 py-3 font-mono text-xs uppercase tracking-wider text-amber-200/90 sm:text-sm">
      <div>
        <p className="text-muted-foreground">Pilot</p>
        <p className="text-foreground">{stats.name}</p>
        <p className="mt-1 text-xs normal-case text-muted-foreground">{stats.email}</p>
      </div>
      <div className="text-right">
        <p className="text-muted-foreground">Credits</p>
        <p className="text-2xl text-amber-300">{stats.credits}</p>
      </div>
      <div className="text-right">
        <p className="text-muted-foreground">Total won</p>
        <p className="text-lg text-lime-300">{stats.totalWon}</p>
      </div>
    </div>
  );
}
