import { type Experiment } from '@/experiments/types';

export const Decoder2to4: Experiment = {
  id: 'decoder-2to4',
  title: '2:4 Binary Decoder',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Digital Electronics',
    description: 'A binary decoder maps a 2-bit input to one of four mutually exclusive output lines. Built with two NOT and four AND gates.',
    tags: ['decoder', 'binary', 'address decode', 'not', 'and', '74hc04', '74hc08'],
  },
  metaTitle: '2:4 Binary Decoder — VLabs',
  metaDescription: 'A binary decoder maps a 2-bit input to one of four mutually exclusive output lines. Built with two NOT and four AND gates.',
  circuit: {
  id: 'decoder-2to4',
  title: '2:4 Binary Decoder',
  description:
    'A 2-to-4 decoder takes a 2-bit binary input (A,B) and activates exactly one of 4 outputs. ' +
    '00→Y0, 01→Y1, 10→Y2, 11→Y3. ' +
    'Built from two NOT gates and four AND gates.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'not_a', type: 'not-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'not_b', type: 'not-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'and0',  type: 'and-gate', mountedAt: { board: 'bb', col: 9,  row: 'e' } }, // Y0: A'B'
    { id: 'and1',  type: 'and-gate', mountedAt: { board: 'bb', col: 14, row: 'e' } }, // Y1: A'B
    { id: 'and2',  type: 'and-gate', mountedAt: { board: 'bb', col: 9,  row: 'h' } }, // Y2: AB'
    { id: 'and3',  type: 'and-gate', mountedAt: { board: 'bb', col: 14, row: 'h' } }, // Y3: AB

    // Output layout — resistors at col17 (past and1/and3 col range 14-16),
    // LEDs at col21 (cathode col22, which ≠ r2.p1 col24). 4 independent paths.
    { id: 'r0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'c' } },
    { id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'h' } },
    { id: 'r2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'r3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'h' } },
    { id: 'led0', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 21, row: 'c' } },
    { id: 'led1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 21, row: 'h' } },
    { id: 'led2', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'led3', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 28, row: 'h' } },

    // Inputs
    { id: 'w_a_na',   type: 'wire', color: 'red',   from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'not_a', pin: 'A' } },
    { id: 'w_b_nb',   type: 'wire', color: 'blue',  from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'not_b', pin: 'A' } },
    // AND0: A'B' → Y0
    { id: 'w_na_and0', type: 'wire', color: 'white',  from: { ic: 'not_a', pin: 'Y' }, to: { ic: 'and0', pin: 'A' } },
    { id: 'w_nb_and0', type: 'wire', color: 'white',  from: { ic: 'not_b', pin: 'Y' }, to: { ic: 'and0', pin: 'B' } },
    // AND1: A'B → Y1
    { id: 'w_na_and1', type: 'wire', color: 'white',  from: { ic: 'not_a', pin: 'Y' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b_and1',  type: 'wire', color: 'blue',   from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },
    // AND2: AB' → Y2
    { id: 'w_a_and2',  type: 'wire', color: 'red',    from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and2', pin: 'A' } },
    { id: 'w_nb_and2', type: 'wire', color: 'white',  from: { ic: 'not_b', pin: 'Y' }, to: { ic: 'and2', pin: 'B' } },
    // AND3: AB → Y3
    { id: 'w_a_and3',  type: 'wire', color: 'red',    from: { board: 'bb', col: 1, row: 'c' }, to: { ic: 'and3', pin: 'A' } },
    { id: 'w_b_and3',  type: 'wire', color: 'blue',   from: { board: 'bb', col: 2, row: 'c' }, to: { ic: 'and3', pin: 'B' } },
    // Outputs
    { id: 'w_y0_r',   type: 'wire', color: 'red',    from: { ic: 'and0', pin: 'Y' }, to: { component: 'r0', end: 'p1' } },
    { id: 'w_y0_led', type: 'wire', color: 'red',    from: { component: 'r0', end: 'p2' }, to: { led: 'led0', end: 'anode' } },
    { id: 'w_y1_r',   type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { component: 'r1', end: 'p1' } },
    { id: 'w_y1_led', type: 'wire', color: 'yellow', from: { component: 'r1', end: 'p2' }, to: { led: 'led1', end: 'anode' } },
    { id: 'w_y2_r',   type: 'wire', color: 'green',  from: { ic: 'and2', pin: 'Y' }, to: { component: 'r2', end: 'p1' } },
    { id: 'w_y2_led', type: 'wire', color: 'green',  from: { component: 'r2', end: 'p2' }, to: { led: 'led2', end: 'anode' } },
    { id: 'w_y3_r',   type: 'wire', color: 'blue',   from: { ic: 'and3', pin: 'Y' }, to: { component: 'r3', end: 'p1' } },
    { id: 'w_y3_led', type: 'wire', color: 'blue',   from: { component: 'r3', end: 'p2' }, to: { led: 'led3', end: 'anode' } },
    { id: 'w_g0', type: 'wire', color: 'black', from: { led: 'led0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_g1', type: 'wire', color: 'black', from: { led: 'led1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
    { id: 'w_g2', type: 'wire', color: 'black', from: { led: 'led2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },
    { id: 'w_g3', type: 'wire', color: 'black', from: { led: 'led3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },
  ],

  steps: [
    { title: 'Place breadboard', body: '2:4 decoder: 2 NOT gates + 4 AND gates. Exactly one output goes HIGH at a time.', show: ['bb'] },
    { title: 'Place NOT gates', body: 'NOT-A inverts input A. NOT-B inverts input B. We need both true and complemented forms.', show: ['bb','not_a','not_b'], highlight: 'not_a' },
    { title: 'Place AND gates', body: 'Four AND gates, one per output: Y0=A\'B\', Y1=A\'B, Y2=AB\', Y3=AB.', show: ['bb','not_a','not_b','and0','and1','and2','and3'], highlight: 'and0' },
    { title: 'Wire inputs', body: 'Red=A, Blue=B. Each goes straight to its NOT gate and also fans out to relevant AND gates.', show: ['bb','not_a','not_b','and0','and1','and2','and3','w_a_na','w_b_nb','w_na_and0','w_nb_and0','w_na_and1','w_b_and1','w_a_and2','w_nb_and2','w_a_and3','w_b_and3'], activeInputs: { A:0, B:0 } },
    { title: 'Add outputs and test', body: 'A=1,B=0 → only Y2 (green) lights. A=1,B=1 → only Y3 (blue) lights.', show: ['bb','not_a','not_b','and0','and1','and2','and3','w_a_na','w_b_nb','w_na_and0','w_nb_and0','w_na_and1','w_b_and1','w_a_and2','w_nb_and2','w_a_and3','w_b_and3','r0','r1','r2','r3','led0','led1','led2','led3','w_y0_r','w_y0_led','w_y1_r','w_y1_led','w_y2_r','w_y2_led','w_y3_r','w_y3_led','w_g0','w_g1','w_g2','w_g3'], highlight: 'led2', activeInputs: { A:1, B:0 } },
  ],

  truthTable: {
    inputs: ['A','B'],
    outputs: ['Y0','Y1','Y2','Y3'],
    rows: [
      { inputs:{A:0,B:0}, outputs:{Y0:1,Y1:0,Y2:0,Y3:0} },
      { inputs:{A:0,B:1}, outputs:{Y0:0,Y1:1,Y2:0,Y3:0} },
      { inputs:{A:1,B:0}, outputs:{Y0:0,Y1:0,Y2:1,Y3:0} },
      { inputs:{A:1,B:1}, outputs:{Y0:0,Y1:0,Y2:0,Y3:1} },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A binary decoder converts an n-bit binary input code into one of 2ⁿ output lines. A 2:4 decoder takes a 2-bit input (A, B) and asserts exactly one of four output lines (Y0, Y1, Y2, Y3) corresponding to the decimal value of the binary input. At any given time, exactly one output is HIGH (active-high decoder) and the remaining three are LOW. Alternatively, an active-low decoder has exactly one output LOW while the others are HIGH.',
        'The Boolean expressions for an active-high 2:4 decoder are derived from minterms: Y0 = A\'·B\' (minterm 0 — inputs 00); Y1 = A\'·B (minterm 1 — inputs 01); Y2 = A·B\' (minterm 2 — inputs 10); Y3 = A·B (minterm 3 — inputs 11). Each output is a unique minterm of the two input variables. Four AND gates and two NOT gates implement the decoder.',
        'Gate-level implementation: two NOT gates (74HC04) generate A\' and B\'; four AND gates (74HC08 — uses all four gates in one IC) each implement one minterm (Y0=A\'B\', Y1=A\'B, Y2=AB\', Y3=AB). Total ICs: 1× 74HC04, 1× 74HC08. This is a complete one-IC-each solution. Commercial decoders such as the 74HC139 (dual 2:4) or 74HC138 (3:8) include an active-low enable input for chip-select and cascading.',
        'Applications of 2:4 decoders include: memory address decoding (selecting one of four memory chips based on two address lines), instruction decoding in CPUs (activating one of four functional units), display digit selection in multiplexed 7-segment displays, and as a fundamental sub-block in larger decoders (two 2:4 decoders plus an inverter form a 3:8 decoder).',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (two NOT gates used)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (all four AND gates used)', quantity: '1' },
        { name: 'LED', specification: '5 mm, four different colours (Y0–Y3)', quantity: '4' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '4' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (A, B)', quantity: '2' },
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
          label: 'Set up breadboard and power supply',
          body: 'Connect the 5 V supply to the breadboard power rails. Insert both ICs (74HC04 and 74HC08) on the breadboard. Connect pin 14 to +5 V and pin 7 to GND for both. Prepare two input switches (A and B) with 10 kΩ pull-down resistors. Connect four LEDs (with 330 Ω series resistors) at conveniently located rows for outputs Y0, Y1, Y2, Y3. Label each LED.',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire NOT gates for input complements',
          body: "Wire NOT gate 1 (74HC04, pin 1→2): connect input A to pin 1. A' appears on pin 2. Wire NOT gate 2 (74HC04, pin 3→4): connect input B to pin 3. B' appears on pin 4. These two complement signals, together with the original A and B, provide all four literals needed for the four AND gates. Verify the NOT outputs toggle correctly with a multimeter.",
          circuitStepIndex: 1,
        },
        {
          label: 'Wire all four AND gates for minterm outputs',
          body: "Wire AND gate 1 (74HC08, pins 1,2→3): connect A' (74HC04 pin 2) to pin 1 and B' (74HC04 pin 4) to pin 2. Y0 = A'B' on pin 3. Wire AND gate 2 (pins 4,5→6): connect A' to pin 4 and B to pin 5. Y1 = A'B on pin 6. Wire AND gate 3 (pins 9,10→8): connect A to pin 10 and B' to pin 9. Y2 = AB' on pin 8. Wire AND gate 4 (pins 12,13→11): connect A to pin 12 and B to pin 13. Y3 = AB on pin 11.",
          circuitStepIndex: 2,
        },
        {
          label: 'Connect LED output indicators',
          body: 'Connect each AND gate output through a 330 Ω resistor to the corresponding LED anode: Y0 (AND gate 1, pin 3) → LED0 (rightmost); Y1 (pin 6) → LED1; Y2 (pin 8) → LED2; Y3 (pin 11) → LED3 (leftmost). All LED cathodes connect to GND. At any input code, exactly one LED should illuminate. If more than one LED is ON, check for wiring errors on the NOT or AND gate connections.',
          circuitStepIndex: 3,
        },
        {
          label: 'Test all 4 input combinations and verify one-hot output',
          body: 'Apply each of the four input combinations (A,B): (0,0), (0,1), (1,0), (1,1). For (0,0): only LED0 (Y0) should be ON. For (0,1): only LED1 (Y1) should be ON. For (1,0): only LED2 (Y2) should be ON. For (1,1): only LED3 (Y3) should be ON. Confirm the one-hot property: exactly one LED lit at a time. Record all observations. Use a multimeter to verify output logic levels at each AND gate output.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "2:4 Decoder truth table. Y0=A'B', Y1=A'B, Y2=AB', Y3=AB. Exactly one output is HIGH for each input combination.",
      ],
      table: {
        headers: ['A', 'B', 'Y0 (obs)', 'Y1 (obs)', 'Y2 (obs)', 'Y3 (obs)', 'Y0 (exp)', 'Y1 (exp)', 'Y2 (exp)', 'Y3 (exp)'],
        rows: [
          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
          [1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The 2:4 Binary Decoder has been successfully implemented using 74HC04 (NOT) and 74HC08 (AND) ICs. All four input combinations were tested and the one-hot output property is confirmed — exactly one of the four output LEDs is ON for each unique input code.",
        "The observed outputs Y0 through Y3 match the expected minterm expressions (A'B', A'B, AB', AB) exactly. The decoder correctly maps each 2-bit binary address to a unique, mutually exclusive output line.",
        'This circuit demonstrates the fundamental operation of address decoding. In a real memory system, the four outputs would connect to the chip-enable (CE) pins of four separate memory chips, allowing the CPU to access one chip at a time based on the two most-significant address bits.',
      ],
    },
  ],
};
