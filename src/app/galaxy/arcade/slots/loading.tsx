import { SiteHeader } from "@/components/layout/site-header";
import { SlotsPageSkeleton } from "@/components/skeletons/slots-page-skeleton";

export default function SlotsLoading() {
  return (
    <>
      <SiteHeader />
      <SlotsPageSkeleton />
    </>
  );
}
