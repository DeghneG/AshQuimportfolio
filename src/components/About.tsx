import { Reveal } from "./Reveal";
import { skillGroups } from "@/lib/data";

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
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} data-reveal className="border-t border-navy pt-4">
                <h3 className="display text-lg font-semibold text-red">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
