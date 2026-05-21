import { Skeleton } from "@/components/ui/skeleton";

function HomeSectorSkeleton() {
  return (
    <article className="flex min-h-[calc(100dvh-var(--site-header-h))] snap-start items-center justify-center px-4 pb-36 pt-10">
      <div className="flex w-full max-w-md flex-col items-center sm:max-w-lg md:max-w-xl">
        <div className="flex h-44 w-36 flex-col items-center overflow-visible sm:h-52 sm:w-44 md:h-56 md:w-48">
          <Skeleton className="h-8 w-[108%] max-w-none rounded-[50%] border border-muted/25 bg-transparent" />
          <Skeleton className="mt-auto size-32 rounded-full bg-muted/20 sm:size-36 md:size-40" />
        </div>
        <Skeleton className="mt-8 h-5 w-36" />
        <div className="mt-6 w-full max-w-sm space-y-3 text-center">
          <div className="flex justify-center gap-6">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="mx-auto h-4 w-full max-w-xs" />
          <Skeleton className="mx-auto h-3 w-28" />
        </div>
      </div>
    </article>
  );
}

export function HomePageSkeleton() {
  return (
    <section className="h-[calc(100dvh-var(--site-header-h))] overflow-hidden snap-y snap-mandatory">
      <HomeSectorSkeleton />
      <HomeSectorSkeleton />
      <HomeSectorSkeleton />
    </section>
  );
}
