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
