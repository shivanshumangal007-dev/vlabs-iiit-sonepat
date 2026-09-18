import { type Experiment } from '@/experiments/types';

export const TheveninTheorem: Experiment = {
  id: 'thevenin-theorem',
  title: '',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Electronics and Electrical',
    description: "Find the Thevenin equivalent (V_th and R_th) of a two-terminal DC network and verify that it delivers the same current to any load as the original circuit.",
    tags: ['thevenin', 'equivalent circuit', 'V_th', 'R_th'],
  },
  metaTitle: ' — VLabs',
  metaDescription: "Find the Thevenin equivalent (V_th and R_th) of a two-terminal DC network and verify that it delivers the same current to any load as the original circuit.",
  circuit: {
  id: 'thevenin-theorem',
  title: 'Thevenin Theorem',
  description:
    'Demonstrates Thevenin\'s theorem by reducing a two-resistor network to its Thevenin equivalent. ' +
    'VCC drives R1 (1 kΩ) and R2 (2.2 kΩ) in a voltage divider. Node A feeds a 1 kΩ load. ' +
    'V_th = VCC × R2/(R1+R2) and R_th = R1‖R2 predict the load voltage and current.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Network resistors ─────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── Load and indicator ────────────────────────────────────────────────
    { id: 'r_load', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'led1',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 20, row: 'c' } },

    // ── VCC → R1 p1 ──────────────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 p2 → node A (col 8, row c) ────────────────────────────────────
    { id: 'w_r1_nodeA', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── Node A → R2 p1 ───────────────────────────────────────────────────
    { id: 'w_nodeA_r2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'd' },
      to:   { component: 'r2', end: 'p1' } },

    // ── R2 p2 → GND rail ─────────────────────────────────────────────────
    { id: 'w_r2_gnd', type: 'wire', color: 'black',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── Node A → R_load p1 ───────────────────────────────────────────────
    { id: 'w_nodeA_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'b' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → LED anode ────────────────────────────────────────────
    { id: 'w_rload_led', type: 'wire', color: 'green',
      from: { component: 'r_load', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND ────────────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 21 } },

    // ── Voltmeter probes at node A (blue) ────────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 8, row: 'a' },
      to:   { board: 'bb', col: 7, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { board: 'bb', rail: 'gnd_top', col: 8 },
      to:   { board: 'bb', col: 9, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a resistive network and verify Thevenin\'s theorem.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ)',
      body: 'Insert R1 (1 kΩ) at cols 5–8, row c. This connects VCC to node A.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ)',
      body: 'Insert R2 (2.2 kΩ) at cols 10–13, row c. This connects node A to GND, ' +
        'forming a voltage divider with R1.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place the load resistor',
      body: 'Insert R_load (1 kΩ) at cols 15–18, row c. Connected from node A, ' +
        'it draws current from the Thevenin equivalent source.',
      show: ['bb', 'r1', 'r2', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Place the indicator LED',
      body: 'Insert the green LED at cols 20–21, row c. Its brightness indicates load current.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire VCC to R1 and R1 to node A',
      body: 'Red wire: VCC → R1 p1. Orange wire: R1 p2 → node A (col 8).',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1', 'w_vcc_r1', 'w_r1_nodeA'],
    },
    {
      title: 'Wire node A to R2 and R2 to GND',
      body: 'Orange wire: node A (col 8 row d) → R2 p1. Black wire: R2 p2 → GND rail. ' +
        'The voltage divider is complete.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_nodeA', 'w_nodeA_r2', 'w_r2_gnd'],
    },
    {
      title: 'Wire load path',
      body: 'Green wires: node A (col 8 row b) → R_load p1, R_load p2 → LED anode. ' +
        'Black wire: LED cathode → GND.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_nodeA', 'w_nodeA_r2', 'w_r2_gnd',
        'w_nodeA_rload', 'w_rload_led', 'w_led_gnd'],
    },
    {
      title: 'Add voltmeter probes at node A',
      body: 'Blue wires: voltmeter probes measure V_th at node A. ' +
        'V_th = VCC × 2200/(1000+2200) ≈ 3.44 V. R_th = 1000‖2200 ≈ 687 Ω. ' +
        'Load voltage = V_th × R_load/(R_th + R_load).',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_nodeA', 'w_nodeA_r2', 'w_r2_gnd',
        'w_nodeA_rload', 'w_rload_led', 'w_led_gnd',
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
        "Thevenin's Theorem states that any linear two-terminal network containing independent sources and resistances can be replaced by an equivalent circuit consisting of a single voltage source V_th (Thevenin voltage) in series with a single resistance R_th (Thevenin resistance). V_th is the open-circuit voltage at the output terminals and R_th is the equivalent resistance seen from those terminals with all independent sources killed (voltage sources replaced by short circuits, current sources by open circuits).",
        'The theorem dramatically simplifies the analysis of circuits with varying loads. Instead of re-solving the entire network for every load value, one computes V_th and R_th once, then attaches the load to the simple Thevenin equivalent. The load current is then I_L = V_th / (R_th + R_L) and the load voltage is V_L = I_L × R_L — both trivially obtained from a simple voltage-divider calculation.',
        'Finding V_th experimentally: remove the load R_L, connect a high-impedance voltmeter across the output terminals, and read the open-circuit voltage. Finding R_th experimentally: with the load still removed, kill all independent sources (short the voltage supply), and measure the resistance at the output terminals with an ohmmeter. Alternatively, measure the short-circuit current I_sc and compute R_th = V_th / I_sc.',
        'In this experiment V_th and R_th are found both theoretically (using circuit analysis) and experimentally (using measurements). The Thevenin equivalent circuit is then reconstructed on the breadboard and the load voltages/currents for two different load values are compared with predictions from the equivalent circuit to verify the theorem.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–15 V, 1 A', quantity: '1' },
        { name: 'Resistor R1', specification: '1 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R2', specification: '2.2 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R3 (Load)', specification: '3.3 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R4 (Second Load)', specification: '4.7 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'Voltage & resistance measurement', quantity: '2' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the original network',
          body: 'Connect R1 (1 kΩ) in series with R2 (2.2 kΩ), forming a series branch between the positive supply terminal (9 V) and ground. The output terminals A-B are defined at the junction of R1 and R2 (terminal A) and ground (terminal B). R3 will later be the load connected across A-B. At this stage leave A-B open (no load connected).',
          circuitStepIndex: 7,
        },
        {
          label: 'Measure V_th (open-circuit voltage)',
          body: 'With the load terminals A-B open, connect the voltmeter across A-B. Switch on the supply. The voltmeter reads the open-circuit voltage V_oc = V_th. For the R1–R2 voltage divider this should be V_th = V_s × R2 / (R1 + R2). Record the measured value and compare with the theoretical calculation.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure R_th (Thevenin resistance)',
          body: 'Switch off and disconnect the supply. Replace the supply with a short-circuit jumper to kill the voltage source. Using the ohmmeter function of the multimeter, measure the resistance between terminals A and B. With the supply shorted, R1 and R2 appear in parallel from the A-B perspective: R_th = R1 ‖ R2 = (R1×R2)/(R1+R2). Record the measured R_th and compare with the theoretical value.',
          circuitStepIndex: 8,
        },
        {
          label: 'Build the Thevenin equivalent and test with R_L = R3',
          body: 'Restore the supply. Build the Thevenin equivalent separately on another part of the breadboard: connect a series combination of a voltage source set to V_th (measured value) and a resistor equal to R_th (use the nearest standard value). Connect load R3 (3.3 kΩ) across the output of this equivalent circuit. Measure the load voltage V_L and load current I_L. Compare these with the load voltage measured on the original circuit under identical conditions.',
          circuitStepIndex: 8,
        },
        {
          label: 'Repeat verification with R_L = R4',
          body: 'Replace R3 with R4 (4.7 kΩ) in both the original circuit and the Thevenin equivalent. Measure V_L and I_L in each case. The readings from the original network and the equivalent should match within ±2%. Record both sets of readings. This confirms that the Thevenin equivalent is valid for any load value — not just one specific load.',
          circuitStepIndex: 8,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "Tabulated below are the open-circuit voltage, Thevenin resistance, and load measurements for the original circuit versus the Thevenin equivalent circuit.",
      ],
      table: {
        headers: ['Parameter', 'Theoretical Value', 'Measured Value', 'Error (%)'],
        rows: [
          ['V_th (V)', 6.19, 6.15, 0.65],
          ['R_th (kΩ)', 0.688, 0.695, 1.02],
          ['V_L with R3=3.3kΩ (Original) (V)', 5.12, 5.09, 0.59],
          ['V_L with R3=3.3kΩ (Thevenin) (V)', 5.12, 5.11, 0.20],
          ['V_L with R4=4.7kΩ (Original) (V)', 5.44, 5.41, 0.55],
          ['V_L with R4=4.7kΩ (Thevenin) (V)', 5.44, 5.42, 0.37],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "Thevenin's Theorem is verified. The open-circuit voltage V_th and the equivalent resistance R_th were determined both theoretically and experimentally, and the values agree within 1%.",
        'The load voltages measured on the original multi-element network match those measured on the simple Thevenin equivalent circuit for both load values tested. The maximum discrepancy is 0.6%, which is within the tolerance of the components and instruments used.',
        "This experiment demonstrates the practical utility of Thevenin's Theorem: any complex linear network driving a variable load can be condensed into a single-source, single-resistor equivalent, making load-line analysis, power calculations, and impedance matching straightforward.",
      ],
    },
  ],
};
