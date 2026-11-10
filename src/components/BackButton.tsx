"use client";

import { useRouter } from "next/navigation";
import { hasInSiteHistory } from "./NavTracker";

/**
 * "← Back": returns to the page the visitor just came from (so they land where they left,
 * with their scroll position). If they arrived directly (a shared link, a new tab), there is
 * nothing to go back to on this site, so it goes to `fallback` instead.
 */
export function BackButton({ fallback = "/", label = "Back" }: { fallback?: string; label?: string }) {
  const router = useRouter();

  return (
    <a
      href={fallback}
      onClick={(event) => {
        event.preventDefault();
        const cameFromSite = hasInSiteHistory() || document.referrer.startsWith(window.location.origin);
        if (cameFromSite && window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-paper"
    >
      <span aria-hidden>←</span> {label}
    </a>
  );
}
