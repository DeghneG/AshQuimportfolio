import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/lib/data";

export const metadata: Metadata = { title: "Contact — Ashjan Quimpo" };

export default function Contact() {
  return (
    <section className="px-5 pb-24 pt-32 sm:px-8">
      <Reveal className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <div data-reveal className="mb-10">
            <BackButton fallback="/" />
          </div>
          <p data-reveal className="label mb-6">Contact</p>
          <h1 data-reveal className="display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none">
            Let&apos;s build <span className="text-red">something.</span>
          </h1>
          <p data-reveal className="mt-8 max-w-sm leading-relaxed text-ink-soft">
            Have a project in mind, or just a question? Send a message and I&apos;ll get back to you.
          </p>
          <a
            data-reveal
            href={`mailto:${profile.email}`}
            className="rule-link mt-8 inline-block text-lg font-medium text-navy sm:text-xl"
          >
            {profile.email}
          </a>
          <div data-reveal className="mt-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-navy px-5 py-2 text-sm text-navy transition-colors hover:bg-navy hover:text-paper"
            >
              GitHub profile
            </a>
          </div>
        </div>

        <div data-reveal id="message" className="scroll-mt-28">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
