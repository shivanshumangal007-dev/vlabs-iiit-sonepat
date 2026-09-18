// ── src/experiments/index.ts ──────────────────────────────────────────────────
// Central registry of all migrated Experiment objects.
// During the transition period only the pilot experiment lives here;
// subsequent phases add one entry per migrated lab.
//
// The old registries (labs/content/index.ts, labs/circuits/index.ts,
// sections/explore/explore.data.ts) import from here and merge these entries
// in, so the new source wins on conflict without breaking any existing consumer.

import { type Experiment } from './types';
import { HalfAdder }       from './half-adder';
import { CacheDirectMapped } from './cache-direct-mapped';
import { MemoryDesign } from './memory-design';
import { CacheAssociative } from './cache-associative';
import { CpuDesign } from './cpu-design';
import { AluSimulation } from './alu-simulation';

import { RegistersCountersTheory } from './registers-counters-theory';
import { CFileOperations1 } from './c-file-operations-1';
import { CombinationalMultipliers } from './combinational-multipliers';
import { ClaAdder } from './cla-adder';
import { CFileOperations2 } from './c-file-operations-2';
import { WallaceTree } from './wallace-tree';
import { GateLevelMinimization } from './gate-level-minimization';
import { BoothsMultiplier } from './booths-multiplier';
import { CExpressions } from './c-expressions';
import { IntroGatesReview } from './intro-gates-review';
  // pilot — Phase 2 proof of concept

export const ALL_EXPERIMENTS: Experiment[] = [
  HalfAdder,
  CacheDirectMapped,
  MemoryDesign,
  CacheAssociative,
  CpuDesign,
  AluSimulation,

  RegistersCountersTheory,
  CFileOperations1,
  CombinationalMultipliers,
  ClaAdder,
  CFileOperations2,
  WallaceTree,
  GateLevelMinimization,
  BoothsMultiplier,
  CExpressions,
  IntroGatesReview,

];

/** O(1) lookup by canonical id slug. */
export const EXPERIMENTS_BY_ID: Record<string, Experiment> =
  Object.fromEntries(ALL_EXPERIMENTS.map((e) => [e.id, e]));
