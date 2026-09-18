import { type Experiment } from '@/experiments/types';

export const HalfSubtractor: Experiment = {
  id: 'half-subtractor',
  title: 'Half Subtractor',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Realisation of basic logic gates',
    description: 'The half subtractor computes A − B, yielding a Difference (XOR) and a Borrow ((NOT A) AND B).',
    tags: ['subtractor', 'difference', 'borrow', 'xor', 'not', 'and'],
  },
  metaTitle: 'Half Subtractor — VLabs',
  metaDescription: 'The half subtractor computes A − B, yielding a Difference (XOR) and a Borrow ((NOT A) AND B).',
  circuit: {
  id: 'half-subtractor',
  title: 'Half Subtractor',
  description:
    'A half subtractor computes A minus B. ' +
    'Difference = A XOR B. Borrow = (NOT A) AND B. ' +
    'Built from one XOR gate, one NOT gate, and one AND gate.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 13, row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 20, row: 'e' } },

    { id: 'r_diff',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'r_borrow', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'h' } },
    { id: 'led_diff',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'led_borrow', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 28, row: 'h' } },

    { id: 'w_a_xor', type: 'wire', color: 'red',  from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_b_xor', type: 'wire', color: 'blue', from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_a_not', type: 'wire', color: 'red',  from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'not1', pin: 'A' } },
    { id: 'w_not_and', type: 'wire', color: 'white', from: { ic: 'not1', pin: 'Y' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b_and',   type: 'wire', color: 'blue',  from: { board: 'bb', col: 3, row: 'b' }, to: { ic: 'and1', pin: 'B' } },

    { id: 'w_diff_r',   type: 'wire', color: 'green', from: { ic: 'xor1', pin: 'Y' },           to: { component: 'r_diff',   end: 'p1' } },
    { id: 'w_diff_led', type: 'wire', color: 'green', from: { component: 'r_diff',   end: 'p2' }, to: { led: 'led_diff',   end: 'anode' } },
    { id: 'w_bor_r',    type: 'wire', color: 'orange', from: { ic: 'and1', pin: 'Y' },            to: { component: 'r_borrow', end: 'p1' } },
    { id: 'w_bor_led',  type: 'wire', color: 'red',   from: { component: 'r_borrow', end: 'p2' }, to: { led: 'led_borrow', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_diff',   end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_borrow', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place the breadboard', body: 'Half subtractor uses three gates: XOR, NOT, AND.', show: ['bb'] },
    { title: 'Place XOR and NOT gates', body: 'XOR computes the Difference bit. NOT inverts input A for the borrow logic.', show: ['bb','xor1','not1'], highlight: 'xor1' },
    { title: 'Place AND gate', body: 'AND takes (NOT A) and B. Output is the Borrow: we borrow only when A=0 and B=1.', show: ['bb','xor1','not1','and1'], highlight: 'and1' },
    { title: 'Wire inputs', body: 'Red=A fans to XOR and NOT. Blue=B fans to XOR and AND.', show: ['bb','xor1','not1','and1','w_a_xor','w_b_xor','w_a_not','w_b_and'], activeInputs: { A: 0, B: 0 } },
    { title: 'Connect NOT to AND', body: 'White wire carries the inverted A to AND gate input.', show: ['bb','xor1','not1','and1','w_a_xor','w_b_xor','w_a_not','w_b_and','w_not_and'], activeInputs: { A: 0, B: 0 } },
    { title: 'Add outputs and test', body: 'Green=Difference, Red=Borrow. Test: A=0,B=1 → Diff=1, Borrow=1.', show: ['bb','xor1','not1','and1','w_a_xor','w_b_xor','w_a_not','w_b_and','w_not_and','r_diff','r_borrow','led_diff','led_borrow','w_diff_r','w_diff_led','w_bor_r','w_bor_led','w_gnd1','w_gnd2'], highlight: 'led_borrow', activeInputs: { A: 0, B: 1 } },
  ],

  truthTable: {
    inputs: ['A', 'B'],
    outputs: ['Diff', 'Borrow'],
    rows: [
      { inputs: { A:0, B:0 }, outputs: { Diff:0, Borrow:0 } },
      { inputs: { A:0, B:1 }, outputs: { Diff:1, Borrow:1 } },
      { inputs: { A:1, B:0 }, outputs: { Diff:1, Borrow:0 } },
      { inputs: { A:1, B:1 }, outputs: { Diff:0, Borrow:0 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Half Subtractor is a combinational logic circuit that performs the subtraction of two single-bit binary numbers: minuend A and subtrahend B. It produces two outputs: the Difference bit (D) and the Borrow bit (Bout). The "half" qualifier indicates that it cannot accommodate a borrow-in from a previous stage — for multi-bit subtraction a Full Subtractor (or its cascade) is required.',
        'The truth table for a Half Subtractor follows directly from binary subtraction rules: 0−0 = 0 with no borrow; 0−1 = 1 with a borrow of 1 (since we must borrow from the next significant bit); 1−0 = 1 with no borrow; 1−1 = 0 with no borrow. The resulting Boolean expressions are: Difference D = A ⊕ B (XOR), Borrow Bout = A\' · B = (NOT A) AND B.',
        "Gate-level implementation: one XOR gate (from 74HC86) produces the Difference output. One NOT gate (from 74HC04) inverts input A to produce A'. One AND gate (from 74HC08) computes A' AND B to produce the Borrow output. Total ICs required: one 74HC86 (XOR), one 74HC04 (NOT), and one 74HC08 (AND) — though all three functions may be found on a single 74HC series combination IC.",
        "The Half Subtractor's Borrow expression Bout = A'·B is the complement of the A term ANDed with B. This is asymmetric: subtracting 1 from 0 generates a borrow, but subtracting 0 from any value does not. This asymmetry contrasts with the Half Adder's symmetric carry expression Cout = A·B, which treats both inputs equivalently.",
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (for NOT gate)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Difference output)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (Borrow output)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input selection (A, B)', quantity: '2' },
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
          label: 'Set up breadboard and input switches',
          body: 'Connect the 5 V supply to the breadboard power rails. Prepare two input switches for A and B: each switch in the HIGH position connects the line to +5 V; in the LOW position, a 10 kΩ pull-down resistor holds the line at GND. Label the switch positions clearly. Measure the voltages at each switch output to confirm clean HIGH (≥ 4.5 V) and LOW (≤ 0.1 V) levels before inserting ICs.',
          circuitStepIndex: 0,
        },
        {
          label: 'Insert XOR (74HC86) and NOT (74HC04) ICs',
          body: 'Insert both DIP-14 ICs straddling the breadboard centre groove. Power both: pin 14 → +5 V, pin 7 → GND for each IC. Wire XOR gate 1 (74HC86 pins 1, 2 → 3): connect input A to pin 1 and input B to pin 2. The Difference output D = A⊕B is available on pin 3. Wire NOT gate 1 (74HC04 pins 1 → 2): connect input A to pin 1. The inverted signal A\' appears on pin 2.',
          circuitStepIndex: 1,
        },
        {
          label: 'Insert AND gate (74HC08) and wire Borrow path',
          body: "Insert the 74HC08, power pin 14 (+5 V) and pin 7 (GND). Wire AND gate 1 (pins 1, 2 → 3): connect A' (pin 2 of 74HC04) to pin 1 of 74HC08, and connect input B to pin 2 of 74HC08. The Borrow output Bout = A'·B appears on pin 3 of 74HC08. This three-gate chain (NOT→AND) correctly implements the Borrow logic.",
          circuitStepIndex: 2,
        },
        {
          label: 'Connect LED output indicators',
          body: 'Connect the Difference output (XOR pin 3) through a 330 Ω resistor to the anode of the green LED; cathode to GND. Connect the Borrow output (AND pin 3) through a 330 Ω resistor to the anode of the red LED; cathode to GND. Verify the LED orientation — the flat side (cathode) connects to GND. The green LED indicates D and the red LED indicates Bout.',
          circuitStepIndex: 3,
        },
        {
          label: "Wire NOT gate output to AND gate input",
          body: "Use a short jumper wire to connect pin 2 of the 74HC04 (A' signal) to pin 1 of the 74HC08 (AND gate input). This is the critical inter-IC connection that forms the Borrow logic. Double-check that input A also reaches XOR pin 1 (for the Difference path) through a separate wire — both paths share the A input but process it differently.",
          circuitStepIndex: 4,
        },
        {
          label: 'Test all 4 input combinations and verify',
          body: 'Apply all four input combinations: (A=0,B=0), (A=0,B=1), (A=1,B=0), (A=1,B=1). For each, record the state of both LEDs in the observation table. Expected: (0,0)→D=0,Bout=0; (0,1)→D=1,Bout=1 (borrow!); (1,0)→D=1,Bout=0; (1,1)→D=0,Bout=0. If Borrow is incorrect, probe the NOT output to verify A\' is correct, then probe the AND output.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "Truth table for the Half Subtractor. D = A⊕B, Bout = A'B. Green LED = Difference (D), Red LED = Borrow (Bout).",
      ],
      table: {
        headers: ['A', 'B', 'D = A⊕B (observed)', 'Bout = A\'B (observed)', 'D (expected)', 'Bout (expected)'],
        rows: [
          [0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1],
          [1, 0, 1, 0, 1, 0],
          [1, 1, 0, 0, 0, 0],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The Half Subtractor circuit has been successfully implemented using 74HC86 (XOR), 74HC04 (NOT), and 74HC08 (AND) ICs. The observed Difference and Borrow outputs for all four input combinations match the expected truth table.",
        "The input combination (A=0, B=1) correctly generates a Borrow, demonstrating the circuit's ability to model borrowing in binary subtraction. The Borrow expression A'·B is confirmed to be asymmetric with respect to the two inputs.",
        "The Half Subtractor is the basic building block for binary subtractors. Cascading two Half Subtractors with an OR gate produces a Full Subtractor. Understanding this circuit lays the groundwork for designing ALUs capable of both addition and subtraction.",
      ],
    },
  ],
};
