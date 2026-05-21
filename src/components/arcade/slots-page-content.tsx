import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SlotMachineLazy } from "@/components/arcade/game-loader";
import { HoloPanel } from "@/components/cosmic/HoloPanel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SlotsPageContent() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100dvh-var(--site-header-h))] max-w-4xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8">
        <Link
          href="/galaxy/arcade"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit")}
        >
          ← Arcade
        </Link>

        <HoloPanel
          title="Cosmic Slots"
          accent="amber"
          contentClassName="px-4 py-6 sm:px-6"
        >
          <p className="text-sm text-amber-300/90">Cabinet 01 — Live</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl 3xl:text-4xl">
            Cosmic Slots
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Pull the lever or tap Spin. Wins and credits save to your pilot profile.
          </p>

          <div className="mt-8">
            <SlotMachineLazy />
          </div>
        </HoloPanel>
      </main>
    </>
  );
}
