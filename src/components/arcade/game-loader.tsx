"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

function GamePanelSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="aspect-square w-full max-w-md rounded-lg" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

export const SlotMachineLazy = dynamic(
  () => import("@/components/arcade/slot-machine").then((m) => m.SlotMachine),
  { loading: () => <GamePanelSkeleton />, ssr: false }
);

export const CosmicSnakeLazy = dynamic(
  () => import("@/components/arcade/cosmic-snake").then((m) => m.CosmicSnake),
  { loading: () => <GamePanelSkeleton />, ssr: false }
);

export const NebulaMatchLazy = dynamic(
  () => import("@/components/arcade/nebula-match").then((m) => m.NebulaMatch),
  { loading: () => <GamePanelSkeleton />, ssr: false }
);
