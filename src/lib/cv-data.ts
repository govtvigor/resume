export const cv = {
  name: "Igor Govtvian",
  role: "Frontend Developer",
  email: "igorgovtvian9@gmail.com",
  age: 22,
  social: {
    github: "https://github.com/govtvigor",
    linkedin: "https://www.linkedin.com/in/igor-govtvian-060bb32a4",
  },
  education: {
    school: "Czech University of Life Sciences Prague (CZU)",
    program: "Informatics",
    status: "Currently studying",
  },
  languages: [
    { name: "English", level: "Professional working proficiency" },
    { name: "Czech", level: "Working proficiency" },
    { name: "Ukrainian", level: "Native" },
    { name: "Russian", level: "Fluent" },
  ],
  experience: [
    {
      company: "SHP Network",
      url: "https://shp.network",
      role: "Frontend Developer",
      period: "Present",
      description:
        "Building and maintaining web interfaces for the SHP Network product. Day-to-day coordination via Jira, YouTrack, and Notion (tasks, specs, docs).",
      current: true,
    },
  ],
  collaborationTools: [
    { name: "Jira", use: "Sprints, issues, backlog" },
    { name: "YouTrack", use: "Tasks, bugs, releases" },
    { name: "Notion", use: "Specs, docs, team wiki" },
  ],
  projects: [
    {
      name: "CoinLift",
      url: "https://coinlift.studio",
      type: "Non-commercial",
      role: "Frontend Developer",
      description:
        "Trading platform with analytics dashboards and tools tailored for traders.",
      tags: ["React", "TypeScript", "Data visualization"],
    },
    {
      name: "onchainme.to",
      url: "https://onchainme.to",
      role: "Frontend Developer",
      description:
        "Web3-facing frontend for on-chain identity and profile experiences.",
      tags: ["Web3", "React", "TypeScript"],
    },
    {
      name: "Squirrel App",
      url: "https://t.me/squirrelapp_bot",
      linkLabel: "@squirrelapp_bot",
      role: "Frontend Developer",
      description:
        "Telegram Mini App — clicker-style game with in-app UI and progression flows.",
      tags: ["Telegram Mini App", "React", "Game UI"],
    },
  ],
  skills: [
    "TypeScript",
    "JavaScript (ES2024+)",
    "React 19",
    "Next.js 15 (App Router)",
    "HTML5 & semantic markup",
    "CSS3 / Tailwind CSS",
    "Responsive & mobile-first UI",
    "Component-driven architecture",
    "REST APIs & async data fetching",
    "React Hook Form & Zod",
    "Vitest & React Testing Library",
    "shadcn/ui & Radix UI",
    "Git & GitHub (incl. Actions CI)",
    "Code review & pair programming",
    "Performance (Core Web Vitals, lazy load)",
    "Figma → implementation handoff",
    "Web3 & wallet integrations",
    "Telegram Mini Apps",
    "Technical English documentation",
  ],
} as const;
