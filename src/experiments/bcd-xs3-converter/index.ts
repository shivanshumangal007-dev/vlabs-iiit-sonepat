import { type Experiment } from '@/experiments/types';

export const BcdXs3Converter: Experiment = {
  id: 'bcd-xs3-converter',
  title: 'BCD to Excess-3 Code Converter',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Combinational Logic',
    description: 'Design and implement a combinational circuit that converts a 4-bit BCD input to its Excess-3 equivalent using basic logic gates.',
    tags: ['bcd', 'excess-3', 'code converter', 'combinational', 'logic gates'],
  },
  metaTitle: 'BCD to Excess-3 Code Converter — VLabs',
  metaDescription: 'Design and implement a combinational circuit that converts a 4-bit BCD input to its Excess-3 equivalent using basic logic gates.',
  circuit: {
  id: 'bcd-xs3-converter',
  title: 'BCD to Excess-3 Code Converter',
  description:
    'Converts a 4-bit BCD input (0–9) to its Excess-3 (XS3) equivalent by adding 3 to each digit. ' +
    'Implemented using NOT, AND, OR, and XOR gates on a breadboard. ' +
    'Demonstrates K-map minimisation for a multi-output combinational circuit.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gate ICs ──────────────────────────────────────────────────────────
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } }, // invert D
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 8,  row: 'e' } }, // B AND C
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 8,  row: 'h' } }, // B AND D
    { id: 'or1',  type: 'or-gate',  mountedAt: { board: 'bb', col: 14, row: 'e' } }, // W = A + BC + BD
    { id: 'or2',  type: 'or-gate',  mountedAt: { board: 'bb', col: 14, row: 'h' } }, // X
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 20, row: 'e' } }, // Y (C XOR D)
    { id: 'not2', type: 'not-gate', mountedAt: { board: 'bb', col: 20, row: 'h' } }, // Z = D'

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_w', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'r_x', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'r_y', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'r_z', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 28, row: 'h' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_w', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_x', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_y', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 32, row: 'c' } },
    { id: 'led_z', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 32, row: 'h' } },

    // ── Input wires: A (col 1) ────────────────────────────────────────────
    { id: 'w_a_or1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'or1',  pin: 'A' } },

    // ── Input wires: B (col 2) ────────────────────────────────────────────
    { id: 'w_b_and1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'and1', pin: 'A' } },
    { id: 'w_b_and2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'and2', pin: 'A' } },
    { id: 'w_b_or2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'c' },
      to:   { ic: 'or2',  pin: 'A' } },

    // ── Input wires: C (col 3) ────────────────────────────────────────────
    { id: 'w_c_and1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'and1', pin: 'B' } },
    { id: 'w_c_xor1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'c' },
      to:   { ic: 'xor1', pin: 'A' } },

    // ── Input wires: D (col 4) ────────────────────────────────────────────
    { id: 'w_d_and2', type: 'wire', color: 'green',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'and2', pin: 'B' } },
    { id: 'w_d_not1', type: 'wire', color: 'green',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'not1', pin: 'A' } },
    { id: 'w_d_not2', type: 'wire', color: 'green',
      from: { board: 'bb', col: 4, row: 'c' },
      to:   { ic: 'not2', pin: 'A' } },
    { id: 'w_d_xor1', type: 'wire', color: 'green',
      from: { board: 'bb', col: 4, row: 'd' },
      to:   { ic: 'xor1', pin: 'B' } },

    // ── Internal wires: gate cascade ──────────────────────────────────────
    { id: 'w_and1_or1', type: 'wire', color: 'white',
      from: { ic: 'and1', pin: 'Y' },
      to:   { ic: 'or1',  pin: 'B' } },
    { id: 'w_and2_or2', type: 'wire', color: 'white',
      from: { ic: 'and2', pin: 'Y' },
      to:   { ic: 'or2',  pin: 'B' } },

    // ── Output wires: gates → resistors → LEDs → GND ─────────────────────
    { id: 'w_or1_r',  type: 'wire', color: 'red',
      from: { ic: 'or1',  pin: 'Y' }, to: { component: 'r_w', end: 'p1' } },
    { id: 'w_w_led',  type: 'wire', color: 'red',
      from: { component: 'r_w', end: 'p2' }, to: { led: 'led_w', end: 'anode' } },
    { id: 'w_w_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_w', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_or2_r',  type: 'wire', color: 'yellow',
      from: { ic: 'or2',  pin: 'Y' }, to: { component: 'r_x', end: 'p1' } },
    { id: 'w_x_led',  type: 'wire', color: 'yellow',
      from: { component: 'r_x', end: 'p2' }, to: { led: 'led_x', end: 'anode' } },
    { id: 'w_x_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_x', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_xor1_r', type: 'wire', color: 'green',
      from: { ic: 'xor1', pin: 'Y' }, to: { component: 'r_y', end: 'p1' } },
    { id: 'w_y_led',  type: 'wire', color: 'green',
      from: { component: 'r_y', end: 'p2' }, to: { led: 'led_y', end: 'anode' } },
    { id: 'w_y_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_y', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },

    { id: 'w_not2_r', type: 'wire', color: 'blue',
      from: { ic: 'not2', pin: 'Y' }, to: { component: 'r_z', end: 'p1' } },
    { id: 'w_z_led',  type: 'wire', color: 'blue',
      from: { component: 'r_z', end: 'p2' }, to: { led: 'led_z', end: 'anode' } },
    { id: 'w_z_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_z', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The BCD-to-XS3 converter adds 3 to each BCD digit (0–9) using combinational logic. ' +
        'Four gate ICs implement K-map minimised Boolean expressions for W, X, Y, Z. ' +
        'Identify the top and bottom banks and the power rails.',
      show: ['bb'],
    },
    {
      title: 'Place NOT gates',
      body: 'Mount not1 (74HC04 NOT) at column 3. ' +
        'It inverts D to produce D\' needed for Z and for X. ' +
        'Mount not2 (74HC04 NOT) at column 20, row h — this directly drives the Z output (Z = D\').',
      show: ['bb', 'not1', 'not2'],
      highlight: 'not1',
    },
    {
      title: 'Place AND and OR gates',
      body: 'Mount and1 (74HC08) at col 8 row e: computes B·C. ' +
        'Mount and2 (74HC08) at col 8 row h: computes B·D. ' +
        'Mount or1 (74HC32) at col 14 row e: forms W = A + B·C + B·D. ' +
        'Mount or2 (74HC32) at col 14 row h: forms X (B\'C + B\'D + BC\'D\'). ' +
        'Mount xor1 (74HC86) at col 20 row e: forms Y ≈ C ⊕ D.',
      show: ['bb', 'not1', 'not2', 'and1', 'and2', 'or1', 'or2', 'xor1'],
      highlight: 'and1',
    },
    {
      title: 'Wire input A, B, C, D',
      body: 'Red: col 1 row a → or1 pin A (A input to W). ' +
        'Orange: col 2 rows a,b,c → and1.A, and2.A, or2.A (B fan-out). ' +
        'Blue: col 3 rows b,c → and1.B, xor1.A (C fan-out). ' +
        'Green: col 4 rows a–d → and2.B, not1.A, not2.A, xor1.B (D fan-out). ' +
        'White: and1.Y → or1.B; and2.Y → or2.B (gate cascade).',
      show: ['bb', 'not1', 'not2', 'and1', 'and2', 'or1', 'or2', 'xor1',
             'w_a_or1', 'w_b_and1', 'w_b_and2', 'w_b_or2',
             'w_c_and1', 'w_c_xor1',
             'w_d_and2', 'w_d_not1', 'w_d_not2', 'w_d_xor1',
             'w_and1_or1', 'w_and2_or2'],
      activeInputs: { A: 0, B: 0, C: 0, D: 0 },
    },
    {
      title: 'Add resistors and LEDs',
      body: '330 Ω resistors limit LED current. ' +
        'r_w and r_x at col 22 (rows c and h). ' +
        'r_y and r_z at col 28 (rows c and h). ' +
        'LED colours: W=red (col 26,c), X=yellow (col 26,h), Y=green (col 32,c), Z=blue (col 32,h).',
      show: ['bb', 'not1', 'not2', 'and1', 'and2', 'or1', 'or2', 'xor1',
             'w_a_or1', 'w_b_and1', 'w_b_and2', 'w_b_or2',
             'w_c_and1', 'w_c_xor1',
             'w_d_and2', 'w_d_not1', 'w_d_not2', 'w_d_xor1',
             'w_and1_or1', 'w_and2_or2',
             'r_w', 'r_x', 'r_y', 'r_z', 'led_w', 'led_x', 'led_y', 'led_z'],
      activeInputs: { A: 0, B: 0, C: 0, D: 0 },
    },
    {
      title: 'Connect output wires',
      body: 'Connect each gate output to its resistor p1, then resistor p2 to LED anode, then LED cathode to GND rail. ' +
        'Four independent paths: or1→r_w→led_w, or2→r_x→led_x, xor1→r_y→led_y, not2→r_z→led_z. ' +
        'Circuit is complete. Apply +5 V to VCC rail.',
      show: ['bb', 'not1', 'not2', 'and1', 'and2', 'or1', 'or2', 'xor1',
             'w_a_or1', 'w_b_and1', 'w_b_and2', 'w_b_or2',
             'w_c_and1', 'w_c_xor1',
             'w_d_and2', 'w_d_not1', 'w_d_not2', 'w_d_xor1',
             'w_and1_or1', 'w_and2_or2',
             'r_w', 'r_x', 'r_y', 'r_z', 'led_w', 'led_x', 'led_y', 'led_z',
             'w_or1_r', 'w_w_led', 'w_w_gnd',
             'w_or2_r', 'w_x_led', 'w_x_gnd',
             'w_xor1_r', 'w_y_led', 'w_y_gnd',
             'w_not2_r', 'w_z_led', 'w_z_gnd'],
      activeInputs: { A: 0, B: 0, C: 0, D: 0 },
    },
    {
      title: 'Test BCD = 0101 (decimal 5)',
      body: 'Set A=0, B=1, C=0, D=1. Expected XS3 = 1000. ' +
        'W should be HIGH (red ON), X=0, Y=0, Z=0 (other LEDs OFF). ' +
        '5 + 3 = 8 = 1000 in binary.',
      show: ['bb', 'not1', 'not2', 'and1', 'and2', 'or1', 'or2', 'xor1',
             'w_a_or1', 'w_b_and1', 'w_b_and2', 'w_b_or2',
             'w_c_and1', 'w_c_xor1',
             'w_d_and2', 'w_d_not1', 'w_d_not2', 'w_d_xor1',
             'w_and1_or1', 'w_and2_or2',
             'r_w', 'r_x', 'r_y', 'r_z', 'led_w', 'led_x', 'led_y', 'led_z',
             'w_or1_r', 'w_w_led', 'w_w_gnd',
             'w_or2_r', 'w_x_led', 'w_x_gnd',
             'w_xor1_r', 'w_y_led', 'w_y_gnd',
             'w_not2_r', 'w_z_led', 'w_z_gnd'],
      activeInputs: { A: 0, B: 1, C: 0, D: 1 },
      highlight: 'led_w',
    },
    {
      title: 'Test BCD = 1001 (decimal 9)',
      body: 'Set A=1, B=0, C=0, D=1. Expected XS3 = 1100. ' +
        'W=1 and X=1 should be HIGH (red and yellow ON), Y=0, Z=0. ' +
        '9 + 3 = 12 = 1100 in binary.',
      show: ['bb', 'not1', 'not2', 'and1', 'and2', 'or1', 'or2', 'xor1',
             'w_a_or1', 'w_b_and1', 'w_b_and2', 'w_b_or2',
             'w_c_and1', 'w_c_xor1',
             'w_d_and2', 'w_d_not1', 'w_d_not2', 'w_d_xor1',
             'w_and1_or1', 'w_and2_or2',
             'r_w', 'r_x', 'r_y', 'r_z', 'led_w', 'led_x', 'led_y', 'led_z',
             'w_or1_r', 'w_w_led', 'w_w_gnd',
             'w_or2_r', 'w_x_led', 'w_x_gnd',
             'w_xor1_r', 'w_y_led', 'w_y_gnd',
             'w_not2_r', 'w_z_led', 'w_z_gnd'],
      activeInputs: { A: 1, B: 0, C: 0, D: 1 },
      highlight: 'led_x',
    },
  ],

  truthTable: {
    inputs:  ['A', 'B', 'C', 'D'],
    outputs: ['W', 'X', 'Y', 'Z'],
    rows: [
      { inputs: { A: 0, B: 0, C: 0, D: 0 }, outputs: { W: 0, X: 0, Y: 1, Z: 1 } },
      { inputs: { A: 0, B: 0, C: 0, D: 1 }, outputs: { W: 0, X: 1, Y: 0, Z: 0 } },
      { inputs: { A: 0, B: 0, C: 1, D: 0 }, outputs: { W: 0, X: 1, Y: 0, Z: 1 } },
      { inputs: { A: 0, B: 0, C: 1, D: 1 }, outputs: { W: 0, X: 1, Y: 1, Z: 0 } },
      { inputs: { A: 0, B: 1, C: 0, D: 0 }, outputs: { W: 0, X: 1, Y: 1, Z: 1 } },
      { inputs: { A: 0, B: 1, C: 0, D: 1 }, outputs: { W: 1, X: 0, Y: 0, Z: 0 } },
      { inputs: { A: 0, B: 1, C: 1, D: 0 }, outputs: { W: 1, X: 0, Y: 0, Z: 1 } },
      { inputs: { A: 0, B: 1, C: 1, D: 1 }, outputs: { W: 1, X: 0, Y: 1, Z: 0 } },
      { inputs: { A: 1, B: 0, C: 0, D: 0 }, outputs: { W: 1, X: 0, Y: 1, Z: 1 } },
      { inputs: { A: 1, B: 0, C: 0, D: 1 }, outputs: { W: 1, X: 1, Y: 0, Z: 0 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Binary Coded Decimal (BCD) represents each decimal digit (0–9) using a 4-bit binary code. ' +
        'The valid BCD codes are 0000 through 1001; the remaining six patterns 1010–1111 are unused. ' +
        'BCD is widely used in display drivers, calculators, and digital meters where decimal output is required.',

        'Excess-3 (XS3) is a self-complementing BCD code obtained by adding 3 (0011) to each BCD digit. ' +
        'For example, decimal 0 (BCD 0000) becomes XS3 0011, and decimal 9 (BCD 1001) becomes XS3 1100. ' +
        'The self-complementing property means the 9\'s complement of a digit equals the bitwise complement ' +
        'of its XS3 code — a feature exploited in BCD subtraction circuits.',

        'The Boolean expressions for the four XS3 output bits (W, X, Y, Z) with BCD inputs A (MSB), B, C, D (LSB) ' +
        'are derived by K-map minimisation over the ten valid input combinations. ' +
        'The minimised results are: W = A + BC + BD,  X = B\'C + B\'D + BC\'D\',  Y = C\'D\' + CD,  Z = D\'. ' +
        'Note that Y = XNOR(C, D) and Z is simply the complement of the LSB.',

        'The circuit is implemented using standard CMOS logic ICs: 74HC04 (NOT), 74HC08 (AND), ' +
        '74HC32 (OR), and 74HC86 (XOR). All operate from a +5 V supply. ' +
        'Four LEDs (W=red, X=yellow, Y=green, Z=blue) display the XS3 output. ' +
        '330 Ω resistors limit LED current to approximately 9 mA.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC04 NOT Gate IC',        specification: 'Hex inverter, DIP-14, 5 V CMOS',                quantity: '1' },
        { name: '74HC08 AND Gate IC',        specification: 'Quad 2-input AND, DIP-14, 5 V CMOS',            quantity: '1' },
        { name: '74HC32 OR Gate IC',         specification: 'Quad 2-input OR, DIP-14, 5 V CMOS',             quantity: '1' },
        { name: '74HC86 XOR Gate IC',        specification: 'Quad 2-input XOR, DIP-14, 5 V CMOS',            quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (W output)',                   quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (X output)',                   quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (Y output)',                   quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (Z output)',                   quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film, current limiter',             quantity: '4' },
        { name: 'DIP Switch (4-pole)',        specification: 'For toggling BCD inputs A, B, C, D',            quantity: '1' },
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
          body: 'Place the breadboard on a flat surface. Identify the top and bottom terminal banks ' +
            '(rows a–e and f–j), the central isolation gap, and the VCC/GND power rails. ' +
            'The BCD-to-XS3 converter uses multiple gate ICs; ensure there is sufficient horizontal space.',
        },
        {
          label: 'Place NOT and XOR gates.',
          circuitStepIndex: 1,
          body: 'Mount not1 (74HC04) at column 3, row e for D inversion. ' +
            'Mount not2 (74HC04) at column 20, row h — its output drives the Z (D\') LED directly. ' +
            'Mount xor1 (74HC86) at column 20, row e for Y ≈ C ⊕ D.',
        },
        {
          label: 'Place AND and OR gates.',
          circuitStepIndex: 2,
          body: 'Mount and1 (74HC08) at col 8, row e — computes the B·C product term. ' +
            'Mount and2 (74HC08) at col 8, row h — computes B·D. ' +
            'Mount or1 (74HC32) at col 14, row e — forms W = A + B·C (cascade with and1). ' +
            'Mount or2 (74HC32) at col 14, row h — forms the X output term.',
        },
        {
          label: 'Wire all inputs A, B, C, D.',
          circuitStepIndex: 3,
          body: 'Red: col 1 row a → or1 pin A (A input). ' +
            'Orange: col 2 fans to and1.A, and2.A, or2.A (B fan-out). ' +
            'Blue: col 3 fans to and1.B and xor1.A (C fan-out). ' +
            'Green: col 4 fans to and2.B, not1.A, not2.A, xor1.B (D fan-out). ' +
            'White internal wires: and1.Y → or1.B, and2.Y → or2.B.',
        },
        {
          label: 'Place 330 Ω resistors and LEDs.',
          circuitStepIndex: 4,
          body: 'Place r_w (col 22, row c) and r_x (col 22, row h). ' +
            'Place r_y (col 28, row c) and r_z (col 28, row h). ' +
            'Mount LEDs: led_w red (col 26, row c), led_x yellow (col 26, row h), ' +
            'led_y green (col 32, row c), led_z blue (col 32, row h).',
        },
        {
          label: 'Connect output wires and ground returns.',
          circuitStepIndex: 5,
          body: 'Connect each gate output to its resistor p1. Connect each resistor p2 to its LED anode. ' +
            'Connect all LED cathodes to the GND rail with black wires. ' +
            'Apply +5 V to VCC rail. Verify all ICs have VCC on pin 14 and GND on pin 7.',
        },
        {
          label: 'Test BCD = 0101 (decimal 5).',
          circuitStepIndex: 6,
          body: 'Set A=0, B=1, C=0, D=1 using the DIP switch. ' +
            'Expected XS3 output = 1000 (decimal 8). Only the W LED (red) should illuminate. ' +
            'Verify: 5 + 3 = 8 = 1000₂.',
        },
        {
          label: 'Test BCD = 1001 (decimal 9).',
          circuitStepIndex: 7,
          body: 'Set A=1, B=0, C=0, D=1. ' +
            'Expected XS3 = 1100. W (red) and X (yellow) should illuminate; Y and Z off. ' +
            'Verify: 9 + 3 = 12 = 1100₂.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. All ICs (74HC04, 74HC08, 74HC32, 74HC86) powered from the same rail.',
        'LED forward voltages: red/green ≈ 2.0 V, yellow ≈ 2.1 V, blue ≈ 3.0 V. Resistors = 330 Ω.',
        'The six invalid BCD codes (1010–1111) are not tested; their XS3 outputs are don\'t-cares.',
      ],
      table: {
        headers: ['BCD Input (A B C D)', 'Decimal', 'W', 'X', 'Y', 'Z', 'XS3 Value'],
        rows: [
          ['0 0 0 0', 0,  0, 0, 1, 1, '0011 (3)'],
          ['0 0 0 1', 1,  0, 1, 0, 0, '0100 (4)'],
          ['0 0 1 0', 2,  0, 1, 0, 1, '0101 (5)'],
          ['0 0 1 1', 3,  0, 1, 1, 0, '0110 (6)'],
          ['0 1 0 0', 4,  0, 1, 1, 1, '0111 (7)'],
          ['0 1 0 1', 5,  1, 0, 0, 0, '1000 (8)'],
          ['0 1 1 0', 6,  1, 0, 0, 1, '1001 (9)'],
          ['0 1 1 1', 7,  1, 0, 1, 0, '1010 (10)'],
          ['1 0 0 0', 8,  1, 0, 1, 1, '1011 (11)'],
          ['1 0 0 1', 9,  1, 1, 0, 0, '1100 (12)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The BCD-to-Excess-3 converter was successfully implemented on the breadboard. ' +
        'The four output LEDs correctly indicated the XS3 code for each valid BCD input (0–9), ' +
        'confirming the K-map minimised Boolean expressions W = A+BC+BD, X = B\'C+B\'D+BC\'D\', ' +
        'Y = C\'D\'+CD, Z = D\'.',

        'The experiment demonstrates the practical application of K-map minimisation in ' +
        'multi-output combinational circuit design. The XS3 code\'s self-complementing property ' +
        '(the 9\'s complement equals the bitwise NOT) makes it valuable in BCD arithmetic circuits.',

        'Using standard CMOS gate ICs (74HC04, 74HC08, 74HC32, 74HC86) on a breadboard ' +
        'provides a direct verification path from Boolean algebra through to observable LED outputs, ' +
        'reinforcing the connection between logic design theory and physical digital systems.',
      ],
    },
  ],
};
