import { type Experiment } from '@/experiments/types';

export const GrayBinaryConverter: Experiment = {
  id: 'gray-binary-converter',
  title: 'Gray Code ↔ Binary Converter',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Combinational Logic',
    description: 'Build bidirectional converters between Gray code and binary using XOR gates. Verify all 4-bit input combinations.',
    tags: ['gray code', 'binary', 'code converter', 'xor', 'combinational'],
  },
  metaTitle: 'Gray Code ↔ Binary Converter — VLabs',
  metaDescription: 'Build bidirectional converters between Gray code and binary using XOR gates. Verify all 4-bit input combinations.',
  circuit: {
  id: 'gray-binary-converter',
  title: 'Gray Code to Binary and Binary to Gray Code Converters',
  description:
    'Demonstrates the Binary-to-Gray code conversion using three XOR gates. ' +
    'G3=B3 (pass-through), G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0. ' +
    'Gray code has the property that adjacent values differ by exactly one bit.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gate ICs ──────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } }, // G2
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 12, row: 'e' } }, // G1
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 19, row: 'e' } }, // G0

    // ── Resistors ─────────────────────────────────────────────────────────
    { id: 'r_g3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'r_g2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r_g1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'r_g0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_g3', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_g2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 12, row: 'c' } },
    { id: 'led_g1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 19, row: 'c' } },
    { id: 'led_g0', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 26, row: 'c' } },

    // ── Input wires ───────────────────────────────────────────────────────
    // B3 → xor1.A and r_g3 (G3 pass-through)
    { id: 'w_b3_xor1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_b3_g3', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { component: 'r_g3', end: 'p1' } },

    // B2 → xor1.B and xor2.A
    { id: 'w_b2_xor1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'xor1', pin: 'B' } },
    { id: 'w_b2_xor2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'xor2', pin: 'A' } },

    // B1 → xor2.B and xor3.A
    { id: 'w_b1_xor2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'xor2', pin: 'B' } },
    { id: 'w_b1_xor3', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'xor3', pin: 'A' } },

    // B0 → xor3.B
    { id: 'w_b0_xor3', type: 'wire', color: 'green',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'xor3', pin: 'B' } },

    // ── Output wires: XOR outputs → resistors → LEDs → GND ───────────────
    { id: 'w_g3_led',  type: 'wire', color: 'red',
      from: { component: 'r_g3', end: 'p2' }, to: { led: 'led_g3', end: 'anode' } },
    { id: 'w_g3_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },

    { id: 'w_xor1_r',  type: 'wire', color: 'yellow',
      from: { ic: 'xor1', pin: 'Y' }, to: { component: 'r_g2', end: 'p1' } },
    { id: 'w_g2_led',  type: 'wire', color: 'yellow',
      from: { component: 'r_g2', end: 'p2' }, to: { led: 'led_g2', end: 'anode' } },
    { id: 'w_g2_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_xor2_r',  type: 'wire', color: 'green',
      from: { ic: 'xor2', pin: 'Y' }, to: { component: 'r_g1', end: 'p1' } },
    { id: 'w_g1_led',  type: 'wire', color: 'green',
      from: { component: 'r_g1', end: 'p2' }, to: { led: 'led_g1', end: 'anode' } },
    { id: 'w_g1_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_xor3_r',  type: 'wire', color: 'blue',
      from: { ic: 'xor3', pin: 'Y' }, to: { component: 'r_g0', end: 'p1' } },
    { id: 'w_g0_led',  type: 'wire', color: 'blue',
      from: { component: 'r_g0', end: 'p2' }, to: { led: 'led_g0', end: 'anode' } },
    { id: 'w_g0_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The binary-to-Gray converter uses three XOR gates. ' +
        'MSB G3 passes straight through (G3=B3). ' +
        'Each lower bit is XORed with the next-higher binary bit.',
      show: ['bb'],
    },
    {
      title: 'Place the three XOR gates',
      body: 'Mount xor1 (74HC86) at col 5 for G2 = B3 ⊕ B2. ' +
        'Mount xor2 at col 12 for G1 = B2 ⊕ B1. ' +
        'Mount xor3 at col 19 for G0 = B1 ⊕ B0.',
      show: ['bb', 'xor1', 'xor2', 'xor3'],
      highlight: 'xor1',
    },
    {
      title: 'Wire all inputs',
      body: 'B3 (col 1): fans to xor1.A and r_g3 (G3 pass-through). ' +
        'B2 (col 2): fans to xor1.B and xor2.A. ' +
        'B1 (col 3): fans to xor2.B and xor3.A. ' +
        'B0 (col 4): goes to xor3.B only.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Add resistors and LEDs',
      body: 'Place 330 Ω resistors for each output. ' +
        'G3 (red LED) in bottom bank at col 22–26 row h (isolated from G0). ' +
        'G2 (yellow), G1 (green), G0 (blue) in top bank at cols 8, 15, 22. ' +
        'Connect GND returns.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Connect all output wires',
      body: 'Connect XOR outputs to resistors, resistors to LED anodes, and LED cathodes to GND rail. ' +
        'B3 passthrough wire to r_g3.p1. Four output LED paths completed.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0',
             'w_g3_led', 'w_g3_gnd',
             'w_xor1_r', 'w_g2_led', 'w_g2_gnd',
             'w_xor2_r', 'w_g1_led', 'w_g1_gnd',
             'w_xor3_r', 'w_g0_led', 'w_g0_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Test: Binary 0011 → Gray 0010',
      body: 'Set B3=0, B2=0, B1=1, B0=1. Expected Gray: G3=0, G2=0, G1=1, G0=0. ' +
        'Only G1 (green LED) should light. ' +
        'G1 = B2⊕B1 = 0⊕1 = 1, G0 = B1⊕B0 = 1⊕1 = 0.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0',
             'w_g3_led', 'w_g3_gnd',
             'w_xor1_r', 'w_g2_led', 'w_g2_gnd',
             'w_xor2_r', 'w_g1_led', 'w_g1_gnd',
             'w_xor3_r', 'w_g0_led', 'w_g0_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 1, B0: 1 },
      highlight: 'led_g1',
    },
    {
      title: 'Test: Binary 0111 → Gray 0100',
      body: 'Set B3=0, B2=1, B1=1, B0=1. Expected Gray: G3=0, G2=1, G1=0, G0=0. ' +
        'Only G2 (yellow LED) should light. ' +
        'G2 = B3⊕B2 = 0⊕1 = 1.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0',
             'w_g3_led', 'w_g3_gnd',
             'w_xor1_r', 'w_g2_led', 'w_g2_gnd',
             'w_xor2_r', 'w_g1_led', 'w_g1_gnd',
             'w_xor3_r', 'w_g0_led', 'w_g0_gnd'],
      activeInputs: { B3: 0, B2: 1, B1: 1, B0: 1 },
      highlight: 'led_g2',
    },
  ],

  truthTable: {
    inputs:  ['B3', 'B2', 'B1', 'B0'],
    outputs: ['G3', 'G2', 'G1', 'G0'],
    rows: [
      { inputs: { B3: 0, B2: 0, B1: 0, B0: 0 }, outputs: { G3: 0, G2: 0, G1: 0, G0: 0 } },
      { inputs: { B3: 0, B2: 0, B1: 0, B0: 1 }, outputs: { G3: 0, G2: 0, G1: 0, G0: 1 } },
      { inputs: { B3: 0, B2: 0, B1: 1, B0: 0 }, outputs: { G3: 0, G2: 0, G1: 1, G0: 1 } },
      { inputs: { B3: 0, B2: 0, B1: 1, B0: 1 }, outputs: { G3: 0, G2: 0, G1: 1, G0: 0 } },
      { inputs: { B3: 0, B2: 1, B1: 0, B0: 0 }, outputs: { G3: 0, G2: 1, G1: 1, G0: 0 } },
      { inputs: { B3: 0, B2: 1, B1: 0, B0: 1 }, outputs: { G3: 0, G2: 1, G1: 1, G0: 1 } },
      { inputs: { B3: 0, B2: 1, B1: 1, B0: 0 }, outputs: { G3: 0, G2: 1, G1: 0, G0: 1 } },
      { inputs: { B3: 0, B2: 1, B1: 1, B0: 1 }, outputs: { G3: 0, G2: 1, G1: 0, G0: 0 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Gray code, also called reflected binary code, is a binary numeral system where two successive ' +
        'values differ in only a single bit. This property — the unit-distance property — makes Gray code ' +
        'invaluable in applications where mechanical or electrical glitches during state transitions could ' +
        'be catastrophic, such as shaft encoders, analog-to-digital converters, and error detection systems.',

        'The Binary-to-Gray conversion uses XOR gates: the MSB G3 passes through unchanged (G3 = B3), ' +
        'and each subsequent Gray bit is the XOR of adjacent binary bits: G2 = B3 ⊕ B2, G1 = B2 ⊕ B1, ' +
        'G0 = B1 ⊕ B0. This circuit requires only three 2-input XOR gates for a 4-bit conversion.',

        'The Gray-to-Binary conversion is the inverse process. B3 = G3 (MSB unchanged), ' +
        'then each binary bit is the XOR of all Gray bits above it: B2 = G3 ⊕ G2, ' +
        'B1 = G3 ⊕ G2 ⊕ G1, B0 = G3 ⊕ G2 ⊕ G1 ⊕ G0. ' +
        'This can be implemented with three cascaded XOR gates per bit, ' +
        'or equivalently using XNOR reduction.',

        'The 74HC86 is a quad 2-input XOR gate CMOS IC operating from 2 V to 6 V. ' +
        'Each IC contains four independent XOR gates in a DIP-14 package. ' +
        'One 74HC86 IC provides all three XOR gates needed for the Binary-to-Gray converter ' +
        'demonstrated in this experiment.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC86 XOR Gate IC',        specification: 'Quad 2-input XOR, DIP-14, 5 V CMOS',            quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (G3 output)',                  quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (G2 output)',                  quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (G1 output)',                  quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (G0 output)',                  quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film',                             quantity: '4' },
        { name: 'DIP Switch (4-pole)',        specification: 'For toggling binary inputs B3, B2, B1, B0',     quantity: '1' },
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
          body: 'Set up the solderless breadboard. Identify the power rails (VCC = red, GND = blue). ' +
            'This experiment requires only one 74HC86 XOR gate IC and four LEDs.',
        },
        {
          label: 'Mount the three XOR gates.',
          circuitStepIndex: 1,
          body: 'Mount xor1 (74HC86) at column 5 row e — produces G2 = B3 ⊕ B2. ' +
            'Mount xor2 at column 12 row e — produces G1 = B2 ⊕ B1. ' +
            'Mount xor3 at column 19 row e — produces G0 = B1 ⊕ B0. ' +
            'All three gates may come from a single 74HC86 IC (quad package). ' +
            'Connect pin 14 to VCC and pin 7 to GND.',
        },
        {
          label: 'Wire all binary inputs.',
          circuitStepIndex: 2,
          body: 'B3 (col 1): red wire to xor1.A, plus a separate red wire to r_g3.p1 (G3 pass-through). ' +
            'B2 (col 2): orange wires to xor1.B and xor2.A. ' +
            'B1 (col 3): blue wires to xor2.B and xor3.A. ' +
            'B0 (col 4): green wire to xor3.B only. ' +
            'Set all inputs LOW to start.',
        },
        {
          label: 'Add resistors and LEDs.',
          circuitStepIndex: 3,
          body: 'Place r_g3 (col 22, row h) and led_g3 red (col 26, row h) for G3. ' +
            'Place r_g2 (col 8, row c) and led_g2 yellow (col 12, row c) for G2. ' +
            'Place r_g1 (col 15, row c) and led_g1 green (col 19, row c) for G1. ' +
            'Place r_g0 (col 22, row c) and led_g0 blue (col 26, row c) for G0. ' +
            'G3 and G0 are in different banks to avoid net conflicts.',
        },
        {
          label: 'Connect output wires and ground returns.',
          circuitStepIndex: 4,
          body: 'B3 pass-through: wire from col 1, row b → r_g3 p1. Then r_g3 p2 → led_g3 anode. ' +
            'Each XOR output → resistor p1 → LED anode. All LED cathodes → GND rail. ' +
            'Apply +5 V. With all inputs LOW, all outputs should be LOW and all LEDs off.',
        },
        {
          label: 'Test: Binary 0011 → Gray 0010.',
          circuitStepIndex: 5,
          body: 'Set B3=0, B2=0, B1=1, B0=1. ' +
            'G3=0 (B3 passthrough, off), G2 = 0⊕0 = 0 (off), ' +
            'G1 = 0⊕1 = 1 (green ON), G0 = 1⊕1 = 0 (off). ' +
            'Observe that only the G1 green LED illuminates.',
        },
        {
          label: 'Test: Binary 0111 → Gray 0100.',
          circuitStepIndex: 6,
          body: 'Set B3=0, B2=1, B1=1, B0=1. ' +
            'G2 = 0⊕1 = 1 (yellow ON), G1 = 1⊕1 = 0 (off), G0 = 1⊕1 = 0 (off). ' +
            'Only the G2 yellow LED should illuminate. ' +
            'Compare all 8 combinations with the truth table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. One 74HC86 quad-XOR IC powers all three XOR gates.',
        'Note the unit-distance property: adjacent Gray code values differ in exactly one bit position.',
        'Decimal 3 (0011) and decimal 4 (0100) in binary differ in three bits, but in Gray code ' +
        '(0010 and 0110) they differ in only one bit — demonstrating the advantage of Gray code.',
      ],
      table: {
        headers: ['B3', 'B2', 'B1', 'B0', 'Decimal', 'G3', 'G2', 'G1', 'G0', 'Gray Code'],
        rows: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, '0000'],
          [0, 0, 0, 1, 1, 0, 0, 0, 1, '0001'],
          [0, 0, 1, 0, 2, 0, 0, 1, 1, '0011'],
          [0, 0, 1, 1, 3, 0, 0, 1, 0, '0010'],
          [0, 1, 0, 0, 4, 0, 1, 1, 0, '0110'],
          [0, 1, 0, 1, 5, 0, 1, 1, 1, '0111'],
          [0, 1, 1, 0, 6, 0, 1, 0, 1, '0101'],
          [0, 1, 1, 1, 7, 0, 1, 0, 0, '0100'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Binary-to-Gray converter was successfully built using three 74HC86 XOR gates. ' +
        'The output LEDs correctly displayed the Gray code for all 8 tested binary inputs, ' +
        'matching the truth table and confirming the equations G3=B3, G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0.',

        'The unit-distance property was verified: consecutive Gray code values differed in exactly ' +
        'one LED state change, whereas direct binary counting shows multiple simultaneous transitions. ' +
        'This makes Gray code ideal for position encoders where multi-bit glitches during transitions ' +
        'could cause large transient errors.',

        'The reverse Gray-to-Binary conversion requires cascading XOR operations (each binary bit ' +
        'depends on all higher Gray bits), which can be implemented with the same XOR gate IC ' +
        'by chaining outputs instead of fanning out from independent inputs.',
      ],
    },
  ],
};
