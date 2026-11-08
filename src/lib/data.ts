export const profile = {
  name: "Ashjan Quimpo",
  email: "ashjanquimpo@gmail.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/ashjan-quimpo-b83893449",
  facebook: "https://www.facebook.com/ashjan.quimpo",
};

export const skillGroups = [
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "Next.js"] },
  { title: "Backend", items: ["Node.js", "Python"] },
  { title: "Dev tools", items: ["Git", "GitHub", "Antigravity"] },
  { title: "Design & video", items: ["Canva", "Adobe", "CapCut"] },
  { title: "AI assistants", items: ["ChatGPT", "Gemini", "Claude"] },
] as const;

export const education = [
  { level: "Junior High", years: "2018–2022" },
  { level: "Senior High", years: "2022–2024" },
  { level: "BS Information Technology", years: "2024–present" },
];

export const terms = [
  { key: "prelim", label: "Prelim", count: 3 },
  { key: "midterm", label: "Midterm", count: 3 },
  { key: "finals", label: "Finals", count: 3 },
] as const;

export type Project = {
  slug: string;
  title: string;
  kind: string;
  image: string;
  alt: string;
  /** Intrinsic size of `image`, used for the full-size view. */
  width: number;
  height: number;
  href: string;
  /** Tall artwork pans slowly down on hover to reveal the rest of it. */
  tall?: boolean;
  /** Optional full video, played with controls on the project page; `image` is its poster. */
  video?: string;
  /** Tiny silent clip played on card hover so hovering never downloads the full video. */
  preview?: string;
};

/** Finished projects, by term. Slots without an entry render as "Coming soon" placeholders. */
export const projectsByTerm: Partial<Record<(typeof terms)[number]["key"], Project[]>> = {
  midterm: [
    {
      slug: "scansync",
      title: "ScanSync",
      kind: "Infographic · PDF",
      image: "/Midterm/scansync-infographic.webp",
      width: 1400,
      height: 3500,
      alt: "ScanSync, Smart Attendance infographic: problem, solution, methodology and timeline",
      href: "/Midterm/QUIMPO_Infographics.pdf",
      tall: true,
    },
    {
      slug: "daily-routine",
      title: "Daily Routine",
      kind: "Storyboard · Image",
      image: "/Midterm/daily-routine.webp",
      width: 1200,
      height: 848,
      alt: "Nine-panel storyboard of a stick figure's day, from waking at 6:00 AM to sleeping at 10:00 PM",
      href: "/Midterm/daily-routine.webp",
    },
    {
      slug: "daily-routine-video",
      title: "Daily Routine Video",
      kind: "Video · MP4",
      image: "/Midterm/daily-routine-video-poster.webp",
      width: 1024,
      height: 576,
      alt: "Still from the Daily Routine video: a person typing on a laptop by a sunlit window",
      href: "/Midterm/daily-routine.mp4",
      video: "/Midterm/daily-routine.mp4",
      preview: "/Midterm/daily-routine-preview.mp4",
    },
    {
      slug: "voxpop",
      title: "VoxPOP",
      kind: "Video · MP4",
      image: "/Midterm/voxpop-poster.webp",
      width: 1280,
      height: 720,
      alt: "Still from the VoxPOP video: the statue in the University of San Agustin courtyard",
      href: "/Midterm/voxpop.mp4",
      video: "/Midterm/voxpop.mp4",
      preview: "/Midterm/voxpop-preview.mp4",
    },
  ],
  finals: [
    {
      slug: "ball",
      title: "Ball",
      kind: "Animation · GIF",
      image: "/Finals/QUIMPO_BALL.gif",
      width: 1920,
      height: 1080,
      alt: "Animated GIF of a cyan ball moving across a white background",
      href: "/Finals/QUIMPO_BALL.gif",
    },
  ],
};

export type ListedProject = Project & { term: string; termKey: (typeof terms)[number]["key"] };

/** Every finished project in term order, tagged with its term. */
export function listProjects(): ListedProject[] {
  return terms.flatMap((t) =>
    (projectsByTerm[t.key] ?? []).map((p) => ({ ...p, term: t.label, termKey: t.key })),
  );
}
