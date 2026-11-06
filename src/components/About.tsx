import { Reveal } from "./Reveal";
import { skills } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line px-5 py-28 sm:px-8">
      <Reveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_2fr]">
        <p data-reveal className="label">01 — About</p>
        <div>
          <p data-reveal className="display text-3xl font-medium leading-snug sm:text-4xl">
            I like turning small ideas into <span className="text-red">working software</span>, and making
            it feel good to use.
          </p>
          <p data-reveal className="mt-6 max-w-xl leading-relaxed text-ink-soft">
            I&apos;m a BS Information Technology student learning by building: interfaces first,
            then the logic behind them. Here&apos;s what I work with.
          </p>
          <ul data-reveal className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="rounded-full border border-navy/30 px-4 py-1.5 font-mono text-xs text-navy">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
