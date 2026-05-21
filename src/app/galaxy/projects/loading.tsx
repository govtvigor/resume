import { SiteHeader } from "@/components/layout/site-header";
import { HoloPageSkeleton } from "@/components/skeletons/page-skeleton";

export default function ProjectsLoading() {
  return (
    <>
      <SiteHeader />
      <HoloPageSkeleton accent="cyan" />
    </>
  );
}
