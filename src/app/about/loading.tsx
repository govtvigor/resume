import { SiteHeader } from "@/components/layout/site-header";
import { CvPageSkeleton } from "@/components/skeletons/page-skeleton";

export default function AboutLoading() {
  return (
    <>
      <SiteHeader />
      <CvPageSkeleton />
    </>
  );
}
