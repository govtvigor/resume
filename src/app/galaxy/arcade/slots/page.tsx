import { SlotsPageContent } from "@/components/arcade/slots-page-content";
import { siteUrl } from "@/lib/seo";

export const metadata = {
  title: "Cosmic Slots — Igor Govtvian",
  description: "Play the cosmic slot machine and save pilot stats to MongoDB.",
  openGraph: {
    title: "Cosmic Slots — Igor Govtvian",
    url: `${siteUrl}/galaxy/arcade/slots`,
  },
};

export default function SlotsPage() {
  return <SlotsPageContent />;
}
