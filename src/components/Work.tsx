import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { projectsByTerm, terms } from "@/lib/data";

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 border-t border-line bg-paper-2/60 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 grid gap-4 md:grid-cols-[1fr_2fr]">
          <p data-reveal className="label">02 — Work</p>
          <h2 data-reveal className="display text-4xl font-semibold sm:text-5xl">Project case studies</h2>
        </Reveal>

        <Reveal className="mb-20">
          <Link
            data-reveal
            href="/work/community-voice"
            className="group relative block overflow-hidden rounded-2xl bg-navy p-8 text-paper sm:p-12"
          >
            <p className="label !text-paper/60">Featured case study</p>
            <h3 className="display mt-6 text-4xl font-semibold sm:text-6xl">CommunityVoice</h3>
            <p className="mt-4 max-w-lg text-paper/75">
              Problem, process and results, from first wireframe to shipped code.
            </p>
            <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
              Read case study
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
            <span aria-hidden className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-red/90 sm:-right-10 sm:-top-10 sm:h-48 sm:w-48 transition-transform duration-500 group-hover:scale-125" />
          </Link>
        </Reveal>

        <div className="space-y-16">
          {terms.map((t, ti) => (
            <Reveal key={t.key} stagger={0.08}>
              <div data-reveal className="mb-6 flex items-baseline justify-between border-b border-navy/70 pb-3">
                <h3 className="display text-2xl font-semibold">{t.label} projects</h3>
                <span className="label">{String(ti + 1).padStart(2, "0")} / 03</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: Math.max(t.count, projectsByTerm[t.key]?.length ?? 0) }, (_, i) => {
                  const project = projectsByTerm[t.key]?.[i];
                  if (project) return <ProjectCard key={i} project={project} />;
                  return (
                    <article
                      key={i}
                      data-reveal
                      className="flex aspect-[4/3] flex-col justify-between rounded-xl border border-dashed border-ink/25 p-5 transition-colors hover:border-red"
                    >
                      <span className="label">Coming soon</span>
                      <div>
                        <h4 className="display text-xl font-medium">
                          {t.label} Project {String(i + 1).padStart(2, "0")}
                        </h4>
                        <p className="mt-1 text-sm text-ink-soft">Placeholder: title, summary and tools.</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
