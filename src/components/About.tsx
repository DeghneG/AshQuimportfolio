import Image from "next/image";
import { Reveal } from "./Reveal";
import { skills } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line px-5 py-28 sm:px-8">
      <Reveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <p data-reveal className="label">01 — About</p>
          <figure data-reveal className="group mt-8 max-w-xs">
            <div className="relative">
              {/* offset red plate; shifts on hover like a pressed key */}
              <span
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 bg-red transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5"
              />
              <div className="relative aspect-[4/5] overflow-hidden border border-navy bg-paper">
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Ashjan Quimpo in a black suit"
                  width={1024}
                  height={1024}
                  sizes="(min-width: 768px) 320px, 80vw"
                  priority
                  className="h-full w-full object-cover origin-[50%_90%] scale-[1.3] object-[50%_30%] mix-blend-multiply grayscale-[0.15] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.36]"
                />
                {/* viewfinder corners */}
                <span aria-hidden className="absolute left-2 top-2 h-3 w-3 border-l border-t border-navy" />
                <span aria-hidden className="absolute right-2 top-2 h-3 w-3 border-r border-t border-navy" />
              </div>
            </div>
            <figcaption className="label mt-6 flex items-center justify-between">
              <span>Player 01</span>
              <span className="text-red">Lvl 3 · BS IT</span>
            </figcaption>
          </figure>
        </div>
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
