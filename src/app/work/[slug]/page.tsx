import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { listProjects } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return listProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = listProjects().find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Ashjan Quimpo` : "Project — Ashjan Quimpo" };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const all = listProjects();
  const project = all.find((p) => p.slug === slug);
  if (!project) notFound();

  const siblings = all.filter((p) => p.termKey === project.termKey);
  const at = siblings.findIndex((p) => p.slug === project.slug);
  const prev = at > 0 ? siblings[at - 1] : undefined;
  const next = at < siblings.length - 1 ? siblings[at + 1] : undefined;
  const isPdf = project.href.endsWith(".pdf");
  // Back returns to the exact term row the visitor came from.
  const backHref = `/#${project.termKey}`;

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div data-reveal>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-paper"
            >
              <span aria-hidden>←</span> Back to work
            </Link>
          </div>

          <div data-reveal className="mt-10 flex flex-wrap items-end justify-between gap-4 border-b border-navy/70 pb-5">
            <h1 className="display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none">{project.title}</h1>
            <p className="label">
              {project.term} project · {project.kind}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div
            data-reveal
            className={`mx-auto overflow-hidden rounded-xl border border-navy bg-paper ${
              project.tall ? "max-w-xl" : "max-w-5xl"
            }`}
          >
            {project.video ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={project.image}
                className="block aspect-video w-full bg-ink"
              >
                <source src={project.video} type="video/mp4" />
                Your browser can&apos;t play this video.{" "}
                <a href={project.video}>Download it instead.</a>
              </video>
            ) : (
              <Image
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                className="block h-auto w-full"
              />
            )}
          </div>

          {isPdf && (
            <p data-reveal className="mt-5 text-center text-sm">
              <a href={project.href} target="_blank" rel="noreferrer" className="rule-link font-medium text-navy">
                Open the original PDF ↗
              </a>
            </p>
          )}
        </Reveal>

        <nav
          aria-label="Project navigation"
          className="mx-auto mt-16 flex max-w-5xl items-center justify-between gap-6 border-t border-line pt-6 text-sm font-medium"
        >
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="rule-link">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <Link href={backHref} className="rule-link text-ink-soft">
            All {project.term.toLowerCase()} projects
          </Link>
          {next ? (
            <Link href={`/work/${next.slug}`} className="rule-link">
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
