import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/40 ring-1 ring-border/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
