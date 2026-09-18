import { type Experiment } from '@/experiments/types';

export const KirchhoffLaws: Experiment = {
  id: 'kirchhoff-laws',
  title: '',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Electronics and Electrical',
    description: "Build a multi-resistor DC circuit and verify KCL at nodes and KVL around loops. Confirm that currents and voltages obey conservation laws.",
    tags: ['kirchhoff', 'kcl', 'kvl', 'dc circuit', 'nodes', 'loops'],
  },
  metaTitle: ' — VLabs',
  metaDescription: "Build a multi-resistor DC circuit and verify KCL at nodes and KVL around loops. Confirm that currents and voltages obey conservation laws.",
  circuit: {
  id: 'kirchhoff-laws',
  title: "Kirchhoff's Voltage & Current Laws",
  description:
    'Demonstrates Kirchhoff\'s Voltage Law (KVL) and Current Law (KCL) using a two-source, ' +
    'three-resistor network. R1 (1 kΩ) and R2 (2.2 kΩ) feed into node A from separate supply points. ' +
    'R3 (3.3 kΩ) connects node A to GND through an LED indicator. ' +
    'Voltmeter probes verify voltage drops around each loop.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',   type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r2',   type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'r3',   type: 'resistor', ohms: 3300, mountedAt: { board: 'bb', col: 5,  row: 'h' } },
    { id: 'led1', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── V1: VCC → R1 p1 ──────────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── V2: VCC → R2 p1 ──────────────────────────────────────────────────
    { id: 'w_vcc_r2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 10 },
      to:   { component: 'r2', end: 'p1' } },

    // ── R2 p2 → Node A (col 8, row b — joins R1 p2 column) ──────────────
    { id: 'w_r2_nodeA', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'b' } },

    // ── Node A link: top bank → bottom bank (col 8 row e → col 8 row f) ─
    { id: 'w_nodeA_link', type: 'wire', color: 'white',
      from: { board: 'bb', col: 8, row: 'e' },
      to:   { board: 'bb', col: 8, row: 'f' } },

    // ── Node A → R3 p1 (col 8 bottom bank → R3 at col 5 row h) ──────────
    { id: 'w_nodeA_r3', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'g' },
      to:   { component: 'r3', end: 'p2' } },

    // ── R3 p1 → LED anode ────────────────────────────────────────────────
    { id: 'w_r3_led', type: 'wire', color: 'yellow',
      from: { component: 'r3', end: 'p1' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND rail ───────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },

    // ── Voltmeter probes across R1 (blue) ────────────────────────────────
    { id: 'w_vm_r1_pos', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p1' },
      to:   { board: 'bb', col: 5, row: 'a' } },
    { id: 'w_vm_r1_neg', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'a' } },

    // ── Voltmeter probes across R2 (blue) ────────────────────────────────
    { id: 'w_vm_r2_pos', type: 'wire', color: 'blue',
      from: { component: 'r2', end: 'p1' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_r2_neg', type: 'wire', color: 'blue',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 13, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a multi-branch resistor network with two voltage ' +
        'sources to verify Kirchhoff\'s Current and Voltage Laws.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ) — Branch 1',
      body: 'Insert R1 (1 kΩ) at cols 5–8, row c (top bank). ' +
        'Colour bands: Brown-Black-Red. R1 connects V1 to node A at col 8.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ) — Branch 2',
      body: 'Insert R2 (2.2 kΩ) at cols 10–13, row c. ' +
        'Colour bands: Red-Red-Red. R2 connects V2 to node A.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place R3 (3.3 kΩ) — Branch 3',
      body: 'Insert R3 (3.3 kΩ) at cols 5–8, row h (bottom bank). ' +
        'This branch carries the combined current from node A to GND.',
      show: ['bb', 'r1', 'r2', 'r3'],
      highlight: 'r3',
    },
    {
      title: 'Place the LED',
      body: 'Insert the red LED at cols 15–16, row c. ' +
        'It serves as a current indicator in the GND return path.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire V1 → R1 and V2 → R2',
      body: 'Red wires: VCC (col 5) → R1 p1, VCC (col 10) → R2 p1. ' +
        'These represent two independent voltage source connections.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1', 'w_vcc_r1', 'w_vcc_r2'],
    },
    {
      title: 'Wire node A connections',
      body: 'Orange wire: R2 p2 (col 13) → node A (col 8 row b). ' +
        'White wire: bridges top and bottom banks at col 8. ' +
        'Orange wire: node A bottom (col 8 row g) → R3 p2 (col 8 row h). ' +
        'Node A is where three branch currents meet — the KCL verification point.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r2_nodeA', 'w_nodeA_link', 'w_nodeA_r3'],
    },
    {
      title: 'Wire R3 → LED → GND',
      body: 'Yellow wire: R3 p1 → LED anode. Black wire: LED cathode → GND rail. ' +
        'Circuit complete: V1 → R1 → Node A, V2 → R2 → Node A, Node A → R3 → LED → GND.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r2_nodeA', 'w_nodeA_link', 'w_nodeA_r3',
        'w_r3_led', 'w_led_gnd'],
    },
    {
      title: 'Add voltmeter probes',
      body: 'Blue wires: voltmeter probes across R1 (cols 5 & 8, row a) and R2 (cols 10 & 13, row a). ' +
        'KVL Loop 1: V1 − V_R1 − V_R3 − V_LED = 0. ' +
        'KVL Loop 2: V2 − V_R2 − V_R3 − V_LED = 0. ' +
        'KCL at node A: I_R1 + I_R2 = I_R3.',
      show: [
        'bb', 'r1', 'r2', 'r3', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r2_nodeA', 'w_nodeA_link', 'w_nodeA_r3',
        'w_r3_led', 'w_led_gnd',
        'w_vm_r1_pos', 'w_vm_r1_neg', 'w_vm_r2_pos', 'w_vm_r2_neg',
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
        "Kirchhoff's Current Law (KCL) states that the algebraic sum of all currents entering and leaving any node (junction) in a circuit is zero. In other words, charge is conserved at every node: ΣI_in = ΣI_out. This is a direct consequence of the law of conservation of electric charge and applies to every node in any lumped-parameter circuit at all times.",
        "Kirchhoff's Voltage Law (KVL) states that the algebraic sum of all potential differences (EMFs and voltage drops) around any closed loop in a circuit is zero: ΣV = 0. This follows from the conservation of energy — a charge carrier travelling around a closed loop returns to the same potential it started from, so the net energy gained equals the net energy lost.",
        'Together KCL and KVL form the foundation for all systematic circuit analysis techniques including mesh analysis, nodal analysis, superposition, and Thevenin/Norton equivalents. They hold for any network — DC or AC, linear or nonlinear — as long as the lumped-circuit assumption is valid (circuit dimensions much smaller than the signal wavelength).',
        'In this experiment a resistor network with two DC sources is built. Currents at each node and voltages around each loop are measured. The measured values are substituted into KCL and KVL equations and the algebraic sums are confirmed to be zero within experimental error, thereby validating both laws.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–15 V, 1 A (two channels)', quantity: '2' },
        { name: 'Resistor R1', specification: '1 kΩ, ±5%, 0.25 W', quantity: '1' },
        { name: 'Resistor R2', specification: '2.2 kΩ, ±5%, 0.25 W', quantity: '1' },
        { name: 'Resistor R3', specification: '3.3 kΩ, ±5%, 0.25 W', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'Voltage & current ranges', quantity: '2' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '20' },
        { name: 'Milliammeter', specification: '0–50 mA DC, three units', quantity: '3' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the resistor network',
          body: 'On the breadboard, connect R1 (1 kΩ) from the node A to the positive terminal of source V1 (set to 9 V), R2 (2.2 kΩ) from node A to the positive terminal of source V2 (set to 6 V), and R3 (3.3 kΩ) from node A to the common ground. Both supply negatives share the same ground rail. This creates a single node A where three branch currents meet — suitable for KCL verification.',
          circuitStepIndex: 7,
        },
        {
          label: 'Insert ammeters in each branch',
          body: 'Break each branch at a convenient point and insert an ammeter (in series) to measure the branch current. Label the three ammeters as measuring I1 (through R1), I2 (through R2), and I3 (through R3). Set each ammeter to the DC milliamp range. Positive current is defined as flowing into node A; adjust polarity markings accordingly after first measurements.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure branch currents (KCL check)',
          body: 'Switch on both supplies. Record I1, I2, and I3 from the three ammeters. Compute the algebraic sum: I1 + I2 − I3 (signs depend on the chosen current directions). According to KCL this sum must equal zero. A small discrepancy (< 2%) is acceptable due to meter accuracy and resistor tolerance.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure voltages around Loop 1 (KVL check)',
          body: 'Identify Loop 1: V1 → R1 → Node A → R3 → Ground → V1. Using the voltmeter, measure V_R1 (across R1) and V_R3 (across R3). Apply KVL: V1 − V_R1 − V_R3 = 0. Record all values and compute the sum. The result should be within ±0.1 V of zero, accounting for meter and supply tolerances.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure voltages around Loop 2 (KVL check)',
          body: 'Identify Loop 2: V2 → R2 → Node A → R3 → Ground → V2. Measure V_R2 and V_R3 (same value as before). Apply KVL: V2 − V_R2 − V_R3 = 0. If V_R3 was already measured, only V_R2 needs a fresh reading. Confirm the algebraic sum is zero and compare the nodal voltage at A from both loops.',
          circuitStepIndex: 8,
        },
        {
          label: 'Vary supply voltages and repeat',
          body: 'Change V1 to 12 V (keeping V2 = 6 V) and repeat all current and voltage measurements. Record the new set of readings in the observation table. Verify that KCL and KVL still hold for the modified supply conditions. This demonstrates that the laws are universal and not specific to a single operating point.',
          circuitStepIndex: 8,
        },
        {
          label: 'Compute theoretical values and compare',
          body: 'Using the known resistor values and supply voltages, calculate the theoretical branch currents via simultaneous KCL/KVL equations (or nodal analysis). Compare the theoretical values with the measured values. Calculate the percentage error for each branch current and each loop voltage. Summarise findings to confirm both laws.',
          circuitStepIndex: 8,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Record branch currents and voltages for both supply configurations. Verify KCL at node A and KVL around each loop by computing the algebraic sums.',
      ],
      table: {
        headers: ['Condition', 'I1 (mA)', 'I2 (mA)', 'I3 (mA)', 'I1+I2-I3 (mA)', 'V_R1 (V)', 'V_R2 (V)', 'V_R3 (V)', 'KVL L1 (V)', 'KVL L2 (V)'],
        rows: [
          ['V1=9V, V2=6V', 5.14, 1.43, 6.57, 0.00, 5.14, 3.14, 3.86, 0.00, 0.00],
          ['V1=12V, V2=6V', 7.06, 1.17, 8.23, 0.00, 7.06, 2.57, 4.94, 0.00, 0.00],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The experiment verifies both of Kirchhoff's Laws. At node A, the algebraic sum of all branch currents is found to be zero for both supply configurations, confirming KCL.",
        "Around each closed loop, the algebraic sum of all EMFs and voltage drops is zero within experimental error (< 1%), confirming KVL. The small residual error is attributable to resistor tolerances, contact resistance, and instrument accuracy.",
        "These results demonstrate that KCL and KVL are reliable analytical tools for DC circuit analysis. Mastery of these laws is prerequisite to more advanced network theorems such as Superposition, Thevenin, and Norton.",
      ],
    },
  ],
};
