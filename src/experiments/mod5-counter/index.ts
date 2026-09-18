import { type Experiment } from '@/experiments/types';

export const Mod5Counter: Experiment = {
  id: 'mod5-counter',
  title: 'MOD-5 Asynchronous Counter using 74HC93',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Sequential Logic',
    description: 'Wire the 74HC93 4-bit ripple counter with feedback to implement a MOD-5 counter. Observe the count sequence and reset glitch on an oscilloscope.',
    tags: ['counter', 'mod-5', 'asynchronous', '74hc93', 'ripple counter', 'sequential'],
  },
  metaTitle: 'MOD-5 Asynchronous Counter using 74HC93 — VLabs',
  metaDescription: 'Wire the 74HC93 4-bit ripple counter with feedback to implement a MOD-5 counter. Observe the count sequence and reset glitch on an oscilloscope.',
  circuit: {
  id: 'mod5-counter',
  title: 'MOD-5 Asynchronous Counter using 74HC93',
  description:
    'Design a MOD-5 counter using the 74HC93 by connecting reset inputs to detect ' +
    'count=5 (0101) and reset to 0000.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'ctr', type: 'counter-4bit-async', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── CLK input: col 1 row a → CLK_A ───────────────────────────────────
    { id: 'w_clk_ctr', type: 'wire', color: 'yellow',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'ctr', pin: 'clk_a' } },

    // ── QA → CLK_B: 4-bit ripple counter connection ───────────────────────
    { id: 'w_qa_clkb', type: 'wire', color: 'white',
      from: { ic: 'ctr', pin: 'qa' },
      to:   { ic: 'ctr', pin: 'clk_b' } },

    // ── MOD-5 reset feedback: QA → R01, QC → R02 ─────────────────────────
    { id: 'w_qa_r01', type: 'wire', color: 'red',
      from: { ic: 'ctr', pin: 'qa' },
      to:   { ic: 'ctr', pin: 'r01' } },
    { id: 'w_qc_r02', type: 'wire', color: 'red',
      from: { ic: 'ctr', pin: 'qc' },
      to:   { ic: 'ctr', pin: 'r02' } },

    // ── QA output path (TOP bank, row 'c') — LSB ──────────────────────────
    { id: 'r_qa',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'led_qa', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 24, row: 'c' } },

    { id: 'w_qa_out', type: 'wire', color: 'red',
      from: { ic: 'ctr', pin: 'qa' },
      to:   { component: 'r_qa', end: 'p1' } },
    { id: 'w_qa_led', type: 'wire', color: 'red',
      from: { component: 'r_qa', end: 'p2' },
      to:   { led: 'led_qa', end: 'anode' } },
    { id: 'w_qa_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qa', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── QB output path (BOTTOM bank, row 'h') ─────────────────────────────
    { id: 'r_qb',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'led_qb', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 24, row: 'h' } },

    { id: 'w_qb_out', type: 'wire', color: 'yellow',
      from: { ic: 'ctr', pin: 'qb' },
      to:   { component: 'r_qb', end: 'p1' } },
    { id: 'w_qb_led', type: 'wire', color: 'yellow',
      from: { component: 'r_qb', end: 'p2' },
      to:   { led: 'led_qb', end: 'anode' } },
    { id: 'w_qb_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qb', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },

    // ── QC output path (TOP bank, row 'c', offset cols) ───────────────────
    { id: 'r_qc',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 27, row: 'c' } },
    { id: 'led_qc', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 31, row: 'c' } },

    { id: 'w_qc_out', type: 'wire', color: 'green',
      from: { ic: 'ctr', pin: 'qc' },
      to:   { component: 'r_qc', end: 'p1' } },
    { id: 'w_qc_led', type: 'wire', color: 'green',
      from: { component: 'r_qc', end: 'p2' },
      to:   { led: 'led_qc', end: 'anode' } },
    { id: 'w_qc_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qc', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 3 } },

    // ── QD output path (BOTTOM bank, row 'h', offset cols) — MSB ──────────
    { id: 'r_qd',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 27, row: 'h' } },
    { id: 'led_qd', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 31, row: 'h' } },

    { id: 'w_qd_out', type: 'wire', color: 'blue',
      from: { ic: 'ctr', pin: 'qd' },
      to:   { component: 'r_qd', end: 'p1' } },
    { id: 'w_qd_led', type: 'wire', color: 'blue',
      from: { component: 'r_qd', end: 'p2' },
      to:   { led: 'led_qd', end: 'anode' } },
    { id: 'w_qd_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qd', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 4 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body:
        'The solderless breadboard is your build surface. ' +
        'The centre gap isolates the two banks. ' +
        'Red rail = VCC (+5 V), blue rail = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC93 4-bit ripple counter IC',
      body:
        'Mount the 74HC93 straddling the centre gap at column 5. ' +
        'CLK_A (col 5,f) clocks QA alone (÷2). ' +
        'CLK_B (col 5,e) clocks the QB–QD chain (÷8). ' +
        'R01 and R02 are master reset inputs: both HIGH → all outputs LOW.',
      show: ['bb', 'ctr'],
      highlight: 'ctr',
    },
    {
      title: 'Connect QA → CLK_B (4-bit mode)',
      body:
        'White wire: IC pin QA → IC pin CLK_B. ' +
        'This chains the QA flip-flop output into the QB–QD chain input. ' +
        'The result is a full 4-bit ripple counter: every CLK_A falling edge ' +
        'advances the 4-bit count by one.',
      show: ['bb', 'ctr', 'w_qa_clkb'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Connect MOD-5 reset feedback: QA → R01, QC → R02',
      body:
        'Red wire: QA → R01. Red wire: QC → R02. ' +
        'Binary 5 = 0101: QA=1 and QC=1, QB=0, QD=0. ' +
        'When both R01 and R02 are HIGH simultaneously the IC resets to 0000. ' +
        'The count=5 state is transient — the circuit immediately resets, ' +
        'so the visible sequence is 0→1→2→3→4→0→…',
      show: ['bb', 'ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Add four output LEDs and resistors',
      body:
        'Red LED (QA) — col 24 top. Yellow LED (QB) — col 24 bottom. ' +
        'Green LED (QC) — col 31 top. Blue LED (QD) — col 31 bottom. ' +
        '330 Ω resistors before each LED. ' +
        'Reading the LEDs left-to-right gives the binary count QD QC QB QA.',
      show: ['bb', 'ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Connect output wires and CLK input',
      body:
        'Connect each output wire: QA/QB/QC/QD → resistor.p1, resistor.p2 → LED anode, LED cathode → GND. ' +
        'Yellow wire: col 1 row a → CLK_A. ' +
        'Circuit is complete. Starting count: 0000.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Count 1: CLK pulse → 0001',
      body:
        'Apply first CLK pulse (HIGH→LOW). Count advances to 1 (0001). ' +
        'QA=1 (red LED ON), QB=0, QC=0, QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 1 },
    },
    {
      title: 'Count 2: CLK pulse → 0010',
      body:
        'Second pulse. Count = 2 (0010). ' +
        'QA=0, QB=1 (yellow ON), QC=0, QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Count 3: CLK pulse → 0011',
      body:
        'Third pulse. Count = 3 (0011). ' +
        'QA=1 (red ON), QB=1 (yellow ON), QC=0, QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 1 },
    },
    {
      title: 'Count 4: CLK pulse → 0100',
      body:
        'Fourth pulse. Count = 4 (0100). ' +
        'QA=0, QB=0, QC=1 (green ON), QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Count 5 → immediate reset back to 0',
      body:
        'Fifth pulse. The counter briefly reaches 5 (0101: QA=1, QC=1). ' +
        'R01=QA=1 AND R02=QC=1 → master reset fires instantly → 0000. ' +
        'Count=5 is transient and not visible on the LEDs. ' +
        'The cycle repeats: 0→1→2→3→4→0→… (MOD-5 sequence).',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      highlight: 'ctr',
      activeInputs: { CLK: 1 },
    },
  ],

  truthTable: {
    inputs:  ['CLK'],
    outputs: ['QD', 'QC', 'QB', 'QA'],
    rows: [
      { inputs: { CLK: 0 }, outputs: { QD: 0, QC: 0, QB: 0, QA: 0 } },  // count 0
      { inputs: { CLK: 1 }, outputs: { QD: 0, QC: 0, QB: 0, QA: 1 } },  // count 1
      { inputs: { CLK: 0 }, outputs: { QD: 0, QC: 0, QB: 1, QA: 0 } },  // count 2
      { inputs: { CLK: 1 }, outputs: { QD: 0, QC: 0, QB: 1, QA: 1 } },  // count 3
      { inputs: { CLK: 0 }, outputs: { QD: 0, QC: 1, QB: 0, QA: 0 } },  // count 4
      { inputs: { CLK: 1 }, outputs: { QD: 0, QC: 0, QB: 0, QA: 0 } },  // reset to 0
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A MOD-N counter cycles through N states (0 to N−1) and resets to 0. The 74HC93 is a 4-bit asynchronous (ripple) binary counter with two internal flip-flops: FF-A (clocked by CLK_A, output QA) and FF-B/C/D (clocked by CLK_B, outputs QB/QC/QD). Connecting QA to CLK_B gives a 4-bit counter that counts 0–15.',
        'To build a MOD-5 counter, the counter must reset immediately upon reaching count 5 (binary 0101). The reset inputs R01 and R02 are AND-ed internally: when both R01=1 AND R02=1 the counter resets to 0000 asynchronously. Count 5 in binary is 0101, so QA=1 and QC=1. Connecting R01=QA and R02=QC causes immediate reset on reaching 5, giving the sequence: $$0 \\to 1 \\to 2 \\to 3 \\to 4 \\to (5_{\\text{brief}}) \\to 0 \\to 1 \\to \\cdots$$',
        'The reset is so fast that count 5 (0101) is only momentarily present on the outputs before disappearing — the sequence observed is 0,1,2,3,4 and back to 0. This is called an **asynchronous preset** or **feedback reset** technique. The same approach works for any MOD-N: identify which bits are 1 in the binary representation of N and connect those Q outputs to R01 and R02.',
        'Asynchronous counters have a **ripple delay**: each flip-flop is clocked by the preceding output, so the final output (QD) changes last. For high-speed applications, synchronous counters (like the 74HC161) are preferred.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC93 Counter IC', specification: '4-bit async binary counter, DIP-14, 5 V', quantity: '1' },
        { name: 'LEDs', specification: '5 mm — red (QA), yellow (QB), green (QC), blue (QD)', quantity: '4' },
        { name: 'Resistors 330 Ω', specification: '¼ W, ×4 — one per LED', quantity: '4' },
        { name: 'DC Power Supply', specification: '+5 V DC', quantity: '1' },
        { name: 'Clock source / Push Button', specification: 'Manual clock pulse (press = one count)', quantity: '1' },
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
          body: 'Place the breadboard. Red rails = VCC (+5 V), blue = GND.',
        },
        {
          label: 'Place the 74HC93 counter IC.',
          circuitStepIndex: 1,
          body: 'Insert 74HC93 DIP-14 straddling the centre gap. Pin 1 is CLK_B, pin 12 is CLK_A (the A flip-flop input). Seat all 14 pins.',
        },
        {
          label: 'Connect QA → CLK_B (4-bit mode).',
          circuitStepIndex: 2,
          body: 'Wire IC pin QA to IC pin CLK_B. This chains the A flip-flop output to the B flip-flop clock, creating a 4-bit (MOD-16) counter. Without this link, QA and QB/QC/QD would count independently.',
        },
        {
          label: 'Connect MOD-5 reset feedback.',
          circuitStepIndex: 3,
          body: 'Wire QA → R01 and QC → R02. When count reaches 5 (QA=1, QC=1), both reset inputs go HIGH simultaneously and the counter immediately resets to 0000. Count 5 is never fully visible on the outputs.',
        },
        {
          label: 'Add four output LEDs and resistors.',
          circuitStepIndex: 4,
          body: 'Place four 330 Ω resistors and LEDs: Red=QA (LSB), Yellow=QB, Green=QC, Blue=QD (MSB). This visual display shows the binary count as a pattern of lit LEDs.',
        },
        {
          label: 'Connect output wires and CLK input.',
          circuitStepIndex: 5,
          body: 'Wire QA/QB/QC/QD outputs through resistors to LED anodes, LED cathodes to GND. Connect CLK_A from col 1 row a — each HIGH→LOW transition on CLK_A increments the count by 1.',
        },
        {
          label: 'Count 1: CLK pulse → 0001.',
          circuitStepIndex: 6,
          body: 'Apply one falling clock pulse. LEDs show: QA=1 (red ON), QB=QC=QD=0. Count = 1.',
        },
        {
          label: 'Count 2: CLK pulse → 0010.',
          circuitStepIndex: 7,
          body: 'Second pulse. QA=0, QB=1. Count = 2. Red OFF, Yellow ON.',
        },
        {
          label: 'Count 3: CLK pulse → 0011.',
          circuitStepIndex: 8,
          body: 'Third pulse. QA=1, QB=1. Count = 3. Red ON, Yellow ON.',
        },
        {
          label: 'Count 4: CLK pulse → 0100.',
          circuitStepIndex: 9,
          body: 'Fourth pulse. QB=0, QC=1. Count = 4. Yellow OFF, Green ON.',
        },
        {
          label: 'Count 5 → immediate reset back to 0.',
          circuitStepIndex: 10,
          body: 'Fifth pulse. The counter momentarily reaches 0101 (QA=1, QC=1) which triggers R01=R02=1, instantly resetting to 0000. You observe the LEDs jump from count 4 directly to 0. The MOD-5 sequence (0→1→2→3→4→0) repeats.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: +5 V. Clock pulsed manually. Count resets at 5 as expected.',
        'Note: count 5 (0101) is too brief to be observed — the asynchronous reset acts within nanoseconds of QA and QC both going HIGH.',
      ],
      table: {
        headers: ['CLK Pulse', 'QD', 'QC', 'QB', 'QA', 'Count', 'LEDs (D C B A)'],
        rows: [
          ['Reset/0', 0, 0, 0, 0, 0, 'off off off off'],
          [1, 0, 0, 0, 1, 1, 'off off off RED'],
          [2, 0, 0, 1, 0, 2, 'off off YEL off'],
          [3, 0, 0, 1, 1, 3, 'off off YEL RED'],
          [4, 0, 1, 0, 0, 4, 'off GRN off off'],
          ['5 → 0', 0, 0, 0, 0, '5→0', 'Reset (instant)'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The MOD-5 counter was successfully implemented using the 74HC93 by feeding QA and QC back to the R01 and R02 reset inputs. The counter cycled through 0→1→2→3→4→0 as expected, never completing count 5.',
        'The feedback reset technique is general: any MOD-N counter can be built by identifying which bits are 1 in N and connecting those outputs to the reset inputs. MOD-10 (decade counter) uses QB and QD for count=10=1010.',
        'The asynchronous (ripple) nature of the 74HC93 means propagation delay increases with stage count. For reliable high-speed operation in digital systems, synchronous counters like the 74HC161 are preferred.',
      ],
    },
  ],
};
