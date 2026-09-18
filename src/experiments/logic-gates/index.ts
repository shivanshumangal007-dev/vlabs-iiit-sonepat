import { type Experiment } from '@/experiments/types';

export const LogicGates: Experiment = {
  id: 'logic-gates',
  title: 'Realisation of basic logic gates',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Computer Application',
    description: 'Implement AND, OR, NOT, NAND, NOR, XOR, and XNOR gates using 74HC-series ICs. Verify the truth table of each gate using LEDs.',
    tags: ['logic gates', 'and', 'or', 'not', 'nand', 'nor', 'xor', '74hc'],
  },
  metaTitle: 'Realisation of basic logic gates — VLabs',
  metaDescription: 'Implement AND, OR, NOT, NAND, NOR, XOR, and XNOR gates using 74HC-series ICs. Verify the truth table of each gate using LEDs.',
  circuit: {
  id: 'logic-gates',
  title: 'Logic Gates',
  description:
    'All seven standard logic gates demonstrated side by side: ' +
    'AND, OR, NOT, NAND, NOR, XOR, and XNOR. ' +
    'Inputs A and B are fanned out to every gate (NOT uses only A). ' +
    'Each gate drives its own LED through a 330 Ω resistor.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gate ICs ──────────────────────────────────────────────────────────
    { id: 'and1',  type: 'and-gate',  mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'or1',   type: 'or-gate',   mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'not1',  type: 'not-gate',  mountedAt: { board: 'bb', col: 10, row: 'e' } },
    { id: 'nand1', type: 'nand-gate', mountedAt: { board: 'bb', col: 13, row: 'e' } },
    { id: 'nor1',  type: 'nor-gate',  mountedAt: { board: 'bb', col: 16, row: 'e' } },
    { id: 'xor1',  type: 'xor-gate',  mountedAt: { board: 'bb', col: 19, row: 'e' } },
    { id: 'xnor1', type: 'xnor-gate', mountedAt: { board: 'bb', col: 22, row: 'e' } },

    // ── Output resistors (330 Ω) ──────────────────────────────────────────
    { id: 'r_and',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'r_or',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'r_not',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 33, row: 'c' } },
    { id: 'r_nand', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'r_nor',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 40, row: 'c' } },
    { id: 'r_xor',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 40, row: 'h' } },
    { id: 'r_xnor', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 47, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_and',  type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 31, row: 'c' } },
    { id: 'led_or',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 31, row: 'h' } },
    { id: 'led_not',  type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 38, row: 'c' } },
    { id: 'led_nand', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 38, row: 'h' } },
    { id: 'led_nor',  type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 45, row: 'c' } },
    { id: 'led_xor',  type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 45, row: 'h' } },
    { id: 'led_xnor', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 52, row: 'c' } },

    // ── Input wires: A (red) — col 1 row a fans out ──────────────────────
    { id: 'w_a_and',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'and1',  pin: 'A' } },
    { id: 'w_a_or',   type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'or1',   pin: 'A' } },
    { id: 'w_a_not',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'c' }, to: { ic: 'not1',  pin: 'A' } },
    { id: 'w_a_nand', type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'd' }, to: { ic: 'nand1', pin: 'A' } },
    { id: 'w_a_nor',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'g' }, to: { ic: 'nor1',  pin: 'A' } },
    { id: 'w_a_xor',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'h' }, to: { ic: 'xor1',  pin: 'A' } },
    { id: 'w_a_xnor', type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'i' }, to: { ic: 'xnor1', pin: 'A' } },

    // ── Input wires: B (blue) — col 2 row a fans out ─────────────────────
    { id: 'w_b_and',  type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'and1',  pin: 'B' } },
    { id: 'w_b_or',   type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'or1',   pin: 'B' } },
    { id: 'w_b_nand', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'c' }, to: { ic: 'nand1', pin: 'B' } },
    { id: 'w_b_nor',  type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'd' }, to: { ic: 'nor1',  pin: 'B' } },
    { id: 'w_b_xor',  type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'g' }, to: { ic: 'xor1',  pin: 'B' } },
    { id: 'w_b_xnor', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'h' }, to: { ic: 'xnor1', pin: 'B' } },

    // ── Gate output → resistor wires ──────────────────────────────────────
    { id: 'w_and_out',  type: 'wire', color: 'green',  from: { ic: 'and1',  pin: 'Y' }, to: { component: 'r_and',  end: 'p1' } },
    { id: 'w_or_out',   type: 'wire', color: 'green',  from: { ic: 'or1',   pin: 'Y' }, to: { component: 'r_or',   end: 'p1' } },
    { id: 'w_not_out',  type: 'wire', color: 'yellow', from: { ic: 'not1',  pin: 'Y' }, to: { component: 'r_not',  end: 'p1' } },
    { id: 'w_nand_out', type: 'wire', color: 'orange', from: { ic: 'nand1', pin: 'Y' }, to: { component: 'r_nand', end: 'p1' } },
    { id: 'w_nor_out',  type: 'wire', color: 'white',  from: { ic: 'nor1',  pin: 'Y' }, to: { component: 'r_nor',  end: 'p1' } },
    { id: 'w_xor_out',  type: 'wire', color: 'purple', from: { ic: 'xor1',  pin: 'Y' }, to: { component: 'r_xor',  end: 'p1' } },
    { id: 'w_xnor_out', type: 'wire', color: 'green',  from: { ic: 'xnor1', pin: 'Y' }, to: { component: 'r_xnor', end: 'p1' } },

    // ── Resistor → LED anode wires ────────────────────────────────────────
    { id: 'w_and_led',  type: 'wire', color: 'green',  from: { component: 'r_and',  end: 'p2' }, to: { led: 'led_and',  end: 'anode' } },
    { id: 'w_or_led',   type: 'wire', color: 'green',  from: { component: 'r_or',   end: 'p2' }, to: { led: 'led_or',   end: 'anode' } },
    { id: 'w_not_led',  type: 'wire', color: 'yellow', from: { component: 'r_not',  end: 'p2' }, to: { led: 'led_not',  end: 'anode' } },
    { id: 'w_nand_led', type: 'wire', color: 'orange', from: { component: 'r_nand', end: 'p2' }, to: { led: 'led_nand', end: 'anode' } },
    { id: 'w_nor_led',  type: 'wire', color: 'white',  from: { component: 'r_nor',  end: 'p2' }, to: { led: 'led_nor',  end: 'anode' } },
    { id: 'w_xor_led',  type: 'wire', color: 'purple', from: { component: 'r_xor',  end: 'p2' }, to: { led: 'led_xor',  end: 'anode' } },
    { id: 'w_xnor_led', type: 'wire', color: 'green',  from: { component: 'r_xnor', end: 'p2' }, to: { led: 'led_xnor', end: 'anode' } },

    // ── LED cathode → GND wires ───────────────────────────────────────────
    { id: 'w_and_gnd',  type: 'wire', color: 'black', from: { led: 'led_and',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 32 } },
    { id: 'w_or_gnd',   type: 'wire', color: 'black', from: { led: 'led_or',   end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 33 } },
    { id: 'w_not_gnd',  type: 'wire', color: 'black', from: { led: 'led_not',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 39 } },
    { id: 'w_nand_gnd', type: 'wire', color: 'black', from: { led: 'led_nand', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 40 } },
    { id: 'w_nor_gnd',  type: 'wire', color: 'black', from: { led: 'led_nor',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 46 } },
    { id: 'w_xor_gnd',  type: 'wire', color: 'black', from: { led: 'led_xor',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 47 } },
    { id: 'w_xnor_gnd', type: 'wire', color: 'black', from: { led: 'led_xnor', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 53 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The breadboard is the build surface. Red rails = VCC, blue rails = GND. ' +
        'We will place all seven standard gates across the board.',
      show: ['bb'],
    },
    {
      title: 'Place AND and OR gates',
      body: '74HC08 AND gate at col 4 and 74HC32 OR gate at col 7. ' +
        'AND outputs HIGH only when both inputs are HIGH. ' +
        'OR outputs HIGH when at least one input is HIGH.',
      show: ['bb', 'and1', 'or1'],
      highlight: 'and1',
    },
    {
      title: 'Place NOT gate',
      body: '74HC04 NOT (inverter) gate at col 10. ' +
        'It has only one input (A) and outputs the complement: Y = NOT A.',
      show: ['bb', 'and1', 'or1', 'not1'],
      highlight: 'not1',
    },
    {
      title: 'Place NAND and NOR gates',
      body: '74HC00 NAND gate at col 13 and 74HC02 NOR gate at col 16. ' +
        'NAND = NOT(AND), NOR = NOT(OR). These are universal gates.',
      show: ['bb', 'and1', 'or1', 'not1', 'nand1', 'nor1'],
      highlight: 'nand1',
    },
    {
      title: 'Place XOR and XNOR gates',
      body: '74HC86 XOR gate at col 19 and 74HC266 XNOR gate at col 22. ' +
        'XOR outputs HIGH when inputs differ. XNOR outputs HIGH when inputs match.',
      show: ['bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1'],
      highlight: 'xor1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'Red wires: input A (col 1) fans out to all seven gate A pins. ' +
        'Blue wires: input B (col 2) fans out to six gates (NOT has no B). ' +
        'Every gate sees the same A and B signals.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add 330 Ω resistors',
      body: 'Seven 330 Ω resistors, one per gate output. ' +
        'Placed in alternating top/bottom banks to avoid column overlaps.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add output LEDs',
      body: 'Seven LEDs, one per gate. Each LED anode connects to its resistor, cathode to GND.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect all output wires',
      body: 'Gate Y pins → resistors → LED anodes, LED cathodes → GND. Circuit complete.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=0',
      body: 'AND=0, OR=0, NOT=1, NAND=1, NOR=1, XOR=0, XNOR=1. ' +
        'Inverted gates (NOT, NAND, NOR, XNOR) light up.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=1',
      body: 'AND=0, OR=1, NOT=1, NAND=1, NOR=0, XOR=1, XNOR=0. ' +
        'OR and XOR detect the single HIGH input.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 0, B: 1 },
    },
    {
      title: 'Test: A=1, B=0',
      body: 'AND=0, OR=1, NOT=0, NAND=1, NOR=0, XOR=1, XNOR=0. ' +
        'NOT flips since A is now HIGH.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 1, B: 0 },
    },
    {
      title: 'Test: A=1, B=1',
      body: 'AND=1, OR=1, NOT=0, NAND=0, NOR=0, XOR=0, XNOR=1. ' +
        'AND finally lights up. XNOR detects matching inputs.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      highlight: 'led_and',
      activeInputs: { A: 1, B: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { AND: 0, OR: 0, NOT: 1, NAND: 1, NOR: 1, XOR: 0, XNOR: 1 } },
      { inputs: { A: 0, B: 1 }, outputs: { AND: 0, OR: 1, NOT: 1, NAND: 1, NOR: 0, XOR: 1, XNOR: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { AND: 0, OR: 1, NOT: 0, NAND: 1, NOR: 0, XOR: 1, XNOR: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { AND: 1, OR: 1, NOT: 0, NAND: 0, NOR: 0, XOR: 0, XNOR: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Logic gates are the fundamental building blocks of all digital circuits. Each gate implements a specific Boolean operation on one or more binary inputs and produces a single binary output. The basic gates are AND, OR, NOT (inverter), NAND, NOR, XOR (Exclusive-OR), and XNOR (Exclusive-NOR). In positive logic, a HIGH voltage (logic 1) typically corresponds to the supply rail (e.g., 5 V or 3.3 V) and a LOW voltage (logic 0) corresponds to ground.',
        'The 74HC (High-speed CMOS) logic family operates from 2 V to 6 V supply, offers low power consumption, and has adequate drive strength (fan-out of 10 for LSTTL loads, or up to 50 for CMOS loads at low frequencies). Key ICs: 74HC04 (hex inverter — 6 NOT gates), 74HC08 (quad 2-input AND), 74HC32 (quad 2-input OR), 74HC00 (quad 2-input NAND), 74HC02 (quad 2-input NOR), 74HC86 (quad 2-input XOR). XNOR can be realised by inverting the output of an XOR gate.',
        "Each gate's behaviour is fully described by its truth table. For a 2-input gate, there are 2² = 4 possible input combinations (00, 01, 10, 11). The truth table lists the output for each combination. For AND: output is 1 only when both inputs are 1. For OR: output is 0 only when both inputs are 0. NAND and NOR are the complements of AND and OR respectively, and are functionally complete — any Boolean function can be realised using only NAND gates (or only NOR gates).",
        'In this experiment each gate is individually wired on a breadboard using the corresponding 74HC-series IC, input logic levels are applied via switch-to-Vcc/GND connections, and the output is observed via an LED (lit = logic 1, off = logic 0). The measured truth tables are compared with standard truth tables to verify correct operation.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14, NOT gate', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC00 Quad 2-input NAND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC02 Quad 2-input NOR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm, 2 V forward voltage', quantity: '7' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '7' },
        { name: 'SPDT Switch / Jumper', specification: 'For logic input selection', quantity: '4' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '25' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Prepare breadboard and power rails',
          body: 'Connect the 5 V regulated supply to the red (+) rail and ground to the blue (−) rail of the breadboard. Insert input switches: wire each switch so that one position connects the input line to +5 V (logic 1) and the other position connects it to GND through a 10 kΩ pull-down resistor (logic 0). Label the input lines A and B. Verify the supply voltage with a multimeter before inserting any IC.',
          circuitStepIndex: 0,
        },
        {
          label: 'Insert and power the first IC (74HC08 AND)',
          body: 'Insert the 74HC08 DIP-14 IC straddling the centre groove of the breadboard so pins 1–7 are on one side and pins 8–14 on the other. Connect pin 14 (Vcc) to the +5 V rail and pin 7 (GND) to the ground rail. This powers the IC. The 74HC08 contains four AND gates; use gate 1 (pins 1, 2 inputs; pin 3 output) for this step.',
          circuitStepIndex: 1,
        },
        {
          label: 'Wire inputs and LED output indicator',
          body: 'Connect input switch A to pin 1 and input switch B to pin 2 of the AND gate. Connect pin 3 (output) through a 330 Ω current-limiting resistor to the anode of an LED; connect the LED cathode to ground. The LED will illuminate when the gate output is logic 1. Verify no short circuits exist before applying power.',
          circuitStepIndex: 2,
        },
        {
          label: 'Test all input combinations and record',
          body: 'Apply all four input combinations sequentially: (A=0,B=0), (A=0,B=1), (A=1,B=0), (A=1,B=1). For each combination, observe whether the LED is ON (logic 1) or OFF (logic 0). Record the output in the truth table. Compare the measured truth table with the theoretical AND truth table. Repeat this step for OR (74HC32), NOT (74HC04 — single input A only), NAND (74HC00), NOR (74HC02), XOR (74HC86), and XNOR (XOR output through an inverter).',
          circuitStepIndex: 3,
        },
        {
          label: 'Verify XNOR using XOR + NOT',
          body: 'To realise XNOR, cascade the XOR output (pin 3 of 74HC86) into the input of an unused NOT gate (pin 1 of 74HC04). Take the NOT output (pin 2 of 74HC04) and connect it to the LED indicator. Test all four input combinations. The result should be the complement of the XOR output: LED ON only for inputs (0,0) and (1,1). This demonstrates gate cascading and the derivation of complex functions from basic gates.',
          circuitStepIndex: 4,
        },
        {
          label: 'Document and compare all truth tables',
          body: 'Consolidate the truth tables for all seven gate types in the observation table. For each gate, mark any discrepancy between observed and expected output. Common failure modes include: incorrect IC orientation (check pin 1 notch/dot), missing Vcc or GND connections, floating inputs (must be tied to Vcc or GND — never left unconnected in CMOS). Verify that all observed truth tables match theory.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Combined truth table for all basic logic gates. Output 1 = LED ON, Output 0 = LED OFF. All observations match the theoretical truth tables.',
      ],
      table: {
        headers: ['A', 'B', 'AND', 'OR', 'NOT A', 'NAND', 'NOR', 'XOR', 'XNOR'],
        rows: [
          [0, 0, 0, 0, 1, 1, 1, 0, 1],
          [0, 1, 0, 1, 1, 1, 0, 1, 0],
          [1, 0, 0, 1, 0, 1, 0, 1, 0],
          [1, 1, 1, 1, 0, 0, 0, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'All seven basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) have been successfully realised using 74HC-series ICs on a breadboard. The observed truth tables for each gate match the theoretical truth tables exactly.',
        'The XNOR gate was derived by cascading an XOR gate output through a NOT gate, demonstrating that complex logic functions can be built by combining simpler gates. NAND and NOR gates are confirmed to be functionally complete building blocks.',
        'The 74HC logic family proved reliable at 5 V, with clear HIGH (> 4.5 V) and LOW (< 0.1 V) output levels easily distinguished by the LED indicators. This experiment builds the foundational understanding required for designing combinational and sequential digital circuits.',
      ],
    },
  ],
};
