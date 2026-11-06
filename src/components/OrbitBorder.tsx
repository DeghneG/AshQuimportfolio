"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * A navy hairline frame that draws itself on, then carries a short red segment
 * in a slow lap around the portrait. Hovering the parent speeds the lap up.
 * Sized from its own box (floats 12px out on top/left/right, sits flush on the
 * bottom so the figure keeps standing on the hero rule).
 */
export function OrbitBorder() {
  const svg = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const perimeter = 2 * (size.w - 2) + 2 * (size.h - 2);
      if (!size.w || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        "[data-base]",
        { strokeDashoffset: perimeter },
        { strokeDashoffset: 0, duration: 1.8, ease: "expo.out", delay: 1.2 }
      );

      gsap.set("[data-seg]", { autoAlpha: 0 });
      gsap.to("[data-seg]", { autoAlpha: 1, duration: 0.8, delay: 2.6 });
      const lap = gsap.fromTo(
        "[data-seg]",
        { strokeDashoffset: 0 },
        { strokeDashoffset: -perimeter, duration: 9, ease: "none", repeat: -1, delay: 2.6 }
      );

      const host = svg.current?.parentElement;
      if (!host) return;
      const fast = () => gsap.to(lap, { timeScale: 4, duration: 0.8, ease: "power2.out", overwrite: true });
      const slow = () => gsap.to(lap, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
      host.addEventListener("pointerenter", fast);
      host.addEventListener("pointerleave", slow);
      return () => {
        host.removeEventListener("pointerenter", fast);
        host.removeEventListener("pointerleave", slow);
      };
    },
    { scope: svg, dependencies: [size.w, size.h], revertOnUpdate: true }
  );

  const { w, h } = size;
  const perimeter = 2 * (w - 2) + 2 * (h - 2);

  return (
    <svg
      ref={svg}
      aria-hidden
      className="pointer-events-none absolute -left-3 -right-3 -top-3 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)] overflow-visible"
    >
      {w > 0 && (
        <>
          <rect
            data-base
            x={1}
            y={1}
            width={w - 2}
            height={h - 2}
            
            fill="none"
            stroke="#12285a"
            strokeWidth={1}
            strokeDasharray={`${perimeter} ${perimeter}`}
          />
          <rect
            data-seg
            x={1}
            y={1}
            width={w - 2}
            height={h - 2}
            
            fill="none"
            stroke="#b0202b"
            strokeWidth={3}
            strokeLinecap="butt"
            strokeDasharray={`${perimeter * 0.12} ${perimeter * 0.88}`}
            style={{ opacity: 0 }}
          />
        </>
      )}
    </svg>
  );
}
