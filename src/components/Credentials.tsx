import { Reveal } from "./Reveal";
import { education } from "@/lib/data";

export function Credentials() {
  return (
    <section id="credentials" className="scroll-mt-16 border-t border-line px-5 py-28 sm:px-8">
      <Reveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_2fr]">
        <p data-reveal className="label">03 — Credentials</p>
        <div>
          <div data-reveal className="mb-10">
            <p className="label mb-2">Bio</p>
            <p className="display text-2xl font-medium">Third-year IT student, University of San Agustin</p>
          </div>
          <div data-reveal>
            <p className="label mb-2">Education</p>
            <ul className="divide-y divide-line border-y border-line">
              {education.map((e) => (
                <li key={e.level} className="flex items-baseline justify-between py-4">
                  <span className="font-medium">{e.level}</span>
                  <span className="font-mono text-sm text-ink-soft">{e.years}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            data-reveal
            href="/resume.pdf"
            className="mt-10 inline-flex rounded-full bg-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-deep"
          >
            Download resume
          </a>
        </div>
      </Reveal>
    </section>
  );
}
