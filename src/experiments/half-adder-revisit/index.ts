import { type Experiment } from '@/experiments/types';

export const HalfAdderRevisit: Experiment = {
  id: 'half-adder-revisit',
  title: 'Half Adder — Propagation Delay Study',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Advanced Adder Circuits',
    description: 'Revisit the half adder with a focus on propagation delay, fan-out limits, and supply-voltage effects on switching speed of 74HC-series ICs.',
    tags: ['adder', 'propagation delay', 'fan-out', '74hc', 'timing', 'oscilloscope'],
  },
  metaTitle: 'Half Adder — Propagation Delay Study — VLabs',
  metaDescription: 'Revisit the half adder with a focus on propagation delay, fan-out limits, and supply-voltage effects on switching speed of 74HC-series ICs.',
  circuit: {
  id: 'half-adder-revisit',
  title: 'Half Adder (Revisit)',
  description:
    'A half adder adds two single-bit inputs A and B. ' +
    'It produces a Sum bit (A XOR B) and a Carry bit (A AND B). ' +
    'Built on a breadboard using one XOR gate, one AND gate, two LEDs, and two resistors. ' +
    'This revisit reinforces the concepts from the first half-adder lab.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── ICs ───────────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 16, row: 'e' } },

    // ── Sum output path (TOP bank, row 'c') ───────────────────────────────
    { id: 'r_sum',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_sum', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 27, row: 'c' } },

    // ── Carry output path (BOTTOM bank, row 'h') ──────────────────────────
    { id: 'r_carry',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_carry', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'h' } },

    // ── Input wires: A (red) ──────────────────────────────────────────────
    { id: 'w_a_xor', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_a_and', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'and1', pin: 'A' } },

    // ── Input wires: B (blue) ─────────────────────────────────────────────
    { id: 'w_b_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'xor1', pin: 'B' } },
    { id: 'w_b_and', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'and1', pin: 'B' } },

    // ── Sum output: XOR.Y → r_sum → led_sum → GND ─────────────────────────
    { id: 'w_xor_out', type: 'wire', color: 'green',
      from: { ic: 'xor1', pin: 'Y' },
      to:   { component: 'r_sum', end: 'p1' } },
    { id: 'w_sum_led', type: 'wire', color: 'green',
      from: { component: 'r_sum', end: 'p2' },
      to:   { led: 'led_sum', end: 'anode' } },
    { id: 'w_sum_gnd', type: 'wire', color: 'black',
      from: { led: 'led_sum', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Carry output: AND.Y → r_carry → led_carry → GND ──────────────────
    { id: 'w_and_out', type: 'wire', color: 'orange',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_carry', end: 'p1' } },
    { id: 'w_carry_led', type: 'wire', color: 'yellow',
      from: { component: 'r_carry', end: 'p2' },
      to:   { led: 'led_carry', end: 'anode' } },
    { id: 'w_carry_gnd', type: 'wire', color: 'black',
      from: { led: 'led_carry', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The solderless breadboard is your build surface. ' +
        'All holes in the same column and same bank (a-e or f-j) are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it. ' +
        'Red rails = VCC (+), blue rails = GND (-).',
      show: ['bb'],
    },
    {
      title: 'Place the XOR gate (74HC86)',
      body: 'Mount the 74HC86 XOR gate straddling the centre gap at column 7. ' +
        'Notch faces left (pin 1 at col 7, row e). ' +
        'XOR output is HIGH only when inputs differ: A XOR B. This is the Sum bit.',
      show: ['bb', 'xor1'],
      highlight: 'xor1',
    },
    {
      title: 'Place the AND gate (74HC08)',
      body: 'Mount the 74HC08 AND gate at column 16. ' +
        'AND output is HIGH only when both inputs are HIGH: A AND B. This is the Carry bit.',
      show: ['bb', 'xor1', 'and1'],
      highlight: 'and1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'Red wire: col 3 row a → XOR pin A, col 3 row b → AND pin A. ' +
        'Blue wire: col 4 row a → XOR pin B, col 4 row b → AND pin B. ' +
        'Both gates see the same A and B inputs.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add 330 Ohm resistors',
      body: 'r_sum (col 22-25, row c) and r_carry (col 22-25, row h — bottom bank). ' +
        'Using different banks keeps their electrical paths completely separate.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add output LEDs',
      body: 'Green LED (Sum) at col 27-28, row c. ' +
        'Yellow LED (Carry) at col 27-28, row h (bottom bank).',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect all output wires',
      body: 'Green: XOR.Y → r_sum.p1, r_sum.p2 → led_sum.anode. ' +
        'Orange: AND.Y → r_carry.p1. Yellow: r_carry.p2 → led_carry.anode. ' +
        'Black: both LED cathodes to GND rail. Circuit complete.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=1 → Sum=1, Carry=0',
      body: '0+1=01 in binary. XOR sees different inputs → Sum HIGH → green LED ON. ' +
        'AND sees one LOW → Carry LOW → yellow LED OFF.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      activeInputs: { A: 0, B: 1 },
    },
    {
      title: 'Test: A=1, B=1 → Sum=0, Carry=1',
      body: '1+1=10 in binary. XOR sees equal inputs → Sum LOW → green LED OFF. ' +
        'AND sees both HIGH → Carry HIGH → yellow LED ON.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      highlight: 'led_carry',
      activeInputs: { A: 1, B: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['Sum', 'Carry'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { Sum: 0, Carry: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Sum: 0, Carry: 1 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Propagation delay (t_pd) is the time elapsed between an input transition and the resulting output transition of a logic gate. For a 74HC-series gate at 5 V, the typical propagation delay is 7–10 ns (rising or falling edge). This delay is caused by internal transistor switching time and load capacitance charging. The 74HC86 (XOR) and 74HC08 (AND) gates in a Half Adder each contribute t_pd to the total combinational path delay.',
        'In the Half Adder, the Sum output (XOR) and Carry output (AND) both originate from the same inputs A and B. The propagation delay from input to Sum is t_pd(XOR) ≈ 8 ns, and from input to Carry is t_pd(AND) ≈ 7 ns (74HC at 5 V, 50 pF load, 25°C). When multiple gates are cascaded, propagation delays accumulate along the critical path — the longest delay path through the circuit that determines the maximum operating frequency.',
        'Fan-out is the number of gate inputs that one gate output can drive reliably while maintaining valid logic levels. For 74HC driving 74HC loads, the DC fan-out is theoretically very high (≥ 50 for CMOS), but AC fan-out is limited by load capacitance — each additional load input adds approximately 5–10 pF, increasing t_pd. In practice, a fan-out of 10–20 is recommended to avoid excessive timing degradation.',
        "Supply voltage has a significant effect on 74HC speed. At Vcc = 5 V, t_pd ≈ 7 ns. At Vcc = 3.3 V, t_pd increases to approximately 10 ns. At Vcc = 2 V, t_pd can be 25–40 ns. This relationship arises because higher Vcc increases the overdrive of the MOSFET gates, allowing faster switching. The experiment uses an oscilloscope to measure the input-to-output delay of each gate in the Half Adder under different conditions.",
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14 (Half Adder Sum path)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (Half Adder Carry path)', quantity: '1' },
        { name: 'Digital Oscilloscope', specification: 'Dual-channel, ≥ 50 MHz bandwidth, 1 ns resolution', quantity: '1' },
        { name: 'Function Generator', specification: '1 kHz–10 MHz square wave output', quantity: '1' },
        { name: 'Oscilloscope Probes', specification: '10× probes, 10 pF tip capacitance', quantity: '2' },
        { name: 'Variable DC Power Supply', specification: '2 V – 5 V selectable', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '20' },
        { name: 'Bypass Capacitor', specification: '100 nF ceramic, placed between Vcc and GND of each IC', quantity: '2' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the Half Adder with bypass capacitors',
          body: 'Construct the Half Adder: 74HC86 XOR (Sum) and 74HC08 AND (Carry), with inputs A and B. Place a 100 nF ceramic capacitor between pin 14 (Vcc) and pin 7 (GND) of each IC, positioned as close to the IC body as possible. These bypass (decoupling) capacitors suppress supply noise caused by rapid output switching and are mandatory for accurate high-speed measurements. Set both inputs to GND initially.',
          circuitStepIndex: 0,
        },
        {
          label: 'Configure oscilloscope and apply test signal',
          body: 'Connect Channel 1 of the oscilloscope to the function generator output (which will drive input A) and Channel 2 to the Sum output (XOR pin 3). Set the function generator to a 1 MHz square wave, 0–5 V amplitude, 50% duty cycle. Tie input B permanently to +5 V (logic 1) so that A transitions directly appear at the XOR output as A⊕1 = A\'. This creates a continuous alternating signal to measure delay.',
          circuitStepIndex: 1,
        },
        {
          label: 'Measure Sum propagation delay at 5 V',
          body: 'With Vcc = 5 V, use the oscilloscope\'s cursor measurements to find the time difference between the 50% crossing of the rising edge of input A (Channel 1) and the corresponding 50% crossing of the output edge on Channel 2 (Sum). Record t_pd_HL (input goes HIGH, output goes LOW) and t_pd_LH (input goes LOW, output goes HIGH). Average them to get t_pd(XOR). Compare with the 74HC86 datasheet value (typically 8 ns at 5 V, 50 pF).',
          circuitStepIndex: 2,
        },
        {
          label: 'Measure Carry propagation delay at 5 V',
          body: 'Move Channel 2 probe to the Carry output (AND gate pin 3). With B = 1 (constant), A transitions cause Carry = A·1 = A, so Carry follows A directly after one gate delay. Measure t_pd(AND) using the same cursor method. Record t_pd_HL and t_pd_LH for the Carry path. Compare with the 74HC08 datasheet (typically 7 ns at 5 V, 50 pF).',
          circuitStepIndex: 3,
        },
        {
          label: 'Repeat at reduced supply voltage (3.3 V)',
          body: 'Reduce Vcc to 3.3 V using the variable supply. Keep input signal amplitude at 3.3 V (match the supply). Repeat the delay measurements for both the Sum (XOR) and Carry (AND) paths. Record the increased t_pd values. For 74HC at 3.3 V, expect t_pd ≈ 10–12 ns — about 30–50% slower than at 5 V. Tabulate results alongside the 5 V measurements.',
          circuitStepIndex: 4,
        },
        {
          label: 'Assess fan-out effect on delay',
          body: 'At Vcc = 5 V, add additional capacitive loads to the Sum output by connecting 1, 3, and 5 breadboard-connected wires (each approximately 20 pF) to the output node. Measure t_pd for each fan-out load. Observe the increase in delay as capacitive load grows. Record the data and calculate the sensitivity: Δt_pd / ΔC_load, which should be approximately 1 ns per 10–15 pF for 74HC gates.',
          circuitStepIndex: 5,
        },
        {
          label: 'Calculate maximum operating frequency',
          body: 'Using the measured propagation delays, calculate the theoretical maximum clock frequency for a circuit using these gates: f_max = 1 / (2 × t_pd_critical). For a Half Adder at 5 V with t_pd ≈ 8 ns, f_max ≈ 62 MHz. Note that real systems operate well below f_max (typically at 30–50% of it) to account for setup/hold time margins, wire delays, and temperature/voltage variation.',
          circuitStepIndex: 6,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Propagation delay measurements for 74HC86 (XOR, Sum path) and 74HC08 (AND, Carry path) at different supply voltages.',
      ],
      table: {
        headers: ['Gate', 'Vcc (V)', 't_pd_LH (ns)', 't_pd_HL (ns)', 't_pd avg (ns)', 'Datasheet typ (ns)'],
        rows: [
          ['74HC86 (XOR)', 5.0, 7.8, 8.2, 8.0, 7.0],
          ['74HC08 (AND)', 5.0, 6.9, 7.3, 7.1, 7.0],
          ['74HC86 (XOR)', 3.3, 10.5, 11.2, 10.9, 10.0],
          ['74HC08 (AND)', 3.3, 9.8, 10.4, 10.1, 10.0],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The propagation delay of 74HC86 (XOR) and 74HC08 (AND) gates in a Half Adder configuration was successfully measured using an oscilloscope. The measured values at 5 V (≈8 ns for XOR, ≈7 ns for AND) are in close agreement with the datasheet specifications.',
        'Reducing the supply voltage from 5 V to 3.3 V increased propagation delay by approximately 30–40%, confirming the voltage-speed trade-off in CMOS logic families. This is a critical consideration in low-power designs that lower Vcc to reduce dynamic power consumption (P_dynamic ∝ C·V²·f).',
        'The fan-out experiment demonstrated that each additional load increases propagation delay by approximately 1 ns per 10–15 pF of added capacitance. Designers must balance fan-out against timing budgets when laying out real PCB traces and gate networks.',
      ],
    },
  ],
};
