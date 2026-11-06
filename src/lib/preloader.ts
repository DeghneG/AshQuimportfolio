/**
 * Seconds after mount at which the preloader curtain has lifted far enough for the
 * hero's own entrance to begin. Zero when the preloader is skipped (already seen this
 * session), so every entrance animation can simply add this to its delay.
 */
export const PRELOADER_REVEAL_AT = 1.9;

export function preloaderDelay(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.preloader === "play" ? PRELOADER_REVEAL_AT : 0;
}

/** Inline, pre-paint script: decide once per session whether the preloader plays. */
export const PRELOADER_BOOT_SCRIPT = `try{document.documentElement.dataset.preloader=sessionStorage.getItem("aq-preloaded")?"skip":"play"}catch(e){document.documentElement.dataset.preloader="skip"}`;
