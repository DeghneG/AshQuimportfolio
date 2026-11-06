"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-line]", { yPercent: 110, duration: 1.1, stagger: 0.14 })
        .from("[data-fade]", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from("[data-bar]", { scaleX: 0, transformOrigin: "left", duration: 1.2 }, "-=0.9");
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center px-5 pt-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p data-fade className="label mb-8">Portfolio · 2026 · IT student</p>
        <h1 className="display text-[clamp(2.8rem,9vw,7.5rem)] font-semibold leading-[0.95]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block">Press start.</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block text-red">Ship code.</span>
          </span>
        </h1>
        <div data-bar className="my-10 h-px w-full bg-navy/80" />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-fade className="max-w-md text-lg leading-relaxed text-ink-soft">
            I&apos;m <span className="font-medium text-ink">Ashjan Quimpo</span>, a third-year IT student
            at the University of San Agustin building thoughtful things for the web.
          </p>
          <div data-fade className="flex gap-3">
            <a href="#work" className="rounded-full bg-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-deep">
              View work
            </a>
            <a href="/contact" className="rounded-full border border-navy px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-paper">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
