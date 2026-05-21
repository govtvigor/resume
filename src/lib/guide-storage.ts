/** Persists in the browser — tour won't show again after skip or finish. */
export const SPACE_GUIDE_STORAGE_KEY = "portfolio-space-guide-v1";

export function hasSeenSpaceGuide(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(SPACE_GUIDE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markSpaceGuideSeen(): void {
  try {
    localStorage.setItem(SPACE_GUIDE_STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}
