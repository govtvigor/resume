import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col gap-8 px-5 py-12 md:px-8">
      <Skeleton className="h-8 w-24" />
      <div className="space-y-4 border border-border/40 p-8">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="mt-4 h-9 w-28" />
      </div>
    </main>
  );
}

export function CvPageSkeleton() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
      <div className="space-y-6 border border-border/40 p-8 md:p-12">
        <div className="flex gap-6 border-b border-border/30 pb-8">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="size-28 shrink-0 rounded-full" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </main>
  );
}
