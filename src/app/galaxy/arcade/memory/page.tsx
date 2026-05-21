import { MemoryPageContent } from "@/components/arcade/memory-page-content";
import { siteUrl } from "@/lib/seo";

export const metadata = {
  title: "Nebula Match — Igor Govtvian",
  description: "Memory card game — match constellations and save your best run.",
  openGraph: {
    title: "Nebula Match — Igor Govtvian",
    url: `${siteUrl}/galaxy/arcade/memory`,
  },
};

export default function MemoryPage() {
  return <MemoryPageContent />;
}
