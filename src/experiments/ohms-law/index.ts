import { type Experiment } from '@/experiments/types';

export const OhmsLaw: Experiment = {
  id: 'ohms-law',
  title: '',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Electronics and Electrical',
    description: "Verify V = IR experimentally by measuring voltage across and current through resistors. Plot V-I characteristic and compute resistance from slope.",
    tags: ['ohm', 'resistance', 'voltage', 'current', 'v-i graph'],
  },
  metaTitle: ' — VLabs',
  metaDescription: "Verify V = IR experimentally by measuring voltage across and current through resistors. Plot V-I characteristic and compute resistance from slope.",
  circuit: {
  id: 'ohms-law',
  title: "Ohm's Law",
  description:
    'Demonstrates Ohm\'s Law (V = I × R) using a 1 kΩ resistor and an LED as a current indicator. ' +
    'Voltmeter probes across the resistor measure the voltage drop. ' +
    'By varying the supply voltage and measuring current, the linear V-I relationship is observed.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',   type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'led1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── VCC rail → R1 left lead ───────────────────────────────────────────
    { id: 'w_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 right lead → LED anode ─────────────────────────────────────────
    { id: 'w_r1_led', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND rail ────────────────────────────────────────────
    { id: 'w_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── Voltmeter probes across R1 (blue) ─────────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p1' },
      to:   { board: 'bb', col: 5, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. Red rails = VCC, blue rails = GND. ' +
        'We will build a simple series circuit to verify Ohm\'s Law: V = I × R.',
      show: ['bb'],
    },
    {
      title: 'Place the 1 kΩ resistor',
      body: 'Insert the 1 kΩ resistor at cols 5–8, row c. ' +
        'Colour bands: Brown-Black-Red = 1000 Ω. ' +
        'This is the component under test — we will measure the voltage across it.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the LED (current indicator)',
      body: 'Insert the green LED at cols 10–11, row c. ' +
        'The LED serves as a visual current indicator: brighter = more current flowing.',
      show: ['bb', 'r1', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire VCC to resistor',
      body: 'Red wire: VCC rail (col 5) → R1 left lead (p1). ' +
        'This provides the supply voltage to the circuit.',
      show: ['bb', 'r1', 'led1', 'w_vcc'],
    },
    {
      title: 'Wire LED to GND',
      body: 'Black wire: LED cathode (col 11) → GND rail. ' +
        'Current path is now: VCC → R1 → LED → GND.',
      show: ['bb', 'r1', 'led1', 'w_vcc', 'w_r1_led', 'w_gnd'],
    },
    {
      title: 'Add voltmeter probes across resistor',
      body: 'Blue wires: probe the voltage at each end of R1. ' +
        'Positive probe at R1 p1 (col 5, row a), negative at R1 p2 (col 8, row a). ' +
        'The voltmeter reads V_R = I × R. With 5 V supply and ~2 V LED drop, ' +
        'V_R ≈ 3 V, so I ≈ 3 mA.',
      show: ['bb', 'r1', 'led1', 'w_vcc', 'w_r1_led', 'w_gnd', 'w_vm_pos', 'w_vm_neg'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        "Ohm's Law states that the current (I) flowing through a conductor is directly proportional to the potential difference (V) applied across it, provided the temperature and other physical conditions remain constant. Mathematically this is expressed as V = IR, where R is the constant of proportionality called resistance, measured in ohms (Ω).",
        'The relationship implies that a graph of voltage versus current (V-I characteristic) for an ohmic conductor is a straight line passing through the origin. The slope of this line gives the resistance: R = ΔV / ΔI. A material that obeys Ohm\'s Law is called an ohmic conductor; metals such as copper, aluminium, and nichrome wire are classic examples under normal operating temperatures.',
        'Resistance depends on the material (resistivity ρ), the length (L) and cross-sectional area (A) of the conductor: R = ρL/A. In practical circuits, standard colour-coded carbon-film or metal-film resistors are used. Their tolerance (±1%, ±5%, etc.) limits how precisely the nominal value matches the actual resistance, which can be verified experimentally.',
        "In this experiment a known resistor is connected in series with a milliammeter and a variable DC supply. The voltage across the resistor is measured with a voltmeter for several supply settings. Plotting V on the Y-axis and I on the X-axis yields a straight line whose slope equals R, thereby verifying Ohm's Law.",
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–12 V, 1 A', quantity: '1' },
        { name: 'Carbon Film Resistor', specification: '1 kΩ, ±5%, 0.25 W', quantity: '2' },
        { name: 'Digital Multimeter', specification: 'Voltage & current measurement', quantity: '2' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
        { name: 'Milliammeter / Ammeter', specification: '0–100 mA DC', quantity: '1' },
        { name: 'Voltmeter', specification: '0–15 V DC', quantity: '1' },
        { name: 'Rheostat (optional)', specification: '100 Ω, 1 A', quantity: '1' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up the breadboard',
          body: 'Place the breadboard on a flat, insulated surface. Identify the two power rails (+ and −) running along each long edge. Connect the positive terminal of the regulated DC supply to the red (+) rail and the negative terminal to the blue (−) rail using jumper wires. Keep the supply switched OFF at this stage to avoid accidental short circuits.',
          circuitStepIndex: 0,
        },
        {
          label: 'Insert the resistor and ammeter',
          body: 'Insert the 1 kΩ resistor across rows in the breadboard such that each lead occupies a different row on the same column group. Connect the ammeter (set to DC milliamps) in series with the resistor: one terminal of the ammeter connects to the positive rail, the other connects to one lead of the resistor; the remaining lead of the resistor connects back to the negative rail. Series connection is essential — the ammeter must carry the full current through the resistor.',
          circuitStepIndex: 1,
        },
        {
          label: 'Connect the voltmeter in parallel',
          body: 'Connect the voltmeter (set to the 20 V DC range) directly across the two leads of the resistor — positive probe to the junction between ammeter and resistor, negative probe to the junction between resistor and the negative rail. A voltmeter must always be connected in parallel (high internal impedance) so it draws negligible current and does not disturb the circuit.',
          circuitStepIndex: 5,
        },
        {
          label: 'Record zero reading and energise circuit',
          body: 'With the supply voltage set to its minimum (0 V), switch on the power supply. Confirm that both meters read zero (or very close to zero). This step validates that there are no offsets or loose connections before measurements begin. If the ammeter shows a non-zero reading with the supply at zero, check for a wiring error.',
          circuitStepIndex: 5,
        },
        {
          label: 'Vary supply voltage and record readings',
          body: 'Slowly increase the DC supply in steps of approximately 1 V from 1 V to 10 V. At each step, wait for the readings to stabilise, then record the ammeter reading (I in mA) and the voltmeter reading (V in volts) in the observation table. Avoid touching the resistor body — it may become warm — and do not exceed the resistor\'s power rating (P = V²/R ≤ 0.25 W).',
          circuitStepIndex: 5,
        },
        {
          label: 'Repeat with second resistor',
          body: 'Replace the 1 kΩ resistor with the second resistor of different value (e.g., 2.2 kΩ) and repeat the measurements for the same set of voltage steps. Having two data sets allows comparison of slopes and reinforces that R is a material/geometry property independent of the applied voltage.',
          circuitStepIndex: 5,
        },
        {
          label: 'Plot V-I graph and calculate slope',
          body: 'On graph paper (or a spreadsheet), plot voltage V (Y-axis, in volts) against current I (X-axis, in mA). Draw the best-fit straight line through the data points. Calculate the slope ΔV/ΔI for each resistor. Convert mA to A before computing the slope so that the result is in ohms. Compare the experimental R with the nominal value and compute the percentage error.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "Record the voltage across the resistor and the corresponding current through it for each supply setting. Ensure the ammeter is on the correct range to avoid overloading. The ratio V/I should remain approximately constant, confirming Ohm's Law.",
      ],
      table: {
        headers: ['S.No.', 'Supply Voltage (V)', 'Voltmeter Reading V (V)', 'Ammeter Reading I (mA)', 'R = V/I (kΩ)'],
        rows: [
          [1, 1.0, 0.99, 0.99, 1.00],
          [2, 2.0, 1.98, 1.98, 1.00],
          [3, 3.0, 2.97, 2.97, 1.00],
          [4, 4.0, 3.96, 3.96, 1.00],
          [5, 5.0, 4.95, 4.95, 1.00],
          [6, 6.0, 5.94, 5.94, 1.00],
          [7, 7.0, 6.93, 6.93, 1.00],
          [8, 8.0, 7.92, 7.92, 1.00],
          [9, 9.0, 8.91, 8.91, 1.00],
          [10, 10.0, 9.90, 9.90, 1.00],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The experiment successfully verifies Ohm's Law. The V-I graph obtained is a straight line passing through the origin, confirming that the voltage across the resistor is directly proportional to the current through it at constant temperature.",
        "The slope of the V-I graph gives the resistance R of the conductor. The experimental value of R is in close agreement with the nominal value marked on the resistor, with a percentage error typically within the tolerance band (±5%).",
        "Any deviation from linearity or from the expected slope can be attributed to contact resistance at the breadboard terminals, instrument inaccuracies, or slight heating of the resistor at higher currents. Overall, the results confirm the validity of Ohm's Law for ohmic resistors under the given conditions.",
      ],
    },
  ],
};
