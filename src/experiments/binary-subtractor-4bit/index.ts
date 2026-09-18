import { type Experiment } from '@/experiments/types';

export const BinarySubtractor4bit: Experiment = {
  id: 'binary-subtractor-4bit',
  title: '',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Combinational Logic',
    description: "Implement a 4-bit subtractor by combining a 74HC283 adder with XOR inverters and carry-in set to 1, realising 2's complement subtraction.",
    tags: ["2's complement", 'subtractor', '4-bit', 'xor', '74hc283'],
  },
  metaTitle: ' — VLabs',
  metaDescription: "Implement a 4-bit subtractor by combining a 74HC283 adder with XOR inverters and carry-in set to 1, realising 2's complement subtraction.",
  circuit: {
  id: 'binary-subtractor-4bit',
  title: '4-bit Binary Subtractor using 74HC283 and XOR Inversion',
  description:
    'Subtracts B from A (A − B) by computing A + B\' + 1 using two\'s complement. ' +
    'Four XOR gates invert each B bit; C0=1 adds the extra 1. ' +
    'The 74HC283 adder performs the final addition.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── XOR gates (B inversion) ───────────────────────────────────────────
    { id: 'xor_b1', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'xor_b2', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'xor_b3', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'xor_b4', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'h' } },

    // ── 74HC283 adder ─────────────────────────────────────────────────────
    { id: 'adder_sub', type: 'adder-4bit', mountedAt: { board: 'bb', col: 13, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_s1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'r_s2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 28, row: 'h' } },
    { id: 'r_s3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 35, row: 'c' } },
    { id: 'r_s4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 35, row: 'h' } },
    { id: 'r_c4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 42, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s1', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 32, row: 'c' } },
    { id: 'led_s2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 32, row: 'h' } },
    { id: 'led_s3', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 39, row: 'c' } },
    { id: 'led_s4', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 39, row: 'h' } },
    { id: 'led_c4', type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 46, row: 'c' } },

    // ── VCC wires to XOR gate B-inputs (constant 1 = invert function) ─────
    { id: 'w_vcc_xb1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { ic: 'xor_b1', pin: 'B' } },
    { id: 'w_vcc_xb2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 4 },
      to:   { ic: 'xor_b2', pin: 'B' } },
    { id: 'w_vcc_xb3', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { ic: 'xor_b3', pin: 'B' } },
    { id: 'w_vcc_xb4', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 6 },
      to:   { ic: 'xor_b4', pin: 'B' } },

    // ── C0 tied to VCC (+1 for 2's complement) ────────────────────────────
    { id: 'w_c0_vcc', type: 'wire', color: 'red',
      from: { ic: 'adder_sub', pin: 'c0' },
      to:   { board: 'bb', rail: 'vcc_top', col: 19 } },

    // ── A input wires (row a, directly to adder) ──────────────────────────
    { id: 'w_a1_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a1' } },
    { id: 'w_a2_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a2' } },
    { id: 'w_a3_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a3' } },
    { id: 'w_a4_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a4' } },

    // ── B inputs through XOR inverters then to adder ──────────────────────
    { id: 'w_b1_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'xor_b1', pin: 'A' } },
    { id: 'w_b2_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'xor_b2', pin: 'A' } },
    { id: 'w_b3_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'xor_b3', pin: 'A' } },
    { id: 'w_b4_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'xor_b4', pin: 'A' } },

    // ── XOR outputs → adder B inputs ──────────────────────────────────────
    { id: 'w_xb1_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b1', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b1' } },
    { id: 'w_xb2_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b2', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b2' } },
    { id: 'w_xb3_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b3', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b3' } },
    { id: 'w_xb4_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b4', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b4' } },

    // ── Output wires: sum pins → resistors → LEDs → GND ──────────────────
    { id: 'w_s1_r',   type: 'wire', color: 'red',
      from: { ic: 'adder_sub', pin: 's1' }, to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'red',
      from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_s2_r',   type: 'wire', color: 'yellow',
      from: { ic: 'adder_sub', pin: 's2' }, to: { component: 'r_s2', end: 'p1' } },
    { id: 'w_s2_led', type: 'wire', color: 'yellow',
      from: { component: 'r_s2', end: 'p2' }, to: { led: 'led_s2', end: 'anode' } },
    { id: 'w_s2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_s3_r',   type: 'wire', color: 'green',
      from: { ic: 'adder_sub', pin: 's3' }, to: { component: 'r_s3', end: 'p1' } },
    { id: 'w_s3_led', type: 'wire', color: 'green',
      from: { component: 'r_s3', end: 'p2' }, to: { led: 'led_s3', end: 'anode' } },
    { id: 'w_s3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },

    { id: 'w_s4_r',   type: 'wire', color: 'blue',
      from: { ic: 'adder_sub', pin: 's4' }, to: { component: 'r_s4', end: 'p1' } },
    { id: 'w_s4_led', type: 'wire', color: 'blue',
      from: { component: 'r_s4', end: 'p2' }, to: { led: 'led_s4', end: 'anode' } },
    { id: 'w_s4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },

    { id: 'w_c4_r',   type: 'wire', color: 'white',
      from: { ic: 'adder_sub', pin: 'c4' }, to: { component: 'r_c4', end: 'p1' } },
    { id: 'w_c4_led', type: 'wire', color: 'white',
      from: { component: 'r_c4', end: 'p2' }, to: { led: 'led_c4', end: 'anode' } },
    { id: 'w_c4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_c4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 5 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'Binary subtraction A − B = A + B\' + 1 using two\'s complement. ' +
        'XOR gates with one input tied HIGH invert each B bit (XNOR → NOT). ' +
        'Setting C0=1 adds the required +1 to complete the two\'s complement.',
      show: ['bb'],
    },
    {
      title: 'Place XOR inverter gates',
      body: 'Mount xor_b1 at col 3 row e and xor_b2 at col 3 row h for B1, B2 inversions. ' +
        'Mount xor_b3 at col 7 row e and xor_b4 at col 7 row h for B3, B4. ' +
        'Connect VCC (red wires) to pin B of each XOR gate — this converts XOR into NOT.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4'],
      highlight: 'xor_b1',
    },
    {
      title: 'Place the 74HC283 adder',
      body: 'Mount the 74HC283 at col 13 row e. ' +
        'This adds A + B\' where B\' comes from the XOR inverters. ' +
        'Connect VCC and GND supply pins.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub'],
      highlight: 'adder_sub',
    },
    {
      title: 'Tie C0 to VCC (+1)',
      body: 'Connect a red wire from the C0 pin (col 19, row e of adder) to the VCC rail. ' +
        'C0=1 adds the final +1 needed for two\'s complement: A − B = A + B\' + 1.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc'],
    },
    {
      title: 'Wire A inputs directly to adder',
      body: 'Orange wires: col 1–4 row a → adder pins a1–a4. ' +
        'A inputs bypass the XOR gates — only B is inverted.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
    },
    {
      title: 'Wire B inputs through XOR inverters',
      body: 'Blue wires: col 1–4 row b → XOR gate A-inputs. ' +
        'White wires: XOR outputs → adder b1–b4 pins. ' +
        'B bits are inverted before reaching the adder.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
    },
    {
      title: 'Wire output LEDs',
      body: 'Five LED paths for S1–S4 and C4. C4=1 means A < B (borrow in unsigned subtraction). ' +
        'Connect all cathodes to GND. Circuit is complete.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
    },
    {
      title: 'Test: 8 − 5 = 3 (A=1000, B=0101)',
      body: 'A=1000 (8), B=0101 (5). Expected result = 3 = 0011. ' +
        'S2 (yellow) and S1 (red) should light. C4=1 (carry set means A≥B, result valid).',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
      highlight: 'led_s2',
    },
    {
      title: 'Test: 5 − 8 = −3 (A=0101, B=1000)',
      body: 'A=0101 (5), B=1000 (8). Result in 4-bit 2\'s complement = 1101 (13 unsigned). ' +
        'S4, S3, S1 light. C4=0 (no borrow carry — indicates A<B in unsigned view). ' +
        'Read as signed: 1101 = −3.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 1, A2: 0, A1: 1, B4: 1, B3: 0, B2: 0, B1: 0 },
      highlight: 'led_s4',
    },
  ],

  truthTable: {
    inputs:  ['A4', 'A3', 'A2', 'A1', 'B4', 'B3', 'B2', 'B1'],
    outputs: ['S4', 'S3', 'S2', 'S1', 'C4'],
    rows: [
      { inputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 }, outputs: { S4: 0, S3: 0, S2: 1, S1: 1, C4: 1 } },
      { inputs: { A4: 0, A3: 1, A2: 0, A1: 1, B4: 1, B3: 0, B2: 0, B1: 0 }, outputs: { S4: 1, S3: 1, S2: 0, S1: 1, C4: 0 } },
      { inputs: { A4: 1, A3: 1, A2: 1, A1: 1, B4: 0, B3: 1, B2: 1, B1: 0 }, outputs: { S4: 1, S3: 0, S2: 0, S1: 1, C4: 1 } },
      { inputs: { A4: 0, A3: 1, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 0 }, outputs: { S4: 0, S3: 0, S2: 0, S1: 0, C4: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Binary subtraction can be performed using an adder by exploiting two\'s complement representation. ' +
        'The two\'s complement of a number N is obtained by inverting all bits (one\'s complement) ' +
        'and adding 1. Therefore: A − B = A + (two\'s complement of B) = A + B\' + 1, ' +
        'where B\' denotes the bitwise complement of B.',

        'XOR gates implement programmable inversion: when one input of an XOR is tied HIGH (1), ' +
        'the output is the complement of the other input (X ⊕ 1 = X\'). ' +
        'When tied LOW (0), the XOR passes the input unchanged (X ⊕ 0 = X). ' +
        'In this circuit, the B-input of each XOR gate is permanently tied to VCC, ' +
        'so all four XOR gates act as inverters for B1–B4.',

        'The carry-in C0 of the 74HC283 is tied to VCC (HIGH), providing the +1 needed ' +
        'to complete the two\'s complement. The adder therefore computes: ' +
        'A + B\' + 1 = A − B (in two\'s complement arithmetic). ' +
        'The carry-out C4 indicates the sign of the result: ' +
        'C4=1 means A ≥ B (positive or zero result); C4=0 means A < B (negative result in 4-bit unsigned).',

        'For signed 4-bit arithmetic (−8 to +7), results outside this range indicate overflow. ' +
        'When A ≥ B, the result S4–S1 is the correct magnitude. ' +
        'When A < B, S4–S1 holds the two\'s complement of (B−A); to recover the magnitude, ' +
        'invert S4–S1 and add 1. This experiment demonstrates both cases.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC86 XOR Gate IC',        specification: 'Quad 2-input XOR, DIP-14, 5 V CMOS (for inversion)', quantity: '1' },
        { name: '74HC283 Adder IC',          specification: '4-bit binary full adder, DIP-16, 5 V CMOS',     quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (S1 output)',                  quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (S2 output)',                  quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (S3 output)',                  quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (S4 output)',                  quantity: '1' },
        { name: 'White LED',                 specification: '5 mm, Vf ≈ 3.2 V (C4 borrow indicator)',        quantity: '1' },
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
          body: 'Set up the breadboard. Plan the layout: four XOR gates in cols 3–10, ' +
            '74HC283 adder in cols 13–20, output LEDs in cols 28–46. ' +
            'This circuit uses two ICs: one quad-XOR (74HC86) and one 4-bit adder (74HC283).',
        },
        {
          label: 'Place XOR inverter gates and tie B-inputs to VCC.',
          circuitStepIndex: 1,
          body: 'Mount xor_b1 at col 3 row e; xor_b2 at col 3 row h; xor_b3 at col 7 row e; xor_b4 at col 7 row h. ' +
            'Connect a red wire from VCC rail to pin B of each XOR gate. ' +
            'Each XOR now functions as a NOT gate: output = NOT(A-input).',
        },
        {
          label: 'Place the 74HC283 adder at column 13.',
          circuitStepIndex: 2,
          body: 'Mount the 74HC283 DIP-16 at column 13. ' +
            'Connect pin 16 (col 13, row f) to VCC rail. Connect pin 8 (col 20, row e) to GND rail. ' +
            'This IC will perform A + B\' where B\' comes from the XOR inverters.',
        },
        {
          label: 'Tie C0 to VCC (+1).',
          circuitStepIndex: 3,
          body: 'Connect a red wire from the C0 pin (col 19, row e) to the VCC rail (+5 V). ' +
            'C0=1 adds the +1 required to complete two\'s complement: A + B\' + 1 = A − B. ' +
            'This is the critical step that converts the adder into a subtractor.',
        },
        {
          label: 'Wire A inputs directly to adder.',
          circuitStepIndex: 4,
          body: 'Orange wires from row a: col 1 → a1, col 2 → a2, col 3 → a3, col 4 → a4. ' +
            'A inputs bypass the XOR inverters and connect directly to the adder A-input pins. ' +
            'A is the minuend (the number being subtracted from).',
        },
        {
          label: 'Wire B inputs through XOR inverters.',
          circuitStepIndex: 5,
          body: 'Blue wires from row b: col 1 → xor_b1 pin A, col 2 → xor_b2 pin A, ' +
            'col 3 → xor_b3 pin A, col 4 → xor_b4 pin A. ' +
            'White wires from each XOR output to the adder b-pins: xor_b1.Y → b1, etc. ' +
            'B is the subtrahend; it is inverted before entering the adder.',
        },
        {
          label: 'Wire output LEDs and test.',
          circuitStepIndex: 6,
          body: 'Wire five LED paths for S1–S4 and C4 to the GND rail via 330 Ω resistors. ' +
            'Apply +5 V. With A=B, the result should be 0000 with C4=1 (borrow cleared). ' +
            'Verify the LED pattern represents the correct difference.',
        },
        {
          label: 'Test 8 − 5 = 3.',
          circuitStepIndex: 7,
          body: 'Set A=1000 (A4=1) and B=0101 (B3=1, B1=1). ' +
            'Expected result: 3 = 0011. Led_s2 (yellow) and led_s1 (red) should light. ' +
            'C4=1 (white LED ON) confirms no borrow — A ≥ B.',
        },
        {
          label: 'Test 5 − 8 = −3.',
          circuitStepIndex: 8,
          body: 'Set A=0101 (A3=A1=1) and B=1000 (B4=1). ' +
            'Result in 4-bit two\'s complement = 1101 (unsigned value 13). ' +
            'Led_s4, led_s3, led_s1 light. C4=0 (white LED OFF) indicates borrow — A < B. ' +
            'To read the signed magnitude: invert 1101 = 0010, add 1 → 0011 = 3. So result = −3.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: VCC = +5 V. C0 = 1 (tied to VCC for two\'s complement).',
        'C4=1 → result ≥ 0 (A ≥ B, no borrow). C4=0 → result < 0 (A < B, borrow occurred).',
        'For negative results, the 4-bit output is the two\'s complement of the magnitude.',
      ],
      table: {
        headers: ['A', 'B', 'A−B', 'S4 S3 S2 S1', 'C4', 'Interpretation'],
        rows: [
          [8,  5,   3, '0 0 1 1', 1, '+3 (no borrow)'],
          [5,  8,  -3, '1 1 0 1', 0, '−3 (borrow, 2\'s comp)'],
          [15, 9,   6, '0 1 1 0', 1, '+6 (no borrow)'],
          [4,  4,   0, '0 0 0 0', 1, '0 (equal)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4-bit binary subtractor was successfully implemented by combining a 74HC86 XOR quad gate ' +
        'with a 74HC283 4-bit adder. The XOR gates tied to VCC inverted the B operand, and C0=1 ' +
        'completed the two\'s complement, implementing A − B = A + B\' + 1.',

        'The output LEDs correctly displayed the difference for both A≥B (positive result, C4=1) ' +
        'and A<B (negative result in two\'s complement, C4=0) cases, validating the two\'s complement ' +
        'subtraction method without requiring a dedicated subtractor IC.',

        'This technique generalises to any adder: by XORing each B bit with a mode-select signal M, ' +
        'the same circuit can function as either an adder (M=0, C0=0) or a subtractor (M=1, C0=1). ' +
        'This adder/subtractor duality is the basis of the arithmetic logic unit in every processor.',
      ],
    },
  ],
};
