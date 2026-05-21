import { SYMBOL_LABELS } from "@/lib/arcade/slot-logic";
import type { SlotSymbol } from "@/lib/arcade/types";
import { cn } from "@/lib/utils";

export function SlotReel({
  symbol,
  spinning,
}: {
  symbol: SlotSymbol;
  spinning: boolean;
}) {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-md border-2 border-amber-900/80 bg-[#1a0a04] shadow-[inset_0_4px_24px_rgba(0,0,0,0.85)] sm:h-32">
      <div
        className={cn(
          "flex h-full items-center justify-center text-4xl sm:text-5xl",
          spinning && "animate-pulse"
        )}
      >
        {SYMBOL_LABELS[symbol]}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/70 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden
      />
    </div>
  );
}
