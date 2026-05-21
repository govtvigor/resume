import { Skeleton } from "@/components/ui/skeleton";
import { HoloPanelSkeleton } from "@/components/skeletons/holo-panel-skeleton";

export function HoloPageSkeleton({ accent = "cyan" }: { accent?: "cyan" | "amber" }) {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--site-header-h))] max-w-3xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8">
      <Skeleton className="h-8 w-24" />
      <HoloPanelSkeleton accent={accent} />
    </main>
  );
}

export function CvPageSkeleton() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-5 sm:py-10 md:px-8 md:py-14">
      <div className="space-y-6 border border-border/40 p-4 sm:p-6 md:p-10 lg:p-12">
        <div className="flex flex-col gap-6 border-b border-border/30 pb-8 sm:flex-row sm:items-start">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="mx-auto size-32 shrink-0 rounded-full sm:mx-0" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2 border-t border-border/20 pt-6">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            {i === 5 ? (
              <div className="mt-4 space-y-3">
                <Skeleton className="h-9 w-full max-w-md" />
                <Skeleton className="h-24 w-full max-w-md" />
                <Skeleton className="h-9 w-32" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
