import { SiteHeader } from "@/components/layout/site-header";
import { GamePageSkeleton } from "@/components/skeletons/game-page-skeleton";

export default function MemoryLoading() {
  return (
    <>
      <SiteHeader />
      <GamePageSkeleton accent="lime" />
    </>
  );
}
