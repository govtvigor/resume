import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { ArcadeGameCard } from "@/components/arcade/arcade-game-card";
import { ArcadeLeaderboardLazy } from "@/components/arcade/arcade-leaderboard-lazy";
import { HoloPanel } from "@/components/cosmic/HoloPanel";
import { arcadeGames } from "@/lib/arcade/games";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArcadePageContent() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100dvh-var(--site-header-h))] max-w-6xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit")}
        >
          ← Home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
          <HoloPanel
            title="Arcade"
            accent="amber"
            contentClassName="px-4 py-6 sm:px-6"
          >
            <p className="text-sm text-amber-300/90">Pilot hangar</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl 3xl:text-4xl">
              Arcade
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Pick a cabinet — each game opens on its own screen. Use{" "}
              <strong className="font-medium text-amber-200">Pilot login</strong>{" "}
              so scores sync to MongoDB and appear on the leaderboard.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {arcadeGames.map((game) => (
                <ArcadeGameCard key={game.id} game={game} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/galaxy/projects"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Projects
              </Link>
              <Link href="/about" className={cn(buttonVariants({ size: "sm" }))}>
                About me
              </Link>
            </div>
          </HoloPanel>

          <div className="lg:sticky lg:top-[calc(var(--site-header-h)+1rem)]">
            <ArcadeLeaderboardLazy initialGameId="slots" />
          </div>
        </div>
      </main>
    </>
  );
}
