import { Skeleton } from "@/components/ui/skeleton";
import { SlotMachineSkeleton } from "@/components/skeletons/slot-machine-skeleton";

export function SlotsPageSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--site-header-h))] max-w-4xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8">
      <Skeleton className="h-8 w-28" />
      <div className="relative overflow-hidden border border-amber-400/40">
        <Skeleton className="h-8 w-full rounded-none bg-muted/15" />
        <div className="space-y-4 px-4 py-6 sm:px-6">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <div className="mt-8">
            <SlotMachineSkeleton />
          </div>
        </div>
      </div>
    </main>
  );
}
