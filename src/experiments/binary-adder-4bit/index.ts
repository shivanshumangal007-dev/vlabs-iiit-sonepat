import { type Experiment } from '@/experiments/types';

export const BinaryAdder4bit: Experiment = {
  id: 'binary-adder-4bit',
  title: '4-bit Binary Adder using 74HC283',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Combinational Logic',
    description: 'Use the 74HC283 4-bit full adder IC to add two 4-bit numbers. Observe carry-out and verify the sum for all operand combinations.',
    tags: ['adder', '4-bit', '74hc283', 'carry-out', 'combinational'],
  },
  metaTitle: '4-bit Binary Adder using 74HC283 — VLabs',
  metaDescription: 'Use the 74HC283 4-bit full adder IC to add two 4-bit numbers. Observe carry-out and verify the sum for all operand combinations.',
  circuit: {
  id: 'binary-adder-4bit',
  title: '4-bit Binary Adder using 74HC283',
  description:
    'Adds two 4-bit binary numbers A (A4–A1) and B (B4–B1) to produce a 4-bit Sum (S4–S1) ' +
    'and a Carry-out (C4). ' +
    'Uses the 74HC283 ripple-carry 4-bit full adder IC. C0 (carry-in) is tied to GND.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC283 IC ────────────────────────────────────────────────────────
    { id: 'adder', type: 'adder-4bit', mountedAt: { board: 'bb', col: 7, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_s1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'r_s2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'r_s3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'r_s4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 29, row: 'h' } },
    { id: 'r_c4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 36, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s1', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_s2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_s3', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 33, row: 'c' } },
    { id: 'led_s4', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'led_c4', type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 40, row: 'c' } },

    // ── C0 tied to GND ────────────────────────────────────────────────────
    { id: 'w_c0_gnd', type: 'wire', color: 'black',
      from: { ic: 'adder', pin: 'c0' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── A input wires (row a) ─────────────────────────────────────────────
    { id: 'w_a1_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'adder', pin: 'a1' } },
    { id: 'w_a2_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'adder', pin: 'a2' } },
    { id: 'w_a3_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'adder', pin: 'a3' } },
    { id: 'w_a4_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'adder', pin: 'a4' } },

    // ── B input wires (row b) ─────────────────────────────────────────────
    { id: 'w_b1_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'adder', pin: 'b1' } },
    { id: 'w_b2_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'adder', pin: 'b2' } },
    { id: 'w_b3_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'adder', pin: 'b3' } },
    { id: 'w_b4_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'adder', pin: 'b4' } },

    // ── Output wires: sum pins → resistors → LEDs → GND ──────────────────
    { id: 'w_s1_r',  type: 'wire', color: 'red',
      from: { ic: 'adder', pin: 's1' }, to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'red',
      from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_s2_r',  type: 'wire', color: 'yellow',
      from: { ic: 'adder', pin: 's2' }, to: { component: 'r_s2', end: 'p1' } },
    { id: 'w_s2_led', type: 'wire', color: 'yellow',
      from: { component: 'r_s2', end: 'p2' }, to: { led: 'led_s2', end: 'anode' } },
    { id: 'w_s2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_s3_r',  type: 'wire', color: 'green',
      from: { ic: 'adder', pin: 's3' }, to: { component: 'r_s3', end: 'p1' } },
    { id: 'w_s3_led', type: 'wire', color: 'green',
      from: { component: 'r_s3', end: 'p2' }, to: { led: 'led_s3', end: 'anode' } },
    { id: 'w_s3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },

    { id: 'w_s4_r',  type: 'wire', color: 'blue',
      from: { ic: 'adder', pin: 's4' }, to: { component: 'r_s4', end: 'p1' } },
    { id: 'w_s4_led', type: 'wire', color: 'blue',
      from: { component: 'r_s4', end: 'p2' }, to: { led: 'led_s4', end: 'anode' } },
    { id: 'w_s4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },

    { id: 'w_c4_r',  type: 'wire', color: 'white',
      from: { ic: 'adder', pin: 'c4' }, to: { component: 'r_c4', end: 'p1' } },
    { id: 'w_c4_led', type: 'wire', color: 'white',
      from: { component: 'r_c4', end: 'p2' }, to: { led: 'led_c4', end: 'anode' } },
    { id: 'w_c4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_c4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 5 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The 74HC283 is a 4-bit binary full adder using carry-lookahead logic. ' +
        'It adds A[4:1] + B[4:1] + C0 and produces Sum S[4:1] and carry-out C4. ' +
        'C0 is the carry-in, tied to GND here (no initial carry).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC283',
      body: 'Mount the 74HC283 DIP-16 at column 7, straddling the centre gap. ' +
        'Pin 1 (S2) at col 7, row e. ' +
        'Connect VCC and GND supply pins to the power rails.',
      show: ['bb', 'adder'],
      highlight: 'adder',
    },
    {
      title: 'Tie C0 to GND',
      body: 'Connect a black wire from the C0 pin (col 13, row e) to the GND rail. ' +
        'C0=0 means no carry-in; the circuit performs simple addition A + B. ' +
        'Tie C0 to VCC (+1) to add A + B + 1.',
      show: ['bb', 'adder', 'w_c0_gnd'],
    },
    {
      title: 'Wire A inputs (red)',
      body: 'Red wires: col 1 row a → a1, col 2 row a → a2, col 3 row a → a3, col 4 row a → a4. ' +
        'A1 is the LSB; A4 is the MSB. Use DIP switches or wire to VCC/GND.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
    },
    {
      title: 'Wire B inputs (blue)',
      body: 'Blue wires: col 1 row b → b1, col 2 row b → b2, col 3 row b → b3, col 4 row b → b4. ' +
        'B1 is the LSB; B4 is the MSB. Both A and B banks are now wired.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
    },
    {
      title: 'Wire output LEDs (S1–S4, C4)',
      body: 'Five LED paths: S1 (red), S2 (yellow), S3 (green), S4 (blue) in alternating banks. ' +
        'C4 (white) at far right for carry-out. All cathodes to GND rail.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
    },
    {
      title: 'Test: 3 + 5 = 8 (A=0011, B=0101)',
      body: 'Set A4=0,A3=0,A2=1,A1=1 (decimal 3) and B4=0,B3=1,B2=0,B1=1 (decimal 5). ' +
        'Expected sum = 8 = 1000: only S4 (blue) should light. C4=0 (no overflow).',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
      highlight: 'led_s4',
    },
    {
      title: 'Test: 7 + 9 = 16 (A=0111, B=1001)',
      body: 'Set A=0111 (7) and B=1001 (9). Sum = 16 = 5-bit 10000. ' +
        'S4–S1 = 0000 (all LEDs off), C4=1 (white carry LED ON). ' +
        'The carry indicates the result exceeds 4 bits.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 1, A2: 1, A1: 1, B4: 1, B3: 0, B2: 0, B1: 1, C0: 0 },
      highlight: 'led_c4',
    },
  ],

  truthTable: {
    inputs:  ['A4', 'A3', 'A2', 'A1', 'B4', 'B3', 'B2', 'B1', 'C0'],
    outputs: ['S4', 'S3', 'S2', 'S1', 'C4'],
    rows: [
      { inputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 }, outputs: { S4: 1, S3: 0, S2: 0, S1: 0, C4: 0 } },
      { inputs: { A4: 0, A3: 1, A2: 1, A1: 1, B4: 1, B3: 0, B2: 0, B1: 1, C0: 0 }, outputs: { S4: 0, S3: 0, S2: 0, S1: 0, C4: 1 } },
      { inputs: { A4: 1, A3: 0, A2: 1, A1: 0, B4: 0, B3: 0, B2: 1, B1: 0, C0: 0 }, outputs: { S4: 1, S3: 1, S2: 0, S1: 0, C4: 0 } },
      { inputs: { A4: 1, A3: 1, A2: 1, A1: 1, B4: 1, B3: 1, B2: 1, B1: 1, C0: 0 }, outputs: { S4: 1, S3: 1, S2: 1, S1: 0, C4: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A binary adder is a digital circuit that performs addition of binary numbers. ' +
        'A 4-bit adder adds two 4-bit operands A (A4–A1) and B (B4–B1) along with a carry-in C0 ' +
        'to produce a 4-bit sum S (S4–S1) and a carry-out C4. ' +
        'The sum is a 5-bit result when C4 is included, allowing values from 0+0+0=0 to 15+15+1=31.',

        'The 74HC283 is a high-speed CMOS 4-bit binary full adder using carry-lookahead logic. ' +
        'Unlike a ripple-carry adder where each stage must wait for the previous carry, ' +
        'the 74HC283 generates all carries simultaneously based on the propagate (P=A⊕B) and ' +
        'generate (G=A·B) signals, reducing the critical path delay to a nearly constant time. ' +
        'This makes it suitable for use in ALUs and arithmetic pipelines.',

        'Pin description: A1–A4 and B1–B4 are the two 4-bit inputs (1=LSB, 4=MSB). ' +
        'C0 is carry-in (tie to GND for no initial carry). S1–S4 are the sum outputs. ' +
        'C4 is the carry-out, indicating overflow when the result exceeds 15. ' +
        'VCC (pin 16) and GND (pin 8) supply the 2–6 V operating voltage.',

        'Example: 3 + 5 = 8. A = 0011, B = 0101, C0 = 0. Sum S = 1000, C4 = 0. ' +
        'Example: 7 + 9 = 16. A = 0111, B = 1001, C0 = 0. Sum S = 0000, C4 = 1 (overflow). ' +
        'The full 5-bit result 10000 = 16 is correct when C4 is included as bit 5.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC283 Adder IC',          specification: '4-bit binary full adder, DIP-16, 5 V CMOS',     quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (S1 output)',                  quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (S2 output)',                  quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (S3 output)',                  quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (S4 output)',                  quantity: '1' },
        { name: 'White LED',                 specification: '5 mm, Vf ≈ 3.2 V (C4 carry-out)',               quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film',                             quantity: '5' },
        { name: 'DIP Switch (8-pole)',        specification: 'For toggling A1–A4 and B1–B4 inputs',           quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                               quantity: '1' },
        { name: 'Connecting Wires',          specification: 'M-M jumper wires, assorted colours',            quantity: '1 set' },
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
          body: 'Set up the breadboard. The 74HC283 is a 16-pin IC that spans 8 columns per bank. ' +
            'Plan the layout: IC at cols 7–14, input switches at cols 1–4, output LEDs at cols 22–46. ' +
            'Ensure VCC and GND rails are connected to the power supply.',
        },
        {
          label: 'Mount the 74HC283 at column 7.',
          circuitStepIndex: 1,
          body: 'Place the 74HC283 DIP-16 IC straddling the centre gap at column 7, notch facing left. ' +
            'Pin 1 (S2) is at col 7 row e. Pin 16 (VCC) is at col 7 row f. ' +
            'Connect pin 16 (col 7, row f) to VCC rail. Connect pin 8 (col 14, row e) to GND rail.',
        },
        {
          label: 'Tie C0 to GND.',
          circuitStepIndex: 2,
          body: 'Connect a black wire from pin C0 (col 13, row e) to the GND rail. ' +
            'C0=0 means no carry-in; the adder computes A + B exactly. ' +
            'To implement A + B + 1, connect C0 to VCC instead.',
        },
        {
          label: 'Wire A inputs (red wires).',
          circuitStepIndex: 3,
          body: 'Red wires from row a: col 1 → pin a1 (col 11, row e), ' +
            'col 2 → a2 (col 9, row e), col 3 → a3 (col 13, row f), col 4 → a4 (col 10, row f). ' +
            'A1 is LSB; A4 is MSB. Connect each column to one pole of a DIP switch.',
        },
        {
          label: 'Wire B inputs (blue wires).',
          circuitStepIndex: 4,
          body: 'Blue wires from row b: col 1 → pin b1 (col 12, row e), ' +
            'col 2 → b2 (col 8, row e), col 3 → b3 (col 14, row f), col 4 → b4 (col 11, row f). ' +
            'All 8 input switches (A1–A4, B1–B4) are now wired.',
        },
        {
          label: 'Wire output LEDs S1–S4 and C4.',
          circuitStepIndex: 5,
          body: 'Five output paths. S1 (col 10, row e) → r_s1 (col 22, c) → led_s1 red. ' +
            'S2 (col 7, row e) → r_s2 (col 22, h) → led_s2 yellow. ' +
            'S3 (col 12, row f) → r_s3 (col 29, c) → led_s3 green. ' +
            'S4 (col 9, row f) → r_s4 (col 29, h) → led_s4 blue. ' +
            'C4 (col 8, row f) → r_c4 (col 36, c) → led_c4 white. All cathodes to GND.',
        },
        {
          label: 'Test: 3 + 5 = 8.',
          circuitStepIndex: 6,
          body: 'Set A=0011 (A2=1, A1=1, others off) and B=0101 (B3=1, B1=1). ' +
            'Expected: S=1000. Only led_s4 (blue) should light. C4=0. ' +
            'Verify by reading the LED pattern as a 4-bit binary number.',
        },
        {
          label: 'Test: 7 + 9 = 16.',
          circuitStepIndex: 7,
          body: 'Set A=0111 (A3=A2=A1=1) and B=1001 (B4=B1=1). ' +
            'Expected: 5-bit result 10000. S4=S3=S2=S1=0 (all sum LEDs off), C4=1 (white LED ON). ' +
            'The carry indicates the 4-bit result overflowed.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V. C0 = 0 (tied to GND). No carry-in.',
        'Sum LEDs represent S4 (MSB, blue) down to S1 (LSB, red). C4 (white) is the 5th bit.',
        'LED ON = logic HIGH = 1; LED OFF = logic LOW = 0.',
      ],
      table: {
        headers: ['A (decimal)', 'B (decimal)', 'A+B', 'S4 S3 S2 S1', 'C4', 'Result'],
        rows: [
          [3,  5,   8, '1 0 0 0', 0, '8 (no overflow)'],
          [7,  9,  16, '0 0 0 0', 1, '16 (overflow)'],
          [10, 2,  12, '1 1 0 0', 0, '12 (no overflow)'],
          [15, 15, 30, '1 1 1 0', 1, '30 (overflow)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4-bit binary adder using the 74HC283 IC was successfully demonstrated. ' +
        'The sum LEDs S1–S4 and carry-out LED C4 correctly displayed binary addition results ' +
        'for all tested input combinations, confirming the IC\'s arithmetic operation.',

        'The carry-lookahead architecture of the 74HC283 provides faster results than a ' +
        'simple ripple-carry adder, with all sum bits computed simultaneously rather than ' +
        'sequentially. This was evident in the immediate LED response upon input changes.',

        'The experiment demonstrates the role of carry-out in multi-precision arithmetic: ' +
        'two 74HC283 ICs can be cascaded by connecting C4 of the lower IC to C0 of the upper IC, ' +
        'forming an 8-bit adder capable of summing values from 0 to 510.',
      ],
    },
  ],
};
