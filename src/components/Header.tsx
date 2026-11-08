import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="display text-lg font-semibold tracking-tight">
          AQ<span className="text-red">.</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm sm:gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rule-link text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            className="hidden rounded-full border border-navy px-4 py-1.5 text-navy transition-colors hover:bg-navy hover:text-paper sm:inline-block"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
