import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { HoloPanel } from "@/components/cosmic/HoloPanel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Projects — Igor Govtvan",
  description: "Project vault and repository showcase.",
};

export default function ProjectsGalaxyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col gap-8 px-5 py-12 md:px-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit font-mono uppercase")}
        >
          ← Hub
        </Link>
        <HoloPanel title="GALAXY_01 // PROJECT_VAULT" accent="cyan">
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
            Alpha sector
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Code nebula
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            This section will host your GitHub repos, README previews, and live
            demo links. For now, see highlighted work on the{" "}
            <Link href="/about" className="text-cyan-300 hover:underline">
              CV page
            </Link>
            : CoinLift, onchainme.to, and Squirrel Telegram Mini App.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className={cn(buttonVariants({ size: "sm" }), "font-mono uppercase")}>
              View CV
            </Link>
          </div>
        </HoloPanel>
      </main>
    </>
  );
}
