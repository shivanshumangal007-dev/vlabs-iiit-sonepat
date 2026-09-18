import { type Experiment } from '@/experiments/types';

export const DigitalComparator: Experiment = {
  id: 'digital-comparator',
  title: '4-bit Digital Magnitude Comparator',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Parity Checker/Generator',
    description: 'Design a 4-bit magnitude comparator that asserts A>B, A=B, or A<B outputs. Implement using XNOR gates and cascaded logic.',
    tags: ['comparator', '4-bit', 'magnitude', 'xnor', 'combinational'],
  },
  metaTitle: '4-bit Digital Magnitude Comparator — VLabs',
  metaDescription: 'Design a 4-bit magnitude comparator that asserts A>B, A=B, or A<B outputs. Implement using XNOR gates and cascaded logic.',
  circuit: {
  id: 'digital-comparator',
  title: '4-bit Digital Magnitude Comparator',
  description:
    'Implement a 1-bit magnitude comparator showing A=B (XNOR), A>B (A·B\u2019), ' +
    'and A<B (A\u2019·B). Extend the concept to 4-bit magnitude comparison.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gates ─────────────────────────────────────────────────────────────
    { id: 'xnor1', type: 'xnor-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'not1',  type: 'not-gate',  mountedAt: { board: 'bb', col: 10, row: 'e' } },
    { id: 'and1',  type: 'and-gate',  mountedAt: { board: 'bb', col: 16, row: 'e' } },
    { id: 'not2',  type: 'not-gate',  mountedAt: { board: 'bb', col: 10, row: 'h' } },
    { id: 'and2',  type: 'and-gate',  mountedAt: { board: 'bb', col: 16, row: 'h' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_eq', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'r_gt', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'r_lt', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_eq', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_gt', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_lt', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 25, row: 'c' } },

    // ── Input A → xnor1.A, and1.A ────────────────────────────────────────
    { id: 'w_a_xnor', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'xnor1', pin: 'A' } },
    { id: 'w_a_and1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'and1', pin: 'A' } },
    { id: 'w_a_not2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'c' },
      to:   { ic: 'not2', pin: 'A' } },

    // ── Input B → xnor1.B, not1.A, and2.B ────────────────────────────────
    { id: 'w_b_xnor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'xnor1', pin: 'B' } },
    { id: 'w_b_not1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'not1', pin: 'A' } },
    { id: 'w_b_and2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'c' },
      to:   { ic: 'and2', pin: 'B' } },

    // ── NOT_B → and1.B (GT path) ──────────────────────────────────────────
    { id: 'w_notb_and1', type: 'wire', color: 'orange',
      from: { ic: 'not1', pin: 'Y' },
      to:   { ic: 'and1', pin: 'B' } },

    // ── NOT_A → and2.A (LT path) ──────────────────────────────────────────
    { id: 'w_nota_and2', type: 'wire', color: 'purple',
      from: { ic: 'not2', pin: 'Y' },
      to:   { ic: 'and2', pin: 'A' } },

    // ── EQ output: xnor1.Y → r_eq → led_eq → GND ────────────────────────
    { id: 'w_xnor_req',  type: 'wire', color: 'yellow',
      from: { ic: 'xnor1', pin: 'Y' },
      to:   { component: 'r_eq', end: 'p1' } },
    { id: 'w_req_led',   type: 'wire', color: 'yellow',
      from: { component: 'r_eq', end: 'p2' },
      to:   { led: 'led_eq', end: 'anode' } },
    { id: 'w_eq_gnd',    type: 'wire', color: 'black',
      from: { led: 'led_eq', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── GT output: and1.Y → r_gt → led_gt → GND ─────────────────────────
    { id: 'w_and1_rgt', type: 'wire', color: 'red',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_gt', end: 'p1' } },
    { id: 'w_rgt_led',  type: 'wire', color: 'red',
      from: { component: 'r_gt', end: 'p2' },
      to:   { led: 'led_gt', end: 'anode' } },
    { id: 'w_gt_gnd',   type: 'wire', color: 'black',
      from: { led: 'led_gt', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },

    // ── LT output: and2.Y → r_lt → led_lt → GND ─────────────────────────
    { id: 'w_and2_rlt', type: 'wire', color: 'green',
      from: { ic: 'and2', pin: 'Y' },
      to:   { component: 'r_lt', end: 'p1' } },
    { id: 'w_rlt_led',  type: 'wire', color: 'green',
      from: { component: 'r_lt', end: 'p2' },
      to:   { led: 'led_lt', end: 'anode' } },
    { id: 'w_lt_gnd',   type: 'wire', color: 'black',
      from: { led: 'led_lt', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 3 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. ' +
        'We will build a 1-bit magnitude comparator with three outputs: EQ (A=B), GT (A>B), LT (A<B). ' +
        'Three LEDs — yellow (EQ), red (GT), green (LT) — indicate the result.',
      show: ['bb'],
    },
    {
      title: 'Place gates',
      body: 'Mount: 74HC266 XNOR at col 4 (EQ); 74HC04 NOT at col 10 row e (for B\u2019); ' +
        '74HC08 AND at col 16 row e (GT: A·B\u2019); 74HC04 NOT at col 10 row h (for A\u2019); ' +
        '74HC08 AND at col 16 row h (LT: A\u2019·B).',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2'],
      highlight: 'xnor1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'A (red): col 1 rows a,b,c → xnor1.A, and1.A, not2.A. ' +
        'B (blue): col 2 rows a,b,c → xnor1.B, not1.A, and2.B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect internal wires',
      body: 'Orange: NOT1.Y (B\u2019) → AND1.B. Purple: NOT2.Y (A\u2019) → AND2.A. ' +
        'This completes the GT and LT logic paths.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add resistors and LEDs, wire outputs',
      body: 'Yellow LED (EQ) at col 22 row c; Red LED (GT) at col 22 row h; Green LED (LT) at col 25 row c. ' +
        '330 Ω resistors in series before each LED. All cathodes to GND rail.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=0 → EQ=1',
      body: 'XNOR(0,0)=1 → yellow LED ON. AND1(0,1)=0 → red LED OFF. AND2(1,0)=0 → green LED OFF. A equals B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 0, B: 0 },
      highlight: 'led_eq',
    },
    {
      title: 'Test: A=1, B=0 → GT=1',
      body: 'XNOR(1,0)=0 → yellow OFF. AND1(1, NOT0=1)=1 → red LED ON. AND2(NOT1=0, 0)=0 → green OFF. A>B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 1, B: 0 },
      highlight: 'led_gt',
    },
    {
      title: 'Test: A=0, B=1 → LT=1',
      body: 'XNOR(0,1)=0 → yellow OFF. AND1(0, NOT1=0)=0 → red OFF. AND2(NOT0=1, 1)=1 → green LED ON. A<B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 0, B: 1 },
      highlight: 'led_lt',
    },
    {
      title: 'Test: A=1, B=1 → EQ=1',
      body: 'XNOR(1,1)=1 → yellow LED ON. Both GT and LT outputs LOW. A equals B again.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 1, B: 1 },
      highlight: 'led_eq',
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['EQ', 'GT', 'LT'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { EQ: 1, GT: 0, LT: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { EQ: 0, GT: 0, LT: 1 } },
      { inputs: { A: 1, B: 0 }, outputs: { EQ: 0, GT: 1, LT: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { EQ: 1, GT: 0, LT: 0 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A digital magnitude comparator compares two binary numbers and produces three outputs: ' +
        'EQ (A = B), GT (A > B), and LT (A < B). For any input pair, exactly one of these outputs ' +
        'is HIGH. Comparators are essential in sorting networks, address decoders, and ALU flag generation.',

        'For a 1-bit comparator, the logic is straightforward. The equality output uses the XNOR ' +
        'function — XNOR(A, B) is HIGH only when A and B are equal: ' +
        '$$EQ = \\overline{A \\oplus B} = A \\cdot B + \\overline{A} \\cdot \\overline{B}$$ ' +
        'The greater-than output requires A to be HIGH and B to be LOW, implemented with A AND NOT_B: ' +
        '$$GT = A \\cdot \\overline{B}$$ ' +
        'The less-than output requires A to be LOW and B to be HIGH: ' +
        '$$LT = \\overline{A} \\cdot B$$',

        'For a 4-bit comparator (A[3:0] vs B[3:0]), comparison starts from the most-significant bit. ' +
        'If A3 ≠ B3, the result is determined immediately. If A3 = B3, comparison cascades to bit 2, ' +
        'then bit 1, then bit 0. The 74LS85 / 74HC85 IC implements this cascade logic with dedicated ' +
        'cascade inputs (IAGTB, IAEQB, IALTB) allowing multiple comparators to be chained for wider words.',

        'The IC 74HC266 (quad XNOR, DIP-14) and 74HC04 (hex inverter) combined with 74HC08 (AND gates) ' +
        'implement the three output functions on this breadboard. Three LEDs — yellow (EQ), red (GT), ' +
        'green (LT) — indicate the comparison result.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC266 XNOR Gate IC',     specification: 'Quad 2-input XNOR, DIP-14, 5 V supply',       quantity: '1' },
        { name: '74HC04 NOT Gate IC',       specification: 'Hex inverter, DIP-14, 5 V supply',             quantity: '1' },
        { name: '74HC08 AND Gate IC',       specification: 'Quad 2-input AND, DIP-14, 5 V supply',         quantity: '1' },
        { name: 'Yellow LED',               specification: '5 mm, forward voltage ≈ 2.1 V (EQ output)',    quantity: '1' },
        { name: 'Red LED',                  specification: '5 mm, forward voltage ≈ 1.8 V (GT output)',    quantity: '1' },
        { name: 'Green LED',                specification: '5 mm, forward voltage ≈ 2.0 V (LT output)',    quantity: '1' },
        { name: 'Resistor 330 Ω',           specification: '¼ W, carbon film, current limiter for LEDs',   quantity: '3' },
        { name: 'DIP Switch (2-position)',  specification: 'For toggling inputs A and B',                  quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
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
          body: 'Place the breadboard on a clean, dry surface. Identify terminal strips and power rails. ' +
            'Red rail = VCC (+5 V), blue rail = GND.',
        },
        {
          label: 'Place all five gates.',
          circuitStepIndex: 1,
          body: 'Mount five ICs: 74HC266 XNOR at col 4 row e (EQ path); ' +
            '74HC04 NOT at col 10 row e (to generate NOT_B for GT path); ' +
            '74HC08 AND at col 16 row e (GT: A · NOT_B); ' +
            '74HC04 NOT at col 10 row h (to generate NOT_A for LT path); ' +
            '74HC08 AND at col 16 row h (LT: NOT_A · B). ' +
            'Press each IC firmly until all pins are seated.',
        },
        {
          label: 'Wire inputs A and B.',
          circuitStepIndex: 2,
          body: 'A (red): col 1 row a → xnor1.A; col 1 row b → and1.A; col 1 row c → not2.A (for NOT_A). ' +
            'B (blue): col 2 row a → xnor1.B; col 2 row b → not1.A (for NOT_B); col 2 row c → and2.B. ' +
            'Inputs A and B are distributed to all gates that need them.',
        },
        {
          label: 'Connect internal wires.',
          circuitStepIndex: 3,
          body: 'Orange wire: NOT1.Y (B\u2019) → AND1.B — completes the A · B\u2019 (GT) path. ' +
            'Purple wire: NOT2.Y (A\u2019) → AND2.A — completes the A\u2019 · B (LT) path.',
        },
        {
          label: 'Add resistors, LEDs, and wire outputs.',
          circuitStepIndex: 4,
          body: 'Place 330 Ω resistors and LEDs for each output: ' +
            'Yellow LED (EQ) at col 22 row c; Red LED (GT) at col 22 row h; Green LED (LT) at col 25 row c. ' +
            'Wire each gate output through its resistor to LED anode. ' +
            'Connect all LED cathodes to GND rail.',
        },
        {
          label: 'Test: A=0, B=0 → EQ=1.',
          circuitStepIndex: 5,
          body: 'Set A=0, B=0. XNOR(0,0)=1 → yellow LED ON. AND1(0, NOT0=1)=0 → red OFF. ' +
            'AND2(NOT0=1, 0)=0 → green OFF. A equals B.',
        },
        {
          label: 'Test: A=1, B=0 → GT=1.',
          circuitStepIndex: 6,
          body: 'Set A=1, B=0. XNOR(1,0)=0 → yellow OFF. AND1(1, NOT0=1)=1 → red LED ON. ' +
            'AND2(NOT1=0, 0)=0 → green OFF. A > B.',
        },
        {
          label: 'Test: A=0, B=1 → LT=1.',
          circuitStepIndex: 7,
          body: 'Set A=0, B=1. XNOR(0,1)=0 → yellow OFF. AND1(0, NOT1=0)=0 → red OFF. ' +
            'AND2(NOT0=1, 1)=1 → green LED ON. A < B.',
        },
        {
          label: 'Test: A=1, B=1 → EQ=1.',
          circuitStepIndex: 8,
          body: 'Set A=1, B=1. XNOR(1,1)=1 → yellow LED ON. GT and LT outputs are both LOW. ' +
            'Record all four test results in the observation table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. Three ICs powered from the same VCC/GND rails.',
        'LED forward voltages: yellow ≈ 2.1 V, red ≈ 1.8 V, green ≈ 2.0 V. Series resistors = 330 Ω.',
        'Note: exactly one LED is ON for each valid input combination (mutually exclusive outputs).',
      ],
      table: {
        headers: ['A', 'B', 'EQ (Yellow)', 'GT (Red)', 'LT (Green)'],
        rows: [
          [0, 0, 'ON',  'OFF', 'OFF'],
          [0, 1, 'OFF', 'OFF', 'ON' ],
          [1, 0, 'OFF', 'ON',  'OFF'],
          [1, 1, 'ON',  'OFF', 'OFF'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 1-bit digital magnitude comparator was successfully built using XNOR, NOT, and AND gates. ' +
        'The three output LEDs (yellow EQ, red GT, green LT) responded correctly to all four input ' +
        'combinations, verifying the comparator logic.',

        'The mutually exclusive nature of the outputs was confirmed — exactly one LED was ON for each ' +
        'input state. The XNOR gate correctly detected equality; AND gate with an inverted input ' +
        'correctly detected the greater-than and less-than conditions.',

        'This 1-bit comparator forms the building block of wider n-bit comparators. By cascading the ' +
        'comparison from the MSB downwards, a 4-bit comparator (such as the 74HC85) can compare two ' +
        '4-bit numbers with propagation through cascade inputs, enabling arbitrary-width comparison.',
      ],
    },
  ],
};
