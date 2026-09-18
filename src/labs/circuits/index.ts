// ── Experiments registry (new source, wins over legacy entries) ─────────────
import { EXPERIMENTS_BY_ID } from '@/experiments';
import { toCircuit }         from '@/experiments/adapters';

// 'HalfAdder' removed — now sourced from src/experiments/half-adder/
import { type Circuit }   from '@/labs/types';

export const ALL_CIRCUITS: Circuit[] = [
  // 'HalfAdder' removed from this array — see experiments registry merge below
  // ── Derived from experiments registry (new source) ──────────────────────
  // Filter out undefined (text/code experiments have no circuit).
  ...Object.values(EXPERIMENTS_BY_ID)
    .map(toCircuit)
    .filter((c): c is Circuit => c !== undefined),
];

export {
  // HalfAdder removed — see EXPERIMENTS_BY_ID['half-adder'] if needed directly
  };
