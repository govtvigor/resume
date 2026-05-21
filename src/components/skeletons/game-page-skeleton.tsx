import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const borderAccent = {
  cyan: "border-cyan-400/40",
  amber: "border-amber-400/40",
  lime: "border-lime-400/40",
};

export function GamePageSkeleton({
  accent = "cyan",
}: {
  accent?: keyof typeof borderAccent;
}) {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--site-header-h))] max-w-4xl flex-col gap-6 px-4 py-8 sm:px-5 sm:py-12 md:px-8">
      <Skeleton className="h-8 w-28" />
      <div className={cn("overflow-hidden border", borderAccent[accent])}>
        <Skeleton className="h-8 w-full rounded-none bg-muted/15" />
        <div className="flex flex-col items-center gap-4 px-4 py-8 sm:px-6">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="mt-4 aspect-square w-full max-w-md rounded-lg" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </main>
  );
}
