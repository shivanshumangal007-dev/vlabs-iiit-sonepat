import { type Experiment } from '@/experiments/types';

export const DFlipFlop: Experiment = {
  id: 'd-flip-flop',
  title: 'D Flip-Flop using 74HC74',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Sequential Logic',
    description: 'Use the 74HC74 dual D flip-flop IC to capture data on the rising clock edge. Verify the characteristic table and observe propagation delay.',
    tags: ['flip-flop', 'd flip-flop', '74hc74', 'clock edge', 'sequential'],
  },
  metaTitle: 'D Flip-Flop using 74HC74 — VLabs',
  metaDescription: 'Use the 74HC74 dual D flip-flop IC to capture data on the rising clock edge. Verify the characteristic table and observe propagation delay.',
  circuit: {
  id: 'd-flip-flop',
  title: 'D Flip-Flop using 74HC74 (Rising-Edge Triggered)',
  description:
    'Construct a D flip-flop using 74HC74 and demonstrate data capture on the rising ' +
    'clock edge, plus asynchronous preset and clear.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'dff1', type: 'dff', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── Async controls tied HIGH (inactive) ───────────────────────────────
    // CLR_bar → VCC: connect col 5 (e-bank, CLR_bar pin) to VCC rail
    { id: 'w_clr_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { ic: 'dff1', pin: 'clr_bar' } },
    // SET_bar → VCC: connect col 8 (e-bank, SET_bar pin) to VCC rail
    { id: 'w_set_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 8 },
      to:   { ic: 'dff1', pin: 'set_bar' } },

    // ── Input wires ───────────────────────────────────────────────────────
    // D input: col 1 row a → IC pin 'in'
    { id: 'w_d_dff1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'dff1', pin: 'in' } },
    // CLK input: col 2 row a → IC pin 'clk'
    { id: 'w_clk_dff1', type: 'wire', color: 'yellow',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'dff1', pin: 'clk' } },

    // ── Q output path (TOP bank, row 'c') ─────────────────────────────────
    { id: 'r_q',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 21, row: 'c' } },
    { id: 'led_q', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 26, row: 'c' } },

    { id: 'w_q_out', type: 'wire', color: 'green',
      from: { ic: 'dff1', pin: 'out' },
      to:   { component: 'r_q', end: 'p1' } },
    { id: 'w_q_led', type: 'wire', color: 'green',
      from: { component: 'r_q', end: 'p2' },
      to:   { led: 'led_q', end: 'anode' } },
    { id: 'w_q_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Q_bar output path (BOTTOM bank, row 'h') ──────────────────────────
    { id: 'r_qbar',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 21, row: 'h' } },
    { id: 'led_qbar', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'h' } },

    { id: 'w_qbar_out', type: 'wire', color: 'orange',
      from: { ic: 'dff1', pin: 'q_bar' },
      to:   { component: 'r_qbar', end: 'p1' } },
    { id: 'w_qbar_led', type: 'wire', color: 'orange',
      from: { component: 'r_qbar', end: 'p2' },
      to:   { led: 'led_qbar', end: 'anode' } },
    { id: 'w_qbar_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qbar', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body:
        'The solderless breadboard is your build surface. ' +
        'All holes in the same column and bank (a–e or f–j) are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it. ' +
        'Red rail = VCC (+5 V), blue rail = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC74 D flip-flop IC',
      body:
        'Mount the 74HC74 straddling the centre gap at column 5. ' +
        'Gate 1 pins: CLR_bar (col 5,e), D (col 6,e), CLK (col 7,e), ' +
        'SET_bar (col 8,e), Q (col 9,e), Q_bar (col 10,e). ' +
        'This is a rising-edge-triggered flip-flop: Q captures D only on a LOW→HIGH clock transition.',
      show: ['bb', 'dff1'],
      highlight: 'dff1',
    },
    {
      title: 'Tie PRE_bar and CLR_bar to VCC (inactive)',
      body:
        'Connect both async control pins to VCC (+5 V) with red wires. ' +
        'PRE_bar (SET_bar) HIGH = preset disabled. CLR_bar HIGH = clear disabled. ' +
        'In this state only the clock edge controls Q.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Wire the D and CLK inputs',
      body:
        'Blue wire: col 1 row a → D (data) input. ' +
        'Yellow wire: col 2 row a → CLK input. ' +
        'D is sampled only at the clock rising edge — changes to D between edges are ignored.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Add resistors and LEDs for Q and Q̄',
      body:
        'Green LED path (Q) — top bank row c: r_q at col 21, led_q at col 26. ' +
        'Red LED path (Q̄) — bottom bank row h: r_qbar at col 21, led_qbar at col 26. ' +
        'Both use 330 Ω to limit current. Q and Q̄ are always complementary.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Connect the output paths',
      body:
        'Green wires: IC pin Q → r_q.p1 → r_q.p2 → led_q anode → GND. ' +
        'Orange wires: IC pin Q̄ → r_qbar.p1 → r_qbar.p2 → led_qbar anode → GND. ' +
        'Black wires: both LED cathodes to GND rail. Circuit complete.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Test: D=0, CLK rising edge → Q=0',
      body:
        'Set D=0. Then pulse CLK: LOW → HIGH (rising edge). ' +
        'Q captures D=0 → Q=0, Q̄=1. Green LED OFF, red LED ON. ' +
        'The flip-flop stores logic 0.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { D: 0, CLK: 1 },
    },
    {
      title: 'Test: D=1, CLK rising edge → Q=1',
      body:
        'Now set D=1, then pulse CLK again (LOW→HIGH). ' +
        'Q captures D=1 → Q=1, Q̄=0. Green LED ON, red LED OFF. ' +
        'The flip-flop stores logic 1.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      highlight: 'led_q',
      activeInputs: { D: 1, CLK: 1 },
    },
    {
      title: 'Test: Change D without clocking → Q unchanged (hold)',
      body:
        'Set D=0 but do NOT pulse CLK. ' +
        'Q remains 1 (from previous step) — green LED stays ON. ' +
        'This demonstrates the fundamental property of edge-triggered storage: ' +
        'D must be stable before the clock edge (setup time) to guarantee capture.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { D: 0, CLK: 0 },
    },
  ],

  truthTable: {
    inputs:  ['D', 'CLK'],
    outputs: ['Q'],
    rows: [
      { inputs: { D: 0, CLK: 1 }, outputs: { Q: 0 } },  // rising edge, D=0
      { inputs: { D: 1, CLK: 1 }, outputs: { Q: 1 } },  // rising edge, D=1
      { inputs: { D: 0, CLK: 0 }, outputs: { Q: 1 } },  // no edge, D changed, Q holds
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A D flip-flop (Data or Delay flip-flop) captures the value of the D input on a specific clock edge and holds it until the next clock edge. The 74HC74 provides two independent rising-edge-triggered D flip-flops in a DIP-14 package.',
        'The characteristic equation is $$Q_{n+1} = D \\quad \\text{(on the rising clock edge)}$$ Between clock edges the output Q is stable — it holds the last captured value regardless of changes on D. This is the "data latch on clock edge" behaviour.',
        'The 74HC74 also has asynchronous override inputs: active-low $\\overline{PRE}$ (preset, forces Q=1) and active-low $\\overline{CLR}$ (clear, forces Q=0). These take effect immediately, independent of the clock. In normal operation both are tied HIGH (inactive). **Setup time** ($t_{su}$) is the minimum time D must be stable before the clock edge. **Hold time** ($t_h$) is the minimum time D must remain stable after the clock edge.',
        'Applications: shift registers, pipeline registers, state machines, frequency dividers (connect Q_bar to D → output toggles every clock cycle = ÷2 counter). The D-FF eliminates the forbidden state of the SR latch, making it the most common storage element in digital systems.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC74 D Flip-Flop IC', specification: 'Dual D-FF, rising-edge, DIP-14, 5 V', quantity: '1' },
        { name: 'Green LED', specification: '5 mm, Q output indicator', quantity: '1' },
        { name: 'Red LED', specification: '5 mm, Q_bar output indicator', quantity: '1' },
        { name: 'Resistor 330 Ω', specification: '¼ W, ×2 — current limiters', quantity: '2' },
        { name: 'DC Power Supply', specification: '+5 V DC, 500 mA', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard.',
          circuitStepIndex: 0,
          body: 'Place the 830-point breadboard. Identify VCC (red) and GND (blue) rails.',
        },
        {
          label: 'Place the 74HC74 D flip-flop IC.',
          circuitStepIndex: 1,
          body: 'Insert 74HC74 DIP-14 straddling the centre gap. Pin 1 ($\\overline{CLR}_1$) at top-left. Seat all 14 pins.',
        },
        {
          label: 'Tie PRE_bar and CLR_bar HIGH.',
          circuitStepIndex: 2,
          body: 'Connect $\\overline{PRE}$ and $\\overline{CLR}$ pins to VCC rail. This disables asynchronous preset/clear — the flip-flop operates in normal clocked mode only.',
        },
        {
          label: 'Wire D and CLK inputs.',
          circuitStepIndex: 3,
          body: 'Connect D from col 1 row a and CLK from col 2 row a to the IC. D is the data input; CLK triggers the capture on the rising edge.',
        },
        {
          label: 'Add resistors and output LEDs.',
          circuitStepIndex: 4,
          body: 'Place 330 Ω resistors in the Q (green) and Q_bar (red) output paths. Green LED ON = Q=1, Red LED ON = Q=0 (they are always complementary in normal operation).',
        },
        {
          label: 'Connect the output paths.',
          circuitStepIndex: 5,
          body: 'Wire IC Q → resistor → green LED → GND. Wire IC Q_bar → resistor → red LED → GND. Power on.',
        },
        {
          label: 'Test: D=0 then apply rising clock edge.',
          circuitStepIndex: 6,
          body: 'Set D=0 (connect D hole to GND). Pulse CLK HIGH then LOW (rising edge). Observe: Q=0 (green LED OFF), Q_bar=1 (red LED ON). The flip-flop captured D=0.',
        },
        {
          label: 'Test: D=1 then apply rising clock edge.',
          circuitStepIndex: 7,
          body: 'Set D=1 (connect D hole to VCC). Pulse CLK. Observe: Q=1 (green LED ON), Q_bar=0 (red LED OFF). The flip-flop captured D=1.',
        },
        {
          label: 'Test: Change D without clocking — Q holds.',
          circuitStepIndex: 8,
          body: 'While Q=1: change D=0 but do NOT pulse CLK. Observe: Q remains 1 (green LED stays ON). This confirms Q only changes on a clock edge — D changes between clocks are ignored.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: +5 V. 74HC74 rising-edge triggered. CLK driven manually (hole-to-VCC pulse).',
      ],
      table: {
        headers: ['D', 'CLK Edge', '$Q_{n+1}$', 'Green LED', 'Red LED'],
        rows: [
          [0, '↑ (Rising)', 0, 'OFF', 'ON'],
          [1, '↑ (Rising)', 1, 'ON', 'OFF'],
          [0, 'None (no edge)', '$Q_n$', 'Unchanged', 'Unchanged'],
          [1, 'None (no edge)', '$Q_n$', 'Unchanged', 'Unchanged'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The D flip-flop built with 74HC74 correctly captured the D input value on each rising clock edge. Q=D was confirmed after every clock pulse regardless of the prior state.',
        'The hold behaviour was verified: changing D between clock pulses produced no change in Q — the output was stable until the next rising edge. The Q and Q_bar outputs remained complementary throughout.',
        'The rising-edge-triggered D flip-flop is the fundamental building block of registers and pipeline stages. It eliminates the SR latch\'s forbidden state and provides clean, predictable synchronous operation.',
      ],
    },
  ],
};
