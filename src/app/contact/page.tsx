import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = { title: "Contact — Ashjan Quimpo" };

export default function Contact() {
  return (
    <section className="flex min-h-[80svh] items-center px-5 pb-20 pt-32 sm:px-8">
      <Reveal className="mx-auto w-full max-w-6xl">
        <p data-reveal className="label mb-6">Contact</p>
        <h1 data-reveal className="display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none">
          Let&apos;s build <span className="text-red">something.</span>
        </h1>
        <a
          data-reveal
          href={`mailto:${profile.email}`}
          className="rule-link mt-10 inline-block text-xl font-medium text-navy sm:text-3xl"
        >
          {profile.email}
        </a>
        <div data-reveal className="mt-8 flex gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border border-navy px-5 py-2 text-sm text-navy transition-colors hover:bg-navy hover:text-paper">GitHub profile</a>
        </div>
      </Reveal>
    </section>
  );
}
