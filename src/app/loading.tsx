import { SiteHeader } from "@/components/layout/site-header";
import { HomePageSkeleton } from "@/components/skeletons/home-page-skeleton";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-x-hidden">
        <HomePageSkeleton />
      </main>
    </>
  );
}
