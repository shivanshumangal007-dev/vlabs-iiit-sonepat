import { type Experiment } from '@/experiments/types';
import { CB } from '@/labs/builder';

export const CbAmplifier: Experiment = {
  id: 'cb-amplifier',
  title: 'Common-Base Amplifier Characteristics',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Wire a BJT in common-base configuration and measure current gain (α), input/output impedance, and frequency response. Compare with CE stage.',
    tags: ['bjt', 'amplifier', 'common base', 'alpha', 'current gain'],
  },
  metaTitle: 'Common-Base Amplifier Characteristics — VLabs',
  metaDescription: 'Wire a BJT in common-base configuration and measure current gain (α), input/output impedance, and frequency response. Compare with CE stage.',
  circuit: new CB(
  'cb-amplifier',
  'Common-Base Amplifier Characteristics',
  'Study the input/output characteristics of a BC547 transistor in common-base configuration. ' +
  'Measure collector current IC vs VCB (output) and emitter current IE vs VEB (input).',
)
  .board()
  .psu('psu', [
    { board: 'bb', rail: 'vcc_top', col: 5 },
    { board: 'bb', rail: 'gnd_top', col: 5 },
  ])
  .dmm('dmm', [
    { board: 'bb', col: 8, row: 'c' },
    { board: 'bb', col: 8, row: 'd' },
  ])
  // ── Passive components ─────────────────────────────────────────────────
  .resistor('r_e', 1_000,   5,  'c')
  .resistor('r_c', 4_700,  10,  'c')
  .capacitor('c_in', 10,   15,  'c')
  .led('led_out', 'yellow', 20, 'c')

  // ── Ammeter wires (orange, in series on collector path) ────────────────
  .wire('w_amm_in',  'orange',
    { board: 'bb', rail: 'vcc_top', col: 5 },
    { board: 'bb', col: 8, row: 'd' })
  .wire('w_amm_out', 'orange',
    { board: 'bb', col: 8, row: 'c' },
    { component: 'r_c', end: 'p1' })

  // ── Power wires ────────────────────────────────────────────────────────
  // R_E: emitter bias — GND side of R_E
  .wireGnd('w_re_gnd', { component: 'r_e', end: 'p2' }, 7)

  // R_C collector path: ammeter out → R_C already wired above via w_amm_out
  // R_C → LED anode
  .wire('w_rc_led', 'green',
    { component: 'r_c', end: 'p2' },
    { led: 'led_out', end: 'anode' })

  // C_in: input coupling cap — left lead to R_E input node
  .wire('w_cin_re', 'blue',
    { component: 'r_e', end: 'p1' },
    { board: 'bb', col: 15, row: 'c' })

  // LED cathode → GND
  .wireLedToGnd('w_led_gnd', 'led_out', 21)

  // ── Steps ──────────────────────────────────────────────────────────────
  // Step 0
  .step('Place the breadboard',
    'The 830-point solderless breadboard is your build surface. Red rails = VCC (+9 V), ' +
    'blue rails = GND (0 V). The centre gap isolates rows a–e from f–j.')
    .show('bb')

  // Step 1
  .step('Connect the DC power supply',
    'Place the variable DC supply beside the breadboard. Red wire from supply (+) to VCC rail at ' +
    'col 5. Black wire from supply (−) to GND rail at col 5. Set supply to 0 V initially.')
    .show('psu')

  // Step 2
  .step('Connect the ammeter (DMM) in series',
    'Set the DMM to DC mA mode. Orange wire 1: VCC rail (col 5) → col 8 row d (ammeter input). ' +
    'Orange wire 2: col 8 row c → R_C input (col 10). All collector current flows through the ' +
    'ammeter — this directly measures I_C.')
    .show('dmm', 'w_amm_in', 'w_amm_out')

  // Step 3
  .step('Place the emitter resistor R_E (1 kΩ)',
    'Insert R_E (1 kΩ) at col 5–8, row c. Colour bands: Brown–Black–Red–Gold. ' +
    'This sets the emitter current: I_E ≈ V_E / R_E. The right lead connects to GND rail.')
    .show('r_e', 'w_re_gnd')
    .highlight('r_e')

  // Step 4
  .step('Place the collector resistor R_C (4.7 kΩ)',
    'Insert R_C (4.7 kΩ) at col 10–13, row c. Colour bands: Yellow–Violet–Red–Gold. ' +
    'The collector load converts I_C into output voltage: V_C = V_CC − I_C × R_C.')
    .show('r_c')
    .highlight('r_c')

  // Step 5
  .step('Place the input coupling capacitor C_in (10 µF)',
    'Insert C_in (10 µF electrolytic) at col 15, row c. Positive lead faces the input signal; ' +
    'it blocks DC from the signal source while passing AC into the emitter node. ' +
    'Wire from R_E input node (col 5) to C_in positive lead (col 15).')
    .show('c_in', 'w_cin_re')
    .highlight('c_in')

  // Step 6
  .step('Place the output indicator LED (yellow)',
    'Insert the yellow LED at col 20–21, row c. Anode (longer lead) at col 20, cathode at col 21. ' +
    'It sits on the collector output node and visualises I_C — brighter = higher collector current.')
    .show('led_out', 'w_led_gnd')
    .highlight('led_out')

  // Step 7
  .step('Wire R_C to LED anode',
    'Green wire: R_C right lead (col 13) → LED anode (col 20). ' +
    'The collector output path is now: VCC → ammeter → R_C → LED → GND. ' +
    'Also verify the base is connected to GND (common-base condition).')
    .show('w_rc_led')

  // Step 8
  .step('Power on and measure I_C vs V_CB',
    'Set V_CC = 9 V. Vary V_EB from 0 to 0.8 V in 0.1 V steps by adjusting the PSU. ' +
    'Record I_C (DMM) at each step. For output characteristics, fix V_EB = 0.65 V and ' +
    'sweep V_CB from 0 to 9 V. The LED glows proportional to I_C.')
    .show()
    .power({ Vcc: 1 })
    .supply(9.0)
    .reading('psu', '9.00 V')
    .reading('dmm', 'IC = 2.10 mA')
    .glow('led_out', 0.45)

  .build(),
  sections: [
    // ── THEORY ─────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'In the **common-base (CB) configuration** the base terminal is shared between the input and output circuits. '
        + 'The signal is applied between the emitter and base (input), and the output is taken between the collector and base. '
        + 'Unlike the common-emitter (CE) amplifier, CB provides no current gain — its key strength is very low input '
        + 'impedance ($r_e \\approx 26\\,\\text{mV}/I_E$) and a very high output impedance, making it ideal for '
        + 'impedance-matching applications and RF/VHF amplifiers.',

        'The current transfer ratio **alpha** is defined as:'
        + '$$\\alpha = \\frac{I_C}{I_E} \\approx 0.98\\text{–}0.999$$'
        + 'Since nearly all emitter current appears at the collector ($I_B$ is only 1–2 % of $I_E$), $\\alpha$ is close '
        + 'to unity. It relates to the more familiar $\\beta$ (CE current gain) by $\\alpha = \\beta/(1+\\beta)$. '
        + 'The small-signal voltage gain is $A_v = g_m R_C$ where $g_m = I_C / V_T$ (no minus sign — CB is non-inverting).',

        '**Input characteristics** ($I_E$ vs $V_{EB}$ at fixed $V_{CB}$): The emitter-base junction is forward biased, '
        + 'so $I_E$ rises exponentially above $V_{EB} \\approx 0.6\\,\\text{V}$ following the diode equation. '
        + 'Input resistance $r_{ib} = \\Delta V_{EB}/\\Delta I_E \\approx 1/g_m \\approx 26/I_C\\,\\Omega$ — very low, '
        + 'typically $10\\text{–}50\\,\\Omega$.',

        '**Output characteristics** ($I_C$ vs $V_{CB}$ at fixed $I_E$): Once $V_{CB}$ exceeds a small positive value '
        + '(collector-base junction reverse biased), $I_C \\approx \\alpha I_E$ stays essentially constant — the '
        + 'output characteristic is extremely flat compared with CE. The Early effect causes a very slight slope, '
        + 'indicating a very high output resistance $r_o > 1\\,\\text{M}\\Omega$. '
        + 'This flat characteristic and high $r_o$ make CB preferred for cascode stages and current-source loads.',
      ],
    },

    // ── APPARATUS ───────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',              specification: '830 tie-point, solderless',           quantity: '1' },
        { name: 'BC547 NPN Transistor',    specification: 'TO-92, $\\beta \\approx 200$',        quantity: '1' },
        { name: 'R_E Emitter Resistor',    specification: '$1\\,\\text{k}\\Omega$, ¼ W',         quantity: '1' },
        { name: 'R_C Collector Resistor',  specification: '$4.7\\,\\text{k}\\Omega$, ¼ W',       quantity: '1' },
        { name: 'C_in Coupling Capacitor', specification: '$10\\,\\mu\\text{F}$ / 25 V electrolytic', quantity: '1' },
        { name: 'DC Power Supply',         specification: '0–12 V variable, 500 mA',             quantity: '1' },
        { name: 'Digital Multimeter',      specification: 'DC voltage + DC mA modes',            quantity: '2' },
        { name: 'Breadboard wires',        specification: 'Red, black, orange, green, blue',     quantity: '1 set' },
        { name: 'LED (yellow)',            specification: '5 mm, $V_f \\approx 2.0\\,\\text{V}$', quantity: '1' },
      ],
    },

    // ── PROCEDURE ────────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard on the workbench.',
          circuitStepIndex: 0,
          body: 'Lay the 830-point breadboard flat. Identify the top red rail (VCC) and the top blue rail (GND). '
              + 'The two rows of five holes in each vertical column share an internal bus — remember the centre gap separates rows a–e from f–j.',
        },
        {
          label: 'Connect the DC power supply.',
          circuitStepIndex: 1,
          body: 'Place the variable DC supply to the left of the breadboard. '
              + '**Red wire**: PSU (+) terminal → VCC rail at col 5. '
              + '**Black wire**: PSU (−) terminal → GND rail at col 5. '
              + 'Keep supply voltage at 0 V until the circuit is complete.',
        },
        {
          label: 'Connect the DMM as an ammeter in series.',
          circuitStepIndex: 2,
          body: 'Set DMM to **DC mA** range (200 mA scale). '
              + '**Orange wire 1**: VCC rail (col 5) → col 8 row d (ammeter COM). '
              + '**Orange wire 2**: col 8 row c → R_C input (col 10 row c). '
              + 'The DMM now sits in series — all collector current $I_C$ passes through it.',
        },
        {
          label: 'Insert the emitter resistor R_E (1 kΩ) and connect to GND.',
          circuitStepIndex: 3,
          body: 'Insert R_E (1 kΩ, Brown–Black–Red–Gold) at col 5–8, row c. '
              + 'Connect a black wire from R_E right lead (col 8) to the GND rail at col 7. '
              + 'The emitter input signal enters through the coupling cap and develops $V_{EB}$ across R_E.',
        },
        {
          label: 'Insert the collector resistor R_C (4.7 kΩ).',
          circuitStepIndex: 4,
          body: 'Insert R_C (4.7 kΩ, Yellow–Violet–Red–Gold) at col 10–13, row c. '
              + 'Its left lead (col 10) connects to the ammeter output via the orange wire already in place. '
              + 'The voltage drop across R_C is $V_{R_C} = I_C \\times R_C$.',
        },
        {
          label: 'Insert the input coupling capacitor C_in (10 µF).',
          circuitStepIndex: 5,
          body: 'Insert the 10 µF electrolytic capacitor at col 15, row c — positive lead (longer) at col 15. '
              + 'Run a **blue wire** from col 5 row c (R_E left lead / emitter node) to col 15 row c (cap positive). '
              + 'C_in blocks DC from the signal generator while passing AC to the emitter.',
        },
        {
          label: 'Insert the output indicator LED (yellow).',
          circuitStepIndex: 6,
          body: 'Insert the yellow LED at col 20–21, row c — anode (longer lead) at col 20, cathode at col 21. '
              + 'Connect a **black wire**: cathode (col 21) → GND rail at col 21. '
              + 'The LED brightness will indicate collector current magnitude.',
        },
        {
          label: 'Wire R_C output to the LED anode.',
          circuitStepIndex: 7,
          body: '**Green wire**: R_C right lead (col 13) → LED anode (col 20). '
              + 'The collector output path is now complete: VCC → ammeter → R_C → LED → GND. '
              + 'Double-check all connections before applying power.',
        },
        {
          label: 'Power on and record input/output characteristics.',
          circuitStepIndex: 8,
          body: '**Input char ($I_E$ vs $V_{EB}$)**: Set $V_{CB} = 5\\,\\text{V}$ (fixed). '
              + 'Vary $V_{EB}$ from 0 to 0.8 V in 0.05 V steps; record $I_E$ (use second DMM at emitter node). '
              + '**Output char ($I_C$ vs $V_{CB}$)**: Fix $I_E = 2\\,\\text{mA}$. '
              + 'Sweep $V_{CB}$ from 0 to 9 V in 0.5 V steps; record $I_C$ on the series ammeter. '
              + 'Observe that $I_C \\approx \\alpha I_E \\approx 0.99 \\times I_E$ and remains nearly constant.',
        },
      ],
    },

    // ── OBSERVATIONS ────────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Transistor: BC547 NPN. $V_{CC} = 9\\,\\text{V}$. $R_E = 1\\,\\text{k}\\Omega$, $R_C = 4.7\\,\\text{k}\\Omega$.',
        'Measured $\\alpha = I_C / I_E \\approx 0.988$ (theoretical: $\\alpha = \\beta/(1+\\beta) = 200/201 \\approx 0.995$). '
        + 'Output characteristics are very flat for $V_{CB} > 0.5\\,\\text{V}$, confirming high output impedance.',
      ],
      table: {
        headers: ['$V_{EB}$ (V)', '$I_E$ (mA)', '$I_C$ (mA)', '$\\alpha = I_C/I_E$'],
        rows: [
          [0.50, '0.00', '0.00', '—'],
          [0.60, '0.28', '0.27', '0.964'],
          [0.65, '1.05', '1.04', '0.990'],
          [0.70, '2.10', '2.08', '0.990'],
          [0.75, '4.20', '4.15', '0.988'],
          [0.80, '7.60', '7.52', '0.989'],
        ],
      },
    },

    // ── CONCLUSION ──────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The common-base amplifier was successfully assembled and characterised. The input characteristic '
        + 'confirmed exponential $I_E$–$V_{EB}$ behaviour with threshold near $0.60\\,\\text{V}$, identical '
        + 'to a forward-biased silicon PN junction. The measured input resistance $r_{ib} \\approx 12\\,\\Omega$ '
        + 'at $I_E = 2\\,\\text{mA}$ is consistent with the theoretical $r_e = V_T/I_E = 26/2 = 13\\,\\Omega$.',

        'The output characteristics showed that $I_C$ is essentially independent of $V_{CB}$ once the '
        + 'collector junction is reverse biased — the flat curves verify the high output impedance of the CB '
        + 'stage. The measured current gain $\\alpha \\approx 0.988$ closely matches the predicted value, '
        + 'confirming that almost all emitter current reaches the collector.',

        'Compared with the CE configuration, the CB amplifier has no phase inversion, much lower input '
        + 'impedance, and far higher output impedance. These properties make it particularly valuable in '
        + 'cascode amplifier stages, wide-band RF amplifiers, and current-mirror circuits where a '
        + 'well-controlled $\\alpha$ is critical.',
      ],
    },
  ],
};
