import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { HoloPanel } from "@/components/cosmic/HoloPanel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Arcade — Igor Govtvan",
  description: "Arcade mini-games sector (coming soon).",
};

export default function ArcadeGalaxyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col gap-8 px-5 py-12 md:px-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit")}
        >
          ← Home
        </Link>
        <HoloPanel title="Arcade" accent="amber">
          <p className="text-sm text-amber-300/90">Coming soon</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Arcade
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Casual mini-games for fun only — no real-money betting. This section is
            still in progress.
          </p>
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
      </main>
    </>
  );
}
