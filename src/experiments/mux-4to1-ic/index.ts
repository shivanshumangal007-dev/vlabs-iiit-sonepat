import { type Experiment } from '@/experiments/types';

export const Mux4to1Ic: Experiment = {
  id: 'mux-4to1-ic',
  title: '4:1 Multiplexer using 74HC153',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Combinational Logic',
    description: 'Wire a 74HC153 dual 4:1 MUX IC to route one of four data inputs to the output. Verify operation for all select-line combinations.',
    tags: ['mux', '4:1 multiplexer', '74hc153', 'data selection', 'combinational'],
  },
  metaTitle: '4:1 Multiplexer using 74HC153 — VLabs',
  metaDescription: 'Wire a 74HC153 dual 4:1 MUX IC to route one of four data inputs to the output. Verify operation for all select-line combinations.',
  circuit: {
  id: 'mux-4to1-ic',
  title: '4:1 Multiplexer using 74HC153',
  description:
    'A 4:1 multiplexer routes one of four data inputs (I0–I3) to the output Y ' +
    'based on two select lines (S1, S0). ' +
    'Implemented using the 74HC153 dual 4-to-1 multiplexer IC.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC153 IC ────────────────────────────────────────────────────────
    { id: 'mux41', type: 'mux-4to1', mountedAt: { board: 'bb', col: 8, row: 'e' } },

    // ── Output resistor and LED ───────────────────────────────────────────
    { id: 'r_out',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'led_out', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 24, row: 'c' } },

    // ── Select input wires ────────────────────────────────────────────────
    { id: 'w_s0_mux41', type: 'wire', color: 'red',
      from: { board: 'bb', col: 5, row: 'a' },
      to:   { ic: 'mux41', pin: 's0' } },
    { id: 'w_s1_mux41', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 6, row: 'a' },
      to:   { ic: 'mux41', pin: 's1' } },

    // ── Data input wires ──────────────────────────────────────────────────
    { id: 'w_i0_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'mux41', pin: 'i0_1' } },
    { id: 'w_i1_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'mux41', pin: 'i1_1' } },
    { id: 'w_i2_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'mux41', pin: 'i2_1' } },
    { id: 'w_i3_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'mux41', pin: 'i3_1' } },

    // ── Enable: EN1_bar tied to GND ───────────────────────────────────────
    { id: 'w_en_gnd', type: 'wire', color: 'black',
      from: { ic: 'mux41', pin: 'en1_bar' },
      to:   { board: 'bb', rail: 'gnd_top', col: 8 } },

    // ── Output path: y1 → r_out → led_out → GND ──────────────────────────
    { id: 'w_y1_r',   type: 'wire', color: 'green',
      from: { ic: 'mux41', pin: 'y1' },
      to:   { component: 'r_out', end: 'p1' } },
    { id: 'w_out_led', type: 'wire', color: 'green',
      from: { component: 'r_out', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },
    { id: 'w_out_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'A 4:1 multiplexer selects one of four data inputs based on two select lines. ' +
        'With S1=0,S0=0 → Y=I0; S1=0,S0=1 → Y=I1; S1=1,S0=0 → Y=I2; S1=1,S0=1 → Y=I3. ' +
        'The 74HC153 is a DIP-16 dual 4:1 MUX.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC153',
      body: 'Mount the 74HC153 straddling the centre gap at column 8. ' +
        'Pin 1 (EN1_bar) at col 8 row e. ' +
        'The IC contains two independent 4:1 MUX channels; we use channel 1 (Y1).',
      show: ['bb', 'mux41'],
      highlight: 'mux41',
    },
    {
      title: 'Wire EN1_bar to GND (enable)',
      body: 'The enable input EN1_bar is active-low. ' +
        'Connect a black wire from mux41 en1_bar pin to the GND rail. ' +
        'This permanently enables channel 1.',
      show: ['bb', 'mux41', 'w_en_gnd'],
    },
    {
      title: 'Wire data inputs I0–I3',
      body: 'White wires from cols 1–4 (row a) to IC pins i0_1–i3_1. ' +
        'These are the four data inputs. Set I0=1, I1=0, I2=1, I3=0 for testing, ' +
        'or connect to DIP switches.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Wire select inputs S0, S1',
      body: 'Red wire: col 5 row a → s0 pin (LSB of select). ' +
        'Orange wire: col 6 row a → s1 pin (MSB of select). ' +
        'S1,S0 together select which data input reaches the output.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Wire output Y1 → resistor → LED',
      body: 'Green wire from y1 pin → r_out p1 (col 20, c). ' +
        'Green wire r_out p2 → led_out anode (col 24, c). ' +
        'Black wire: led cathode → GND rail. Circuit is complete.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Test: S=00 selects I0',
      body: 'S1=0, S0=0. Output Y = I0. ' +
        'If I0=1, LED is ON. If I0=0, LED is OFF. ' +
        'Verify that only the I0 data value appears at the output.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
      highlight: 'led_out',
    },
    {
      title: 'Test: S=01 selects I1',
      body: 'S1=0, S0=1. Output Y = I1. ' +
        'With I1=0, LED is OFF. Change S0 from 0 to 1 — no gate delays, output follows instantly.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 0, S0: 1, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Test: S=10 and S=11',
      body: 'S1=1,S0=0 → Y=I2=1 (LED ON). S1=1,S0=1 → Y=I3=0 (LED OFF). ' +
        'The MUX faithfully routes the selected data bit to the output in all four cases.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 1, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
      highlight: 'led_out',
    },
  ],

  truthTable: {
    inputs:  ['S1', 'S0', 'I0', 'I1', 'I2', 'I3'],
    outputs: ['Y'],
    rows: [
      { inputs: { S1: 0, S0: 0, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 0, S0: 1, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 0, S0: 1, I0: 0, I1: 1, I2: 0, I3: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 1, S0: 0, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 1, S0: 0, I0: 0, I1: 0, I2: 1, I3: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 1, S0: 1, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 1, S0: 1, I0: 0, I1: 0, I2: 0, I3: 1 }, outputs: { Y: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A multiplexer (MUX) is a combinational circuit that selects one of several input data lines ' +
        'and routes it to a single output. A 4:1 MUX has four data inputs (I0–I3), two select inputs ' +
        '(S1, S0), and one output (Y). The select lines encode a 2-bit binary address that determines ' +
        'which input is connected to the output: Y = I(S1·2 + S0).',

        'The Boolean expression for a 4:1 MUX output is: ' +
        'Y = S1\'·S0\'·I0 + S1\'·S0·I1 + S1·S0\'·I2 + S1·S0·I3. ' +
        'Each term is a minterm of the select inputs ANDed with the corresponding data input. ' +
        'MUXes are universal logic elements: any Boolean function of n variables can be ' +
        'implemented with a 2ⁿ-to-1 MUX by applying function values to data inputs.',

        'The 74HC153 is a dual 4:1 multiplexer in a DIP-16 package. It contains two independent ' +
        '4:1 MUX channels sharing the same select lines S1 and S0. ' +
        'Each channel has its own enable input (EN1_bar, EN2_bar) that is active-LOW. ' +
        'When EN_bar = LOW (enabled), Y = selected input; when EN_bar = HIGH, Y = LOW regardless of S and I. ' +
        'In this experiment, EN1_bar is tied permanently to GND to enable channel 1.',

        'Multiplexers find use in data routing, bus control, function generators, and parallel-to-serial ' +
        'conversion. The 74HC153 operates from 2 V to 6 V with propagation delays under 10 ns at 5 V, ' +
        'making it suitable for high-speed digital switching applications.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC153 MUX IC',            specification: 'Dual 4:1 multiplexer, DIP-16, 5 V CMOS',        quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (Y output indicator)',         quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film, LED current limiter',        quantity: '1' },
        { name: 'DIP Switch (6-pole)',        specification: 'For toggling I0–I3 and S0, S1 inputs',          quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                               quantity: '1' },
        { name: 'Digital Multimeter',        specification: 'For verifying output logic levels',              quantity: '1' },
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
          body: 'Set up the breadboard and power rails. The 74HC153 is a 16-pin IC, ' +
            'so it will span columns 8–15 across the centre gap. ' +
            'Identify that pin 1 (EN1_bar) is at column 8 row e when the notch faces left.',
        },
        {
          label: 'Mount the 74HC153 IC.',
          circuitStepIndex: 1,
          body: 'Place the 74HC153 at column 8 straddling the centre gap. ' +
            'Connect pin 16 (VCC, col 8 row f) to the +5 V rail. ' +
            'Connect pin 8 (GND, col 15 row e) to the GND rail. ' +
            'Verify the IC is firmly seated with all 16 pins engaged.',
        },
        {
          label: 'Tie EN1_bar to GND.',
          circuitStepIndex: 2,
          body: 'Connect a black wire from the EN1_bar pin (col 8, row e) to the GND rail. ' +
            'This permanently enables channel 1. ' +
            'Without this connection, the output Y1 will remain LOW regardless of inputs.',
        },
        {
          label: 'Wire data inputs I0–I3.',
          circuitStepIndex: 3,
          body: 'White wires: col 1 row a → pin i0_1 (col 13), col 2 → i1_1 (col 12), ' +
            'col 3 → i2_1 (col 11), col 4 → i3_1 (col 10). ' +
            'Connect each col to a DIP switch: one side to the column hole, other side to VCC or GND. ' +
            'Set I0=1, I1=0, I2=1, I3=0 for the test.',
        },
        {
          label: 'Wire select inputs S0 and S1.',
          circuitStepIndex: 4,
          body: 'Red wire: col 5 row a → pin s0 (col 9, row f — f-bank, LSB of select). ' +
            'Orange wire: col 6 row a → pin s1 (col 9, row e — e-bank, MSB of select). ' +
            'Connect to DIP switches to allow toggling.',
        },
        {
          label: 'Wire output Y1 to LED.',
          circuitStepIndex: 5,
          body: 'Green wire: pin y1 (col 14, row e) → r_out p1 (col 20, row c). ' +
            'Green wire: r_out p2 → led_out anode (col 24, row c). ' +
            'Black wire: led_out cathode → GND rail. ' +
            'Apply +5 V. Circuit is complete.',
        },
        {
          label: 'Test all four select combinations.',
          circuitStepIndex: 6,
          body: 'With I0=1, I1=0, I2=1, I3=0: ' +
            'S=00 → Y=I0=1 (LED ON); S=01 → Y=I1=0 (LED OFF); ' +
            'S=10 → Y=I2=1 (LED ON); S=11 → Y=I3=0 (LED OFF). ' +
            'Record observations. Change data input values and observe that ' +
            'the output always mirrors the selected input.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V. 74HC153 enabled with EN1_bar = LOW.',
        'Test data pattern: I0=1, I1=0, I2=1, I3=0.',
        'LED state (ON = HIGH output) matches the value of the selected data input in all cases.',
      ],
      table: {
        headers: ['S1', 'S0', 'Selected Input', 'I Value', 'Y Output', 'LED'],
        rows: [
          [0, 0, 'I0', 1, 1, 'ON'],
          [0, 1, 'I1', 0, 0, 'OFF'],
          [1, 0, 'I2', 1, 1, 'ON'],
          [1, 1, 'I3', 0, 0, 'OFF'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4:1 multiplexer experiment using the 74HC153 IC was successfully completed. ' +
        'The output LED faithfully replicated the logic level of the data input selected by ' +
        'the two-bit select code S1, S0 in all four combinations.',

        'The MUX correctly implemented the function Y = S1\'S0\'·I0 + S1\'S0·I1 + S1S0\'·I2 + S1S0·I3. ' +
        'Changing the data inputs while holding select constant immediately updated the output, ' +
        'confirming the combinational (memoryless) nature of the circuit.',

        'The 74HC153 dual-channel design allows two independent 4:1 MUX operations from a single IC, ' +
        'making it area-efficient for multiplexing pairs of signals. ' +
        'Applications include data buses, function generators, and programmable logic building blocks.',
      ],
    },
  ],
};
