/**
 * Intro scene lengths in milliseconds.
 * Change these to retune the opening. Asset loading still gates the first scene:
 * the bar will not finish before `loadingMin`, and it will not hold past `loadingMax`.
 *
 * Mobile total (after the cap) stays under ~4.5s. Desktop is a slightly longer arc.
 * Whale mode is the GO FULL WHALE hold before the ocean settles back.
 */
export const DESKTOP_TIMINGS = {
  loadingMin: 700,
  loadingMax: 1600,
  eyes: 1000,
  reveal: 1300,
  dream: 1500,
  suit: 800,
} as const;

export const MOBILE_TIMINGS = {
  loadingMin: 450,
  loadingMax: 1000,
  eyes: 650,
  reveal: 850,
  dream: 950,
  suit: 600,
} as const;

export const WHALE_MODE_MS = 2600;

export type SceneTimings = {
  loadingMin: number;
  loadingMax: number;
  eyes: number;
  reveal: number;
  dream: number;
  suit: number;
};

export function timingsForViewport(): SceneTimings {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches) {
    return MOBILE_TIMINGS;
  }
  return DESKTOP_TIMINGS;
}
