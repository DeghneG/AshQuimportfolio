import { BackButton } from "@/components/BackButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <BackButton fallback="/" />
        <h1 className="display mt-10 text-[clamp(3rem,9vw,7rem)] font-semibold leading-none">
          Page not <span className="text-red">found.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">That page doesn&apos;t exist, or it has moved.</p>
      </div>
    </section>
  );
}
