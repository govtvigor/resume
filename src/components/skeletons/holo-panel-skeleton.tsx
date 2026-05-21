import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const accentBorder: Record<"cyan" | "amber", string> = {
  cyan: "border-cyan-400/40",
  amber: "border-amber-400/40",
};

export function HoloPanelSkeleton({ accent = "cyan" }: { accent?: "cyan" | "amber" }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border bg-transparent",
        accentBorder[accent]
      )}
    >
      <Skeleton className="h-8 w-full rounded-none bg-muted/15" />
      <div className="space-y-4 px-4 py-6 sm:px-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-4/5 max-w-md" />
      </div>
    </div>
  );
}
