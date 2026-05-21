import { SnakePageContent } from "@/components/arcade/snake-page-content";
import { siteUrl } from "@/lib/seo";

export const metadata = {
  title: "Cosmic Snake — Igor Govtvian",
  description: "Neon snake arcade — eat stardust and climb the leaderboard.",
  openGraph: {
    title: "Cosmic Snake — Igor Govtvian",
    url: `${siteUrl}/galaxy/arcade/snake`,
  },
};

export default function SnakePage() {
  return <SnakePageContent />;
}
