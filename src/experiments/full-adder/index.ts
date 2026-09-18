import { type Experiment } from '@/experiments/types';

export const FullAdder: Experiment = {
  id: 'full-adder',
  title: 'Full Adder',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Realisation of basic logic gates',
    description: 'A full adder accepts carry-in enabling multi-bit addition. Built with two XOR gates, two AND gates, and one OR gate.',
    tags: ['adder', 'carry-in', 'sum', 'carry-out', 'combinational logic'],
  },
  metaTitle: 'Full Adder — VLabs',
  metaDescription: 'A full adder accepts carry-in enabling multi-bit addition. Built with two XOR gates, two AND gates, and one OR gate.',
  circuit: {
  id: 'full-adder',
  title: 'Full Adder',
  description:
    'A full adder adds three bits: A, B and a carry-in (Cin). ' +
    'It produces a Sum and a Carry-out. ' +
    'Built from two XOR gates, two AND gates, and one OR gate.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // First XOR: Sum1 = A XOR B
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 4, row: 'e' } },
    // Second XOR: Sum = Sum1 XOR Cin
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 13, row: 'e' } },
    // First AND: A AND B
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 4,  row: 'h' } },
    // Second AND: Sum1 AND Cin
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 13, row: 'h' } },
    // OR: Cout = (A AND B) OR (Sum1 AND Cin)
    { id: 'or1',  type: 'or-gate', mountedAt: { board: 'bb', col: 22, row: 'e' } },

    // Output resistors — r_sum NOT at col24 (or1.Y lands there due to or1 at col22+2=col24)
    // Use col25 to avoid the col24 conflict in the top bank
    { id: 'r_sum',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'r_cout', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'h' } },

    // Output LEDs — placed past resistor p2 (col25+3=28) to avoid any col overlap
    { id: 'led_sum',  type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'led_cout', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 29, row: 'h' } },

    // Input A (red)
    { id: 'w_a_xor1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_a_and1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and1', pin: 'A' } },
    // Input B (blue)
    { id: 'w_b_xor1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_b_and1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },
    // Cin (orange)
    { id: 'w_cin_xor2', type: 'wire', color: 'orange', from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'xor2', pin: 'B' } },
    { id: 'w_cin_and2', type: 'wire', color: 'orange', from: { board: 'bb', col: 3, row: 'b' }, to: { ic: 'and2', pin: 'B' } },
    // XOR1 → XOR2 (Sum1 wire)
    { id: 'w_sum1', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'xor2', pin: 'A' } },
    { id: 'w_sum1_and2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'and2', pin: 'A' } },
    // AND outputs to OR
    { id: 'w_and1_or', type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or', type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },
    // Sum output
    { id: 'w_sum_r',   type: 'wire', color: 'green',  from: { ic: 'xor2', pin: 'Y' },        to: { component: 'r_sum',  end: 'p1' } },
    { id: 'w_sum_led', type: 'wire', color: 'green',  from: { component: 'r_sum',  end: 'p2' }, to: { led: 'led_sum',  end: 'anode' } },
    // Cout output
    { id: 'w_cout_r',   type: 'wire', color: 'orange', from: { ic: 'or1', pin: 'Y' },          to: { component: 'r_cout', end: 'p1' } },
    { id: 'w_cout_led', type: 'wire', color: 'yellow', from: { component: 'r_cout', end: 'p2' }, to: { led: 'led_cout', end: 'anode' } },
    // Ground
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_sum',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_cout', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place the breadboard', body: 'The base for our full adder. We need more columns than the half adder — three inputs, two outputs.', show: ['bb'] },
    { title: 'Place XOR gates', body: 'Two 74HC86 XOR gates: first computes A XOR B (Sum1), second computes Sum1 XOR Cin (final Sum).', show: ['bb','xor1','xor2'], highlight: 'xor1' },
    { title: 'Place AND gates', body: 'Two 74HC08 AND gates: first computes A AND B, second computes Sum1 AND Cin. Both feed the carry logic.', show: ['bb','xor1','xor2','and1','and2'], highlight: 'and1' },
    { title: 'Place OR gate for Carry-out', body: 'One 74HC32 OR gate: Cout = (A AND B) OR (Sum1 AND Cin). If either AND is true, we have a carry.', show: ['bb','xor1','xor2','and1','and2','or1'], highlight: 'or1' },
    { title: 'Wire all inputs', body: 'Red = A, Blue = B, Orange = Cin. Each input fans out to both its XOR and AND gate.', show: ['bb','xor1','xor2','and1','and2','or1','w_a_xor1','w_a_and1','w_b_xor1','w_b_and1','w_cin_xor2','w_cin_and2'], activeInputs: { A: 0, B: 0, Cin: 0 } },
    { title: 'Connect internal wires', body: 'White wires carry Sum1 (XOR1 output) to both XOR2 and AND2. Yellow wires carry both AND outputs to the OR gate.', show: ['bb','xor1','xor2','and1','and2','or1','w_a_xor1','w_a_and1','w_b_xor1','w_b_and1','w_cin_xor2','w_cin_and2','w_sum1','w_sum1_and2','w_and1_or','w_and2_or'], activeInputs: { A: 0, B: 0, Cin: 0 } },
    { title: 'Add output LEDs and test', body: 'Green LED = Sum, Yellow LED = Cout. Test: A=1, B=1, Cin=1 → Sum=1, Cout=1.', show: ['bb','xor1','xor2','and1','and2','or1','w_a_xor1','w_a_and1','w_b_xor1','w_b_and1','w_cin_xor2','w_cin_and2','w_sum1','w_sum1_and2','w_and1_or','w_and2_or','r_sum','r_cout','led_sum','led_cout','w_sum_r','w_sum_led','w_cout_r','w_cout_led','w_gnd1','w_gnd2'], highlight: 'led_sum', activeInputs: { A: 1, B: 1, Cin: 1 } },
  ],

  truthTable: {
    inputs: ['A', 'B', 'Cin'],
    outputs: ['Sum', 'Cout'],
    rows: [
      { inputs: { A:0, B:0, Cin:0 }, outputs: { Sum:0, Cout:0 } },
      { inputs: { A:0, B:0, Cin:1 }, outputs: { Sum:1, Cout:0 } },
      { inputs: { A:0, B:1, Cin:0 }, outputs: { Sum:1, Cout:0 } },
      { inputs: { A:0, B:1, Cin:1 }, outputs: { Sum:0, Cout:1 } },
      { inputs: { A:1, B:0, Cin:0 }, outputs: { Sum:1, Cout:0 } },
      { inputs: { A:1, B:0, Cin:1 }, outputs: { Sum:0, Cout:1 } },
      { inputs: { A:1, B:1, Cin:0 }, outputs: { Sum:0, Cout:1 } },
      { inputs: { A:1, B:1, Cin:1 }, outputs: { Sum:1, Cout:1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Full Adder is a combinational logic circuit that computes the arithmetic sum of three input bits: augend A, addend B, and carry-in Cin. It produces two outputs: the Sum bit and the Carry-out bit (Cout). Unlike a Half Adder, the Full Adder can accept a carry from a previous less-significant stage, making it suitable for chaining into multi-bit ripple-carry or carry-look-ahead adder architectures.',
        'The Boolean expressions for a Full Adder are derived from its truth table. Sum = A ⊕ B ⊕ Cin (three-input XOR). Cout = (A · B) + (B · Cin) + (A · Cin) = (A · B) + Cin · (A ⊕ B). The Cout expression can be factored using the intermediate XOR term P = A ⊕ B: Cout = (A · B) + (Cin · P), which directly maps to the gate-level implementation: two XOR gates for Sum, two AND gates and one OR gate for Cout.',
        'Gate-level implementation using 74HC-series ICs: two 74HC86 (quad XOR) gates for the Sum path, two gates from a 74HC08 (quad AND) for the carry generation, and one gate from a 74HC32 (quad OR) for the carry combination. Total IC count: 1× 74HC86, 1× 74HC08, 1× 74HC32. All three ICs are DIP-14 packages powered from a 5 V supply.',
        'A 4-bit ripple-carry adder is constructed by cascading four Full Adders in series, with each stage\'s Cout connected to the next stage\'s Cin. The carry "ripples" from LSB to MSB, introducing a cumulative propagation delay. The total worst-case delay is 4 × (carry propagation time per stage), which limits the maximum operating frequency of the adder.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (for Sum output)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (for Cout output)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch / Jumper', specification: 'Input logic selection (A, B, Cin)', quantity: '3' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '30' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up breadboard and power supply',
          body: 'Place the breadboard on a static-free surface and connect the 5 V regulated supply to the power rails. Set up three input switches (A, B, Cin): wire each switch so that one position drives the line to +5 V (logic 1) via a direct connection and the other position drives it to GND through a 10 kΩ pull-down resistor (logic 0). Verify the supply voltage at the power rails with a multimeter before inserting ICs.',
          circuitStepIndex: 0,
        },
        {
          label: 'Insert and connect the XOR gates (74HC86)',
          body: 'Insert the 74HC86 straddling the centre groove. Connect pin 14 to +5 V and pin 7 to GND. Wire XOR gate 1 (pins 1 and 2 inputs, pin 3 output): connect input A to pin 1 and input B to pin 2. The output P = A ⊕ B appears on pin 3. Wire XOR gate 2 (pins 4 and 5 inputs, pin 6 output): connect P (pin 3) to pin 4 and Cin to pin 5. The Sum output S = P ⊕ Cin appears on pin 6. Connect pin 6 through a 330 Ω resistor to the green LED.',
          circuitStepIndex: 1,
        },
        {
          label: 'Insert and connect the AND gates (74HC08)',
          body: 'Insert the 74HC08, powering pin 14 (+5 V) and pin 7 (GND). Wire AND gate 1 (pins 1, 2 → pin 3): connect A to pin 1 and B to pin 2. This generates the carry term G1 = A·B on pin 3. Wire AND gate 2 (pins 4, 5 → pin 6): connect the P signal (XOR gate 1 output, pin 3 of 74HC86) to pin 4 and Cin to pin 5. This generates G2 = P·Cin = (A⊕B)·Cin on pin 6.',
          circuitStepIndex: 2,
        },
        {
          label: 'Insert and connect the OR gate (74HC32)',
          body: 'Insert the 74HC32, powering pin 14 (+5 V) and pin 7 (GND). Wire OR gate 1 (pins 1, 2 → pin 3): connect G1 (AND gate 1 output, pin 3 of 74HC08) to pin 1 and G2 (AND gate 2 output, pin 6 of 74HC08) to pin 2. The Carry-out Cout = G1 + G2 appears on pin 3. Connect pin 3 through a 330 Ω resistor to the red LED.',
          circuitStepIndex: 3,
        },
        {
          label: 'Wire all input connections',
          body: 'Double-check that all three inputs A, B, and Cin are connected to the correct IC pins: A → XOR1 pin 1, AND1 pin 1; B → XOR1 pin 2, AND1 pin 2; Cin → XOR2 pin 5, AND2 pin 5; P (XOR1 out) → XOR2 pin 4, AND2 pin 4. Verify all inter-IC wires. Confirm no pins are left floating (all unused gate inputs must be tied to Vcc or GND).',
          circuitStepIndex: 4,
        },
        {
          label: 'Connect internal wires between ICs',
          body: 'Verify the intermediate signal P = A ⊕ B (pin 3 of 74HC86) reaches both pin 4 of the second XOR gate (on the same 74HC86 IC) and pin 4 of 74HC08 (AND gate 2). Verify G1 (pin 3 of 74HC08) and G2 (pin 6 of 74HC08) both reach the OR gate inputs (pins 1 and 2 of 74HC32). Use short jumper wires and organise them neatly to facilitate fault-finding.',
          circuitStepIndex: 5,
        },
        {
          label: 'Test all 8 input combinations and verify outputs',
          body: 'Apply all eight input combinations (A, B, Cin) from 000 to 111 in binary order. For each combination, record the state of the green LED (Sum) and red LED (Cout). Compare with the Full Adder truth table. For example: (1,1,1) should give Sum=1, Cout=1. If any discrepancy is found, use a multimeter to probe intermediate signals P, G1, G2 and isolate the fault.',
          circuitStepIndex: 6,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Truth table verification for the Full Adder. Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B). LED ON = logic 1.',
      ],
      table: {
        headers: ['A', 'B', 'Cin', 'Sum (observed)', 'Cout (observed)', 'Sum (expected)', 'Cout (expected)'],
        rows: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 0, 1, 0],
          [0, 1, 0, 1, 0, 1, 0],
          [0, 1, 1, 0, 1, 0, 1],
          [1, 0, 0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 1, 0, 0, 1, 0, 1],
          [1, 1, 1, 1, 1, 1, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Full Adder circuit has been successfully implemented using 74HC86 (XOR), 74HC08 (AND), and 74HC32 (OR) ICs. All eight input combinations were tested and the observed Sum and Carry-out outputs match the theoretical truth table exactly.',
        'The two-level gate implementation (XOR→Sum, AND/OR→Cout) correctly performs single-bit binary addition with carry-in. The intermediate signal P = A⊕B is efficiently shared between the Sum and Cout paths, minimising gate count.',
        'The Full Adder is a critical building block of arithmetic logic units (ALUs). Understanding its gate-level implementation provides the foundation for designing multi-bit adders, subtractors, comparators, and more complex arithmetic circuits.',
      ],
    },
  ],
};
