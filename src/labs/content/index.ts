// ── Lab content registry ────────────────────────────────────────────────────
// Single map from experiment id → LabContent.
// The dynamic /labs/[slug] route uses this to look up content.
// To add a new experiment: import it here and add one entry to the map.

import { type LabContent } from '@/labs/lab-content.types';

// ── Experiments registry (new source, wins over legacy entries on conflict) ─
import { EXPERIMENTS_BY_ID } from '@/experiments';
import { toLabContent }      from '@/experiments/adapters';


/** All lab content keyed by experiment id (matches Circuit.id). */
export const ALL_CONTENTS: Record<string, LabContent> = {
  // ── Legacy entries ──────────────────────────────────────────────────────
  // 'half-adder' removed — now sourced from src/experiments/half-adder/
  // 'full-adder' migrated
  // 'half-subtractor' migrated
  // 'full-subtractor' migrated
  // 'mux-2to1' migrated
  // 'demux-1to2' migrated
  // 'encoder-4to2' migrated
  // 'decoder-2to4' migrated
  // 'zener-diode' migrated
  // 'logic-gates' migrated
  // 'study-basic-components' migrated
  // 'ohms-law' migrated
  // 'kirchhoff-laws' migrated
  // 'pn-junction-diode' migrated
  // 'zener-voltage-regulator' migrated
  // 'half-wave-rectifier' migrated
  // 'full-wave-rectifier' migrated
  // 'rectifiers-capacitor-filters' migrated
  // 'superposition-theorem' migrated
  // 'thevenin-theorem' migrated
  // 'norton-theorem' migrated
  // 'ce-amplifier' migrated
  // 'mux-based-logic' migrated
  // 'demux-address-decoder' migrated
  // 'half-adder-revisit' migrated
  // 'full-adder-ripple' migrated
  // 'gpio-interfacing' migrated
  // 'seven-segment-display' migrated
  // 'adc-dac' migrated
  // 'cb-amplifier' migrated
  // 'bjt-bias' migrated
  // 'mosfet-characteristics' migrated
  // 'opamp-circuits' migrated
  // 'bcd-xs3-converter' migrated
  // 'gray-binary-converter' migrated
  // 'mux-4to1-ic' migrated
  // 'demux-1to4-ic' migrated
  // 'binary-adder-4bit' migrated
  // 'binary-subtractor-4bit' migrated
  // 'digital-comparator' migrated
  // 'parity-checker' migrated
  // 'shift-register' migrated
  // 'gate-level-minimization' migrated
  // 'cla-adder' migrated
  // 'wallace-tree' migrated
  // 'combinational-multipliers' migrated
  // 'booths-multiplier' migrated
  // 'registers-counters-theory' migrated
  // 'intro-gates-review' migrated
  // 'c-expressions' migrated
  // 'c-file-operations-1' migrated
  // 'c-file-operations-2' migrated
  // 'sr-latch' migrated
  // 'd-flip-flop' migrated
  // 'jk-t-flip-flop' migrated
  // 'mod5-counter' migrated
  // '8085-add-sub-8bit' migrated
  // '8085-add-sub-carry' migrated
  // '8085-bcd-addition' migrated
  // '8085-multiply-8bit' migrated
  // '8085-divide-8bit' migrated
  // '8085-array-sum' migrated
  // '8085-array-square' migrated
  // '8085-min-max' migrated
  // '8085-bubble-sort' migrated
  // '8085-bcd-binary-conv' migrated
  // '8085-sqrt' migrated
  // 'alu-simulation' migrated
  // 'memory-design' migrated
  // 'cache-direct-mapped' migrated
  // 'cache-associative' migrated
  // 'cpu-design' migrated

  // ── New experiments registry (new source wins on conflict) ───────────────
  // During migration: each experiment moved to src/experiments/<slug>/ is
  // automatically picked up here.  When migration is complete, this whole
  // legacy section can be replaced with a single spread.
  ...Object.fromEntries(
    Object.values(EXPERIMENTS_BY_ID).map((e) => [e.id, toLabContent(e)])
  ),
};
