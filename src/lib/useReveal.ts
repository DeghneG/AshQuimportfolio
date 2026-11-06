"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type RevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
};

/**
 * Scroll-reveal hook. Attach the returned ref to a wrapper; every descendant
 * with [data-reveal] fades/slides in (staggered) once the wrapper enters the
 * viewport. If none exist, the wrapper itself is revealed. Honors
 * prefers-reduced-motion by leaving content untouched.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  y = 28,
  duration = 0.9,
  stagger = 0.09,
  threshold = 0.12,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const found = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const targets = found.length ? Array.from(found) : [el];
    gsap.set(targets, { autoAlpha: 0, y });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          clearProps: "transform",
        });
        io.disconnect();
      },
      { threshold }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "all" });
    };
  }, [y, duration, stagger, threshold]);

  return ref;
}
