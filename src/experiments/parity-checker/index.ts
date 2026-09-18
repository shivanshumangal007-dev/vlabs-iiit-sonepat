import { type Experiment } from '@/experiments/types';

export const ParityChecker: Experiment = {
  id: 'parity-checker',
  title: 'Parity Checker/Generator',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Digital Logic Design',
    description: 'Build an even/odd parity generator and checker circuit using XOR gates. Verify error-detection capability by introducing single-bit errors.',
    tags: ['parity', 'error detection', 'xor', 'parity checker', 'parity generator'],
  },
  metaTitle: 'Parity Checker/Generator — VLabs',
  metaDescription: 'Build an even/odd parity generator and checker circuit using XOR gates. Verify error-detection capability by introducing single-bit errors.',
  circuit: {
  id: 'parity-checker',
  title: 'Even and Odd Parity Checker/Generator',
  description:
    'Build a 4-bit even parity generator using an XOR gate chain. ' +
    'Verify error detection by checking parity of received data plus parity bit.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── XOR gates ─────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 11, row: 'e' } },
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },

    // ── Output path ───────────────────────────────────────────────────────
    { id: 'r_p',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_p', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 26, row: 'c' } },

    // ── Input wires: B3, B2 → xor1 ───────────────────────────────────────
    { id: 'w_b3_xor1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_b2_xor1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'xor1', pin: 'B' } },

    // ── Input wires: B1, B0 → xor2 ───────────────────────────────────────
    { id: 'w_b1_xor2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'xor2', pin: 'A' } },
    { id: 'w_b0_xor2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'xor2', pin: 'B' } },

    // ── Internal: xor1.Y → xor3.A, xor2.Y → xor3.B ───────────────────────
    { id: 'w_xor1_xor3', type: 'wire', color: 'orange',
      from: { ic: 'xor1', pin: 'Y' },
      to:   { ic: 'xor3', pin: 'A' } },
    { id: 'w_xor2_xor3', type: 'wire', color: 'purple',
      from: { ic: 'xor2', pin: 'Y' },
      to:   { ic: 'xor3', pin: 'B' } },

    // ── Output: xor3.Y → r_p → led_p → GND ──────────────────────────────
    { id: 'w_xor3_rp', type: 'wire', color: 'green',
      from: { ic: 'xor3', pin: 'Y' },
      to:   { component: 'r_p', end: 'p1' } },
    { id: 'w_rp_led', type: 'wire', color: 'green',
      from: { component: 'r_p', end: 'p2' },
      to:   { led: 'led_p', end: 'anode' } },
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_p', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. The centre gap isolates both banks. ' +
        'Red rail = VCC (+5 V), blue rail = GND. ' +
        'We will build a 4-bit even parity generator using three XOR gates chained together.',
      show: ['bb'],
    },
    {
      title: 'Place xor1 — first stage (B3 ⊕ B2)',
      body: 'Mount a 74HC86 XOR gate at column 4, row e. ' +
        'This gate computes the XOR of the two most-significant bits B3 and B2.',
      show: ['bb', 'xor1'],
      highlight: 'xor1',
    },
    {
      title: 'Place xor2 — second stage (B1 ⊕ B0)',
      body: 'Mount a second 74HC86 XOR gate at column 11. ' +
        'This gate computes the XOR of the two least-significant bits B1 and B0.',
      show: ['bb', 'xor1', 'xor2'],
      highlight: 'xor2',
    },
    {
      title: 'Place xor3 — final stage (parity bit P)',
      body: 'Mount a third 74HC86 XOR gate at column 18. ' +
        'This gate combines the outputs of xor1 and xor2: P = (B3⊕B2)⊕(B1⊕B0).',
      show: ['bb', 'xor1', 'xor2', 'xor3'],
      highlight: 'xor3',
    },
    {
      title: 'Wire inputs B3, B2, B1, B0',
      body: 'Red wires: col 1 row a → xor1.A (B3), col 2 row a → xor2.A (B1). ' +
        'Blue wires: col 1 row b → xor1.B (B2), col 2 row b → xor2.B (B0).',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Connect internal wires (xor1.Y → xor3.A, xor2.Y → xor3.B)',
      body: 'Orange wire: xor1 output → xor3 input A. ' +
        'Purple wire: xor2 output → xor3 input B. ' +
        'The two partial parities now feed the final XOR stage.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Add resistor and parity LED',
      body: 'Insert 330 Ω resistor at col 22, row c (p1=22, p2=25). ' +
        'Insert green LED at col 26, row c (anode=26, cathode=27). ' +
        'Wire: xor3.Y → r_p.p1; r_p.p2 → led_p.anode; led_p.cathode → GND rail.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Test: B=0000 → P=0 (even)',
      body: 'All four inputs LOW. XOR of all zeros = 0. Even parity bit = 0. LED OFF. ' +
        'Even parity means the total count of 1s (including P) is even.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Test: B=1010 → P=0 (even)',
      body: 'B3=1, B2=0, B1=1, B0=0. XOR chain: 1⊕0=1, 1⊕0=1, 1⊕1=0. P=0. LED OFF. ' +
        'Data has 2 ones — already even, so parity bit = 0.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 1, B2: 0, B1: 1, B0: 0 },
    },
    {
      title: 'Test: B=1011 → P=1 (odd data, parity corrects)',
      body: 'B3=1, B2=0, B1=1, B0=1. XOR chain: 1⊕0=1, 1⊕1=0, 1⊕0=1. P=1. LED ON. ' +
        'Data has 3 ones — odd count, so parity bit = 1 to make total even.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 1, B2: 0, B1: 1, B0: 1 },
      highlight: 'led_p',
    },
  ],

  truthTable: {
    inputs:  ['B3', 'B2', 'B1', 'B0'],
    outputs: ['P'],
    rows: [
      { inputs: { B3: 0, B2: 0, B1: 0, B0: 0 }, outputs: { P: 0 } },
      { inputs: { B3: 1, B2: 0, B1: 1, B0: 0 }, outputs: { P: 0 } },
      { inputs: { B3: 1, B2: 0, B1: 1, B0: 1 }, outputs: { P: 1 } },
      { inputs: { B3: 1, B2: 1, B1: 0, B0: 0 }, outputs: { P: 0 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Parity is the simplest form of error detection used in digital communication. An even parity ' +
        'generator appends a parity bit P to a data word such that the total number of 1s in the ' +
        'transmitted word (data + parity bit) is always even. An odd parity generator does the opposite ' +
        '— it ensures the total count of 1s is always odd.',

        'For a 4-bit data word B3 B2 B1 B0, the even parity bit is computed as: ' +
        '$$P = B_3 \\oplus B_2 \\oplus B_1 \\oplus B_0$$ ' +
        'The XOR operation returns 1 only when an odd number of its inputs are 1. Therefore, if the ' +
        'data word already has an even number of 1s, P = 0 (no correction needed); if it has an odd ' +
        'number of 1s, P = 1 (parity bit makes the total even).',

        'The XOR gate chain is the natural implementation: two XOR gates compute partial parities ' +
        '(B3⊕B2) and (B1⊕B0), and a third XOR gate combines them to produce the final parity bit. ' +
        'This cascaded structure scales to any word width — an n-bit parity generator requires n−1 XOR gates.',

        'Odd parity is simply the complement of even parity. It can be generated by replacing the final ' +
        'XOR gate with an XNOR gate, or by adding an inverter after the XOR chain output. ' +
        'Parity checking at the receiver re-computes the parity of the received data plus the received ' +
        'parity bit — if the result is non-zero (for even) or zero (for odd), a single-bit error is detected. ' +
        'Note that parity cannot detect two-bit errors, as two simultaneous bit flips cancel each other out.',

        'The 74HC86 quad 2-input XOR IC (CMOS, 2 V–6 V, DIP-14) is used here. Three of its four internal ' +
        'gates are used to implement the XOR chain. A 330 Ω current-limiting resistor protects the green ' +
        'output LED from excessive current.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC86 XOR Gate IC',       specification: 'Quad 2-input XOR, DIP-14, 5 V supply',         quantity: '1' },
        { name: 'Green LED',                specification: '5 mm, forward voltage ≈ 2.0 V (parity output)', quantity: '1' },
        { name: 'Resistor 330 Ω',           specification: '¼ W, carbon film, current limiter for LED',    quantity: '1' },
        { name: 'DIP Switch (4-position)',  specification: 'For toggling B3, B2, B1, B0 inputs',           quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
        { name: 'Digital Multimeter',       specification: 'For verifying supply voltage and continuity',  quantity: '1' },
        { name: 'Connecting Wires',         specification: 'M-M jumper wires, assorted colours',           quantity: '1 set' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Inspect and place the breadboard.',
          circuitStepIndex: 0,
          body: 'Place the breadboard on a clean, dry surface. Identify the terminal strips and power rails. ' +
            'The centre gap isolates both banks. Red rail = VCC (+5 V), blue rail = GND.',
        },
        {
          label: 'Place xor1 at column 4 (B3 ⊕ B2).',
          circuitStepIndex: 1,
          body: 'Mount a 74HC86 DIP-14 IC straddling the centre gap at column 4. ' +
            'Notch faces left. This gate computes the XOR of the two most-significant bits B3 and B2.',
        },
        {
          label: 'Place xor2 at column 11 (B1 ⊕ B0).',
          circuitStepIndex: 2,
          body: 'Mount a second 74HC86 at column 11. This gate computes the XOR of B1 and B0.',
        },
        {
          label: 'Place xor3 at column 18 (final parity).',
          circuitStepIndex: 3,
          body: 'Mount a third 74HC86 at column 18. ' +
            'This gate produces the final even parity bit P = (B3⊕B2) ⊕ (B1⊕B0).',
        },
        {
          label: 'Wire the four data inputs.',
          circuitStepIndex: 4,
          body: 'Red wire: col 1 row a → xor1 pin A (B3). Blue wire: col 1 row b → xor1 pin B (B2). ' +
            'Red wire: col 2 row a → xor2 pin A (B1). Blue wire: col 2 row b → xor2 pin B (B0). ' +
            'Connect DIP switch outputs to these four column positions.',
        },
        {
          label: 'Connect internal wires between XOR stages.',
          circuitStepIndex: 5,
          body: 'Orange wire: xor1 output Y → xor3 input A. ' +
            'Purple wire: xor2 output Y → xor3 input B. ' +
            'These carry the two partial parity results to the final stage.',
        },
        {
          label: 'Add resistor, LED, and ground return.',
          circuitStepIndex: 6,
          body: 'Insert 330 Ω resistor at col 22, row c. ' +
            'Insert green LED at col 26, row c (anode at col 26, cathode at col 27). ' +
            'Wire: xor3.Y → r_p.p1; r_p.p2 → led_p.anode; led_p.cathode → GND rail. ' +
            'Connect VCC and GND pins of all three ICs to the power rails.',
        },
        {
          label: 'Test: B=0000 → P=0 (even parity).',
          circuitStepIndex: 7,
          body: 'Set all four DIP switches LOW (0000). ' +
            'XOR chain: 0⊕0=0, 0⊕0=0, 0⊕0=0. P=0. LED is OFF. ' +
            'Total 1s in transmitted word (0000 0) = 0, which is even. Correct.',
        },
        {
          label: 'Test remaining input combinations.',
          circuitStepIndex: 9,
          body: 'Test B=1010 (P=0, 2 ones already even), B=1011 (P=1, 3 ones made even), B=1111 (P=0). ' +
            'Record your LED observations and compare with the expected truth table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. Three 74HC86 ICs powered from the same VCC/GND rails.',
        'Green LED forward voltage ≈ 2.0 V. Series resistor = 330 Ω.',
        'LED current when ON: I = (5 − 2.0) / 330 ≈ 9.1 mA.',
      ],
      table: {
        headers: ['B3', 'B2', 'B1', 'B0', 'P (even)', 'LED'],
        rows: [
          [0, 0, 0, 0, 0, 'OFF'],
          [1, 0, 1, 0, 0, 'OFF'],
          [1, 0, 1, 1, 1, 'ON' ],
          [1, 1, 1, 1, 0, 'OFF'],
          [0, 0, 0, 1, 1, 'ON' ],
          [1, 1, 1, 0, 1, 'ON' ],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4-bit even parity generator was successfully built using three 74HC86 XOR gates chained ' +
        'together on a breadboard. The green LED correctly indicated the even parity bit for all tested ' +
        'input combinations, confirming the XOR chain computes P = B3 ⊕ B2 ⊕ B1 ⊕ B0.',

        'Even parity was verified: for data words with an odd count of 1s, P = 1 (LED ON); ' +
        'for data words with an even count of 1s, P = 0 (LED OFF). This ensures the total transmitted ' +
        'word always has an even number of 1s, enabling single-bit error detection.',

        'This experiment demonstrates the foundational role of XOR gates in error detection circuits. ' +
        'The same cascaded XOR structure scales to any word width and is used in RAM parity checking, ' +
        'RAID storage systems, and serial communication protocols such as UART with parity.',
      ],
    },
  ],
};
