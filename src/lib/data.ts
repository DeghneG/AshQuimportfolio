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
  { title: "Tools & other", items: ["Git", "GitHub"] },
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
  title: string;
  kind: string;
  image: string;
  alt: string;
  href: string;
  /** Tall artwork pans slowly down on hover to reveal the rest of it. */
  tall?: boolean;
  /** Optional muted preview that plays on hover; `image` is its poster. */
  video?: string;
};

/** Finished projects, by term. Slots without an entry render as "Coming soon" placeholders. */
export const projectsByTerm: Partial<Record<(typeof terms)[number]["key"], Project[]>> = {
  midterm: [
    {
      title: "ScanSync",
      kind: "Infographic · PDF",
      image: "/Midterm/scansync-infographic.webp",
      alt: "ScanSync, Smart Attendance infographic: problem, solution, methodology and timeline",
      href: "/Midterm/QUIMPO_Infographics.pdf",
      tall: true,
    },
    {
      title: "Daily Routine",
      kind: "Storyboard · Image",
      image: "/Midterm/daily-routine.webp",
      alt: "Nine-panel storyboard of a stick figure's day, from waking at 6:00 AM to sleeping at 10:00 PM",
      href: "/Midterm/daily-routine.webp",
    },
    {
      title: "Daily Routine Video",
      kind: "Video · MP4",
      image: "/Midterm/daily-routine-video-poster.webp",
      alt: "Still from the Daily Routine video: a person typing on a laptop by a sunlit window",
      href: "/Midterm/daily-routine.mp4",
      video: "/Midterm/daily-routine.mp4",
    },
  ],
};
