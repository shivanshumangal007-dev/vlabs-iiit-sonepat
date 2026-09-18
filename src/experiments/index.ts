// ── src/experiments/index.ts ──────────────────────────────────────────────────
// Central registry of all migrated Experiment objects.
// During the transition period only the pilot experiment lives here;
// subsequent phases add one entry per migrated lab.
//
// The old registries (labs/content/index.ts, labs/circuits/index.ts,
// sections/explore/explore.data.ts) import from here and merge these entries
// in, so the new source wins on conflict without breaking any existing consumer.

import { type Experiment } from './types';
import { HalfAdder }       from './half-adder';  // pilot — Phase 2 proof of concept

export const ALL_EXPERIMENTS: Experiment[] = [
  HalfAdder,
];

/** O(1) lookup by canonical id slug. */
export const EXPERIMENTS_BY_ID: Record<string, Experiment> =
  Object.fromEntries(ALL_EXPERIMENTS.map((e) => [e.id, e]));
