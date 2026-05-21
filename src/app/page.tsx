import { HomeScrollSections } from "@/components/home/home-scroll-sections";
import { SiteHeader } from "@/components/layout/site-header";
import { homeSectors } from "@/lib/home-sectors";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-x-hidden">
        <HomeScrollSections sectors={homeSectors} />
      </main>
    </>
  );
}
