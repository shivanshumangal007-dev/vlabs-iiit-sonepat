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
import { Exp8085BubbleSort } from './8085-bubble-sort';
import { Exp8085BcdBinaryConv } from './8085-bcd-binary-conv';
import { Exp8085BcdAddition } from './8085-bcd-addition';
import { Exp8085AddSub8bit } from './8085-add-sub-8bit';
import { Exp8085Multiply8bit } from './8085-multiply-8bit';
import { Exp8085ArraySquare } from './8085-array-square';
import { Exp8085Sqrt } from './8085-sqrt';
import { Exp8085Divide8bit } from './8085-divide-8bit';
import { Exp8085AddSubCarry } from './8085-add-sub-carry';
import { Exp8085MinMax } from './8085-min-max';
import { Exp8085ArraySum } from './8085-array-sum';

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
  Exp8085BubbleSort,
  Exp8085BcdBinaryConv,
  Exp8085BcdAddition,
  Exp8085AddSub8bit,
  Exp8085Multiply8bit,
  Exp8085ArraySquare,
  Exp8085Sqrt,
  Exp8085Divide8bit,
  Exp8085AddSubCarry,
  Exp8085MinMax,
  Exp8085ArraySum,

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
