import { SiteHeader } from "@/components/layout/site-header";
import { SectorSkeleton } from "@/components/skeletons/sector-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-12 px-4 py-8 md:px-8">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-3 w-40" />
          <Skeleton className="mx-auto h-12 w-72 max-w-full" />
          <Skeleton className="mx-auto h-4 w-96 max-w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <SectorSkeleton />
          <SectorSkeleton />
          <SectorSkeleton />
        </div>
      </main>
    </>
  );
}
