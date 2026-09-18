import { type Experiment } from '@/experiments/types';

export const CeAmplifier: Experiment = {
  id: 'ce-amplifier',
  title: 'Common Emitter amplifier',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Design, build and characterise a BC547 common-emitter amplifier. Measure voltage gain, input/output impedance, and frequency response.',
    tags: ['bjt', 'amplifier', 'common emitter', 'frequency response', 'gain'],
  },
  metaTitle: 'Common Emitter amplifier — VLabs',
  metaDescription: 'Design, build and characterise a BC547 common-emitter amplifier. Measure voltage gain, input/output impedance, and frequency response.',
  circuit: {
  id: 'ce-amplifier',
  title: 'Common-Emitter (CE) Amplifier',
  description:
    'A single-stage common-emitter amplifier using an NPN transistor (BC547) with voltage-divider bias. ' +
    'R1 (100 kΩ) and R2 (10 kΩ) set the base operating point, Rc (4.7 kΩ) is the collector load, and Re (1 kΩ) provides emitter degeneration. ' +
    'An LED on the collector output indicates signal activity. Visual/analog only — no digital simulation.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Transistor ──────────────────────────────────────────────────────────
    { id: 'q1', type: 'npn-bjt', mountedAt: { board: 'bb', col: 7, row: 'e' } },

    // ── Bias resistors (voltage divider) ────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 100_000, mountedAt: { board: 'bb', col: 3, row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 10_000,  mountedAt: { board: 'bb', col: 3, row: 'h' } },

    // ── Collector & emitter resistors ───────────────────────────────────────
    { id: 'rc', type: 'resistor', ohms: 4_700, mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 're', type: 'resistor', ohms: 1_000, mountedAt: { board: 'bb', col: 10, row: 'h' } },

    // ── Output LED (collector indicator) ────────────────────────────────────
    { id: 'led_out', type: 'led', color: 'red', mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── Power wires ─────────────────────────────────────────────────────────
    // VCC → R1 (top of divider)
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r1', end: 'p1' } },

    // R2 → GND (bottom of divider)
    { id: 'w_r2_gnd', type: 'wire', color: 'black',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 6 } },

    // R1 → base (R1.p2 → Q1.B)
    { id: 'w_r1_base', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { ic: 'q1', pin: 'B' } },

    // R2 → base (R2.p1 → Q1.B) — shares base node with R1
    { id: 'w_r2_base', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p1' },
      to:   { ic: 'q1', pin: 'B' } },

    // VCC → Rc (collector load)
    { id: 'w_vcc_rc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 10 },
      to:   { component: 'rc', end: 'p1' } },

    // Rc → collector (Rc.p2 → Q1.C)
    { id: 'w_rc_col', type: 'wire', color: 'green',
      from: { component: 'rc', end: 'p2' },
      to:   { ic: 'q1', pin: 'C' } },

    // Emitter → Re (Q1.E → Re.p1)
    { id: 'w_em_re', type: 'wire', color: 'yellow',
      from: { ic: 'q1', pin: 'E' },
      to:   { component: 're', end: 'p1' } },

    // Re → GND
    { id: 'w_re_gnd', type: 'wire', color: 'black',
      from: { component: 're', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // Collector → LED (output indicator)
    { id: 'w_col_led', type: 'wire', color: 'green',
      from: { component: 'rc', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },

    // LED cathode → GND
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. Red rails = VCC (+12 V), blue rails = GND (0 V). ' +
        'The centre gap separates the top bank (rows a–e) from the bottom bank (rows f–j).',
      show: ['bb'],
    },
    {
      title: 'Place the bias resistors (voltage divider)',
      body: 'R1 (100 kΩ) at col 3, row c (top bank) and R2 (10 kΩ) at col 3, row h (bottom bank). ' +
        'Together they form a voltage divider that sets the DC bias point at the transistor base. ' +
        'V_base ≈ VCC × R2/(R1+R2) = 12 × 10/110 ≈ 1.09 V.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r1',
    },
    {
      title: 'Place collector and emitter resistors',
      body: 'Rc (4.7 kΩ) at col 10, row c — the collector load that develops the output voltage swing. ' +
        'Re (1 kΩ) at col 10, row h — emitter degeneration that stabilises the operating point. ' +
        'Voltage gain ≈ −Rc/Re ≈ −4.7.',
      show: ['bb', 'r1', 'r2', 'rc', 're'],
      highlight: 'rc',
    },
    {
      title: 'Place the NPN transistor (BC547)',
      body: 'Mount Q1 at col 7, row e straddling the centre gap. ' +
        'Pins: Base (B), Collector (C), Emitter (E). ' +
        'The CE configuration is the most common amplifier topology — it provides voltage gain with 180° phase inversion.',
      show: ['bb', 'r1', 'r2', 'rc', 're', 'q1'],
      highlight: 'q1',
    },
    {
      title: 'Add the output LED',
      body: 'Red LED at col 15, row c. It sits on the collector node and indicates output activity. ' +
        'When the transistor conducts, current flows through Rc and the collector voltage drops — the LED brightness varies with signal amplitude.',
      show: ['bb', 'r1', 'r2', 'rc', 're', 'q1', 'led_out'],
      highlight: 'led_out',
    },
    {
      title: 'Wire all connections',
      body: 'Red wires: VCC → R1 (bias top), VCC → Rc (collector supply). ' +
        'Orange wires: R1 and R2 both connect to the transistor base. ' +
        'Green wire: Rc → collector, and Rc → LED anode. ' +
        'Yellow wire: emitter → Re. ' +
        'Black wires: R2 → GND, Re → GND, LED cathode → GND. ' +
        'Circuit complete — the amplifier is biased and ready.',
      show: [
        'bb', 'r1', 'r2', 'rc', 're', 'q1', 'led_out',
        'w_vcc_r1', 'w_r2_gnd', 'w_r1_base', 'w_r2_base',
        'w_vcc_rc', 'w_rc_col', 'w_em_re', 'w_re_gnd',
        'w_col_led', 'w_led_gnd',
      ],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The common-emitter (CE) amplifier is the most widely used BJT amplifier configuration because it provides both voltage and current gain with 180° phase inversion. The transistor is biased in the active region using a voltage-divider bias network (R1, R2) for stability. The collector resistor R_C converts collector current changes into output voltage variations.',
        'The DC operating point (Q-point) is set by V_B = V_CC × R2/(R1 + R2), V_E = V_B − 0.7, I_E ≈ I_C = V_E/R_E. The AC voltage gain (with bypass capacitor C_E across R_E) is A_v = −g_m × R_C || R_L, where g_m = I_C / V_T (V_T = 26 mV at room temperature). The negative sign indicates phase inversion.',
        'Three coupling/bypass capacitors are used: C_1 (input coupling, blocks DC from the signal source), C_2 (output coupling, blocks DC from the load), and C_E (emitter bypass, short-circuits R_E at AC frequencies to maximise gain). Their values are chosen so that their reactance is negligible at the operating frequency.',
        'The frequency response of the CE amplifier has a mid-band region where gain is maximum and flat, a low-frequency roll-off (due to coupling and bypass capacitors), and a high-frequency roll-off (due to transistor junction capacitances). The bandwidth is defined as the frequency range between the upper and lower −3 dB points.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: 'BC547 NPN Transistor', specification: 'TO-92, β ≈ 200–400', quantity: '1' },
        { name: 'R1 Bias Resistor', specification: '100 kΩ, ¼ W', quantity: '1' },
        { name: 'R2 Bias Resistor', specification: '10 kΩ, ¼ W', quantity: '1' },
        { name: 'R_C Collector Resistor', specification: '4.7 kΩ, ¼ W', quantity: '1' },
        { name: 'R_E Emitter Resistor', specification: '1 kΩ, ¼ W', quantity: '1' },
        { name: 'C_1, C_2 Coupling Caps', specification: '10 µF / 25 V electrolytic', quantity: '2' },
        { name: 'C_E Bypass Capacitor', specification: '47 µF / 25 V electrolytic', quantity: '1' },
        { name: 'Load Resistor R_L', specification: '10 kΩ, ¼ W', quantity: '1' },
        { name: 'Regulated DC Supply', specification: '+12 V, 500 mA', quantity: '1' },
        { name: 'Function Generator', specification: '1 Hz – 1 MHz, sine wave', quantity: '1' },
        { name: 'CRO / Oscilloscope', specification: '20 MHz dual channel', quantity: '1' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Calculate the DC Q-point.',
          circuitStepIndex: 0,
          body: 'Using V_CC = 12 V, R1 = 100 kΩ, R2 = 10 kΩ, R_C = 4.7 kΩ, R_E = 1 kΩ: V_B = 12 × 10/(100+10) ≈ 1.09 V. V_E = 1.09 − 0.7 = 0.39 V. I_E ≈ 0.39/1000 ≈ 0.39 mA. V_CE = 12 − I_C(R_C + R_E) ≈ 12 − 0.39×5.7 ≈ 9.78 V. Verify the transistor is in active region (V_CE > V_CE_sat ≈ 0.2 V).',
        },
        {
          label: 'Assemble the CE amplifier circuit.',
          circuitStepIndex: 4,
          body: 'Place BC547 on the breadboard (flat face facing you: E-B-C from left to right). Connect R1 from VCC to base, R2 from base to GND, R_C from VCC to collector, R_E from emitter to GND. Connect bypass capacitor C_E across R_E. Connect coupling capacitors C_1 at the input (between signal source and base) and C_2 at the output (between collector and R_L). Apply +12 V supply.',
        },
        {
          label: 'Verify DC Q-point with DMM.',
          circuitStepIndex: 5,
          body: 'With no AC signal applied, use the DMM to measure: V_B (base to GND), V_E (emitter to GND), V_C (collector to GND). Calculate V_CE = V_C − V_E and I_C = (V_CC − V_C) / R_C. Compare with your theoretical Q-point. If V_CE < 1 V, the transistor is saturated — check connections and resistor values.',
        },
        {
          label: 'Apply signal and observe voltage gain.',
          circuitStepIndex: 5,
          body: 'Connect the function generator to the input (C_1). Set f = 1 kHz, amplitude = 10 mV peak-to-peak sine wave. Connect CRO Channel 1 at the input and Channel 2 at the output (across R_L). Observe that the output is an inverted (180° phase-shifted) amplified version of the input. Measure V_in and V_out (both peak-to-peak) and calculate A_v = V_out / V_in.',
        },
        {
          label: 'Plot the frequency response.',
          circuitStepIndex: 5,
          body: 'Keeping V_in constant at 10 mV pp, vary the frequency from 100 Hz to 100 kHz in decades (100 Hz, 200, 500, 1k, 2k, 5k, 10k, 20k, 50k, 100k Hz). Record V_out at each frequency and calculate gain A_v = V_out/V_in. Convert to dB: A_v(dB) = 20 log₁₀(A_v). Plot frequency (log scale) vs gain (dB). Identify the mid-band gain, lower −3 dB frequency, and upper −3 dB frequency.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Transistor BC547, β ≈ 220. V_CC = 12 V. R1=100kΩ, R2=10kΩ, R_C=4.7kΩ, R_E=1kΩ.',
        'Theoretical Q-point: V_B≈1.09 V, V_E≈0.39 V, I_C≈0.39 mA, V_CE≈9.8 V.',
        'Theoretical mid-band gain: A_v = −g_m × (R_C || R_L) = −(0.39/26) × (4700 || 10000) ≈ −44 (≈ 33 dB).',
      ],
      table: {
        headers: ['Frequency (Hz)', 'V_in (mV pp)', 'V_out (mV pp)', 'Gain A_v', 'Gain (dB)'],
        rows: [
          [100, 10, '—', '—', '—'],
          [1000, 10, '—', '—', '—'],
          [10000, 10, '—', '—', '—'],
          [100000, 10, '—', '—', '—'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The common-emitter BJT amplifier was successfully assembled and characterised. The DC Q-point measured closely matched the theoretical calculations, confirming proper biasing in the active region. The 180° phase inversion between input and output — a defining characteristic of the CE configuration — was clearly observed on the oscilloscope.',
        'The mid-band voltage gain measured at 1 kHz agreed with the theoretical value within measurement error. The frequency response plot revealed the expected low-frequency roll-off (due to coupling and bypass capacitors) and the high-frequency roll-off (due to transistor junction capacitances).',
        'This experiment established the fundamentals of transistor biasing, small-signal amplification, and AC frequency response — core topics in analog electronics applicable to audio amplifiers, sensor signal conditioning, and RF circuits.',
      ],
    },
  ],
};
