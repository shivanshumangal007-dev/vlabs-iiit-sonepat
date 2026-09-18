import { type Experiment } from '@/experiments/types';

export const MuxBasedLogic: Experiment = {
  id: 'mux-based-logic',
  title: 'MUX-based Boolean Logic',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: '2:4 Binary Decoder',
    description: 'Implement arbitrary 2-variable Boolean functions (AND, OR, XOR) using only a 2:1 multiplexer. Foundation of FPGA LUT design.',
    tags: ['mux', 'lut', 'fpga', 'boolean function', 'universal gate'],
  },
  metaTitle: 'MUX-based Boolean Logic — VLabs',
  metaDescription: 'Implement arbitrary 2-variable Boolean functions (AND, OR, XOR) using only a 2:1 multiplexer. Foundation of FPGA LUT design.',
  circuit: {
  id: 'mux-based-logic',
  title: 'MUX-Based Logic: AND Function',
  description:
    'Implements the AND function using a 2:1 MUX structure (NOT + 2×AND + OR). ' +
    'By tying I0=GND (0), I1=B, and S=A, the MUX output Y = A·B. ' +
    'Demonstrates that multiplexers are universal logic elements.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── ICs (same MUX topology as mux-2to1) ────────────────────────────────
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 11, row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },
    { id: 'or1',  type: 'or-gate',  mountedAt: { board: 'bb', col: 22, row: 'e' } },

    // ── Output path ─────────────────────────────────────────────────────────
    { id: 'r_out',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_out', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 31, row: 'c' } },

    // ── Input wires: A (select) ─────────────────────────────────────────────
    // A → NOT (to generate NOT_A)
    { id: 'w_a_not', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'not1', pin: 'A' } },
    // A → AND2 pin A (S · I1 path: when S=1, pass I1)
    { id: 'w_a_and2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'and2', pin: 'A' } },

    // ── NOT_A → AND1 pin A ──────────────────────────────────────────────────
    { id: 'w_nota_and1', type: 'wire', color: 'white',
      from: { ic: 'not1', pin: 'Y' },
      to:   { ic: 'and1', pin: 'A' } },

    // ── I0 = GND → AND1 pin B (data=0 when S=0) ────────────────────────────
    { id: 'w_gnd_and1', type: 'wire', color: 'black',
      from: { board: 'bb', rail: 'gnd_top', col: 11 },
      to:   { ic: 'and1', pin: 'B' } },

    // ── Input wire: B (data I1) → AND2 pin B ───────────────────────────────
    { id: 'w_b_and2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'and2', pin: 'B' } },

    // ── AND outputs → OR ────────────────────────────────────────────────────
    { id: 'w_and1_or', type: 'wire', color: 'yellow',
      from: { ic: 'and1', pin: 'Y' },
      to:   { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or', type: 'wire', color: 'yellow',
      from: { ic: 'and2', pin: 'Y' },
      to:   { ic: 'or1', pin: 'B' } },

    // ── Output: OR.Y → resistor → LED → GND ────────────────────────────────
    { id: 'w_out_r', type: 'wire', color: 'green',
      from: { ic: 'or1', pin: 'Y' },
      to:   { component: 'r_out', end: 'p1' } },
    { id: 'w_out_led', type: 'wire', color: 'green',
      from: { component: 'r_out', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },
    { id: 'w_out_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Place breadboard',
      body: 'A 2:1 MUX can implement any 2-input function by choosing the right data inputs. ' +
        'Here we implement AND(A,B) by setting I0=0, I1=B, S=A.',
      show: ['bb'],
    },
    {
      title: 'Place NOT gate',
      body: 'NOT gate at col 4 inverts the select signal A. ' +
        'NOT_A enables the I0 path (and1) when A=0.',
      show: ['bb', 'not1'],
      highlight: 'not1',
    },
    {
      title: 'Place AND gates',
      body: 'AND1 at col 11: I0 path (NOT_A · GND = always 0). ' +
        'AND2 at col 18: I1 path (A · B = AB when A=1). ' +
        'Since I0 is tied to GND, the I0 path can never produce a 1.',
      show: ['bb', 'not1', 'and1', 'and2'],
      highlight: 'and1',
    },
    {
      title: 'Place OR gate',
      body: 'OR gate at col 22 combines both MUX data paths. ' +
        'Y = (NOT_A · 0) OR (A · B) = A · B.',
      show: ['bb', 'not1', 'and1', 'and2', 'or1'],
      highlight: 'or1',
    },
    {
      title: 'Wire inputs and internal connections',
      body: 'Red: A (col 1) → NOT and AND2.A (select). ' +
        'Blue: B (col 2) → AND2.B (data I1). ' +
        'Black: GND rail → AND1.B (I0=0). ' +
        'White: NOT.Y → AND1.A. Yellow: both AND outputs → OR inputs.',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add output components and wires',
      body: '330 Ω resistor at col 26, row c. Green LED at col 31, row c. ' +
        'OR.Y → resistor → LED → GND. The LED lights when Y=1 (both A and B are HIGH).',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
        'r_out', 'led_out', 'w_out_r', 'w_out_led', 'w_out_gnd',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=1, B=1 → Y=1',
      body: 'Both inputs HIGH. A=1 selects the I1 path: AND2 = 1·1 = 1. OR outputs 1. LED ON. ' +
        'This confirms the MUX implements AND correctly.',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
        'r_out', 'led_out', 'w_out_r', 'w_out_led', 'w_out_gnd',
      ],
      highlight: 'led_out',
      activeInputs: { A: 1, B: 1 },
    },
    {
      title: 'Test: A=1, B=0 → Y=0',
      body: 'A=1 selects I1 path, but B=0 so AND2 = 1·0 = 0. LED OFF. ' +
        'MUX faithfully reproduces AND behaviour.',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
        'r_out', 'led_out', 'w_out_r', 'w_out_led', 'w_out_gnd',
      ],
      activeInputs: { A: 1, B: 0 },
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['Y'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { Y: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Y: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Y: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Y: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A 2:1 MUX is a universal logic element in the sense that any two-variable Boolean function can be realised by connecting constant logic values (0 or 1) or one of the input variables to its two data inputs, while using the other variable as the select input. A 2ⁿ:1 MUX can implement any n-variable Boolean function with no additional gates by exhaustively mapping the function\'s truth table to the data inputs.',
        'For a 2:1 MUX with select S and data inputs D0, D1 — output Y = D0·S\' + D1·S. To implement any 2-variable function f(A, B), assign S = A (one variable controls selection), then set D0 and D1 based on the function\'s behaviour: D0 = f(A=0, B) = a function of B only; D1 = f(A=1, B) = a function of B only. The possible values for D0 and D1 are {0, 1, B, B\'}.',
        'Example implementations: AND(A,B) — with S=A: f(0,B)=0, f(1,B)=B → D0=0, D1=B. OR(A,B) — with S=A: f(0,B)=B, f(1,B)=1 → D0=B, D1=1. XOR(A,B) — with S=A: f(0,B)=B, f(1,B)=B\' → D0=B, D1=B\'. XNOR(A,B) — D0=B\', D1=B. These assignments are read directly from columns of the truth table where A=0 and A=1 respectively.',
        'MUX-based logic synthesis is practically important in FPGAs (Field-Programmable Gate Arrays), where each logic cell is a small MUX-based Look-Up Table (LUT). A 4-input LUT can implement any 4-variable Boolean function by programming its 16 data inputs. Understanding MUX-as-logic reduces design to a table look-up, eliminating the need for algebraic minimisation in hardware.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (for B\' when needed)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (output Y)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '1' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (A, B)', quantity: '2' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '20' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Construct the 2:1 MUX base circuit',
          body: 'Build the standard 2:1 MUX gate circuit from the previous experiment: NOT gate (74HC04) for S\', AND gate 1 computing D0·S\', AND gate 2 computing D1·S, OR gate for the final output Y. Use A as the select line S. Leave the D0 and D1 inputs accessible at the breadboard — these will be changed for each function being implemented.',
          circuitStepIndex: 0,
        },
        {
          label: 'Implement AND(A,B) using the MUX',
          body: 'For AND(A,B) with S=A: connect D0 to GND (constant logic 0) and D1 to input B. The MUX output Y = 0·A\' + B·A = A·B = AND(A,B). Test all four combinations (A,B) ∈ {00,01,10,11} and verify the output matches the AND truth table. Record the LED state for each combination.',
          circuitStepIndex: 1,
        },
        {
          label: 'Implement OR(A,B) using the MUX',
          body: 'For OR(A,B) with S=A: connect D0 to input B (f(0,B)=B) and D1 to +5V (constant logic 1, f(1,B)=1). The MUX output Y = B·A\' + 1·A = A\'B + A = A + B = OR(A,B). Test all four input combinations and verify the output matches the OR truth table. Compare with the direct OR gate output to confirm equivalence.',
          circuitStepIndex: 2,
        },
        {
          label: 'Implement XOR(A,B) using the MUX',
          body: "For XOR(A,B) with S=A: f(0,B)=B and f(1,B)=B' (the complement of B). Connect D0 to B and D1 to B' (output of the NOT gate driven by B instead of A — rewire the 74HC04 input to B for this step). The MUX output Y = B·A' + B'·A = A⊕B = XOR(A,B). Test all four combinations and verify the XOR truth table.",
          circuitStepIndex: 3,
        },
        {
          label: 'Document all three function implementations',
          body: 'Compile the observation table showing, for each function (AND, OR, XOR), the D0 and D1 connections used and the measured outputs for all four (A,B) input combinations. Verify that the MUX correctly realises each Boolean function purely by changing the D0 and D1 wiring — without modifying the MUX structure itself. This demonstrates the programmability of MUX-based logic.',
          circuitStepIndex: 4,
        },
        {
          label: 'Generalise: determine D0, D1 for any function',
          body: 'For an arbitrary 2-variable function f(A,B), write the truth table and read off: D0 = f evaluated with A=0 (a function of B alone); D1 = f evaluated with A=1 (a function of B alone). If D0 or D1 evaluates to a constant {0,1} or to B or B\', wire accordingly. This procedure generalises to any n-variable function using a 2^(n-1):1 MUX with one variable as the data inputs. Demonstrate with NAND(A,B) as an additional exercise.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'MUX-based function implementation. Select line S = A for all functions. D0 and D1 are chosen from the function truth table columns at A=0 and A=1 respectively.',
      ],
      table: {
        headers: ['Function', 'D0 (A=0 column)', 'D1 (A=1 column)', 'A=0,B=0', 'A=0,B=1', 'A=1,B=0', 'A=1,B=1'],
        rows: [
          ['AND(A,B)', '0', 'B', 0, 0, 0, 1],
          ['OR(A,B)', 'B', '1', 0, 1, 1, 1],
          ['XOR(A,B)', 'B', "B'", 0, 1, 1, 0],
          ['NAND(A,B)', '1', "B'", 1, 1, 1, 0],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The experiment demonstrates that a 2:1 MUX can implement any 2-variable Boolean function by appropriately connecting its data inputs to constant 0, constant 1, input B, or its complement B\'. The MUX itself requires no modification between functions.',
        'AND, OR, and XOR were successfully realised using the same MUX hardware. The observed outputs matched the expected truth tables in all twelve test cases (four combinations per function).',
        'This MUX-as-logic principle is the operational foundation of FPGA look-up tables (LUTs). In a commercial FPGA, each LUT\'s data bits are programmed during device configuration, effectively implementing any desired Boolean function in a single hardware cell. Understanding this concept bridges the gap between combinational logic theory and modern programmable hardware.',
      ],
    },
  ],
};
