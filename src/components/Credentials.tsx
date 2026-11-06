"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { education } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAVY = "#12285a";
const RED = "#b0202b";
const PAPER = "#f6f3ee";

export function Credentials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The navy line draws itself as you scroll down the timeline.
        gsap.fromTo(
          "[data-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-track]", start: "top 65%", end: "bottom 65%", scrub: 0.6 },
          }
        );

        // Each stage lights up when the line reaches it.
        gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((stage) => {
          const current = stage.hasAttribute("data-current");
          const st = { trigger: stage, start: "top 65%", toggleActions: "play none none reverse" };
          gsap.fromTo(
            stage.querySelector("[data-node]"),
            { scale: 0.4, backgroundColor: PAPER },
            { scale: 1, backgroundColor: current ? RED : NAVY, duration: 0.7, ease: "expo.out", scrollTrigger: st }
          );
          gsap.from(stage.querySelector("[data-text]"), {
            autoAlpha: 0,
            x: 28,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: st,
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="credentials" className="scroll-mt-16 border-t border-line px-5 py-28 sm:px-8">
      <Reveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_2fr]">
        <p data-reveal className="label">03 — Credentials</p>
        <div>
          <p data-reveal className="display text-2xl font-medium sm:text-3xl">
            Third-year <span className="text-red">IT student</span>, University of San Agustin
          </p>

          <div data-track className="relative mt-14">
            <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-navy/15" />
            <span
              aria-hidden
              data-fill
              className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-navy"
            />
            <ol>
              {education.map((e, i) => {
                const current = i === education.length - 1;
                return (
                  <li
                    key={e.level}
                    data-stage
                    {...(current ? { "data-current": "" } : {})}
                    className="relative pb-12 pl-10 last:pb-0"
                  >
                    <span
                      aria-hidden
                      data-node
                      className={`absolute left-0 top-[0.55rem] h-3 w-3 rounded-full border ${
                        current ? "border-red bg-red" : "border-navy bg-navy"
                      }`}
                    />
                    {current && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.55rem] h-3 w-3 animate-ping rounded-full bg-red/50 [animation-iteration-count:3]"
                      />
                    )}
                    <div data-text>
                      <p className={`font-mono text-sm ${current ? "text-red" : "text-ink-soft"}`}>{e.years}</p>
                      <h3 className="display mt-1 text-2xl font-semibold sm:text-3xl">{e.level}</h3>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <a
            data-reveal
            href="/resume.pdf"
            className="mt-14 inline-flex rounded-full bg-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-deep"
          >
            Download resume
          </a>
        </div>
      </Reveal>
    </section>
  );
}
