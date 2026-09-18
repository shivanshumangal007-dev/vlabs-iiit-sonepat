// ── src/experiments/types.ts ────────────────────────────────────────────────
// Phase 1: new Experiment type schema.
// Nothing imports this yet — it is pure type work for Phase 2 to build on.
//
// Design decisions locked in here (see Phase 0 audit for rationale):
//
//  1. id is the single canonical slug used everywhere: URL, content registry
//     key, explore key, and circuit id.  The old three-way mismatch
//     (circuitId vs contentId vs explore id) is gone.
//
//  2. circuit is optional from day one.  'text' and 'code' labs legitimately
//     have no circuit; forcing a sentinel value (null / {}) is how you end up
//     with circuit: null scattered everywhere in future code.
//
//  3. status is explicit ('live' | 'coming-soon').  Do NOT infer it from
//     whether a circuit happens to be present — that was exactly today's
//     bug class (30 ghost entries that were ambiguous between "planned" and
//     "text-type, intentionally circuit-less").
//
//  4. sections is typed as LabContent['sections'] verbatim so the Phase 2
//     toLabContent() adapter is a near-identity function, not a rewrite.
//
// Note on Circuit import path:
//   The spec referenced '@/labs/circuits/types' which does not exist.
//   Circuit is exported from '@/labs/types' — adjusted accordingly.

import type { LabContent, LabSection } from '@/labs/lab-content.types';
import type { Circuit } from '@/labs/types';

// Re-export LabSection so callers that build Experiment objects only need to
// import from this single module during Phase 2.
export type { LabSection };

// ── LabType ───────────────────────────────────────────────────────────────
export type LabType =
  | 'breadboard'   // interactive 3D breadboard simulation (has a Circuit)
  | 'code'         // in-browser code editor / 8085 emulator (no Circuit)
  | 'simulation'   // non-breadboard simulator: ALU, cache, CPU … (no Circuit)
  | 'text';        // theory-only / reading page (no Circuit)

// ── ExploreMeta ───────────────────────────────────────────────────────────
// All the data the Explore page needs for a card — self-contained so Explore
// does not need to load full Experiment objects.
export interface ExploreMeta {
  /** 1-indexed semester number */
  semester: number;
  /** Display name of the containing subject (e.g. 'Analog Electronics') */
  subject: string;
  /** Card body copy — shown in the Explore grid and on the lab landing page */
  description: string;
  /** Used for filtering/search in the Explore UI */
  tags: readonly string[];
}

// ── Experiment ────────────────────────────────────────────────────────────
export interface Experiment {
  /**
   * Canonical slug — must match:
   *   • the URL segment  /labs/<id>
   *   • the content registry key in ALL_CONTENTS
   *   • the circuit's Circuit.id (when circuit is present)
   *   • the explore experiment id in EXPLORE_SEMESTERS
   *
   * This is the single source of truth; there is no separate circuitId,
   * contentId, or labRoute — they are all derived from this field.
   */
  id: string;

  /** Human-readable title shown in page headings and the Explore card */
  title: string;

  /** Determines which renderer/player the lab page uses */
  labType: LabType;

  /**
   * Explicit completeness signal.
   *
   * 'live'         — lab is finished and publicly accessible
   * 'coming-soon'  — placeholder; Explore badges/greys out the card and the
   *                  lab page shows a "coming soon" notice instead of content
   *
   * Do NOT infer this from `circuit` being defined — text/code labs are
   * legitimately circuit-less regardless of status.
   */
  status: 'live' | 'coming-soon';

  /** Data for the Explore page card */
  explore: ExploreMeta;

  /**
   * Breadboard circuit definition.
   * Required when labType === 'breadboard'.
   * Must be absent (or undefined) for 'text', 'code', and 'simulation' types.
   */
  circuit?: Circuit;

  /**
   * Lab page sections — reuses the existing LabSection union exactly so that
   * the Phase 2 toLabContent() adapter is trivial:
   *
   *   function toLabContent(exp: Experiment): LabContent {
   *     return { id: exp.id, title: exp.title,
   *               circuitId: exp.circuit?.id, labType: exp.labType,
   *               sections: exp.sections };
   *   }
   */
  sections: LabContent['sections'];

  /**
   * <title> tag override.
   * Falls back to `${title} — VLabs` when omitted.
   */
  metaTitle?: string;

  /**
   * <meta name="description"> override.
   * Falls back to explore.description when omitted.
   */
  metaDescription?: string;
}
