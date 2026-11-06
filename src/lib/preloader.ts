/**
 * Seconds after mount at which the preloader curtain has lifted far enough for the
 * hero's own entrance to begin. Zero once the curtain has finished, so in-site
 * navigation back to the home page does not wait for a curtain that never plays.
 */
export const PRELOADER_REVEAL_AT = 1.9;

export function preloaderDelay(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.preloader === "play" ? PRELOADER_REVEAL_AT : 0;
}

/** Inline, pre-paint script: the curtain plays on every full page load or refresh. */
export const PRELOADER_BOOT_SCRIPT = `document.documentElement.dataset.preloader="play"`;
