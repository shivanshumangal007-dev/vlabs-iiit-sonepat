import { type Experiment } from '@/experiments/types';

export const JkTFlipFlop: Experiment = {
  id: 'jk-t-flip-flop',
  title: 'JK and T Flip-Flop using 74HC76',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Sequential Logic',
    description: 'Configure the 74HC76 JK flip-flop in JK and toggle (T) modes. Observe toggle, set, reset, and hold states and verify frequency division.',
    tags: ['flip-flop', 'jk flip-flop', 't flip-flop', '74hc76', 'toggle', 'sequential'],
  },
  metaTitle: 'JK and T Flip-Flop using 74HC76 — VLabs',
  metaDescription: 'Configure the 74HC76 JK flip-flop in JK and toggle (T) modes. Observe toggle, set, reset, and hold states and verify frequency division.',
  circuit: {
  id: 'jk-t-flip-flop',
  title: 'JK Flip-Flop and T Flip-Flop using 74HC76',
  description:
    'Implement a JK flip-flop using 74HC76 and derive a T flip-flop by connecting J=K=T.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'jk1', type: 'jk-ff', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── Async SET_bar and CLR_bar tied HIGH (inactive) ────────────────────
    { id: 'w_set_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 6 },
      to:   { ic: 'jk1', pin: 'set' } },
    { id: 'w_clr_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 7 },
      to:   { ic: 'jk1', pin: 'clr' } },

    // ── JK mode input wires ───────────────────────────────────────────────
    // J: col 1 row a → IC pin 'j'
    { id: 'w_j_jk1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'jk1', pin: 'j' } },
    // K: col 2 row a → IC pin 'k'
    { id: 'w_k_jk1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'jk1', pin: 'k' } },
    // CLK: col 3 row a → IC pin 'clk'
    { id: 'w_clk_jk1', type: 'wire', color: 'yellow',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'jk1', pin: 'clk' } },

    // ── T mode: T input also to K (J and K share the same source for T mode) ─
    // In T mode (steps 5–6) T is driven from col 4 row a to IC pin 'k' as well.
    // We include a second wire from col 4 → k for the T mode demo.
    // The w_k_jk1 wire can be replaced by this T wire in practice.
    { id: 'w_t_jk1', type: 'wire', color: 'purple',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'jk1', pin: 'k' } },

    // ── Q output path (TOP bank, row 'c') ─────────────────────────────────
    { id: 'r_q',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'led_q', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 25, row: 'c' } },

    { id: 'w_q_out', type: 'wire', color: 'green',
      from: { ic: 'jk1', pin: 'out' },
      to:   { component: 'r_q', end: 'p1' } },
    { id: 'w_q_led', type: 'wire', color: 'green',
      from: { component: 'r_q', end: 'p2' },
      to:   { led: 'led_q', end: 'anode' } },
    { id: 'w_q_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Q_bar output path (BOTTOM bank, row 'h') ──────────────────────────
    { id: 'r_qbar',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'led_qbar', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 25, row: 'h' } },

    { id: 'w_qbar_out', type: 'wire', color: 'orange',
      from: { ic: 'jk1', pin: 'q_bar' },
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
        'Holes in the same column and bank are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC76 JK flip-flop IC',
      body:
        'Mount the 74HC76 straddling the centre gap at column 5. ' +
        'Gate 1 pins: CLK (col 5,e), SET_bar (col 6,e), K (col 7,e), J (col 8,e), ' +
        'Q_bar (col 9,e), Q (col 10,e). ' +
        'This is a falling-edge-triggered JK FF with active-low async controls.',
      show: ['bb', 'jk1'],
      highlight: 'jk1',
    },
    {
      title: 'Tie SET_bar and CLR_bar HIGH (async controls inactive)',
      body:
        'Red wires: SET_bar (col 6,e) → VCC, CLR_bar (col 6,f) → VCC. ' +
        'Pulling these HIGH disables the asynchronous preset and clear. ' +
        'Q is now controlled only by J, K, and the falling clock edge.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc'],
      activeInputs: { J: 0, K: 0, CLK: 0 },
    },
    {
      title: 'Wire J, K, and CLK inputs (JK mode)',
      body:
        'Blue wire: col 1 row a → J input. ' +
        'Orange wire: col 2 row a → K input. ' +
        'Yellow wire: col 3 row a → CLK input. ' +
        'J and K are sampled on the falling clock edge (HIGH→LOW transition).',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1'],
      activeInputs: { J: 0, K: 0, CLK: 0 },
    },
    {
      title: 'Add Q and Q̄ output LEDs',
      body:
        'Green LED (Q) — top bank row c: r_q at col 20, led_q at col 25. ' +
        'Yellow LED (Q̄) — bottom bank row h: r_qbar at col 20, led_qbar at col 25. ' +
        'Connect output wires from IC Q → r_q → led_q → GND, and IC Q̄ → r_qbar → led_qbar → GND.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 0, K: 0, CLK: 0 },
    },
    {
      title: 'JK Test: J=1, K=0 → SET on falling edge',
      body:
        'Set J=1, K=0. Pulse CLK HIGH→LOW (falling edge). ' +
        'JK truth: J=1 K=0 → Q=1 (SET). ' +
        'Green LED turns ON, yellow LED turns OFF.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      highlight: 'led_q',
      activeInputs: { J: 1, K: 0, CLK: 0 },
    },
    {
      title: 'JK Test: J=0, K=1 → RESET on falling edge',
      body:
        'Set J=0, K=1. Pulse CLK HIGH→LOW. ' +
        'JK truth: J=0 K=1 → Q=0 (RESET). ' +
        'Green LED turns OFF, yellow LED turns ON.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 0, K: 1, CLK: 0 },
    },
    {
      title: 'JK Test: J=1, K=1 → TOGGLE on falling edge',
      body:
        'Set J=1, K=1. Pulse CLK HIGH→LOW. ' +
        'JK truth: J=1 K=1 → Q toggles (Q_next = NOT Q). ' +
        'If Q was 0, it becomes 1. Pulse again to toggle back. ' +
        'This makes the JK FF a frequency divider.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 1, K: 1, CLK: 0 },
    },
    {
      title: 'Rewire for T mode: connect T to both J and K',
      body:
        'Remove the separate J and K wires. ' +
        'Connect a single T input (col 4 row a, purple wire) to both J and K pins. ' +
        'With J=K=T: when T=0 the FF holds, when T=1 the FF toggles on each clock edge. ' +
        'This is identical to a T flip-flop — useful for binary counters.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_t_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 1, K: 1, CLK: 0 },
    },
    {
      title: 'T mode: T=1 → Q toggles on every falling clock edge',
      body:
        'Set T=1 (so J=K=1). Pulse CLK repeatedly. ' +
        'Q toggles every clock cycle: 0→1→0→1→… ' +
        'The output frequency is exactly half the clock frequency — a ÷2 divider. ' +
        'This is the basis of binary ripple counters.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_t_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      highlight: 'led_q',
      activeInputs: { J: 1, K: 1, CLK: 1 },
    },
  ],

  truthTable: {
    inputs:  ['J', 'K', 'CLK'],
    outputs: ['Q'],
    rows: [
      { inputs: { J: 0, K: 0, CLK: 0 }, outputs: { Q: 0 } },  // HOLD (Q was 0)
      { inputs: { J: 0, K: 1, CLK: 0 }, outputs: { Q: 0 } },  // RESET
      { inputs: { J: 1, K: 0, CLK: 0 }, outputs: { Q: 1 } },  // SET
      { inputs: { J: 1, K: 1, CLK: 0 }, outputs: { Q: 1 } },  // TOGGLE (shown from Q=0)
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The JK flip-flop is the most versatile sequential element. It extends the SR latch by replacing the forbidden state with a **toggle** action. When both J=K=1, Q toggles on each active clock edge. The 74HC76 is a dual falling-edge-triggered JK flip-flop with active-low asynchronous SET ($\\overline{SET}$) and CLR ($\\overline{CLR}$) inputs.',
        'JK characteristic equation: $$Q_{n+1} = J\\bar{Q}_n + \\bar{K}Q_n$$ The four operating modes are: J=0 K=0 → Hold (Q unchanged). J=0 K=1 → Reset (Q=0). J=1 K=0 → Set (Q=1). J=1 K=1 → Toggle (Q flips). All transitions occur on the **falling** clock edge.',
        'The **T flip-flop** is a special case of the JK flip-flop with J and K inputs tied together as the single T input. When T=1 the output toggles on every active clock edge; when T=0 the output holds. The T flip-flop is widely used as a binary frequency divider: each stage divides the clock frequency by 2. $$Q_{n+1} = T\\bar{Q}_n + \\bar{T}Q_n = T \\oplus Q_n$$',
        'Applications: JK flip-flops form the basis of synchronous counters, sequence detectors, and state machines. T flip-flops implement ripple and synchronous counters and are used wherever clean frequency division is needed.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC76 JK Flip-Flop IC', specification: 'Dual JK-FF, falling-edge, DIP-16, 5 V', quantity: '1' },
        { name: 'Green LED', specification: '5 mm, Q output', quantity: '1' },
        { name: 'Yellow LED', specification: '5 mm, Q_bar output', quantity: '1' },
        { name: 'Resistor 330 Ω', specification: '¼ W, ×2', quantity: '2' },
        { name: 'DC Power Supply', specification: '+5 V DC', quantity: '1' },
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
          body: 'Place the breadboard. Red rails = VCC, blue = GND.',
        },
        {
          label: 'Place the 74HC76 JK flip-flop IC.',
          circuitStepIndex: 1,
          body: 'Insert 74HC76 DIP-16 straddling the centre gap. Pin 1 is CLK₁. The 74HC76 is falling-edge triggered — transitions occur on HIGH→LOW clock edges.',
        },
        {
          label: 'Tie SET_bar and CLR_bar HIGH.',
          circuitStepIndex: 2,
          body: 'Connect $\\overline{SET}$ and $\\overline{CLR}$ to VCC. Async controls disabled — flip-flop in normal clocked mode.',
        },
        {
          label: 'Wire J, K, and CLK inputs.',
          circuitStepIndex: 3,
          body: 'Connect J from col 1 row a, K from col 2 row a, CLK from col 3 row a to respective IC pins. These are the primary control inputs.',
        },
        {
          label: 'Add Q and Q_bar output LEDs.',
          circuitStepIndex: 4,
          body: 'Place 330 Ω resistors and two LEDs: green for Q, yellow for Q_bar. They should always be complementary in normal operation.',
        },
        {
          label: 'Test JK=10: SET on falling edge.',
          circuitStepIndex: 5,
          body: 'Set J=1, K=0. Pulse CLK (HIGH→LOW falling edge). Q → 1 (green LED ON). This is the SET mode.',
        },
        {
          label: 'Test JK=01: RESET on falling edge.',
          circuitStepIndex: 6,
          body: 'Set J=0, K=1. Pulse CLK. Q → 0 (green LED OFF). This is the RESET mode.',
        },
        {
          label: 'Test JK=11: TOGGLE on falling edge.',
          circuitStepIndex: 7,
          body: 'Set J=1, K=1. Pulse CLK multiple times. Q toggles on every falling edge — LED alternates ON/OFF. This mode eliminates the SR forbidden state.',
        },
        {
          label: 'Rewire for T mode: connect T to both J and K.',
          circuitStepIndex: 8,
          body: 'Connect the single T input (col 4 row a) to both J and K IC pins. Now the flip-flop acts as a T flip-flop: T=1 → toggle, T=0 → hold.',
        },
        {
          label: 'T mode: T=1 — Q toggles on every clock.',
          circuitStepIndex: 9,
          body: 'Set T=1 (col 4 row a → VCC). Pulse CLK repeatedly. LED alternates with every pulse — this is frequency division by 2. Set T=0 and confirm Q holds.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: +5 V. 74HC76 falling-edge triggered. CLK pulsed manually.',
      ],
      table: {
        headers: ['J', 'K', 'CLK Edge', '$Q_{n+1}$', 'Mode'],
        rows: [
          [0, 0, '↓', '$Q_n$', 'Hold'],
          [0, 1, '↓', 0, 'Reset'],
          [1, 0, '↓', 1, 'Set'],
          [1, 1, '↓', '$\\bar{Q}_n$', 'Toggle'],
          ['T', 'T', '↓', '$T \\oplus Q_n$', 'T mode'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 74HC76 JK flip-flop demonstrated all four operating modes: Hold, Reset, Set, and Toggle. The falling-edge trigger was confirmed — transitions only occurred on HIGH→LOW clock transitions.',
        'The T flip-flop mode (J=K=T) was verified: Q toggled on every clock pulse when T=1, implementing a ÷2 frequency divider. When T=0, Q held its value.',
        'The JK flip-flop is the most general sequential element: it subsumes SR, D, and T flip-flops and eliminates the forbidden state. Its toggle mode is essential for ripple and synchronous counter design.',
      ],
    },
  ],
};
