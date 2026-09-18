// ── src/experiments/adapters.ts ──────────────────────────────────────────────
// Bridge between the new Experiment schema and the legacy LabContent / Circuit
// registries.  Used only during the transition period — once all experiments
// are migrated the registries will import directly from src/experiments/.
//
// Both functions are pure and cheap: they just reshape an existing object, so
// calling them at module-load time (as the registry patches do) is fine.

import { type Experiment } from '@/experiments/types';
import { type LabContent }  from '@/labs/lab-content.types';
import { type Circuit }     from '@/labs/types';

// ── toLabContent ──────────────────────────────────────────────────────────────
// Projects an Experiment into the LabContent shape that ALL_CONTENTS and
// LabPage expect.  Near-identity — just picks the relevant fields.
export function toLabContent(exp: Experiment): LabContent {
  return {
    id:          exp.id,
    title:       exp.title,
    labType:     exp.labType === 'breadboard' ? 'breadboard'
                 : exp.labType === 'text'     ? 'text'
                 : exp.labType === 'code'     ? 'code'
                 : 'simulation',
    // circuitId only when there is an actual circuit; omit for text/code labs.
    ...(exp.circuit ? { circuitId: exp.circuit.id } : {}),
    sections: exp.sections,
  };
}

// ── toCircuit ─────────────────────────────────────────────────────────────────
// Returns the Circuit object for breadboard experiments, or undefined for
// text/code/simulation types.  Callers that need an array entry should filter
// out undefined values (the registry patch does this with .filter(Boolean)).
export function toCircuit(exp: Experiment): Circuit | undefined {
  return exp.circuit;
}
