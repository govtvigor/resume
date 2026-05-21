import type { GalaxyPortalProps } from "@/components/cosmic/GalaxyPortal";

export const homeSectors: GalaxyPortalProps[] = [
  {
    href: "/about",
    code: "Profile",
    badge: "live",
    title: "About me",
    subtitle: "CV, experience, skills, and contact form.",
    accent: "lime",
    glow: "rgba(163, 230, 53, 0.55)",
    planet: "sun",
  },
  {
    href: "/galaxy/projects",
    code: "Projects",
    badge: "alpha",
    title: "Projects",
    subtitle: "Repositories, demos, and write-ups.",
    accent: "cyan",
    glow: "rgba(56, 189, 248, 0.65)",
    planet: "ocean",
  },
  {
    href: "/galaxy/arcade",
    code: "Arcade",
    badge: "live",
    title: "Arcade",
    subtitle: "Three mini-game cabinets — slots, snake, and memory match.",
    accent: "amber",
    glow: "rgba(251, 191, 36, 0.6)",
    planet: "ember",
  },
];
