import { type Experiment } from '@/experiments/types';

export const PnJunctionDiode: Experiment = {
  id: 'pn-junction-diode',
  title: 'V-I characteristics of PN junction diode',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Plot the voltage-current characteristic of a 1N4148 diode in both forward and reverse bias. Determine threshold voltage and dynamic resistance.',
    tags: ['diode', 'pn junction', 'forward bias', 'reverse bias', 'characteristics'],
  },
  metaTitle: 'V-I characteristics of PN junction diode — VLabs',
  metaDescription: 'Plot the voltage-current characteristic of a 1N4148 diode in both forward and reverse bias. Determine threshold voltage and dynamic resistance.',
  circuit: {
  id: 'pn-junction-diode',
  title: 'PN Junction Diode',
  description:
    'Demonstrates the V-I characteristics of a PN junction diode. ' +
    'A 470 Ω current-limiting resistor protects the diode (modelled as a yellow LED). ' +
    'Blue voltmeter probes across the diode measure the forward voltage drop (~0.7 V for Si).',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 470, mountedAt: { board: 'bb', col: 5, row: 'c' } },
    { id: 'diode', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── VCC rail → R1 left lead ───────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 right lead → diode anode ───────────────────────────────────────
    { id: 'w_r1_diode', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'diode', end: 'anode' } },

    // ── Diode cathode → GND rail ──────────────────────────────────────────
    { id: 'w_diode_gnd', type: 'wire', color: 'black',
      from: { led: 'diode', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── Voltmeter probes across diode (blue) ──────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { led: 'diode', end: 'anode' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { led: 'diode', end: 'cathode' },
      to:   { board: 'bb', col: 11, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. Red rails = VCC, blue rails = GND. ' +
        'We will build a simple series circuit to study the PN junction diode characteristics.',
      show: ['bb'],
    },
    {
      title: 'Place the 470 Ω resistor',
      body: 'Insert the 470 Ω current-limiting resistor at cols 5–8, row c. ' +
        'Colour bands: Yellow-Violet-Brown = 470 Ω. ' +
        'This protects the diode from excessive current.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the diode (LED stand-in)',
      body: 'Insert the yellow LED at cols 10–11, row c. ' +
        'It represents a silicon PN junction diode. Anode at col 10, cathode at col 11.',
      show: ['bb', 'r1', 'diode'],
      highlight: 'diode',
    },
    {
      title: 'Wire VCC to resistor',
      body: 'Red wire: VCC rail (col 5) → R1 left lead (p1). ' +
        'This provides the forward-bias supply voltage.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1'],
    },
    {
      title: 'Wire resistor to diode',
      body: 'Orange wire: R1 right lead (p2) → diode anode (col 10). ' +
        'Current flows through the resistor into the diode.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1', 'w_r1_diode'],
    },
    {
      title: 'Wire diode to GND',
      body: 'Black wire: diode cathode (col 11) → GND rail. ' +
        'The series circuit is now complete: VCC → R1 → Diode → GND.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1', 'w_r1_diode', 'w_diode_gnd'],
    },
    {
      title: 'Add voltmeter probes across diode',
      body: 'Blue wires: voltmeter probes across the diode (col 10 row a and col 11 row a). ' +
        'In forward bias the voltage drop is ~0.7 V for silicon. ' +
        'Vary the supply to trace the V-I characteristic curve.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1', 'w_r1_diode', 'w_diode_gnd', 'w_vm_pos', 'w_vm_neg'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A PN junction diode is formed by joining a P-type semiconductor (excess holes) with an N-type semiconductor (excess electrons). At the junction, electrons and holes recombine to form a depletion region with a built-in potential barrier of approximately 0.6–0.7 V for silicon.',
        'In forward bias, the external positive voltage reduces the depletion barrier. When the applied voltage exceeds the threshold (V_th ≈ 0.6–0.7 V for silicon), current rises exponentially: I = I_s(e^(qV/nkT) − 1). In reverse bias, only a tiny leakage current (I_s, the reverse saturation current) flows until the breakdown voltage is reached.',
        'The V-I characteristic curve has three distinct regions: forward bias (exponential rise beyond V_th), reverse bias (near-zero leakage current), and reverse breakdown (sharp rise in current at V_BR). The 1N4148 silicon diode has V_th ≈ 0.65 V, reverse leakage < 25 nA, and V_BR = 75 V.',
        'The dynamic resistance r_d = dV/dI at any operating point on the forward characteristic equals nkT/qI, which decreases as current increases — meaning the diode becomes a better conductor as current rises. At room temperature, kT/q ≈ 26 mV, so at I = 1 mA, r_d ≈ 26 Ω.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: '1N4148 Silicon Diode', specification: 'V_BR = 75 V, I_F = 200 mA', quantity: '1' },
        { name: 'Resistor 470 Ω', specification: '¼ W, series current-limiter', quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '0–12 V variable, 1 A', quantity: '1' },
        { name: 'Digital Multimeter (×2)', specification: 'One for voltage, one for current', quantity: '2' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the forward-bias circuit.',
          circuitStepIndex: 5,
          body: 'Connect the power supply positive terminal → 470 Ω series resistor → diode anode. Connect diode cathode → power supply negative terminal (GND). Place Voltmeter 1 across the diode (anode to cathode). Place Ammeter in series (between resistor and anode). Set supply to 0 V.',
        },
        {
          label: 'Record forward V-I data points.',
          circuitStepIndex: 6,
          body: 'Slowly increase the supply voltage in steps of 0.1 V from 0 to 1.0 V. At each step, record the diode voltage V_D (voltmeter reading) and current I (ammeter reading). Note that current remains near zero until V_D ≈ 0.5 V, then rises sharply. Continue until current reaches ~20 mA (or supply limit). Record at least 15 data points.',
        },
        {
          label: 'Plot the forward characteristic.',
          circuitStepIndex: 6,
          body: 'On graph paper, plot V_D (x-axis, 0–1.0 V) versus I (y-axis, 0–25 mA). The curve should show a knee at approximately 0.6–0.65 V and then a steep near-linear rise. Draw a tangent to the steep region and calculate the dynamic resistance: r_d = ΔV/ΔI. Compare with the theoretical r_d = 26/I_mA (in ohms).',
        },
        {
          label: 'Rebuild for reverse-bias measurement.',
          circuitStepIndex: 6,
          body: 'Reverse the diode in the circuit — connect the cathode to the supply positive terminal and the anode to GND through the resistor. Place the voltmeter across the diode. Increase supply from 0 to 10 V in 1 V steps. Record the tiny leakage current (µA range — switch the ammeter to µA mode). Note that current stays essentially flat until breakdown voltage (not reached with 1N4148 at 10 V).',
        },
        {
          label: 'Plot reverse characteristic and combine.',
          circuitStepIndex: 6,
          body: 'Plot the reverse-bias region on the same graph with the x-axis extended to −10 V. The reverse current should be flat near zero (< 1 µA). Draw the complete V-I characteristic combining forward and reverse data. Identify: threshold voltage V_th, forward operating region, and reverse leakage region.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Diode: 1N4148. Series resistor: 470 Ω. Supply variable from 0–10 V.',
        'Threshold voltage V_th (forward): approximately 0.62–0.65 V.',
        'Maximum forward current tested: ~15 mA at V_supply = 8 V.',
        'Reverse leakage current at −10 V: < 1 µA (below DMM resolution).',
      ],
      table: {
        headers: ['V_supply (V)', 'V_D (V)', 'I_D (mA)', 'Region'],
        rows: [
          [0.0, 0.00, 0.00, 'Cut-off'],
          [0.5, 0.49, 0.00, 'Cut-off'],
          [1.0, 0.62, 0.80, 'Forward active'],
          [2.0, 0.66, 2.85, 'Forward active'],
          [5.0, 0.69, 9.17, 'Forward active'],
          [8.0, 0.71, 15.5, 'Forward active'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The V-I characteristics of the 1N4148 PN junction diode were successfully plotted for both forward and reverse bias conditions. The forward characteristic exhibited the expected exponential rise beyond the threshold voltage of approximately 0.65 V, confirming the Shockley diode equation.',
        'The dynamic resistance calculated from the slope of the forward characteristic was consistent with the theoretical value r_d = nkT/qI. In reverse bias, the leakage current was below the multimeter resolution, confirming the blocking behaviour of a reverse-biased junction.',
        'This experiment establishes a clear understanding of diode non-linearity, the threshold voltage concept, and the difference between ideal and real diode behaviour — fundamentals essential for rectifier, clipping, and clamping circuit design.',
      ],
    },
  ],
};
