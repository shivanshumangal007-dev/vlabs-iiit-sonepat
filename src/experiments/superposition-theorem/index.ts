import { type Experiment } from '@/experiments/types';

export const SuperpositionTheorem: Experiment = {
  id: 'superposition-theorem',
  title: 'Superposition Theorem',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Electronics and Electrical',
    description: "Demonstrate that the response of a linear circuit with multiple independent sources equals the sum of responses from each source acting alone.",
    tags: ['superposition', 'linear circuit', 'multiple sources', 'dc network'],
  },
  metaTitle: 'Superposition Theorem — VLabs',
  metaDescription: "Demonstrate that the response of a linear circuit with multiple independent sources equals the sum of responses from each source acting alone.",
  circuit: {
  id: 'superposition-theorem',
  title: 'Superposition Theorem',
  description:
    'Demonstrates the superposition theorem: the response in any branch of a linear circuit ' +
    'with multiple sources equals the algebraic sum of responses due to each source acting alone. ' +
    'Two voltage sources feed R1 (1 kΩ) and R2 (2.2 kΩ) to a common node with a 3.3 kΩ load.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',     type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 3,  row: 'c' } },
    { id: 'r2',     type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'r_load', type: 'resistor', ohms: 3300, mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'led1',   type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── Source 1: VCC → R1 p1 ─────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r1', end: 'p1' } },

    // ── Source 2: VCC → R2 p1 ─────────────────────────────────────────────
    { id: 'w_vcc_r2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 1 },
      to:   { component: 'r2', end: 'p1' } },

    // ── R1 p2 → junction (col 8, row c) ──────────────────────────────────
    { id: 'w_r1_junc', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── R2 p2 → junction (col 8, row h → col 8, row d via column) ───────
    { id: 'w_r2_junc', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'h' } },

    // ── Junction link top ↔ bottom bank ──────────────────────────────────
    { id: 'w_junc_link', type: 'wire', color: 'white',
      from: { board: 'bb', col: 8, row: 'd' },
      to:   { board: 'bb', col: 8, row: 'g' } },

    // ── Junction → R_load p1 ─────────────────────────────────────────────
    { id: 'w_junc_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'b' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → LED anode ────────────────────────────────────────────
    { id: 'w_rload_led', type: 'wire', color: 'green',
      from: { component: 'r_load', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND rail ───────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a circuit with two voltage sources to demonstrate superposition.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ) — Source 1 path',
      body: 'Insert R1 (1 kΩ) at cols 3–6, row c (top bank). ' +
        'This carries current from the first voltage source.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ) — Source 2 path',
      body: 'Insert R2 (2.2 kΩ) at cols 3–6, row h (bottom bank). ' +
        'This carries current from the second voltage source.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place R_load and LED',
      body: 'Insert R_load (3.3 kΩ) at cols 10–13, row c. Red LED at cols 15–16, row c. ' +
        'LED brightness indicates the combined current from both sources.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1'],
      highlight: 'r_load',
    },
    {
      title: 'Wire both sources to resistors',
      body: 'Red wires: VCC (col 3) → R1 p1, VCC (col 1) → R2 p1. ' +
        'Two independent source connections.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1', 'w_vcc_r1', 'w_vcc_r2'],
    },
    {
      title: 'Wire resistors to junction',
      body: 'Orange wires: R1 p2 → junction (col 8 row c), R2 p2 → junction (col 8 row h). ' +
        'White wire bridges top and bottom banks at col 8.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r1_junc', 'w_r2_junc', 'w_junc_link'],
    },
    {
      title: 'Wire junction to load path',
      body: 'Green wires: junction → R_load p1, R_load p2 → LED anode. ' +
        'Black wire: LED cathode → GND.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r1_junc', 'w_r2_junc', 'w_junc_link',
        'w_junc_rload', 'w_rload_led', 'w_led_gnd'],
    },
    {
      title: 'Verify superposition',
      body: 'To verify: (1) Remove Source 2 (short R2), measure I_load due to Source 1 only. ' +
        '(2) Remove Source 1, measure due to Source 2 only. ' +
        '(3) Sum equals the total measured with both active.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r1_junc', 'w_r2_junc', 'w_junc_link',
        'w_junc_rload', 'w_rload_led', 'w_led_gnd'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The Superposition Theorem states that in any linear bilateral network containing more than one independent source, the current through or voltage across any element is equal to the algebraic sum of the currents or voltages produced by each independent source acting alone, with all other independent sources replaced by their internal impedances (voltage sources short-circuited, current sources open-circuited).',
        'The theorem is valid for any linear circuit because the principle of superposition — a direct consequence of linearity — guarantees that the response of a linear system to multiple simultaneous inputs equals the sum of the responses to each input applied independently. Non-linear elements such as diodes and transistors (when not linearised around a Q-point) do not satisfy superposition.',
        'Practical procedure: (1) Kill all sources except one. A voltage source is "killed" by replacing it with a short circuit (wire) — because an ideal voltage source has zero internal resistance. A current source is killed by replacing it with an open circuit — because an ideal current source has infinite internal resistance. (2) Analyse the simplified circuit to find the partial response. (3) Repeat for each independent source. (4) Sum all partial responses algebraically to obtain the total response.',
        'This experiment uses a two-source resistor network. The current through the load resistor R3 is measured with both sources active, then individually (killing the other source), and the algebraic sum of the two partial currents is compared with the total measured current to verify the theorem.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–15 V, 1 A (two channels)', quantity: '2' },
        { name: 'Resistor R1', specification: '1 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R2', specification: '2.2 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R3 (Load)', specification: '3.3 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'Voltage & current measurement', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
        { name: 'Short-circuit Link', specification: 'Jumper wire for killing voltage source', quantity: '2' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Assemble two-source circuit',
          body: 'Connect R1 between the positive terminal of V1 (9 V) and a central node N. Connect R2 between the positive terminal of V2 (6 V) and the same node N. Connect the load R3 from node N to the common ground. Both supply negatives share the ground rail. Insert the ammeter in series with R3 to measure the load current I_total. Record the reading.',
          circuitStepIndex: 6,
        },
        {
          label: 'Kill V2 — analyse due to V1 alone',
          body: 'Switch off supply V2. Replace V2 with a short-circuit jumper (connect its positive terminal directly to ground) to simulate zero internal resistance. Re-energise V1. Measure the current I_R3_V1 through R3. This is the partial response due to V1 acting alone. Record the reading including sign/direction.',
          circuitStepIndex: 7,
        },
        {
          label: 'Kill V1 — analyse due to V2 alone',
          body: 'Restore V2 and now kill V1: switch off V1 and replace it with a short-circuit jumper. Re-energise V2. Measure the current I_R3_V2 through R3. Carefully note the direction of the current — it may oppose I_R3_V1. Assign appropriate signs: positive if in the same direction as I_total, negative if opposing.',
          circuitStepIndex: 7,
        },
        {
          label: 'Apply superposition and compare',
          body: 'Compute the superposition result: I_super = I_R3_V1 + I_R3_V2 (with signs). Compare I_super with I_total measured in Step 1. The percentage error should be less than 2%. If a larger discrepancy is observed, check that the short-circuit jumper replacement was performed correctly and that the resistor values are accurate.',
          circuitStepIndex: 7,
        },
        {
          label: 'Verify voltage across R3 by superposition',
          body: 'Repeat the entire procedure but measure voltages across R3 (V_R3) instead of current. Compute V_super = V_R3_V1 + V_R3_V2 and compare with the total voltage V_R3_total. This dual verification (both current and voltage) strengthens confidence in the theorem and also confirms that V = IR holds consistently for the load resistor throughout.',
          circuitStepIndex: 7,
        },
        {
          label: 'Tabulate and calculate theoretical values',
          body: 'Calculate theoretical values of I_R3_V1 and I_R3_V2 using series-parallel resistor analysis or the voltage divider rule for each single-source sub-circuit. Compare the theoretical partial currents with the measured ones and record the percentage error in the observation table.',
          circuitStepIndex: 7,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Measured values of load current under each condition are tabulated below. The algebraic sum of individual contributions should equal the total response.',
      ],
      table: {
        headers: ['Condition', 'I_R3 Measured (mA)', 'I_R3 Theoretical (mA)', 'Error (%)'],
        rows: [
          ['Both sources active (I_total)', 3.21, 3.24, 0.93],
          ['V1 alone (I_R3_V1)', 2.45, 2.47, 0.81],
          ['V2 alone (I_R3_V2)', 0.76, 0.77, 1.30],
          ['Superposition sum I_R3_V1 + I_R3_V2', 3.21, 3.24, 0.93],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The Superposition Theorem is verified. The algebraic sum of the partial load currents (V1 acting alone and V2 acting alone) equals the total load current when both sources are active simultaneously, within the experimental error of less than 1.5%.",
        'The small discrepancy between the superposition sum and the directly measured total is due to resistor tolerances and contact resistances at the breadboard terminals. These errors are well within the ±5% tolerance band of the components used.',
        'This theorem is a powerful circuit analysis tool: by reducing a multi-source problem into a series of single-source problems, complex networks become tractable. The result also confirms the linearity of the resistor network under the test conditions.',
      ],
    },
  ],
};
