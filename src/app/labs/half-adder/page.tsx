// ── Transitional static page ──────────────────────────────────────────────────
// This file kept in place for Phase 4 (static-route deletion).
// Content previously came from src/labs/content/half-adder.ts (now deleted);
// it is now sourced via ALL_CONTENTS which merges from src/experiments/half-adder/.
import { ALL_CONTENTS } from '@/labs/content/index';
import { LabPage }      from '@/labs/LabPage';

export const metadata = {
  title: 'Half Adder — VLabs',
  description:
    'Step-by-step interactive 3D assembly of a half adder circuit. ' +
    'Build it on a breadboard using a XOR gate, AND gate, LEDs and resistors.',
};

export default function HalfAdderPage() {
  return <LabPage content={ALL_CONTENTS['half-adder']} />;
}
