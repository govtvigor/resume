import { Skeleton } from "@/components/ui/skeleton";

export function SlotMachineSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-between gap-4 rounded-lg border border-amber-400/20 px-4 py-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-amber-600/40 p-6">
          <Skeleton className="h-3 w-32" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-28 rounded-md sm:h-32" />
            <Skeleton className="h-28 rounded-md sm:h-32" />
            <Skeleton className="h-28 rounded-md sm:h-32" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-40 w-3" />
          <Skeleton className="size-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
