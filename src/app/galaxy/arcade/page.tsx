import { ArcadePageContent } from "@/components/arcade/arcade-page-content";
import { siteUrl } from "@/lib/seo";

export const metadata = {
  title: "Arcade — Igor Govtvian",
  description:
    "Arcade hangar with mini-games. Pick a cabinet — slots, snake, and memory match.",
  openGraph: {
    title: "Arcade — Igor Govtvian",
    description: "Cosmic arcade cabinets — slots live, more games coming soon.",
    url: `${siteUrl}/galaxy/arcade`,
  },
};

export default function ArcadeGalaxyPage() {
  return <ArcadePageContent />;
}
