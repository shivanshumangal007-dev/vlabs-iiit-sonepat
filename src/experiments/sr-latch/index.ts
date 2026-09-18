import { type Experiment } from '@/experiments/types';

export const SrLatch: Experiment = {
  id: 'sr-latch',
  title: 'SR Latch using 74HC279',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Sequential Logic',
    description: 'Implement an SR latch using the 74HC279 quad SR latch IC. Observe set, reset, and hold states and identify the forbidden input condition.',
    tags: ['latch', 'sr latch', '74hc279', 'sequential', 'set reset'],
  },
  metaTitle: 'SR Latch using 74HC279 — VLabs',
  metaDescription: 'Implement an SR latch using the 74HC279 quad SR latch IC. Observe set, reset, and hold states and identify the forbidden input condition.',
  circuit: {
  id: 'sr-latch',
  title: 'SR Latch using 74HC279',
  description:
    'Construct and test an SR latch using the 74HC279 quad SR latch IC. ' +
    'Demonstrate set, reset, hold, and forbidden states.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'sr1', type: 'sr-latch', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── Output path: Q → resistor → LED → GND (top bank, row 'c') ────────
    { id: 'r_q',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 19, row: 'c' } },
    { id: 'led_q', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 24, row: 'c' } },

    // ── Input wires (active-low) ──────────────────────────────────────────
    // S_bar: col 1 row a → IC pin 's'
    { id: 'w_s_sr1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'sr1', pin: 's' } },
    // R_bar: col 2 row a → IC pin 'r'
    { id: 'w_r_sr1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'sr1', pin: 'r' } },

    // ── Output wires: q → r_q → led_q → GND ─────────────────────────────
    { id: 'w_q_out', type: 'wire', color: 'green',
      from: { ic: 'sr1', pin: 'q' },
      to:   { component: 'r_q', end: 'p1' } },
    { id: 'w_q_led', type: 'wire', color: 'green',
      from: { component: 'r_q', end: 'p2' },
      to:   { led: 'led_q', end: 'anode' } },
    { id: 'w_q_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body:
        'The solderless breadboard is your build surface. ' +
        'Holes in the same column and bank (a–e or f–j) are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it. ' +
        'Red rail = VCC (+5 V), blue rail = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC279 SR latch IC',
      body:
        'Mount the 74HC279 straddling the centre gap at column 5. ' +
        'The IC contains four independent SR latches. ' +
        'We use latch 1: S_bar at col 5 (e), R_bar at col 6 (e), Q at col 7 (e). ' +
        'Active-low inputs mean a LOW signal activates Set or Reset.',
      show: ['bb', 'sr1'],
      highlight: 'sr1',
    },
    {
      title: 'Wire the S_bar and R_bar inputs',
      body:
        'Blue wire: col 1 row a → IC pin S_bar. ' +
        'Orange wire: col 2 row a → IC pin R_bar. ' +
        'These board tie points are your external input nodes. ' +
        'Driving a node LOW (to GND) activates that input.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Add 330 Ω current-limiting resistor',
      body:
        'Insert the 330 Ω resistor at col 19 row c (top bank). ' +
        'This limits current through the LED to a safe ~10 mA. ' +
        'r_q.p1 is at col 19, r_q.p2 is at col 22.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1', 'r_q'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Add the Q-output LED',
      body:
        'Place the green LED at col 24 row c (top bank). ' +
        'Anode at col 24, cathode at col 25. ' +
        'When Q is HIGH the LED glows, indicating the SET state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1', 'r_q', 'led_q'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Connect the output path',
      body:
        'Green wire: IC pin Q → r_q.p1. ' +
        'Green wire: r_q.p2 → led_q anode. ' +
        'Black wire: led_q cathode → GND rail. ' +
        'The circuit is now complete.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Test RESET: S_bar=1, R_bar=0 → Q=0',
      body:
        'Pull R_bar LOW (R_bar=0) while S_bar stays HIGH (S_bar=1). ' +
        'The reset input is active → Q goes LOW → LED is OFF. ' +
        'The latch is in RESET state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 1, R_bar: 0 },
    },
    {
      title: 'Test SET: S_bar=0, R_bar=1 → Q=1',
      body:
        'Now pull S_bar LOW (S_bar=0) while R_bar returns HIGH (R_bar=1). ' +
        'The set input is active → Q goes HIGH → LED turns ON. ' +
        'The latch is in SET state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      highlight: 'led_q',
      activeInputs: { S_bar: 0, R_bar: 1 },
    },
    {
      title: 'Test HOLD: S_bar=1, R_bar=1 → Q unchanged',
      body:
        'Release both inputs (both HIGH). ' +
        'Neither Set nor Reset is active → Q retains its previous value. ' +
        'The LED stays ON (Q was SET). This is memory — the latch holds its state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Test FORBIDDEN state: S_bar=0, R_bar=0 → Q=undefined',
      body:
        'Drive BOTH S_bar and R_bar LOW simultaneously. ' +
        'This is the forbidden state — both SET and RESET are asserted at once. ' +
        'Q becomes indeterminate (shown as X). ' +
        'When inputs return to HOLD the output is unpredictable. Avoid this in real designs.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 0, R_bar: 0 },
    },
  ],

  truthTable: {
    inputs:  ['S_bar', 'R_bar'],
    outputs: ['Q'],
    rows: [
      { inputs: { S_bar: 1, R_bar: 0 }, outputs: { Q: 0 } },  // RESET
      { inputs: { S_bar: 0, R_bar: 1 }, outputs: { Q: 1 } },  // SET
      { inputs: { S_bar: 1, R_bar: 1 }, outputs: { Q: 0 } },  // HOLD (shown after RESET)
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An SR latch is a fundamental bistable memory element. The 74HC279 provides four independent SR latches on a single DIP-16 package with active-low $\\bar{S}$ (Set) and $\\bar{R}$ (Reset) inputs.',
        'Operating states: $\\bar{S}=0, \\bar{R}=1$ → Q=1 (Set). $\\bar{S}=1, \\bar{R}=0$ → Q=0 (Reset). $\\bar{S}=1, \\bar{R}=1$ → Q unchanged (Hold). $\\bar{S}=0, \\bar{R}=0$ → Forbidden — both outputs try to go HIGH simultaneously, violating Q=Q_bar complementarity.',
        'Unlike edge-triggered flip-flops, the SR latch responds immediately (asynchronously) to input changes — there is no clock. The state equation is $$Q_{n+1} = S + \\bar{R}\\,Q_n \\quad (\\text{with constraint } S \\cdot R = 0)$$ Once set or reset, the latch holds its state indefinitely — this is the bistable memory property.',
        'Applications: switch debouncing (transitions on mechanical bounce do not cause spurious state changes), latching alarm circuits, and as the cross-coupled core inside D and JK flip-flops. The forbidden state is the key limitation of the SR latch compared to more advanced sequential elements.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC279 SR Latch IC', specification: 'Quad SR latch, DIP-16, 5 V supply', quantity: '1' },
        { name: 'Green LED', specification: '5 mm, Q output indicator', quantity: '1' },
        { name: 'Resistor 330 Ω', specification: '¼ W, current limiter for LED', quantity: '1' },
        { name: 'DC Power Supply', specification: '+5 V DC, 500 mA', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires, assorted colours', quantity: '1 set' },
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
          body: 'Place the 830-point solderless breadboard. Red rails = VCC (+5 V), blue rails = GND. The centre gap separates rows a–e from f–j.',
        },
        {
          label: 'Place the 74HC279 SR latch IC.',
          circuitStepIndex: 1,
          body: 'Insert the 74HC279 DIP-16 straddling the centre gap. Pin 1 (notch/dot at top-left) is $\\bar{S}_1$ of Latch 1. Seat all 16 pins firmly.',
        },
        {
          label: 'Wire S_bar and R_bar inputs.',
          circuitStepIndex: 2,
          body: 'Connect $\\bar{S}$ from col 1 row a and $\\bar{R}$ from col 2 row a to the IC. These are active-LOW: HIGH = inactive (use VCC pull-up via 10 kΩ for real buttons). In this lab drive them directly from row holes.',
        },
        {
          label: 'Place the 330 Ω resistor.',
          circuitStepIndex: 3,
          body: 'Insert the 330 Ω current-limiting resistor in the Q output path to protect the LED.',
        },
        {
          label: 'Place the Q output LED.',
          circuitStepIndex: 4,
          body: 'Insert the green LED with anode toward the resistor. LED ON = Q=1 (latch SET). LED OFF = Q=0 (latch RESET).',
        },
        {
          label: 'Connect the output path.',
          circuitStepIndex: 5,
          body: 'Wire IC Q pin → resistor → LED anode. Wire LED cathode → GND rail. Power on.',
        },
        {
          label: 'Test RESET state (S_bar=1, R_bar=0).',
          circuitStepIndex: 6,
          body: 'Assert $\\bar{R}$=LOW (connect R input to GND). Q goes to 0. LED turns OFF. This is the RESET state — latch stores a logical 0.',
        },
        {
          label: 'Test SET state (S_bar=0, R_bar=1).',
          circuitStepIndex: 7,
          body: 'Now assert $\\bar{S}$=LOW (connect S input to GND). Q goes to 1. LED turns ON. This is the SET state — latch stores a logical 1.',
        },
        {
          label: 'Test HOLD state (both=1).',
          circuitStepIndex: 8,
          body: 'Both $\\bar{S}=\\bar{R}=1$ (both HIGH/inactive). Q retains its last value. Toggle S and R back to HIGH — LED remains ON (if previously set). This demonstrates the memory/hold property.',
        },
        {
          label: 'Observe the forbidden state (both=0).',
          circuitStepIndex: 9,
          body: '⚠️ Assert both $\\bar{S}=\\bar{R}=0$ briefly. Both Q and Q_bar go HIGH simultaneously — an undefined state. When inputs return to 11, Q settles unpredictably. Avoid this in real designs.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage: +5 V DC. 74HC279 operating normally. LED current ≈ (5 − 2) / 330 ≈ 9 mA.',
      ],
      table: {
        headers: ['$\\bar{S}$', '$\\bar{R}$', '$Q_{n+1}$', 'State', 'LED'],
        rows: [
          [1, 0, 0, 'RESET', 'OFF'],
          [0, 1, 1, 'SET', 'ON'],
          [1, 1, '$Q_n$', 'HOLD', 'Unchanged'],
          [0, 0, '?', 'FORBIDDEN', 'Undefined'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The SR latch constructed using the 74HC279 IC demonstrated all four operating states: Set (Q=1), Reset (Q=0), Hold (Q unchanged), and the Forbidden state (Q=Q_bar=1).',
        'The memory property was verified: once set or reset, the latch maintained its state with both inputs HIGH — confirming bistable operation without a clock.',
        'The SR latch is the building block of all sequential elements. Its active-LOW inputs and forbidden state are its key characteristics that motivate the more robust D and JK flip-flops.',
      ],
    },
  ],
};
