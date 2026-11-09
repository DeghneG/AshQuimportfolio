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

const SCHOOL = "University of San Agustin";

export const education = [
  { level: "Junior High", years: "2018–2022", school: SCHOOL },
  { level: "Senior High", years: "2022–2024", school: SCHOOL },
  { level: "BS Information Technology", years: "2024–present", school: SCHOOL },
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
  /** Optional outside link shown on the project page (e.g. a Canva presentation). */
  external?: { label: string; url: string };
  /** Wide or text-heavy artwork is shown whole (letterboxed) on the card instead of cropped. */
  fit?: "contain";
};

/** Finished projects, by term. Slots without an entry render as "Coming soon" placeholders. */
export const projectsByTerm: Partial<Record<(typeof terms)[number]["key"], Project[]>> = {
  prelim: [
    {
      slug: "scansync-presentation",
      title: "ScanSync Presentation",
      kind: "Presentation · Canva",
      image: "/Prelim/scansync-presentation.webp",
      width: 1131,
      height: 636,
      alt: "Title slide: ScanSync, a QR code-based attendance monitoring system with parent notification for the University of San Agustin, with the four team members listed",
      href: "https://www.canva.com/design/DAHQLYOxb04/4LI43Pmzs3JtOqXOvxrM0A/edit",
      external: {
        label: "Open the presentation on Canva",
        url: "https://www.canva.com/design/DAHQLYOxb04/4LI43Pmzs3JtOqXOvxrM0A/edit",
      },
    },
    {
      slug: "bandlab",
      title: "BandLab",
      kind: "Lab activity · Image",
      image: "/Prelim/bandlab.webp",
      width: 1057,
      height: 392,
      alt: "Lab table comparing an original track with simulated 22.05 kHz, 8 kHz and 8-bit versions in BandLab: the setting used, target frequency, how it sounds and what disappeared",
      href: "/Prelim/bandlab.webp",
      fit: "contain",
    },
    {
      slug: "montage",
      title: "Video Montage",
      kind: "Video · MP4",
      image: "/Prelim/montage-poster.webp",
      width: 1280,
      height: 608,
      alt: "Still from the montage video: a race car tire with a red Pirelli stripe",
      href: "/Prelim/montage.mp4",
      video: "/Prelim/montage.mp4",
      preview: "/Prelim/montage-preview.mp4",
    },
  ],
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
    {
      slug: "finals-video",
      title: "Finals Video",
      kind: "Video · MP4",
      image: "/Finals/finals-video-poster.webp",
      width: 720,
      height: 960,
      alt: "Still from the Finals video: ID lanyards, keys and a folded paper plane on a table, seen from above",
      href: "/Finals/finals-video.mp4",
      video: "/Finals/finals-video.mp4",
      preview: "/Finals/finals-video-preview.mp4",
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
