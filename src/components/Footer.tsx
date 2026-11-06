import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a href={`mailto:${profile.email}`} className="rule-link w-fit font-medium">
          {profile.email}
        </a>
        <div className="flex gap-6 text-ink-soft">
          <a href={profile.github} className="rule-link hover:text-ink" target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.facebook} className="rule-link hover:text-ink" target="_blank" rel="noreferrer">Facebook</a>
        </div>
        <p className="label">© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}
