import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "CommunityVoice — Ashjan Quimpo" };

const sections = [
  { n: "01", title: "Problem & overview", body: "Placeholder: describe the problem CommunityVoice solves and who it is for." },
  { n: "02", title: "Role, timeline & tools", body: "Placeholder: your role, project timeline, and the tools used." },
  { n: "03", title: "Process", body: "Placeholder: wireframes, code snippets and visuals that show how it came together." },
  { n: "04", title: "Results & deliverables", body: "Placeholder: outcomes, what shipped, and what you learned." },
];

export default function CommunityVoice() {
  return (
    <article className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-20">
          <div data-reveal>
            <BackButton fallback="/#work" />
          </div>
          <h1 data-reveal className="display mt-10 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-none">
            Community<span className="text-red">Voice</span>
          </h1>
          <p data-reveal className="mt-6 max-w-xl text-lg text-ink-soft">Case study overview goes here.</p>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {sections.map((s) => (
            <Reveal key={s.n} className="grid gap-4 py-12 md:grid-cols-[1fr_2fr]">
              <p data-reveal className="label">{s.n}</p>
              <div data-reveal>
                <h2 className="display text-2xl font-semibold">{s.title}</h2>
                <p className="mt-3 max-w-xl text-ink-soft">{s.body}</p>
                <div className="mt-6 aspect-video rounded-xl border border-dashed border-ink/25" aria-hidden />
              </div>
            </Reveal>
          ))}
        </div>

        <nav aria-label="Project navigation" className="mt-12 flex justify-between text-sm font-medium">
          <Link href="/#work" className="rule-link">← Previous project</Link>
          <Link href="/#work" className="rule-link">Next project →</Link>
        </nav>
      </div>
    </article>
  );
}
