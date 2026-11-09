"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

/**
 * A finished-project card: artwork on top, caption bar below (so the caption never
 * covers the work). Tall artwork pans on hover; video projects show their poster and
 * play a muted preview on hover, loading the file only then.
 */
export function ProjectCard({ project }: { project: Project }) {
  const video = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = video.current;
    if (!v) return;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <Link
      data-reveal
      href={`/work/${project.slug}`}
      onPointerEnter={play}
      onPointerLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group flex aspect-[4/3] flex-col overflow-hidden rounded-xl border border-navy bg-paper"
    >
      <div className={`relative min-h-0 flex-1 overflow-hidden ${project.fit === "contain" ? "bg-white" : ""}`}>
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          unoptimized={project.image.endsWith(".gif")}
          className={
            project.tall
              ? "object-cover object-[50%_0%] transition-[object-position] duration-[2800ms] ease-in-out group-hover:object-[50%_72%]"
              : project.fit === "contain"
                ? "object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                : "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          }
        />
        {project.video && (
          <video
            ref={video}
            src={project.preview ?? project.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
        {project.video && (
          <span
            aria-hidden
            className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-[0.7rem] text-navy transition-opacity duration-300 group-hover:opacity-0"
          >
            ▶
          </span>
        )}
      </div>
      <div className="flex shrink-0 items-end justify-between gap-4 border-t border-navy bg-paper px-5 py-4">
        <div>
          <h4 className="display text-xl font-semibold">{project.title}</h4>
          <p className="label mt-1">{project.kind}</p>
        </div>
        <span
          aria-hidden
          className="text-lg text-red transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
