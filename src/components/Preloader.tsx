"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Tagline curtain: a navy panel opens on "Press start. / Ship code." in the same masked
 * rise as the hero headline, then lifts away. Plays on every full page load (see
 * PRELOADER_BOOT_SCRIPT in layout) and never blocks on real loading, so there is no
 * progress bar to lie about.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const html = document.documentElement;
      if (!el || html.dataset.preloader !== "play") return;

      html.style.overflow = "hidden"; // keeps Lenis and the wheel still while it plays

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          el.style.display = "none";
          html.dataset.preloader = "done";
          html.style.overflow = "";
        },
      });

      tl.fromTo("[data-pl-line]", { yPercent: 115, autoAlpha: 1 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.14 }, 0.15)
        .fromTo("[data-pl-rule]", { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, autoAlpha: 1, duration: 1.2 }, 0.3)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, 1.65)
        .to("[data-pl-inner]", { yPercent: -14, duration: 1.1, ease: "expo.inOut" }, 1.65);

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      id="preloader"
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-navy text-paper"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-pl-inner className="flex h-full items-center px-5 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="display text-[clamp(2.8rem,8.4vw,7rem)] font-semibold leading-[0.95]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-pl-line className="block opacity-0">Press start.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-pl-line className="block text-[#ff6670] opacity-0">Ship code.</span>
            </span>
          </p>
          <div data-pl-rule className="mt-8 h-[2px] w-full origin-left bg-[#ff6670] opacity-0" />
        </div>
      </div>
    </div>
  );
}
