"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { preloaderDelay } from "@/lib/preloader";

/**
 * A double frame around the portrait. The inner navy hairline draws itself on, then
 * a short red segment laps it. An outer, open-bottomed frame sits 8px further out and
 * carries a pale "ghost" segment that trails the red one, so the border has momentum.
 * The bottom stays flush so the figure keeps standing on the hero rule.
 * Hovering the parent speeds the lap up.
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

  const { w, h } = size;
  // Inner rect geometry (clockwise from top-left).
  const W = w - 2;
  const H = h - 2;
  const P1 = 2 * W + 2 * H;
  // Outer open frame: left edge up, across the top, right edge down.
  const oW = W + 16;
  const oH = H + 8;
  const Pu = 2 * oH + oW;
  const ghostLen = Pu * 0.2;
  const segLen = P1 * 0.12;

  useGSAP(
    () => {
      if (!size.w) return;
      const pl = preloaderDelay();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = svg.current;
      if (!root) return;
      const seg = root.querySelector<SVGElement>("[data-seg]");
      const ghost = root.querySelector<SVGElement>("[data-ghost]");
      if (!seg || !ghost) return;

      gsap.fromTo("[data-base]", { strokeDashoffset: P1 }, { strokeDashoffset: 0, duration: 1.8, ease: "expo.out", delay: 1.2 + pl });
      gsap.fromTo("[data-outer]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power2.out", delay: 1.8 + pl });
      gsap.set([seg, ghost], { autoAlpha: 0 });
      gsap.to([seg, ghost], { autoAlpha: 1, duration: 0.8, delay: 2.6 + pl });

      // Where the ghost's head sits on the open outer path for a given distance s along the inner rect.
      const ghostHead = (s: number) => {
        if (s < W) return oH + (s / W) * oW;
        if (s < W + H) return oH + oW + ((s - W) / H) * oH;
        if (s < 2 * W + H) return Pu + Math.min(ghostLen, ((s - W - H) / W) * ghostLen * 3);
        return ((s - 2 * W - H) / H) * oH;
      };

      const state = { p: 0 };
      const lap = gsap.to(state, {
        p: 1,
        duration: reduced ? 16 : 9,
        ease: "none",
        repeat: -1,
        delay: 2.6,
        onUpdate: () => {
          const s = state.p * P1;
          seg.style.strokeDashoffset = `${-s}px`;
          const sg = (((s - P1 * 0.05) % P1) + P1) % P1; // ghost trails the red segment
          ghost.style.strokeDashoffset = `${ghostLen - ghostHead(sg)}px`;
        },
      });

      const host = root.parentElement;
      if (!host || reduced) return;
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

  const outerPath = `M -7 ${h - 1} V -7 H ${w + 7} V ${h - 1}`;

  return (
    <svg
      ref={svg}
      aria-hidden
      className="pointer-events-none absolute -left-3 -right-3 -top-3 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)] overflow-visible"
    >
      {w > 0 && (
        <>
          {/* outer open frame + trailing ghost */}
          <path data-outer d={outerPath} fill="none" stroke="#12285a" strokeOpacity={0.28} strokeWidth={1} style={{ opacity: 0 }} />
          <path
            data-ghost
            d={outerPath}
            fill="none"
            stroke="#b0202b"
            strokeOpacity={0.4}
            strokeWidth={2}
            strokeDasharray={`${ghostLen} ${Pu + ghostLen}`}
            style={{ opacity: 0 }}
          />
          {/* inner hairline frame + red segment */}
          <rect
            data-base
            x={1}
            y={1}
            width={W}
            height={H}
            fill="none"
            stroke="#12285a"
            strokeWidth={1}
            strokeDasharray={`${P1} ${P1}`}
          />
          <rect
            data-seg
            x={1}
            y={1}
            width={W}
            height={H}
            fill="none"
            stroke="#b0202b"
            strokeWidth={3}
            strokeLinecap="butt"
            strokeDasharray={`${segLen} ${P1 - segLen}`}
            style={{ opacity: 0 }}
          />
        </>
      )}
    </svg>
  );
}
