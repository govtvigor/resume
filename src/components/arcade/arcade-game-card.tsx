import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import type { ArcadeGame } from "@/lib/arcade/games";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const accentStyles: Record<
  ArcadeGame["accent"],
  { border: string; glow: string; title: string }
> = {
  amber: {
    border: "border-amber-400/40 hover:border-amber-400/70",
    glow: "hover:shadow-[0_0_32px_-8px_rgba(251,191,36,0.45)]",
    title: "text-amber-300",
  },
  cyan: {
    border: "border-cyan-400/40 hover:border-cyan-400/70",
    glow: "hover:shadow-[0_0_32px_-8px_rgba(34,211,238,0.45)]",
    title: "text-cyan-300",
  },
  lime: {
    border: "border-lime-400/40 hover:border-lime-400/70",
    glow: "hover:shadow-[0_0_32px_-8px_rgba(163,230,53,0.4)]",
    title: "text-lime-300",
  },
};

export function ArcadeGameCard({ game }: { game: ArcadeGame }) {
  const a = accentStyles[game.accent];
  const isLive = game.status === "live";

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl" aria-hidden>
          {game.emoji}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "font-mono text-xs uppercase",
            isLive ? "border-lime-400/50 text-lime-300" : "text-muted-foreground"
          )}
        >
          {isLive ? "Live" : "Soon"}
        </Badge>
      </div>
      <h2 className={cn("mt-4 font-mono text-lg font-semibold uppercase tracking-wider", a.title)}>
        {game.title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {game.description}
      </p>
      <span
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest",
          isLive ? a.title : "text-muted-foreground"
        )}
      >
        {isLive ? (
          <>
            Enter game
            <ArrowRight className="size-3.5" />
          </>
        ) : (
          <>
            <Lock className="size-3.5" />
            Coming soon
          </>
        )}
      </span>
    </>
  );

  if (!isLive) {
    return (
      <div
        className={cn(
          "flex min-h-[220px] flex-col rounded-xl border bg-black/25 p-5 opacity-75",
          a.border
        )}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={game.href}
      className={cn(
        "flex min-h-[220px] flex-col rounded-xl border bg-black/30 p-5 transition duration-300",
        a.border,
        a.glow,
        "hover:-translate-y-1 hover:bg-black/40"
      )}
    >
      {inner}
    </Link>
  );
}
