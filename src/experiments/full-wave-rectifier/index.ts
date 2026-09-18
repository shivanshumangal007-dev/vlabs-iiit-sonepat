import { type Experiment } from '@/experiments/types';

export const FullWaveRectifier: Experiment = {
  id: 'full-wave-rectifier',
  title: 'Full-wave rectifier',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Build a bridge rectifier using four 1N4007 diodes. Compare output frequency, average voltage, and ripple factor with the half-wave rectifier.',
    tags: ['rectifier', 'bridge', 'full-wave', 'ripple'],
  },
  metaTitle: 'Full-wave rectifier — VLabs',
  metaDescription: 'Build a bridge rectifier using four 1N4007 diodes. Compare output frequency, average voltage, and ripple factor with the half-wave rectifier.',
  circuit: {
  id: 'full-wave-rectifier',
  title: 'Full-Wave Bridge Rectifier',
  description:
    'A full-wave bridge rectifier using four diodes (modelled as yellow LEDs). ' +
    'Both positive and negative half-cycles are rectified to produce a smoother pulsating DC. ' +
    'A 1 kΩ load resistor and green output LED indicate the rectified output.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Bridge diodes (yellow LEDs) ───────────────────────────────────────
    { id: 'd1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'd2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 5,  row: 'h' } },
    { id: 'd3', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'd4', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'h' } },

    // ── Load resistor and output LED ──────────────────────────────────────
    { id: 'r_load',   type: 'resistor', ohms: 1000,  mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'led_out',  type: 'led', color: 'green',   mountedAt: { board: 'bb', col: 20, row: 'c' } },

    // ── VCC → d1 anode ────────────────────────────────────────────────────
    { id: 'w_vcc_d1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { led: 'd1', end: 'anode' } },

    // ── d1 cathode → top DC+ node (col 8, row b) ─────────────────────────
    { id: 'w_d1_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd1', end: 'cathode' },
      to:   { board: 'bb', col: 8, row: 'b' } },

    // ── d3 anode → top DC+ node ───────────────────────────────────────────
    { id: 'w_d3_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd3', end: 'anode' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── d3 cathode → GND ──────────────────────────────────────────────────
    { id: 'w_d3_gnd', type: 'wire', color: 'black',
      from: { led: 'd3', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── VCC → d2 anode (bottom bank, other half-cycle) ───────────────────
    { id: 'w_vcc_d2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { led: 'd2', end: 'anode' } },

    // ── d2 cathode → bottom DC+ node (col 8, row i) ──────────────────────
    { id: 'w_d2_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd2', end: 'cathode' },
      to:   { board: 'bb', col: 8, row: 'i' } },

    // ── d4 anode → bottom DC+ node ───────────────────────────────────────
    { id: 'w_d4_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd4', end: 'anode' },
      to:   { board: 'bb', col: 8, row: 'h' } },

    // ── d4 cathode → GND ─────────────────────────────────────────────────
    { id: 'w_d4_gnd', type: 'wire', color: 'black',
      from: { led: 'd4', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── DC+ node → R_load p1 ─────────────────────────────────────────────
    { id: 'w_dcplus_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'a' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → output LED anode ─────────────────────────────────────
    { id: 'w_rload_led', type: 'wire', color: 'green',
      from: { component: 'r_load', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },

    // ── Output LED cathode → GND ─────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 21 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a full-wave bridge rectifier using four diodes.',
      show: ['bb'],
    },
    {
      title: 'Place bridge diodes (d1, d2)',
      body: 'Insert d1 (col 5, row c, top bank) and d2 (col 5, row h, bottom bank). ' +
        'These form the left arm of the bridge.',
      show: ['bb', 'd1', 'd2'],
      highlight: 'd1',
    },
    {
      title: 'Place bridge diodes (d3, d4)',
      body: 'Insert d3 (col 10, row c, top bank) and d4 (col 10, row h, bottom bank). ' +
        'These form the right arm of the bridge.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4'],
      highlight: 'd3',
    },
    {
      title: 'Place load resistor and output LED',
      body: 'Insert R_load (1 kΩ) at col 15 row c and the green output LED at col 20 row c. ' +
        'The LED indicates rectified DC output.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out'],
      highlight: 'r_load',
    },
    {
      title: 'Wire VCC to bridge inputs',
      body: 'Red wires: VCC → d1 anode (col 5) and VCC → d2 anode (col 3). ' +
        'AC input feeds both arms of the bridge.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2'],
    },
    {
      title: 'Wire bridge internal connections',
      body: 'Orange wires connect diode outputs to DC+ junction nodes (col 8). ' +
        'Both half-cycles produce current at the same polarity at the DC+ node.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2',
        'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus'],
    },
    {
      title: 'Wire GND connections',
      body: 'Black wires: d3 cathode → GND, d4 cathode → GND. ' +
        'Completes the return path for both half-cycles.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2',
        'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus',
        'w_d3_gnd', 'w_d4_gnd'],
    },
    {
      title: 'Wire load and output LED',
      body: 'Green wires: DC+ node → R_load → output LED. Black wire: LED cathode → GND. ' +
        'The green LED lights on both half-cycles, confirming full-wave rectification.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2',
        'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus',
        'w_d3_gnd', 'w_d4_gnd',
        'w_dcplus_rload', 'w_rload_led', 'w_led_gnd'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A full-wave rectifier converts both positive and negative half-cycles of AC into pulsating DC, doubling the output frequency compared to a half-wave rectifier. Two configurations exist: the centre-tap full-wave rectifier (using two diodes and a centre-tapped transformer) and the bridge rectifier (using four diodes and any transformer secondary).',
        'In the bridge configuration, four diodes (D1–D4) are arranged in a bridge. During the positive AC half-cycle, D1 and D3 conduct; during the negative half-cycle, D2 and D4 conduct. In both cases, current through the load resistor flows in the same direction, producing a full-wave rectified output. The output frequency is twice the input frequency: f_out = 2 × f_in = 100 Hz.',
        'The average DC output voltage of an ideal full-wave bridge rectifier is V_avg = 2V_m/π ≈ 0.637V_m. With two diode drops (each ≈ 0.7 V for silicon), the practical value is V_avg = (2V_m − 1.4)/π. The ripple factor γ = √((π²/8) − 1) ≈ 0.482, which is much better than the half-wave value of 1.21.',
        'A filter capacitor in parallel with the load reduces ripple to γ_C ≈ 1/(2√3 × f × R_L × C). Increasing capacitance or load resistance reduces ripple. A larger capacitor also increases the peak diode current during charging, so practical designs balance ripple reduction against diode current stress.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: '1N4007 Rectifier Diode', specification: 'PIV 1000 V, I_F 1 A', quantity: '4' },
        { name: 'Step-down Transformer', specification: '230 V / 9 V, 500 mA', quantity: '1' },
        { name: 'Load Resistor R_L', specification: '1 kΩ, ¼ W', quantity: '1' },
        { name: 'Filter Capacitor', specification: '47 µF / 25 V electrolytic', quantity: '1' },
        { name: 'CRO / Oscilloscope', specification: '20 MHz dual channel', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'AC/DC voltage measurement', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the bridge rectifier (no filter).',
          circuitStepIndex: 3,
          body: 'Arrange four 1N4007 diodes in a bridge on the breadboard. Label the four corners: AC1, AC2 (transformer inputs), DC+ (cathodes of D1, D2 meeting), DC− (anodes of D3, D4 meeting). Connect the AC transformer secondary across AC1 and AC2. Connect R_L = 1 kΩ between DC+ and DC−. Do not connect filter capacitor yet.',
        },
        {
          label: 'Observe the rectified output on CRO.',
          circuitStepIndex: 7,
          body: 'Connect CRO Channel 1 across the transformer secondary (AC input). Connect Channel 2 across R_L (DC output). Power on. Channel 1 shows a full sine wave. Channel 2 should show the full-wave rectified output — a series of positive half-sinusoids at 100 Hz (twice the 50 Hz input). Measure V_m (peak) and V_avg (DC) with the DMM.',
        },
        {
          label: 'Verify output frequency is 100 Hz.',
          circuitStepIndex: 7,
          body: 'On the CRO, set the timebase to 2 ms/div. Count the period of the rectified output. With a 50 Hz input, the rectified output period = 10 ms / 2 = 5 ms, confirming f_out = 100 Hz. Compare with Channel 1 (50 Hz, period = 20 ms). Record the ratio.',
        },
        {
          label: 'Add filter capacitor and observe smoothing.',
          circuitStepIndex: 7,
          body: 'Connect the 47 µF electrolytic capacitor in parallel with R_L (positive lead to DC+, negative to DC−). Observe Channel 2 on the CRO — the waveform should smooth out significantly. The residual ripple rides on top of the DC level. Measure V_avg and V_ripple_pp with the CRO and calculate the ripple factor.',
        },
        {
          label: 'Compare half-wave and full-wave rectification.',
          circuitStepIndex: 7,
          body: 'Remove two adjacent diodes from the bridge to convert it to a half-wave rectifier. Observe the output on the CRO — only every other half-cycle appears, and ripple doubles. Record V_avg and ripple for the half-wave configuration and tabulate the comparison. Restore all four diodes when done.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Transformer secondary: 9 V RMS, 50 Hz. V_m = √2 × 9 ≈ 12.73 V.',
        'Theoretical V_avg (full-wave, two drops) = (2 × 12.73 − 1.4) / π ≈ 7.65 V.',
        'Full-wave output frequency: 100 Hz (period = 5 ms).',
        'Ripple factor without filter (full-wave): 0.482.',
      ],
      table: {
        headers: ['Configuration', 'V_avg (V)', 'Ripple Factor γ', 'Output Frequency'],
        rows: [
          ['Half-wave, no filter',  '3.8', '1.21', '50 Hz'],
          ['Full-wave, no filter',  '7.6', '0.48', '100 Hz'],
          ['Full-wave, 47µF filter','8.2', '0.08', '100 Hz'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The full-wave bridge rectifier successfully converted both half-cycles of the 50 Hz AC input into pulsating DC at 100 Hz. The measured average output voltage agreed closely with the theoretical value, confirming the double-diode-drop deduction.',
        'Adding a 47 µF filter capacitor reduced the ripple factor from 0.48 to approximately 0.08, demonstrating effective smoothing. The full-wave configuration produced a higher average output and lower ripple factor than the half-wave rectifier, explaining why it is universally preferred in practical power supplies.',
        'This experiment bridges the gap between diode theory and power supply design. The bridge configuration, requiring no centre-tapped transformer, is the industry standard for mains-frequency rectification in virtually all electronic equipment.',
      ],
    },
  ],
};
