import { type Experiment } from '@/experiments/types';

export const DemuxAddressDecoder: Experiment = {
  id: 'demux-address-decoder',
  title: 'DEMUX as Address Decoder',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: '2:4 Binary Decoder',
    description: 'Use a 1:2 DEMUX as an active-low address decoder to select one of two peripheral devices on a shared bus.',
    tags: ['demux', 'address decoder', 'bus', 'peripheral select', 'active-low'],
  },
  metaTitle: 'DEMUX as Address Decoder — VLabs',
  metaDescription: 'Use a 1:2 DEMUX as an active-low address decoder to select one of two peripheral devices on a shared bus.',
  circuit: {
  id: 'demux-address-decoder',
  title: 'Address Decoder (1:2 DEMUX)',
  description:
    'A 1-to-2 address decoder built from the same NOT + 2×AND topology as a 1:2 DEMUX. ' +
    'Address line A0 selects one of two device outputs (Y0 or Y1). ' +
    'Enable line EN must be HIGH for any output to be active. ' +
    'Demonstrates how demultiplexers serve as address decoders in memory systems.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── ICs ─────────────────────────────────────────────────────────────────
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 12, row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 19, row: 'e' } },

    // ── Output paths ────────────────────────────────────────────────────────
    { id: 'r_y0',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'r_y1',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'led_y0', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 27, row: 'c' } },
    { id: 'led_y1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'h' } },

    // ── Input wires: A0 (address) ───────────────────────────────────────────
    // A0 → NOT (to generate NOT_A0)
    { id: 'w_a0_not', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'not1', pin: 'A' } },
    // NOT_A0 → AND1 pin A
    { id: 'w_na0_and1', type: 'wire', color: 'white',
      from: { ic: 'not1', pin: 'Y' },
      to:   { ic: 'and1', pin: 'A' } },
    // A0 → AND2 pin A (direct address line)
    { id: 'w_a0_and2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'and2', pin: 'A' } },

    // ── Input wires: EN (enable) ────────────────────────────────────────────
    // EN → AND1 pin B
    { id: 'w_en_and1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'and1', pin: 'B' } },
    // EN → AND2 pin B
    { id: 'w_en_and2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'and2', pin: 'B' } },

    // ── Y0 output: AND1.Y → r_y0 → led_y0 → GND ───────────────────────────
    { id: 'w_y0_r',   type: 'wire', color: 'green',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_y0', end: 'p1' } },
    { id: 'w_y0_led', type: 'wire', color: 'green',
      from: { component: 'r_y0', end: 'p2' },
      to:   { led: 'led_y0', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black',
      from: { led: 'led_y0', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Y1 output: AND2.Y → r_y1 → led_y1 → GND ───────────────────────────
    { id: 'w_y1_r',   type: 'wire', color: 'yellow',
      from: { ic: 'and2', pin: 'Y' },
      to:   { component: 'r_y1', end: 'p1' } },
    { id: 'w_y1_led', type: 'wire', color: 'yellow',
      from: { component: 'r_y1', end: 'p2' },
      to:   { led: 'led_y1', end: 'anode' } },
    { id: 'w_gnd2', type: 'wire', color: 'black',
      from: { led: 'led_y1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Place breadboard',
      body: 'An address decoder selects one of N devices based on an address input. ' +
        'This 1-to-2 decoder uses the same NOT + 2×AND topology as a 1:2 DEMUX.',
      show: ['bb'],
    },
    {
      title: 'Place NOT gate',
      body: 'NOT gate at col 5 inverts address line A0. ' +
        'When A0=0, NOT_A0=1 enables AND1 (device 0 path).',
      show: ['bb', 'not1'],
      highlight: 'not1',
    },
    {
      title: 'Place AND gates',
      body: 'AND1 at col 12: Y0 = NOT_A0 · EN (device 0 selected when A0=0). ' +
        'AND2 at col 19: Y1 = A0 · EN (device 1 selected when A0=1). ' +
        'Both require EN=1 to activate.',
      show: ['bb', 'not1', 'and1', 'and2'],
      highlight: 'and1',
    },
    {
      title: 'Wire inputs',
      body: 'Red: EN (enable, col 1) → both AND gates pin B. ' +
        'Orange: A0 (address, col 2) → NOT and AND2.A. ' +
        'White: NOT.Y → AND1.A (inverted address).',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
      ],
      activeInputs: { A0: 0, EN: 0 },
    },
    {
      title: 'Add output LEDs and resistors',
      body: 'Green LED (Y0, device 0) at col 27, row c. ' +
        'Yellow LED (Y1, device 1) at col 27, row h. ' +
        '330 Ω resistors limit current on each path.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      activeInputs: { A0: 0, EN: 0 },
    },
    {
      title: 'Test: A0=0, EN=1 → Device 0 selected',
      body: 'Address 0 with enable HIGH. Y0=1 (green LED ON), Y1=0 (yellow OFF). ' +
        'Device 0 is selected — its chip-select line is active.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      highlight: 'led_y0',
      activeInputs: { A0: 0, EN: 1 },
    },
    {
      title: 'Test: A0=1, EN=1 → Device 1 selected',
      body: 'Address 1 with enable HIGH. Y0=0 (green OFF), Y1=1 (yellow LED ON). ' +
        'Device 1 is now selected. Only one device is active at a time.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      highlight: 'led_y1',
      activeInputs: { A0: 1, EN: 1 },
    },
    {
      title: 'Test: EN=0 → No device selected',
      body: 'Enable LOW disables both outputs regardless of address. Y0=0, Y1=0. ' +
        'Both LEDs OFF. The decoder is inactive — no device is selected.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      activeInputs: { A0: 1, EN: 0 },
    },
  ],

  truthTable: {
    inputs:  ['A0', 'EN'],
    outputs: ['Y0', 'Y1'],
    rows: [
      { inputs: { A0: 0, EN: 0 }, outputs: { Y0: 0, Y1: 0 } },
      { inputs: { A0: 0, EN: 1 }, outputs: { Y0: 1, Y1: 0 } },
      { inputs: { A0: 1, EN: 0 }, outputs: { Y0: 0, Y1: 0 } },
      { inputs: { A0: 1, EN: 1 }, outputs: { Y0: 0, Y1: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Demultiplexer (DEMUX) with its enable input (I) permanently asserted functions as a binary decoder. When I = 1 (always-enabled), the DEMUX outputs Y0 = I·S\' = S\' and Y1 = I·S = S. The outputs are the minterms of the address (select) variable S, which is exactly the behaviour of a 1:2 decoder. By extension, a 1:2ⁿ DEMUX can implement an n:2ⁿ decoder by setting the data input permanently HIGH.',
        'Address decoding is a fundamental task in computer memory systems. A CPU drives an address bus; the high-order address bits must be decoded to assert a chip-select (CS) signal for one specific peripheral device while all other devices remain deselected. The DEMUX-as-decoder topology is attractive because it simultaneously provides the active-LOW chip-select signals (Y0\' and Y1\' for an active-low decoder) for two devices using a minimal gate count.',
        'In an active-low address decoder (using 74HC139 or 74HC138), the deselected outputs are HIGH and the selected output is LOW. Peripheral chips typically have active-low CS inputs — they are enabled when CS = 0. This matches the active-low decoder output natively. In our experiment, the active-high 1:2 DEMUX (Y0 = S\', Y1 = S with I=1) selects Y0 when S=0 and Y1 when S=1, acting as an address decoder that asserts only one output HIGH at a time.',
        "Practical considerations: address decoder propagation delay must be shorter than the memory's access time minus the CPU hold time. Fan-out must be checked — a single 74HC gate can drive 10 LSTTL loads or up to 50 similar CMOS inputs. For systems requiring more than two devices, a 1:4 or 1:8 DEMUX (or equivalently a 2:4 or 3:8 decoder like the 74HC138) is used, with the additional address lines feeding the select inputs.",
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (NOT gate for S\')', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (two AND gates)', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Device 0 — Y0 selected)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (Device 1 — Y1 selected)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch', specification: 'Address select input S', quantity: '1' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the 1:2 DEMUX circuit with I=1',
          body: 'Construct the standard 1:2 DEMUX circuit: NOT gate (74HC04 pin 1→2) for S\'; AND gate 1 (74HC08, D0 path): pins 1,2→3 computing Y0 = I·S\'; AND gate 2 (D1 path): pins 4,5→6 computing Y1 = I·S. Instead of connecting a data switch to I, permanently tie the I input to +5 V (logic 1) using a wire directly from the +5 V rail. This simulates the always-enabled address decoder.',
          circuitStepIndex: 0,
        },
        {
          label: 'Connect address select switch and LED indicators',
          body: 'Connect the single address select switch to the S input. Provide S to the NOT gate input (pin 1 of 74HC04) and directly to AND gate 2 pin 5. Connect S\' (NOT output, pin 2) to AND gate 1 pin 2. Connect the green LED (Device 0) with a 330 Ω resistor to Y0 (AND gate 1 pin 3). Connect the red LED (Device 1) with a 330 Ω resistor to Y1 (AND gate 2 pin 6). Both LED cathodes go to GND.',
          circuitStepIndex: 1,
        },
        {
          label: 'Verify deselected peripheral is not enabled',
          body: 'Set S=0. The green LED (Y0, Device 0) should be ON and the red LED (Y1, Device 1) should be OFF. Measure the voltage at Y0 (should be ≈5 V) and Y1 (should be ≈0 V). This confirms that only Device 0 is selected and Device 1 is fully deselected — its CS input sees a LOW, keeping it inactive on the shared bus.',
          circuitStepIndex: 2,
        },
        {
          label: 'Switch address and verify other device selected',
          body: 'Set S=1. The red LED (Y1, Device 1) should now be ON and the green LED (Y0, Device 0) should be OFF. Measure Y0 (≈0 V) and Y1 (≈5 V). This confirms Device 1 is now selected while Device 0 is deselected. Record both readings. Toggle S several times and observe the clean switching behaviour — only one device is active at any instant.',
          circuitStepIndex: 3,
        },
        {
          label: 'Simulate bus conflict prevention',
          body: 'With I permanently tied HIGH, simulate a bus conflict scenario by momentarily connecting both AND gate inputs to HIGH manually (if feasible in the gate-level build). In a real system this cannot occur because only one address is valid at a time. Discuss how the enable input (I) of a practical 74HC139 DEMUX is used as an additional layer of control — asserting the enable signal only during valid address cycles prevents glitches from activating wrong devices during address transitions.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "DEMUX used as address decoder with I=1 (always enabled). S is the address bit. Only one output (device select line) is HIGH at a time.",
      ],
      table: {
        headers: ['Enable I', 'Address S', 'Y0 (Device 0) observed', 'Y1 (Device 1) observed', 'Y0 expected', 'Y1 expected'],
        rows: [
          [1, 0, 1, 0, 1, 0],
          [1, 1, 0, 1, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The DEMUX-as-address-decoder experiment confirms that a 1:2 DEMUX with its data input permanently enabled (I=1) operates as a 1:2 binary decoder, asserting exactly one output HIGH depending on the address (select) bit S.",
        'The one-hot selection property ensures that only one peripheral device is activated at any time, preventing bus contention. The circuit correctly routes the "selected" signal to Device 0 when S=0 and to Device 1 when S=1.',
        "This principle scales directly to larger systems: a 74HC138 (3:8 decoder/demux) with its enable inputs asserted decodes three address lines into eight mutually exclusive chip-select lines. This is used in virtually every microcontroller and microprocessor-based system for memory and peripheral address decoding.",
      ],
    },
  ],
};
