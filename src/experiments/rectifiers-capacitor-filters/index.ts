import { type Experiment } from '@/experiments/types';

export const RectifiersCapacitorFilters: Experiment = {
  id: 'rectifiers-capacitor-filters',
  title: 'Rectifiers with capacitor filters',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Add capacitor filters of varying values to a full-wave rectifier. Observe and quantify ripple reduction as a function of capacitance.',
    tags: ['rectifier', 'filter', 'capacitor', 'ripple reduction'],
  },
  metaTitle: 'Rectifiers with capacitor filters — VLabs',
  metaDescription: 'Add capacitor filters of varying values to a full-wave rectifier. Observe and quantify ripple reduction as a function of capacitance.',
  circuit: {
  id: 'rectifiers-capacitor-filters',
  title: 'Rectifiers with Capacitor Filters',
  description:
    'A half-wave rectifier with a smoothing capacitor. The diode (yellow LED) rectifies AC, ' +
    'and the 100 µF capacitor filters the pulsating DC into a smoother output. ' +
    'The 1 kΩ load draws current while the capacitor maintains voltage between peaks.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'diode',  type: 'led', color: 'yellow',      mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r_load', type: 'resistor', ohms: 1000,       mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'c1',     type: 'capacitor', capacitance: 100, mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── VCC rail → diode anode ────────────────────────────────────────────
    { id: 'w_vcc_diode', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { led: 'diode', end: 'anode' } },

    // ── Diode cathode → R_load p1 ────────────────────────────────────────
    { id: 'w_diode_rload', type: 'wire', color: 'orange',
      from: { led: 'diode', end: 'cathode' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → GND rail ─────────────────────────────────────────────
    { id: 'w_rload_gnd', type: 'wire', color: 'black',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── Capacitor: junction (col 10, row d) → capacitor p1 ───────────────
    { id: 'w_junc_cap', type: 'wire', color: 'green',
      from: { board: 'bb', col: 10, row: 'd' },
      to:   { component: 'c1', end: 'p1' } },

    // ── Capacitor p2 → GND rail ──────────────────────────────────────────
    { id: 'w_cap_gnd', type: 'wire', color: 'black',
      from: { component: 'c1', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 18 } },

    // ── Voltmeter probes across R_load (blue) ────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p1' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', col: 13, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a half-wave rectifier with a smoothing capacitor filter.',
      show: ['bb'],
    },
    {
      title: 'Place the diode',
      body: 'Insert the yellow LED (diode stand-in) at cols 5–6, row c. ' +
        'It passes only positive half-cycles to the load.',
      show: ['bb', 'diode'],
      highlight: 'diode',
    },
    {
      title: 'Place the 1 kΩ load resistor',
      body: 'Insert R_load (1 kΩ) at cols 10–13, row c. This is the load that draws current.',
      show: ['bb', 'diode', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Place the 100 µF filter capacitor',
      body: 'Insert the 100 µF capacitor at cols 15–18, row c. ' +
        'It stores charge during peaks and releases during valleys, smoothing the output.',
      show: ['bb', 'diode', 'r_load', 'c1'],
      highlight: 'c1',
    },
    {
      title: 'Wire the rectifier path',
      body: 'Red wire: VCC → diode anode. Orange wire: diode cathode → R_load p1. ' +
        'Black wire: R_load p2 → GND. Current path established.',
      show: ['bb', 'diode', 'r_load', 'c1', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd'],
    },
    {
      title: 'Wire the capacitor filter',
      body: 'Green wire: load junction (col 10 row d) → capacitor p1. ' +
        'Black wire: capacitor p2 → GND rail. The capacitor is in parallel with the load.',
      show: ['bb', 'diode', 'r_load', 'c1',
        'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd',
        'w_junc_cap', 'w_cap_gnd'],
    },
    {
      title: 'Add voltmeter probes',
      body: 'Blue wires: probe voltage across R_load (col 10 and col 13, row a). ' +
        'With the capacitor, the output ripple is significantly reduced compared to unfiltered rectification.',
      show: ['bb', 'diode', 'r_load', 'c1',
        'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd',
        'w_junc_cap', 'w_cap_gnd',
        'w_vm_pos', 'w_vm_neg'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A capacitor filter connected in parallel with the load of a rectifier reduces the AC ripple in the output. During the conduction period, the diode charges the capacitor to near the peak voltage. Between conduction periods, the capacitor discharges slowly through the load, maintaining the output voltage between peaks.',
        'The ripple voltage for a full-wave rectifier with a capacitor filter is approximately V_r = I_L / (2 f C), where I_L is the load current, f is the AC frequency, and C is the filter capacitance. The ripple factor γ = V_r(rms) / V_dc ≈ 1 / (2√3 f R_L C). Larger capacitance or larger load resistance gives lower ripple.',
        'The peak inverse voltage (PIV) across the non-conducting diodes increases when a filter capacitor is used. For a half-wave rectifier with a filter, PIV = 2V_m (the capacitor retains peak voltage while the transformer reverses). For a full-wave bridge rectifier, PIV remains V_m per diode regardless of the filter capacitor.',
        'Increasing C improves ripple at the cost of higher peak diode current (the capacitor charges in a short burst). The ratio of peak to average diode current increases with larger C, which must be within the diode\'s rated surge current. Practical designs use C values of 100–10,000 µF in mains-frequency power supplies.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: '1N4007 Rectifier Diode', specification: 'PIV 1000 V, 1 A', quantity: '4' },
        { name: 'Step-down Transformer', specification: '230 V / 9 V, 500 mA', quantity: '1' },
        { name: 'Load Resistor R_L', specification: '1 kΩ, ¼ W', quantity: '1' },
        { name: 'Filter Capacitors', specification: '10 µF, 47 µF, 220 µF, 1000 µF (25 V each)', quantity: '1 each' },
        { name: 'CRO / Oscilloscope', specification: '20 MHz dual channel', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'DC voltage measurement', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up full-wave bridge, observe no-filter output.',
          circuitStepIndex: 4,
          body: 'Assemble the full-wave bridge rectifier with four 1N4007 diodes and R_L = 1 kΩ. Do not connect any capacitor. Connect CRO Channel 2 across R_L. Note the pulsating DC waveform (ripple = 100 Hz). Measure V_avg with the DMM and V_ripple_pp with the CRO. Record as "No Filter" baseline.',
        },
        {
          label: 'Add 10 µF filter capacitor.',
          circuitStepIndex: 5,
          body: 'Connect a 10 µF electrolytic capacitor (positive lead to DC+) in parallel with R_L. Observe the CRO waveform — ripple should decrease noticeably but still be visible. Measure V_avg (DMM) and V_ripple_pp (CRO). Note that V_avg rises slightly (capacitor holds peak). Record results.',
        },
        {
          label: 'Replace with 47 µF, then 220 µF, then 1000 µF.',
          circuitStepIndex: 6,
          body: 'Repeat with 47 µF: lower ripple, higher V_avg. Then 220 µF: even lower ripple. Then 1000 µF: very low ripple — V_out nearly flat DC close to V_m. At each capacitor value, measure V_avg and V_ripple_pp, and calculate the ripple factor γ = (V_ripple_pp / 2√3) / V_avg. Record all in the observation table.',
        },
        {
          label: 'Plot ripple factor vs capacitance.',
          circuitStepIndex: 6,
          body: 'On graph paper, plot C (x-axis, logarithmic scale: 10, 47, 220, 1000 µF) versus ripple factor γ (y-axis). The curve should decrease approximately as 1/C, confirming the theoretical relationship γ ≈ 1/(2√3 f R_L C). Draw the theoretical curve for comparison.',
        },
        {
          label: 'Observe peak diode current with large C.',
          circuitStepIndex: 6,
          body: 'With 1000 µF installed, observe on the CRO that the rectified output shows very short but tall charging pulses (the brief moments the diode conducts to top up the capacitor). These represent high peak currents. This is why large filter capacitors require diodes with high surge-current ratings. Note the pulse width and estimate peak current.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Transformer: 9 V RMS, 50 Hz. R_L = 1 kΩ. Bridge rectifier (4× 1N4007).',
        'Theoretical V_avg (no filter) = 2V_m/π − 1.4 ≈ 7.65 V. Theoretical γ (no filter) = 0.48.',
        'With filter: γ_theory = 1 / (2√3 × f × R_L × C). At 1000 µF: γ = 1/(2×1.73×100×1000×10⁻⁶) ≈ 0.003.',
      ],
      table: {
        headers: ['Filter C', 'V_avg (V)', 'V_ripple_pp (mV)', 'Ripple Factor γ'],
        rows: [
          ['No filter',  '7.6',  '9100',  '0.48'],
          ['10 µF',      '9.5',  '1800',  '0.095'],
          ['47 µF',      '11.0', '380',   '0.020'],
          ['220 µF',     '11.8', '82',    '0.004'],
          ['1000 µF',    '12.2', '18',    '0.0009'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The effect of filter capacitance on ripple reduction was clearly demonstrated. Increasing the capacitor value from 10 µF to 1000 µF reduced the ripple voltage from approximately 1800 mV to 18 mV peak-to-peak, and the ripple factor from 0.095 to 0.0009 — a 100× improvement.',
        'The average output voltage also increased with larger capacitance, approaching the peak value V_m as the capacitor better sustains the output between charging pulses. The observed relationship γ ∝ 1/C confirmed the theoretical model quantitatively.',
        'The trade-off between ripple reduction and peak diode current was observed: with a 1000 µF capacitor, the diode conducted only in short bursts of high current to recharge the capacitor. This experiment establishes the design methodology for capacitor-input power supply filters used in virtually all electronic equipment.',
      ],
    },
  ],
};
