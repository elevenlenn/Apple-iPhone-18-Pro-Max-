import { useSyncExternalStore } from 'react';
import { DEFAULT_VARIANT_ID } from '../config/phoneConfig';

export const SECTION_INDEX = {
  hero: 0,
  design: 1,
  display: 2,
  camera: 3,
  chip: 4,
  intelligence: 5,
  colors: 6,
  cta: 7,
};
export const SECTION_COUNT = 8;

/** State reaktif kecil (memicu render React). */
let state = { ready: false, revealed: false, variant: DEFAULT_VARIANT_ID, active: 0 };
const listeners = new Set();

export const store = {
  get: () => state,
  set(partial) {
    let changed = false;
    for (const k in partial) if (state[k] !== partial[k]) changed = true;
    if (!changed) return;
    state = { ...state, ...partial };
    listeners.forEach((l) => l());
  },
  subscribe(l) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useStore(selector) {
  return useSyncExternalStore(store.subscribe, () => selector(state), () => selector(state));
}

/** State per-frame yang dibaca di useFrame (tidak memicu render). */
export const frameState = {
  progress: new Float32Array(SECTION_COUNT),
  intro: 0,
  velocity: 0,
  mouse: { x: 0, y: 0 },
};
