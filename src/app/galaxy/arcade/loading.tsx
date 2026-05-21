import { SiteHeader } from "@/components/layout/site-header";
import { ArcadeHubSkeleton } from "@/components/skeletons/arcade-hub-skeleton";

export default function ArcadeLoading() {
  return (
    <>
      <SiteHeader />
      <ArcadeHubSkeleton />
    </>
  );
}
