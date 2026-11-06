"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { OrbitBorder } from "./OrbitBorder";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // One authored moment: the type rises, the rule is drawn, and the portrait
      // is lifted up out of that rule like a figure stepping onto a stage.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-line]", { yPercent: 115, duration: 1.3, stagger: 0.14 })
        .from("[data-bar]", { scaleX: 0, transformOrigin: "left", duration: 1.4 }, 0.15)
        .fromTo(
          "[data-portrait]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 },
          0.45
        )
        .fromTo("[data-portrait-img]", { scale: 1.7, filter: "blur(10px)" }, { scale: 1.3, filter: "blur(0px)", duration: 1.9 }, 0.45)
        .from("[data-fade]", { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.1 }, 1.2);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-5 pt-24 sm:px-8 md:flex md:min-h-[100svh] md:flex-col md:justify-end md:pb-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <h1 className="display text-[clamp(2.8rem,8.4vw,7rem)] font-semibold leading-[0.95] md:col-span-8 md:pb-2">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block">Press start.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block text-red">Ship code.</span>
            </span>
          </h1>

          <div className="relative ml-auto w-[min(62vw,16rem)] md:col-span-4 md:w-full md:max-w-[22rem] md:justify-self-end">
            <div data-portrait className="relative aspect-[4/5] overflow-hidden">
              <Image
                data-portrait-img
                src="/profile.jpg"
                alt="Portrait of Ashjan Quimpo in a black suit"
                width={1024}
                height={1024}
                sizes="(min-width: 768px) 352px, 62vw"
                priority
                className="h-full w-full origin-[50%_92%] scale-[1.3] object-cover object-[50%_30%] mix-blend-multiply contrast-[1.05]"
              />
            </div>
            <OrbitBorder />
          </div>
        </div>

        <div data-bar className="h-px w-full bg-navy" />

        <div className="flex flex-col gap-8 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p data-fade className="text-lg leading-relaxed text-ink-soft">
              I&apos;m <span className="font-medium text-ink">Ashjan Quimpo</span>, a third-year IT student
              at the University of San Agustin building thoughtful things for the web.
            </p>
            <Link
              data-fade
              href="/work/community-voice"
              className="group mt-5 inline-flex items-center gap-3 text-sm"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
              <span className="text-ink-soft">Now building</span>
              <span className="rule-link font-medium text-navy">CommunityVoice</span>
              <span aria-hidden className="text-navy transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
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
