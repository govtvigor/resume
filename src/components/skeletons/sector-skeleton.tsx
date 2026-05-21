import { Skeleton } from "@/components/ui/skeleton";

export function SectorSkeleton() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 px-4">
      <Skeleton className="size-44 rounded-full bg-muted/25" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}
