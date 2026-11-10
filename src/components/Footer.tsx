import Link from "next/link";
import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";
import { LocalTime } from "./LocalTime";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper text-navy">
      <Reveal className="relative mx-auto flex min-h-[44rem] max-w-6xl flex-col px-5 pb-8 pt-6 sm:px-8">
        <div data-reveal className="flex items-center justify-between font-mono text-[0.75rem] tracking-wide">
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 bg-current" /> Contact
          </span>
          <LocalTime />
        </div>

        <h2 data-reveal className="display mt-14 max-w-3xl text-red text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.9]">
          A project
          <br />
          in mind?
        </h2>

        <div data-reveal className="mt-20 grid gap-10 border-t border-navy/70 pt-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="display inline-block border-b border-current pb-1 text-2xl sm:text-3xl"
            >
              {profile.email}
            </a>
            <div className="mt-5">
              <Link href="/contact" className="rule-link inline-flex items-center gap-2">
                Start a project <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>

          <nav aria-label="Footer" className="display flex flex-col gap-1 text-xl">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="w-fit transition-opacity hover:opacity-70">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 font-mono text-[0.75rem] leading-relaxed">
            <p>
              University of San Agustin
              <br />
              Iloilo City, Philippines
            </p>
            <p className="flex flex-col gap-1">
              <a href={profile.github} target="_blank" rel="noreferrer" className="rule-link w-fit">GitHub</a>
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-6 pt-16 sm:flex-row sm:items-end sm:justify-between">
          <p
            aria-hidden
            className="display text-red text-[clamp(5rem,20vw,15rem)] font-bold leading-[0.78] tracking-[-0.04em]"
          >
            Salamat.
          </p>
          <div className="flex flex-col items-start gap-2 pb-2 font-mono sm:items-end text-[0.75rem]">
            <a href="#top" className="rule-link">Back to top ↑</a>
            <span>© 2026 {profile.name}</span>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
