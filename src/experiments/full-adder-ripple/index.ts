import { type Experiment } from '@/experiments/types';

export const FullAdderRipple: Experiment = {
  id: 'full-adder-ripple',
  title: 'Full Adder (4-bit Ripple Carry)',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Advanced Adder Circuits',
    description: 'Chain four full adders to build a 4-bit ripple-carry adder. Observe the cumulative carry propagation delay through all stages.',
    tags: ['ripple carry', '4-bit adder', 'carry propagation', 'alu', 'delay'],
  },
  metaTitle: 'Full Adder (4-bit Ripple Carry) — VLabs',
  metaDescription: 'Chain four full adders to build a 4-bit ripple-carry adder. Observe the cumulative carry propagation delay through all stages.',
  circuit: {
  id: 'full-adder-ripple',
  title: '4-bit Ripple Carry Adder',
  description:
    'A 4-bit ripple carry adder built from four cascaded full adders. Each full adder uses ' +
    '2 XOR gates, 2 AND gates, and 1 OR gate. The carry-out of each stage feeds the carry-in ' +
    'of the next. Inputs: A3A2A1A0 + B3B2B1B0 + Cin. Outputs: Cout, S3, S2, S1, S0.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── FA0 gates (bit 0, LSB) ─────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 8,  row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 8,  row: 'h' } },
    { id: 'or1',  type: 'or-gate',  mountedAt: { board: 'bb', col: 13, row: 'e' } },

    // ── FA1 gates (bit 1) ──────────────────────────────────────────────
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },
    { id: 'and3', type: 'and-gate', mountedAt: { board: 'bb', col: 18, row: 'h' } },
    { id: 'xor4', type: 'xor-gate', mountedAt: { board: 'bb', col: 23, row: 'e' } },
    { id: 'and4', type: 'and-gate', mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'or2',  type: 'or-gate',  mountedAt: { board: 'bb', col: 28, row: 'e' } },

    // ── FA2 gates (bit 2) ──────────────────────────────────────────────
    { id: 'xor5', type: 'xor-gate', mountedAt: { board: 'bb', col: 33, row: 'e' } },
    { id: 'and5', type: 'and-gate', mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'xor6', type: 'xor-gate', mountedAt: { board: 'bb', col: 38, row: 'e' } },
    { id: 'and6', type: 'and-gate', mountedAt: { board: 'bb', col: 38, row: 'h' } },
    { id: 'or3',  type: 'or-gate',  mountedAt: { board: 'bb', col: 43, row: 'e' } },

    // ── FA3 gates (bit 3, MSB) ─────────────────────────────────────────
    { id: 'xor7', type: 'xor-gate', mountedAt: { board: 'bb', col: 48, row: 'e' } },
    { id: 'and7', type: 'and-gate', mountedAt: { board: 'bb', col: 48, row: 'h' } },
    { id: 'xor8', type: 'xor-gate', mountedAt: { board: 'bb', col: 53, row: 'e' } },
    { id: 'and8', type: 'and-gate', mountedAt: { board: 'bb', col: 53, row: 'h' } },
    { id: 'or4',  type: 'or-gate',  mountedAt: { board: 'bb', col: 58, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    // Alternate top bank (row c) and bot bank (row h) to avoid tie-point shorts.
    // Within each bank, successive outputs are spaced 8 cols apart to prevent
    // LED cathode ↔ resistor p1 overlap (resistor spans 4 cols, LED spans 2).
    { id: 'r_s0',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 63, row: 'c' } },
    { id: 'r_s1',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 63, row: 'h' } },
    { id: 'r_s2',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 71, row: 'c' } },
    { id: 'r_s3',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 71, row: 'h' } },
    { id: 'r_cout', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 79, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s0',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 67, row: 'c' } },
    { id: 'led_s1',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 67, row: 'h' } },
    { id: 'led_s2',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 75, row: 'c' } },
    { id: 'led_s3',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 75, row: 'h' } },
    { id: 'led_cout', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 83, row: 'c' } },

    // ── FA0 inputs: A0, B0 ────────────────────────────────────────────────
    { id: 'w_a0_xor1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_a0_and1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b0_xor1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_b0_and1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },

    // ── FA0 Cin = GND ─────────────────────────────────────────────────────
    { id: 'w_cin_xor2', type: 'wire', color: 'black', from: { board: 'bb', rail: 'gnd_top', col: 7 }, to: { ic: 'xor2', pin: 'B' } },
    { id: 'w_cin_and2', type: 'wire', color: 'black', from: { board: 'bb', rail: 'gnd_top', col: 8 }, to: { ic: 'and2', pin: 'B' } },

    // ── FA0 internal wires ────────────────────────────────────────────────
    { id: 'w_xor1_xor2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'xor2', pin: 'A' } },
    { id: 'w_xor1_and2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'and2', pin: 'A' } },
    { id: 'w_and1_or1',  type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or1',  type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },

    // ── FA1 inputs: A1, B1 ────────────────────────────────────────────────
    { id: 'w_a1_xor3', type: 'wire', color: 'red',  from: { board: 'bb', col: 16, row: 'a' }, to: { ic: 'xor3', pin: 'A' } },
    { id: 'w_a1_and3', type: 'wire', color: 'red',  from: { board: 'bb', col: 16, row: 'b' }, to: { ic: 'and3', pin: 'A' } },
    { id: 'w_b1_xor3', type: 'wire', color: 'blue', from: { board: 'bb', col: 17, row: 'a' }, to: { ic: 'xor3', pin: 'B' } },
    { id: 'w_b1_and3', type: 'wire', color: 'blue', from: { board: 'bb', col: 17, row: 'b' }, to: { ic: 'and3', pin: 'B' } },

    // ── Carry: FA0 → FA1 (or1.Y → xor4.B, and4.B) ───────────────────────
    { id: 'w_c1_xor4', type: 'wire', color: 'purple', from: { ic: 'or1', pin: 'Y' }, to: { ic: 'xor4', pin: 'B' } },
    { id: 'w_c1_and4', type: 'wire', color: 'purple', from: { ic: 'or1', pin: 'Y' }, to: { ic: 'and4', pin: 'B' } },

    // ── FA1 internal wires ────────────────────────────────────────────────
    { id: 'w_xor3_xor4', type: 'wire', color: 'white', from: { ic: 'xor3', pin: 'Y' }, to: { ic: 'xor4', pin: 'A' } },
    { id: 'w_xor3_and4', type: 'wire', color: 'white', from: { ic: 'xor3', pin: 'Y' }, to: { ic: 'and4', pin: 'A' } },
    { id: 'w_and3_or2',  type: 'wire', color: 'yellow', from: { ic: 'and3', pin: 'Y' }, to: { ic: 'or2', pin: 'A' } },
    { id: 'w_and4_or2',  type: 'wire', color: 'yellow', from: { ic: 'and4', pin: 'Y' }, to: { ic: 'or2', pin: 'B' } },

    // ── FA2 inputs: A2, B2 ────────────────────────────────────────────────
    { id: 'w_a2_xor5', type: 'wire', color: 'red',  from: { board: 'bb', col: 31, row: 'a' }, to: { ic: 'xor5', pin: 'A' } },
    { id: 'w_a2_and5', type: 'wire', color: 'red',  from: { board: 'bb', col: 31, row: 'b' }, to: { ic: 'and5', pin: 'A' } },
    { id: 'w_b2_xor5', type: 'wire', color: 'blue', from: { board: 'bb', col: 32, row: 'a' }, to: { ic: 'xor5', pin: 'B' } },
    { id: 'w_b2_and5', type: 'wire', color: 'blue', from: { board: 'bb', col: 32, row: 'b' }, to: { ic: 'and5', pin: 'B' } },

    // ── Carry: FA1 → FA2 (or2.Y → xor6.B, and6.B) ───────────────────────
    { id: 'w_c2_xor6', type: 'wire', color: 'purple', from: { ic: 'or2', pin: 'Y' }, to: { ic: 'xor6', pin: 'B' } },
    { id: 'w_c2_and6', type: 'wire', color: 'purple', from: { ic: 'or2', pin: 'Y' }, to: { ic: 'and6', pin: 'B' } },

    // ── FA2 internal wires ────────────────────────────────────────────────
    { id: 'w_xor5_xor6', type: 'wire', color: 'white', from: { ic: 'xor5', pin: 'Y' }, to: { ic: 'xor6', pin: 'A' } },
    { id: 'w_xor5_and6', type: 'wire', color: 'white', from: { ic: 'xor5', pin: 'Y' }, to: { ic: 'and6', pin: 'A' } },
    { id: 'w_and5_or3',  type: 'wire', color: 'yellow', from: { ic: 'and5', pin: 'Y' }, to: { ic: 'or3', pin: 'A' } },
    { id: 'w_and6_or3',  type: 'wire', color: 'yellow', from: { ic: 'and6', pin: 'Y' }, to: { ic: 'or3', pin: 'B' } },

    // ── FA3 inputs: A3, B3 ────────────────────────────────────────────────
    { id: 'w_a3_xor7', type: 'wire', color: 'red',  from: { board: 'bb', col: 46, row: 'a' }, to: { ic: 'xor7', pin: 'A' } },
    { id: 'w_a3_and7', type: 'wire', color: 'red',  from: { board: 'bb', col: 46, row: 'b' }, to: { ic: 'and7', pin: 'A' } },
    { id: 'w_b3_xor7', type: 'wire', color: 'blue', from: { board: 'bb', col: 47, row: 'a' }, to: { ic: 'xor7', pin: 'B' } },
    { id: 'w_b3_and7', type: 'wire', color: 'blue', from: { board: 'bb', col: 47, row: 'b' }, to: { ic: 'and7', pin: 'B' } },

    // ── Carry: FA2 → FA3 (or3.Y → xor8.B, and8.B) ───────────────────────
    { id: 'w_c3_xor8', type: 'wire', color: 'purple', from: { ic: 'or3', pin: 'Y' }, to: { ic: 'xor8', pin: 'B' } },
    { id: 'w_c3_and8', type: 'wire', color: 'purple', from: { ic: 'or3', pin: 'Y' }, to: { ic: 'and8', pin: 'B' } },

    // ── FA3 internal wires ────────────────────────────────────────────────
    { id: 'w_xor7_xor8', type: 'wire', color: 'white', from: { ic: 'xor7', pin: 'Y' }, to: { ic: 'xor8', pin: 'A' } },
    { id: 'w_xor7_and8', type: 'wire', color: 'white', from: { ic: 'xor7', pin: 'Y' }, to: { ic: 'and8', pin: 'A' } },
    { id: 'w_and7_or4',  type: 'wire', color: 'yellow', from: { ic: 'and7', pin: 'Y' }, to: { ic: 'or4', pin: 'A' } },
    { id: 'w_and8_or4',  type: 'wire', color: 'yellow', from: { ic: 'and8', pin: 'Y' }, to: { ic: 'or4', pin: 'B' } },

    // ── S0 output: xor2.Y → r_s0 → led_s0 → GND ─────────────────────────
    { id: 'w_s0_r',   type: 'wire', color: 'green', from: { ic: 'xor2', pin: 'Y' },       to: { component: 'r_s0', end: 'p1' } },
    { id: 'w_s0_led', type: 'wire', color: 'green', from: { component: 'r_s0', end: 'p2' }, to: { led: 'led_s0', end: 'anode' } },
    { id: 'w_s0_gnd', type: 'wire', color: 'black', from: { led: 'led_s0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 68 } },

    // ── S1 output: xor4.Y → r_s1 → led_s1 → GND ─────────────────────────
    { id: 'w_s1_r',   type: 'wire', color: 'green', from: { ic: 'xor4', pin: 'Y' },       to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'green', from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black', from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 69 } },

    // ── S2 output: xor6.Y → r_s2 → led_s2 → GND ─────────────────────────
    { id: 'w_s2_r',   type: 'wire', color: 'green', from: { ic: 'xor6', pin: 'Y' },       to: { component: 'r_s2', end: 'p1' } },
    { id: 'w_s2_led', type: 'wire', color: 'green', from: { component: 'r_s2', end: 'p2' }, to: { led: 'led_s2', end: 'anode' } },
    { id: 'w_s2_gnd', type: 'wire', color: 'black', from: { led: 'led_s2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 76 } },

    // ── S3 output: xor8.Y → r_s3 → led_s3 → GND ─────────────────────────
    { id: 'w_s3_r',   type: 'wire', color: 'green', from: { ic: 'xor8', pin: 'Y' },       to: { component: 'r_s3', end: 'p1' } },
    { id: 'w_s3_led', type: 'wire', color: 'green', from: { component: 'r_s3', end: 'p2' }, to: { led: 'led_s3', end: 'anode' } },
    { id: 'w_s3_gnd', type: 'wire', color: 'black', from: { led: 'led_s3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 76 } },

    // ── Cout output: or4.Y → r_cout → led_cout → GND ─────────────────────
    { id: 'w_cout_r',   type: 'wire', color: 'orange', from: { ic: 'or4', pin: 'Y' },         to: { component: 'r_cout', end: 'p1' } },
    { id: 'w_cout_led', type: 'wire', color: 'yellow', from: { component: 'r_cout', end: 'p2' }, to: { led: 'led_cout', end: 'anode' } },
    { id: 'w_cout_gnd', type: 'wire', color: 'black',  from: { led: 'led_cout', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 84 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The base for our 4-bit ripple carry adder. This circuit chains four full adders, ' +
        'requiring 20 logic gates (8 XOR, 8 AND, 4 OR) and significant wiring.',
      show: ['bb'],
    },
    {
      title: 'Place FA0 gates (bit 0, LSB)',
      body: 'Full Adder 0: xor1 (col 3), and1 (col 3 row h), xor2 (col 8), and2 (col 8 row h), or1 (col 13). ' +
        'FA0 handles the least-significant bit (A0 + B0 + Cin).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1'],
      highlight: 'xor1',
    },
    {
      title: 'Place FA1 gates (bit 1)',
      body: 'Full Adder 1: xor3 (col 18), and3 (col 18 row h), xor4 (col 23), and4 (col 23 row h), or2 (col 28). ' +
        'FA1 handles the next bit (A1 + B1 + C1).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2'],
      highlight: 'xor3',
    },
    {
      title: 'Place FA2 gates (bit 2)',
      body: 'Full Adder 2: xor5 (col 33), and5 (col 33 row h), xor6 (col 38), and6 (col 38 row h), or3 (col 43). ' +
        'FA2 handles bit 2 (A2 + B2 + C2).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3'],
      highlight: 'xor5',
    },
    {
      title: 'Place FA3 gates (bit 3, MSB)',
      body: 'Full Adder 3: xor7 (col 48), and7 (col 48 row h), xor8 (col 53), and8 (col 53 row h), or4 (col 58). ' +
        'FA3 handles the most-significant bit (A3 + B3 + C3).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4'],
      highlight: 'xor7',
    },
    {
      title: 'Place output resistors and LEDs',
      body: '330 Ω resistors and LEDs for S0–S3 (green) and Cout (yellow). ' +
        'Five output indicators show the 5-bit result {Cout, S3, S2, S1, S0}.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout'],
      highlight: 'led_s0',
    },
    {
      title: 'Wire FA0 inputs (A0, B0, Cin=GND)',
      body: 'Red = A0 (col 1), Blue = B0 (col 2), each to xor1 and and1. ' +
        'Black = Cin tied to GND rail (no initial carry).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA0 internal connections',
      body: 'White: xor1.Y → xor2.A and and2.A. Yellow: and1.Y → or1.A, and2.Y → or1.B.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA1 inputs and carry FA0→FA1',
      body: 'Red = A1 (col 16), Blue = B1 (col 17). Purple wires: or1.Y (FA0 carry-out) → xor4.B and and4.B (FA1 carry-in).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_c1_xor4', 'w_c1_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA2 inputs and carry FA1→FA2',
      body: 'Red = A2 (col 31), Blue = B2 (col 32). Purple wires: or2.Y (FA1 carry-out) → xor6.B and and6.B (FA2 carry-in).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_c1_xor4', 'w_c1_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2',
        'w_a2_xor5', 'w_a2_and5', 'w_b2_xor5', 'w_b2_and5',
        'w_c2_xor6', 'w_c2_and6',
        'w_xor5_xor6', 'w_xor5_and6', 'w_and5_or3', 'w_and6_or3'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA3 inputs, carry FA2→FA3, and all outputs',
      body: 'Red = A3 (col 46), Blue = B3 (col 47). Purple: or3.Y → FA3 carry-in. ' +
        'Output wires: S0–S3 and Cout each through 330 Ω resistor to LED to GND. ' +
        'Test: 1111 + 1111 = 11110 → S0=0, S1=1, S2=1, S3=1, Cout=1.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_c1_xor4', 'w_c1_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2',
        'w_a2_xor5', 'w_a2_and5', 'w_b2_xor5', 'w_b2_and5',
        'w_c2_xor6', 'w_c2_and6',
        'w_xor5_xor6', 'w_xor5_and6', 'w_and5_or3', 'w_and6_or3',
        'w_a3_xor7', 'w_a3_and7', 'w_b3_xor7', 'w_b3_and7',
        'w_c3_xor8', 'w_c3_and8',
        'w_xor7_xor8', 'w_xor7_and8', 'w_and7_or4', 'w_and8_or4',
        'w_s0_r', 'w_s0_led', 'w_s0_gnd',
        'w_s1_r', 'w_s1_led', 'w_s1_gnd',
        'w_s2_r', 'w_s2_led', 'w_s2_gnd',
        'w_s3_r', 'w_s3_led', 'w_s3_gnd',
        'w_cout_r', 'w_cout_led', 'w_cout_gnd'],
      highlight: 'led_cout',
      activeInputs: { A0: 1, B0: 1, A1: 1, B1: 1, A2: 1, B2: 1, A3: 1, B3: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A3', 'A2', 'A1', 'A0', 'B3', 'B2', 'B1', 'B0'],
    outputs: ['Cout', 'S3', 'S2', 'S1', 'S0'],
    rows: [
      // 0000 + 0000 = 00000
      { inputs: { A3: 0, A2: 0, A1: 0, A0: 0, B3: 0, B2: 0, B1: 0, B0: 0 }, outputs: { Cout: 0, S3: 0, S2: 0, S1: 0, S0: 0 } },
      // 0001 + 0010 = 00011
      { inputs: { A3: 0, A2: 0, A1: 0, A0: 1, B3: 0, B2: 0, B1: 1, B0: 0 }, outputs: { Cout: 0, S3: 0, S2: 0, S1: 1, S0: 1 } },
      // 0011 + 0101 = 01000
      { inputs: { A3: 0, A2: 0, A1: 1, A0: 1, B3: 0, B2: 1, B1: 0, B0: 1 }, outputs: { Cout: 0, S3: 1, S2: 0, S1: 0, S0: 0 } },
      // 0111 + 0001 = 01000
      { inputs: { A3: 0, A2: 1, A1: 1, A0: 1, B3: 0, B2: 0, B1: 0, B0: 1 }, outputs: { Cout: 0, S3: 1, S2: 0, S1: 0, S0: 0 } },
      // 1010 + 0101 = 01111
      { inputs: { A3: 1, A2: 0, A1: 1, A0: 0, B3: 0, B2: 1, B1: 0, B0: 1 }, outputs: { Cout: 0, S3: 1, S2: 1, S1: 1, S0: 1 } },
      // 1111 + 0001 = 10000
      { inputs: { A3: 1, A2: 1, A1: 1, A0: 1, B3: 0, B2: 0, B1: 0, B0: 1 }, outputs: { Cout: 1, S3: 0, S2: 0, S1: 0, S0: 0 } },
      // 1111 + 1111 = 11110
      { inputs: { A3: 1, A2: 1, A1: 1, A0: 1, B3: 1, B2: 1, B1: 1, B0: 1 }, outputs: { Cout: 1, S3: 1, S2: 1, S1: 1, S0: 0 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Ripple Carry Adder (RCA) is formed by chaining multiple Full Adder stages in series, with the Carry-out (Cout) of each stage connected to the Carry-in (Cin) of the next more-significant stage. A 4-bit RCA can add two 4-bit numbers A[3:0] and B[3:0] to produce a 4-bit sum S[3:0] and a final carry-out C4. The least-significant bit (bit 0) has Cin = 0 (no initial carry).',
        'The fundamental limitation of the RCA is carry propagation latency. The worst-case scenario occurs when the carry must ripple through all stages: e.g., A = 0111 and B = 0001 → the carry generated at bit 0 propagates through bits 1, 2, and 3. Total worst-case delay = n × t_pd(FA), where n is the number of bits and t_pd(FA) is the carry-propagation delay of one Full Adder stage (approximately 2× t_pd(gate) for the AND+OR carry path).',
        'For a 74HC implementation with t_pd ≈ 7 ns per gate: each Full Adder\'s carry path involves one AND gate and one OR gate, giving t_pd(carry) ≈ 14 ns per stage. A 4-bit RCA has a worst-case latency of 4 × 14 = 56 ns. This limits the maximum clock frequency of any synchronous circuit using this adder. Carry Look-Ahead Adders (CLAs) resolve this by computing all carries simultaneously, reducing latency to O(log n) gate delays.',
        'The 4-bit RCA requires four sets of Full Adder gate circuits: 4× XOR pairs (8 XOR gates total → two 74HC86 ICs), 4× AND pairs (8 AND gates total → two 74HC08 ICs), 4× OR gates (4 gates total → one 74HC32 IC). The carry chain connections (C0→C1→C2→C3→C4) form the critical path. Sum outputs S[3:0] and the final carry C4 are displayed on five LEDs.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14 (2 ICs for 8 XOR gates)', quantity: '2' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (2 ICs for 8 AND gates)', quantity: '2' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14 (1 IC for 4 OR gates)', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Sum bits S3:S0)', quantity: '4' },
        { name: 'LED', specification: 'Red, 5 mm (Carry-out C4)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '5' },
        { name: 'SPDT Switch / Jumper', specification: 'Inputs A[3:0] and B[3:0]', quantity: '8' },
        { name: 'DC Power Supply', specification: '5 V regulated, ≥ 500 mA', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '2' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '50' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Plan the layout and set up power rails',
          body: 'Use two breadboards side by side to accommodate all five ICs and the wiring. Assign one breadboard to the lower two Full Adder stages (FA0, FA1) and the other to FA2, FA3, and the output LEDs. Connect the 5 V supply to the power rails of both breadboards and link the ground rails together with a jumper. Place bypass capacitors (100 nF) on each IC. Set up eight input switches for A[3:0] and B[3:0] on the first breadboard.',
          circuitStepIndex: 0,
        },
        {
          label: 'Build and wire FA0 (bit 0, LSB)',
          body: 'Implement the Full Adder for bit 0: XOR gate 1 computes P0 = A0⊕B0; XOR gate 2 computes S0 = P0⊕C0 (with C0 tied to GND, since there is no carry into the LSB). AND gate 1 computes A0·B0; AND gate 2 computes P0·C0 = 0 (for C0=0 this is always 0). OR gate produces C1 = A0·B0 + P0·C0 = A0·B0. Connect the green LED for S0. Note C1 output — this feeds FA1.',
          circuitStepIndex: 1,
        },
        {
          label: 'Build and wire FA1, FA2, FA3',
          body: 'Replicate the Full Adder structure for FA1 (using A1, B1, Cin=C1), FA2 (A2, B2, Cin=C2), and FA3 (A3, B3, Cin=C3). For each stage, connect the Cout of the previous stage to the Cin of the current stage — this is the carry-ripple chain. Each stage produces a Sum LED (S1, S2, S3) and a carry-out (C2, C3, C4 respectively). Connect the red LED for C4 (final carry-out).',
          circuitStepIndex: 4,
        },
        {
          label: 'Verify carry chain wiring',
          body: 'Trace the carry chain: GND → C0 (FA0 Cin) → C1 (FA0 Cout / FA1 Cin) → C2 (FA1 Cout / FA2 Cin) → C3 (FA2 Cout / FA3 Cin) → C4 (FA3 Cout / final carry LED). Use a multimeter to verify continuity at each carry junction point. Any break in the carry chain will cause all higher-order bits to produce incorrect results — this is the most common wiring error in RCA construction.',
          circuitStepIndex: 10,
        },
        {
          label: 'Test with selected binary additions',
          body: 'Test the following additions and verify the binary outputs: (a) 0001 + 0001 = 0010 (1+1=2); (b) 0111 + 0001 = 1000 (7+1=8, tests carry ripple through 3 stages); (c) 1111 + 0001 = 10000 (15+1=16, S=0000, C4=1); (d) 0101 + 0011 = 1000 (5+3=8); (e) 1010 + 0110 = 10000 (10+6=16, C4=1). Record binary inputs and observed LED outputs for each.',
          circuitStepIndex: 10,
        },
        {
          label: 'Test worst-case carry propagation',
          body: 'Set A = 0111 (0,1,1,1) and B = 0001 (0,0,0,1). The carry must propagate from bit 0 through bits 1, 2, and 3. Expected result: 0111 + 0001 = 1000 (S = 1000, C4 = 0). Verify all four Sum LEDs and C4. Then try A = 1111, B = 0001: expected S = 0000 with C4 = 1. These worst-case patterns exercise the full carry ripple chain and are the critical test vectors for RCA validation.',
          circuitStepIndex: 10,
        },
        {
          label: 'Measure carry ripple delay with oscilloscope',
          body: 'Drive A[3:0] = 0111 and B[3:0] = 0001 with a pulse generator (A0 toggling at 1 MHz, others static). Monitor the A0 input (Ch1) and S3 output (Ch2) on the oscilloscope. The delay from A0 edge to S3 settling is the carry ripple delay through 4 stages. Measure and compare with the calculated estimate (4 × 14 ns = 56 ns for 74HC). This empirically validates the RCA timing model.',
          circuitStepIndex: 10,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        '4-bit RCA test results. A and B are 4-bit binary inputs (MSB first). S[3:0] is the 4-bit sum output and C4 is the carry-out.',
      ],
      table: {
        headers: ['A (decimal)', 'B (decimal)', 'A[3:0]', 'B[3:0]', 'S[3:0] observed', 'C4 obs', 'Expected sum'],
        rows: [
          [1, 1, '0001', '0001', '0010', 0, 2],
          [7, 1, '0111', '0001', '1000', 0, 8],
          [5, 3, '0101', '0011', '1000', 0, 8],
          [10, 6, '1010', '0110', '0000', 1, 16],
          [15, 1, '1111', '0001', '0000', 1, 16],
          [15, 15, '1111', '1111', '1110', 1, 30],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'A 4-bit Ripple Carry Adder was successfully constructed and tested using 74HC-series ICs. All six test vector additions produced correct Sum and Carry-out values, including cases requiring carry propagation through all four stages.',
        'The worst-case carry ripple delay was measured at approximately 54–58 ns (4 stages × ~14 ns/stage), confirming the linear O(n) latency growth of the RCA architecture. This sets an upper bound on the operating frequency of any synchronous circuit employing this adder.',
        'The experiment reinforces the trade-off between circuit simplicity (RCA uses the minimum number of gates) and speed (CLA or prefix adders offer O(log n) carry latency). For small bit widths (≤ 8 bits) and low-frequency applications, the RCA is practical; for high-speed arithmetic in processors, carry look-ahead or Kogge-Stone adder topologies are preferred.',
      ],
    },
  ],
};
