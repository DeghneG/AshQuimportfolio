"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Counts in-site page changes since this document loaded. Module state is shared by every
// component that imports it, so BackButton can tell "I came from another page of this site".
let navigations = 0;
let lastPath: string | null = null;

export function hasInSiteHistory() {
  return navigations > 0;
}

export function NavTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (lastPath !== null && lastPath !== pathname) navigations += 1;
    lastPath = pathname;
  }, [pathname]);

  return null;
}
