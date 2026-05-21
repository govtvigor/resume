export type GuideStep = {
  id: string;
  sectionIndex: number | null;
  message: string;
};

export const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    sectionIndex: null,
    message:
      "Hey, explorer! I'm your W Guide. Welcome to Igor's cosmic portfolio — three worlds, one orbit.",
  },
  {
    id: "scroll-hint",
    sectionIndex: null,
    message:
      "Use your scroll wheel or swipe — you'll move one planet at a time. I'll walk you through each one.",
  },
  {
    id: "about",
    sectionIndex: 0,
    message:
      "This golden sun is About Me — CV, experience, skills, and a contact form. Tap it when you're ready to land.",
  },
  {
    id: "projects",
    sectionIndex: 1,
    message:
      "The blue ocean world is Projects — repositories, demos, and write-ups from real builds.",
  },
  {
    id: "arcade",
    sectionIndex: 2,
    message:
      "The ember planet is Arcade — three cabinets: slots, snake, and nebula match. Scores hit the leaderboard!",
  },
  {
    id: "done",
    sectionIndex: null,
    message:
      "You're cleared for launch. Pick any planet to warp in — I'll stay out of your way. Fly safe!",
  },
];
