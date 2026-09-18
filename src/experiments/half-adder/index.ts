// ── src/experiments/half-adder/index.ts ─────────────────────────────────────
// Pilot migration: half-adder is the first experiment expressed as a single
// Experiment object, replacing three separate source files:
//   src/labs/circuits/half-adder/index.ts  (circuit definition)
//   src/labs/content/half-adder.ts         (lab content / sections)
//   explore.data.ts entry                  (explore card metadata)
//
// The adapters in src/experiments/adapters.ts project this back into the old
// LabContent / Circuit shapes during the transition period.

import { type Experiment } from '@/experiments/types';

// ── Circuit definition (was src/labs/circuits/half-adder/index.ts) ───────────
// Inlined here so the Experiment object is self-contained.
export const HalfAdder: Experiment = {
  // ── Identity ─────────────────────────────────────────────────────────────
  id: 'half-adder',
  title: 'Half Adder',
  labType: 'breadboard',
  status: 'live',

  // ── Explore card metadata ─────────────────────────────────────────────────
  explore: {
    semester: 1,
    subject: 'Computer Application',
    description:
      'A half adder adds two single-bit inputs A and B, producing a Sum (XOR) ' +
      'and Carry (AND) bit. Built using 74HC86 and 74HC08 ICs.',
    tags: ['adder', 'xor', 'and', 'sum', 'carry', 'combinational logic'],
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  metaTitle: 'Half Adder — VLabs',
  metaDescription:
    'Step-by-step interactive 3D assembly of a half adder circuit. ' +
    'Build it on a breadboard using a XOR gate, AND gate, LEDs and resistors.',

  // ── Circuit definition (was circuits/half-adder/index.ts) ─────────────────
  circuit: {
    id: 'half-adder',
    title: 'Half Adder',
    description:
      'A half adder adds two single-bit inputs A and B. ' +
      'It produces a Sum bit (A XOR B) and a Carry bit (A AND B). ' +
      'Built on a breadboard using one XOR gate, one AND gate, two LEDs, and two resistors.',

    components: [
      { id: 'bb', type: 'breadboard' },

      // ── ICs ──────────────────────────────────────────────────────────────
      { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'e' } },
      { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 16, row: 'e' } },

      // ── Sum output path (TOP bank, row 'c') ─────────────────────────────
      { id: 'r_sum',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
      { id: 'led_sum', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 27, row: 'c' } },

      // ── Carry output path (BOTTOM bank, row 'h') ────────────────────────
      { id: 'r_carry',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
      { id: 'led_carry', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'h' } },

      // ── Input wires: A (red) ─────────────────────────────────────────────
      { id: 'w_a_xor', type: 'wire', color: 'red',
        from: { board: 'bb', col: 3, row: 'a' },
        to:   { ic: 'xor1', pin: 'A' } },
      { id: 'w_a_and', type: 'wire', color: 'red',
        from: { board: 'bb', col: 3, row: 'b' },
        to:   { ic: 'and1', pin: 'A' } },

      // ── Input wires: B (blue) ────────────────────────────────────────────
      { id: 'w_b_xor', type: 'wire', color: 'blue',
        from: { board: 'bb', col: 4, row: 'a' },
        to:   { ic: 'xor1', pin: 'B' } },
      { id: 'w_b_and', type: 'wire', color: 'blue',
        from: { board: 'bb', col: 4, row: 'b' },
        to:   { ic: 'and1', pin: 'B' } },

      // ── Sum output: XOR.Y → r_sum → led_sum → GND ───────────────────────
      { id: 'w_xor_out', type: 'wire', color: 'green',
        from: { ic: 'xor1', pin: 'Y' },
        to:   { component: 'r_sum', end: 'p1' } },
      { id: 'w_sum_led', type: 'wire', color: 'green',
        from: { component: 'r_sum', end: 'p2' },
        to:   { led: 'led_sum', end: 'anode' } },
      { id: 'w_sum_gnd', type: 'wire', color: 'black',
        from: { led: 'led_sum', end: 'cathode' },
        to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

      // ── Carry output: AND.Y → r_carry → led_carry → GND ────────────────
      { id: 'w_and_out', type: 'wire', color: 'orange',
        from: { ic: 'and1', pin: 'Y' },
        to:   { component: 'r_carry', end: 'p1' } },
      { id: 'w_carry_led', type: 'wire', color: 'yellow',
        from: { component: 'r_carry', end: 'p2' },
        to:   { led: 'led_carry', end: 'anode' } },
      { id: 'w_carry_gnd', type: 'wire', color: 'black',
        from: { led: 'led_carry', end: 'cathode' },
        to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
    ],

    steps: [
      {
        title: 'Start with the breadboard',
        body: 'The solderless breadboard is your build surface. ' +
          'All holes in the same column and same bank (a–e or f–j) are electrically connected. ' +
          'The centre gap isolates the two banks so ICs straddle it — each pin gets its own node. ' +
          'Red rails = VCC (+), blue rails = GND (−).',
        show: ['bb'],
      },
      {
        title: 'Place the XOR gate (74HC86)',
        body: 'Mount the 74HC86 XOR gate straddling the centre gap at column 7. ' +
          'Notch faces left (pin 1 at col 7, row e). ' +
          'XOR output is HIGH only when inputs differ: A ⊕ B. This is the Sum bit.',
        show: ['bb', 'xor1'],
        highlight: 'xor1',
      },
      {
        title: 'Place the AND gate (74HC08)',
        body: 'Mount the 74HC08 AND gate at column 16. ' +
          'AND output is HIGH only when both inputs are HIGH: A · B. This is the Carry bit.',
        show: ['bb', 'xor1', 'and1'],
        highlight: 'and1',
      },
      {
        title: 'Wire inputs A and B',
        body: 'Red wire: col 3 row a → XOR pin A. Col 3 row b → AND pin A. ' +
          'Blue wire: col 4 row a → XOR pin B. Col 4 row b → AND pin B. ' +
          'Both gates see the same A and B inputs.',
        show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and'],
        activeInputs: { A: 0, B: 0 },
      },
      {
        title: 'Add 330 Ω resistors',
        body: 'r_sum (col 22–25, row c) and r_carry (col 22–25, row h — bottom bank). ' +
          'Using different banks keeps their electrical paths completely separate.',
        show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
               'r_sum', 'r_carry'],
        activeInputs: { A: 0, B: 0 },
      },
      {
        title: 'Add output LEDs',
        body: 'Green LED (Sum) at col 27–28, row c. ' +
          'Yellow LED (Carry) at col 27–28, row h (bottom bank).',
        show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
               'r_sum', 'r_carry', 'led_sum', 'led_carry'],
        activeInputs: { A: 0, B: 0 },
      },
      {
        title: 'Connect all output wires',
        body: 'Green: XOR.Y → r_sum.p1. Green: r_sum.p2 → led_sum.anode. ' +
          'Orange: AND.Y → r_carry.p1. Yellow: r_carry.p2 → led_carry.anode. ' +
          'Black: both LED cathodes to GND rail. Circuit complete.',
        show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
               'r_sum', 'r_carry', 'led_sum', 'led_carry',
               'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
               'w_sum_gnd', 'w_carry_gnd'],
        activeInputs: { A: 0, B: 0 },
      },
      {
        title: 'Test: A=0, B=1 → Sum=1, Carry=0',
        body: '0+1=01 in binary. XOR sees different inputs → Sum HIGH → green LED ON. ' +
          'AND sees one LOW → Carry LOW → yellow LED OFF.',
        show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
               'r_sum', 'r_carry', 'led_sum', 'led_carry',
               'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
               'w_sum_gnd', 'w_carry_gnd'],
        activeInputs: { A: 0, B: 1 },
      },
      {
        title: 'Test: A=1, B=1 → Sum=0, Carry=1',
        body: '1+1=10 in binary. XOR sees equal inputs → Sum LOW → green LED OFF. ' +
          'AND sees both HIGH → Carry HIGH → yellow LED ON.',
        show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
               'r_sum', 'r_carry', 'led_sum', 'led_carry',
               'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
               'w_sum_gnd', 'w_carry_gnd'],
        highlight: 'led_carry',
        activeInputs: { A: 1, B: 1 },
      },
    ],

    truthTable: {
      inputs:  ['A', 'B'],
      outputs: ['Sum', 'Carry'],
      rows: [
        { inputs: { A: 0, B: 0 }, outputs: { Sum: 0, Carry: 0 } },
        { inputs: { A: 0, B: 1 }, outputs: { Sum: 1, Carry: 0 } },
        { inputs: { A: 1, B: 0 }, outputs: { Sum: 1, Carry: 0 } },
        { inputs: { A: 1, B: 1 }, outputs: { Sum: 0, Carry: 1 } },
      ],
    },
  },

  // ── Lab page sections (was src/labs/content/half-adder.ts) ───────────────
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A half adder is a combinational logic circuit that performs addition of two single-bit binary inputs, ' +
        'A and B. It produces two outputs: a Sum bit and a Carry bit. The Sum is the result of the XOR ' +
        'operation on A and B (Sum = A ⊕ B), while the Carry is the result of the AND operation ' +
        '(Carry = A · B). The name "half" adder reflects that it cannot handle a carry input from a ' +
        'previous stage — that capability belongs to the full adder.',

        'The XOR gate (74HC86) implements the Sum output. It produces a HIGH output only when its two ' +
        'inputs differ — that is, when exactly one of A or B is HIGH. The AND gate (74HC08) implements ' +
        'the Carry output. It produces a HIGH output only when both A and B are HIGH simultaneously, ' +
        'representing a carry into the next binary digit position.',

        'In binary arithmetic, 0+0=00, 0+1=01, 1+0=01, and 1+1=10. The two bits of the result map ' +
        'directly to the Carry (most significant) and Sum (least significant) outputs of the half adder. ' +
        'The circuit is the fundamental building block of all binary adder architectures and forms the ' +
        'basis of arithmetic logic units (ALUs) in processors.',

        'Both the 74HC86 (XOR) and 74HC08 (AND) are CMOS logic ICs operating from 2 V to 6 V. ' +
        'They are quad-gate packages, meaning each IC contains four independent gates. In this experiment ' +
        'only one gate from each IC is used. Current-limiting resistors (330 Ω) protect the output LEDs ' +
        'from excessive current draw.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC86 XOR Gate IC',       specification: 'Quad 2-input XOR, DIP-14, 5 V supply',         quantity: '1' },
        { name: '74HC08 AND Gate IC',       specification: 'Quad 2-input AND, DIP-14, 5 V supply',         quantity: '1' },
        { name: 'Green LED',                specification: '5 mm, forward voltage ≈ 2.0 V (Sum output)',    quantity: '1' },
        { name: 'Yellow LED',               specification: '5 mm, forward voltage ≈ 2.1 V (Carry output)',  quantity: '1' },
        { name: 'Resistor 330 Ω',           specification: '¼ W, carbon film, current limiter for LEDs',   quantity: '2' },
        { name: 'Push Button / DIP Switch', specification: 'For toggling logic inputs A and B',             quantity: '2' },
        { name: 'Regulated DC Power Supply',specification: '+5 V DC, 500 mA',                              quantity: '1' },
        { name: 'Digital Multimeter',       specification: 'For verifying supply voltage and continuity',   quantity: '1' },
        { name: 'Connecting Wires',         specification: 'M-M jumper wires, assorted colours',            quantity: '1 set' },
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
          body:
            'Place the breadboard on a clean, dry surface. Identify the terminal strips (rows a–e and f–j) ' +
            'and the power rails (red = VCC, blue = GND) running along each long edge. ' +
            'The centre gap electrically isolates the two halves of each row, allowing ICs to straddle it ' +
            'so that each pin lands in its own independent node.',
        },
        {
          label: 'Mount the 74HC86 XOR gate at column 7.',
          circuitStepIndex: 1,
          body:
            'Orient the 74HC86 DIP-14 IC so that pin 1 (marked by a notch or dot on the package) ' +
            'is at the top-left. Straddle it across the centre gap starting at column 7 — pins 1–7 ' +
            'land in rows e (columns 7–13) and pins 8–14 land in rows f (columns 13–7). ' +
            'Press firmly until all 14 pins are seated. This IC provides the XOR function for the Sum output.',
        },
        {
          label: 'Mount the 74HC08 AND gate at column 16.',
          circuitStepIndex: 2,
          body:
            'Place the 74HC08 DIP-14 IC in the same orientation, straddling the centre gap at column 16. ' +
            'Pins 1–7 land in rows e (columns 16–22) and pins 8–14 land in rows f (columns 22–16). ' +
            'This IC provides the AND function for the Carry output. ' +
            'Leave at least one column gap between the two ICs to avoid accidental bridging.',
        },
        {
          label: 'Wire input A (red) to both gates.',
          circuitStepIndex: 3,
          body:
            'Connect a red wire from column 3, row a (your input-A node) to the XOR gate pin A ' +
            '(column 7, row e). Then connect a second red wire from column 3, row b to the AND gate ' +
            'pin A (column 16, row e). Both gates now share the same A input. ' +
            'If using a push button for A, connect one terminal to column 3 and the other to the VCC rail.',
        },
        {
          label: 'Wire input B (blue) to both gates.',
          circuitStepIndex: 3,
          body:
            'Connect a blue wire from column 4, row a to the XOR gate pin B (column 8, row e). ' +
            'Then connect a second blue wire from column 4, row b to the AND gate pin B (column 17, row e). ' +
            'Both gates now also share input B. ' +
            'Verify the two input nodes are electrically separate — A and B must not bridge.',
        },
        {
          label: 'Place the 330 Ω resistors and output LEDs.',
          circuitStepIndex: 4,
          body:
            'Insert the first 330 Ω resistor spanning columns 22–25, row c (Sum path). ' +
            'Insert the green LED with its anode at column 25, row c and cathode at column 26, row c. ' +
            'Insert the second 330 Ω resistor spanning columns 26–29, row c (Carry path). ' +
            'Insert the yellow LED with its anode at column 29, row c and cathode at column 30, row c. ' +
            'Always keep the current-limiting resistor in series before the LED anode.',
        },
        {
          label: 'Connect the output wires and ground returns.',
          circuitStepIndex: 5,
          body:
            'Green wire: XOR output (column 9, row e) → left end of Sum resistor (column 22, row c). ' +
            'Orange wire: AND output (column 18, row e) → left end of Carry resistor (column 26, row c). ' +
            'Black wire: green LED cathode → GND rail. Black wire: yellow LED cathode → GND rail. ' +
            'Red wire: VCC pin of both ICs (pins 14) → VCC rail. Black wire: GND pins (pins 7) → GND rail.',
        },
        {
          label: 'Double-check all connections, then power on.',
          circuitStepIndex: 5,
          body:
            'Before applying power, trace every connection against the schematic. ' +
            'Check IC supply pins (VCC and GND) are connected. Verify no wire bridges across the centre gap. ' +
            'Set input switches A=0, B=0 (both LOW). ' +
            'Connect +5 V DC supply to the VCC rail and GND to the GND rail. ' +
            'Neither LED should light — this matches the truth table row A=0, B=0 → Sum=0, Carry=0.',
        },
        {
          label: 'Test all four input combinations.',
          circuitStepIndex: 6,
          body:
            'Toggle inputs through all four states and observe the LEDs:\n' +
            'A=0, B=0 → Sum=0 (green off), Carry=0 (yellow off)\n' +
            'A=0, B=1 → Sum=1 (green ON), Carry=0 (yellow off)\n' +
            'A=1, B=0 → Sum=1 (green ON), Carry=0 (yellow off)\n' +
            'A=1, B=1 → Sum=0 (green off), Carry=1 (yellow ON)\n' +
            'Record your observations in the table. Compare with the expected truth table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. Both ICs (74HC86 and 74HC08) powered from the same rail.',
        'LED forward voltage: green ≈ 2.0 V, yellow ≈ 2.1 V. Series resistor = 330 Ω.',
        'LED current when ON: I = (VCC − V_f) / R = (5 − 2.0) / 330 ≈ 9.1 mA (within safe range).',
      ],
      table: {
        headers: ['Input A', 'Input B', 'Sum (XOR)', 'Carry (AND)', 'Green LED', 'Yellow LED'],
        rows: [
          [0, 0, 0, 0, 'OFF', 'OFF'],
          [0, 1, 1, 0, 'ON',  'OFF'],
          [1, 0, 1, 0, 'ON',  'OFF'],
          [1, 1, 0, 1, 'OFF', 'ON' ],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The half adder circuit was successfully constructed on the breadboard using a 74HC86 XOR gate ' +
        'and a 74HC08 AND gate. The green LED (Sum output) and yellow LED (Carry output) responded ' +
        'correctly to all four input combinations, confirming the truth table for binary addition of ' +
        'two single-bit numbers.',

        'The XOR gate correctly produced a HIGH Sum output only when the inputs differed (A≠B), and the ' +
        'AND gate correctly produced a HIGH Carry output only when both inputs were HIGH (A=B=1). ' +
        'The measured LED states matched the theoretical truth table in all cases, validating the ' +
        'combinational logic implementation.',

        'This experiment demonstrates the foundational role of the half adder in digital arithmetic. ' +
        'By chaining two half adders with an OR gate, a full adder capable of handling a carry-in ' +
        'can be constructed, forming the basis of multi-bit binary adders used in all modern processors.',
      ],
    },
  ],
};
