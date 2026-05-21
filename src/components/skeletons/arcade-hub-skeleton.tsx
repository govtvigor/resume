import { Skeleton } from "@/components/ui/skeleton";

export function ArcadeHubSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--site-header-h))] max-w-6xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8">
      <Skeleton className="h-8 w-24" />
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="relative overflow-hidden border border-amber-400/40">
        <Skeleton className="h-8 w-full rounded-none bg-muted/15" />
        <div className="space-y-4 px-4 py-6 sm:px-6">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex min-h-[220px] flex-col rounded-xl border border-border/30 p-5"
              >
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="mt-4 h-5 w-36" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-4/5" />
                <Skeleton className="mt-auto h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="rounded-xl border border-cyan-500/25 p-3">
        <Skeleton className="mb-3 h-8 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-7 w-14" />
        </div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </aside>
      </div>
    </main>
  );
}
