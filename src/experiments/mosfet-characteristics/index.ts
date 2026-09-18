import { type Experiment } from '@/experiments/types';
import { CB } from '@/labs/builder';

export const MosfetCharacteristics: Experiment = {
  id: 'mosfet-characteristics',
  title: 'MOSFET Drain & Transfer Characteristics',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Plot ID vs VDS (output) and ID vs VGS (transfer) characteristics of a 2N7000 N-channel MOSFET. Determine threshold voltage and transconductance.',
    tags: ['mosfet', 'drain characteristics', 'transfer characteristics', '2N7000', 'threshold voltage'],
  },
  metaTitle: 'MOSFET Drain & Transfer Characteristics — VLabs',
  metaDescription: 'Plot ID vs VDS (output) and ID vs VGS (transfer) characteristics of a 2N7000 N-channel MOSFET. Determine threshold voltage and transconductance.',
  circuit: new CB(
  'mosfet-characteristics',
  'Drain and Transfer Characteristics of N-Channel MOSFET (2N7000)',
  'Plot the output (ID vs VDS) and transfer (ID vs VGS) characteristics of a 2N7000 N-channel MOSFET.',
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

  // ── Components ────────────────────────────────────────────────────────
  .resistor('r_d',    1_000,  5, 'c')    // drain resistor
  .led('led_drain', 'yellow', 10, 'c')   // drain current indicator
  .resistor('r_pot', 10_000, 15, 'c')   // gate bias / VGS divider

  // ── Ammeter wires (orange) on drain path ──────────────────────────────
  .wire('w_amm_in',  'orange',
    { board: 'bb', rail: 'vcc_top', col: 5 },
    { board: 'bb', col: 8, row: 'd' })
  .wire('w_amm_out', 'orange',
    { board: 'bb', col: 8, row: 'c' },
    { component: 'r_d', end: 'p1' })

  // ── Power wires ────────────────────────────────────────────────────────
  // R_D → LED drain indicator
  .wire('w_rd_led', 'green',
    { component: 'r_d', end: 'p2' },
    { led: 'led_drain', end: 'anode' })
  // LED cathode → GND (drain → source path through MOSFET symbolised by LED→GND)
  .wireLedToGnd('w_led_gnd', 'led_drain', 11)

  // R_pot: top to VCC, bottom to GND — wiper is the gate voltage VGS
  .wire('w_vcc_rpot', 'red',
    { board: 'bb', rail: 'vcc_top', col: 15 },
    { component: 'r_pot', end: 'p1' })
  .wireGnd('w_rpot_gnd', { component: 'r_pot', end: 'p2' }, 18)

  // Gate wire from divider midpoint to gate (represented as a node wire at col 16)
  .wire('w_gate', 'yellow',
    { board: 'bb', col: 16, row: 'c' },
    { board: 'bb', col: 12, row: 'c' })

  // ── Steps ─────────────────────────────────────────────────────────────
  // Step 0
  .step('Place the breadboard',
    'The 830-point solderless breadboard is your build surface. '
    + 'Red rails = VCC (+10 V), blue rails = GND. '
    + 'You will sweep VGS (gate voltage) to plot transfer characteristics and '
    + 'sweep VDS (drain-source voltage) to plot output characteristics.')
    .show('bb')

  // Step 1
  .step('Connect the DC power supply',
    'Place the variable DC supply to the left. '
    + 'Red wire: PSU (+) → VCC rail at col 5. Black wire: PSU (−) → GND rail at col 5. '
    + 'The supply will be adjusted during sweeps — keep at 0 V for now.')
    .show('psu')

  // Step 2
  .step('Connect the DMM as a drain ammeter',
    'Set DMM to DC mA mode. '
    + 'Orange wire 1: VCC rail (col 5) → col 8 row d (ammeter input). '
    + 'Orange wire 2: col 8 row c → R_D left lead. '
    + 'This measures drain current $I_D$ directly in series with the drain resistor.')
    .show('dmm', 'w_amm_in', 'w_amm_out')

  // Step 3
  .step('Place the drain resistor R_D (1 kΩ)',
    'Insert R_D (1 kΩ, Brown–Black–Red–Gold) at col 5–8, row c. '
    + 'This limits drain current and allows $V_{DS}$ to be calculated: '
    + '$V_{DS} = V_{DD} - I_D \\times R_D$. '
    + 'Wire R_D → LED anode (green) to complete the drain path.')
    .show('r_d', 'w_rd_led')
    .highlight('r_d')

  // Step 4
  .step('Place the gate voltage divider R_pot (10 kΩ)',
    'Insert R_pot (10 kΩ) at col 15–18, row c. '
    + 'Wire: VCC rail → R_pot top (red), R_pot bottom → GND (black). '
    + 'The wiper (col 16 row c) provides the gate voltage $V_{GS}$. '
    + 'Wire the gate node (col 16) to col 12 (MOSFET gate pin) with a yellow wire.')
    .show('r_pot', 'w_vcc_rpot', 'w_rpot_gnd', 'w_gate')
    .highlight('r_pot')

  // Step 5
  .step('Place the drain current indicator LED (yellow)',
    'Insert the yellow LED at col 10–11, row c — anode (longer lead) at col 10. '
    + 'The LED represents the MOSFET drain–source channel: '
    + 'when $V_{GS} > V_{TH} \\approx 2\\,\\text{V}$, the channel opens and the LED glows. '
    + 'Wire LED cathode → GND rail at col 11.')
    .show('led_drain', 'w_led_gnd')
    .highlight('led_drain')

  // Step 6
  .step('Transfer characteristic sweep: I_D vs V_GS',
    'Set $V_{DS} = 5\\,\\text{V}$ (fixed PSU). Slowly increase gate voltage from 0 V to 5 V '
    + 'using an external variable resistor or second PSU on the gate. '
    + 'Record $I_D$ (DMM) at each $V_{GS}$ step (0.5 V increments). '
    + 'Threshold $V_{TH} \\approx 2\\,\\text{V}$ — drain current begins to flow above this. '
    + 'In saturation: $I_D = K(V_{GS} - V_{TH})^2$.')
    .show()
    .power({ Vgs: 1 })
    .supply(5.0)
    .reading('psu', '5.00 V')
    .reading('dmm', 'ID = 3.20 mA')
    .glow('led_drain', 0.4)

  // Step 7
  .step('Output characteristic sweep: I_D vs V_DS',
    'Fix $V_{GS} = 4\\,\\text{V}$ (gate well above $V_{TH}$). '
    + 'Sweep $V_{DS}$ from 0 V to 10 V in 0.5 V steps by adjusting the supply. '
    + 'Record $I_D$ at each step. Observe: linear region ($V_{DS} < V_{GS} - V_{TH} \\approx 2\\,\\text{V}$), '
    + 'then saturation ($I_D$ nearly constant) once $V_{DS} > V_{GS} - V_{TH}$. '
    + 'The LED brightness saturates correspondingly.')
    .show()
    .power({ Vds: 1 })
    .supply(8.0)
    .reading('psu', '8.00 V')
    .reading('dmm', 'ID = 6.40 mA')
    .glow('led_drain', 0.6)

  .build(),
  sections: [
    // ── THEORY ─────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The **2N7000** is an N-channel enhancement-mode MOSFET. In the enhancement mode, the channel '
        + 'does **not** exist at $V_{GS} = 0$; it is created (enhanced) only when $V_{GS}$ exceeds the '
        + 'threshold voltage $V_{TH} \\approx 2.0\\text{–}2.5\\,\\text{V}$. Increasing $V_{GS}$ attracts '
        + 'electrons into the p-type substrate beneath the gate oxide, inverting it and forming an '
        + 'n-type conduction channel between drain and source.',

        'The device operates in two regions:'
        + '$$\\text{Linear (Ohmic): } V_{DS} < V_{GS}-V_{TH} \\quad I_D = K\\bigl[2(V_{GS}-V_{TH})V_{DS} - V_{DS}^2\\bigr]$$'
        + '$$\\text{Saturation: } V_{DS} \\geq V_{GS}-V_{TH} \\quad I_D = K(V_{GS}-V_{TH})^2$$'
        + 'where $K = \\mu_n C_{ox}(W/2L)$ is the process transconductance parameter '
        + '($K \\approx 0.6\\,\\text{A/V}^2$ for the 2N7000). '
        + 'The transconductance $g_m = 2K(V_{GS}-V_{TH}) = \\partial I_D/\\partial V_{GS}$ characterises '
        + 'the gain of MOSFET amplifier stages.',

        'The **transfer characteristic** ($I_D$ vs $V_{GS}$ at fixed $V_{DS}$) is a parabola starting '
        + 'at $V_{TH}$ and rising quadratically. Plotting $\\sqrt{I_D}$ vs $V_{GS}$ gives a straight line '
        + 'whose x-intercept is $V_{TH}$ and slope is $\\sqrt{K}$ — a convenient way to extract parameters. '
        + 'For the 2N7000: $V_{TH} \\approx 2\\,\\text{V}$, $I_{D,\\text{max}} \\approx 200\\,\\text{mA}$.',

        'The **drain characteristics** ($I_D$ vs $V_{DS}$ for several fixed $V_{GS}$) show a family of '
        + 'curves. In the linear region the MOSFET behaves as a voltage-controlled resistor '
        + '$r_{DS(on)} \\approx 1/(2K(V_{GS}-V_{TH}))$; in saturation, $I_D$ is nearly independent of '
        + '$V_{DS}$ (slight slope due to channel-length modulation $\\lambda$). '
        + 'The boundary between regions is the locus $V_{DS} = V_{GS} - V_{TH}$ (dashed pinch-off line).',
      ],
    },

    // ── APPARATUS ───────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',           specification: '830 tie-point, solderless',                    quantity: '1' },
        { name: '2N7000 N-ch MOSFET',   specification: 'TO-92, $V_{TH}\\approx 2\\,\\text{V}$, $I_D\\leq 200\\,\\text{mA}$', quantity: '1' },
        { name: 'R_D Drain Resistor',   specification: '$1\\,\\text{k}\\Omega$, ¼ W',                  quantity: '1' },
        { name: 'R_pot Gate Divider',   specification: '$10\\,\\text{k}\\Omega$ potentiometer or fixed', quantity: '1' },
        { name: 'DC Power Supply',      specification: '0–12 V variable, 500 mA',                     quantity: '2' },
        { name: 'Digital Multimeter',   specification: 'DC voltage + DC mA',                          quantity: '2' },
        { name: 'LED (yellow)',         specification: '5 mm, $V_f \\approx 2.0\\,\\text{V}$',        quantity: '1' },
        { name: 'Jumper wires',         specification: 'Assorted colours',                            quantity: '1 set' },
      ],
    },

    // ── PROCEDURE ────────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard and connect the DC power supply.',
          circuitStepIndex: 1,
          body: 'Place the breadboard. Connect the main PSU: (+) → VCC rail col 5, (−) → GND rail col 5. '
              + 'This supply will be used as $V_{DD}$ for the drain circuit. '
              + 'A second PSU (or potentiometer) will control $V_{GS}$.',
        },
        {
          label: 'Connect the DMM as a drain-path ammeter.',
          circuitStepIndex: 2,
          body: 'Set DMM to **DC mA** range. '
              + 'Orange wire 1: VCC rail (col 5) → col 8 row d. '
              + 'Orange wire 2: col 8 row c → R_D left lead. '
              + 'All drain current $I_D$ flows through the ammeter in series with R_D.',
        },
        {
          label: 'Insert drain resistor R_D (1 kΩ) and wire to LED.',
          circuitStepIndex: 3,
          body: 'Insert R_D (1 kΩ) at col 5–8, row c. '
              + 'Wire R_D right lead (col 8) → LED anode (col 10, green wire). '
              + 'Wire LED cathode (col 11) → GND rail at col 11 (black wire). '
              + 'The drain current path is: VCC → ammeter → R_D → LED → GND.',
        },
        {
          label: 'Insert gate bias network R_pot (10 kΩ).',
          circuitStepIndex: 4,
          body: 'Insert R_pot (10 kΩ) at col 15–18, row c. '
              + 'Wire VCC rail → R_pot top (red), R_pot bottom → GND (black). '
              + 'Wire the gate tap (col 16 row c) to the MOSFET gate node (col 12 row c) with a yellow wire. '
              + 'Adjusting the potentiometer sweeps $V_{GS}$ from 0 to $V_{DD}$.',
        },
        {
          label: 'Insert the output indicator LED (yellow) and finalise wiring.',
          circuitStepIndex: 5,
          body: 'Verify the yellow LED is inserted correctly at col 10–11, row c (anode at col 10). '
              + 'The LED lights when $V_{GS}$ exceeds $V_{TH} \\approx 2\\,\\text{V}$ and the MOSFET channel opens. '
              + 'Double-check all connections before applying power.',
        },
        {
          label: 'Transfer characteristic: sweep V_GS at fixed V_DS = 5 V.',
          circuitStepIndex: 6,
          body: 'Set $V_{DD} = 5\\,\\text{V}$. Slowly increase $V_{GS}$ from 0 V to 5 V in 0.5 V steps. '
              + 'Record $I_D$ at each step. Expect $I_D \\approx 0$ for $V_{GS} < 2\\,\\text{V}$, '
              + 'then rising as $(V_{GS} - 2)^2$. '
              + 'Extract $V_{TH}$ by plotting $\\sqrt{I_D}$ vs $V_{GS}$ and extrapolating to the x-axis.',
        },
        {
          label: 'Output characteristic: sweep V_DS at fixed V_GS = 4 V.',
          circuitStepIndex: 7,
          body: 'Fix $V_{GS} = 4\\,\\text{V}$ (well above $V_{TH}$). '
              + 'Sweep $V_{DD}$ from 0 to 10 V in 0.5 V steps. '
              + 'Calculate $V_{DS} = V_{DD} - I_D \\times R_D$ at each step. '
              + 'Observe: linear region ($V_{DS} < 2\\,\\text{V}$), then saturation ($I_D$ nearly constant). '
              + 'The LED brightness stops increasing once saturation is entered.',
        },
      ],
    },

    // ── OBSERVATIONS ────────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Device: 2N7000. $R_D = 1\\,\\text{k}\\Omega$. $V_{TH}$ (extracted from $\\sqrt{I_D}$ plot) $\\approx 2.0\\,\\text{V}$.',
        'Table (a): Transfer characteristics at $V_{DS} = 5\\,\\text{V}$.',
      ],
      table: {
        headers: ['$V_{GS}$ (V)', '$I_D$ (mA)', '$\\sqrt{I_D}$ (mA$^{0.5}$)', 'Region'],
        rows: [
          [0.0,  '0.00', '0.000', 'Off'],
          [1.5,  '0.00', '0.000', 'Off'],
          [2.5,  '0.25', '0.500', 'Saturation'],
          [3.0,  '1.00', '1.000', 'Saturation'],
          [3.5,  '2.25', '1.500', 'Saturation'],
          [4.0,  '4.00', '2.000', 'Saturation'],
          [4.5,  '6.25', '2.500', 'Saturation'],
          [5.0,  '9.00', '3.000', 'Saturation'],
        ],
      },
    },

    // ── CONCLUSION ──────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The drain and transfer characteristics of the 2N7000 N-channel enhancement MOSFET were '
        + 'successfully plotted. The transfer characteristic confirmed the quadratic law '
        + '$I_D = K(V_{GS} - V_{TH})^2$ in saturation with threshold voltage $V_{TH} \\approx 2.0\\,\\text{V}$ '
        + 'and transconductance parameter $K \\approx 0.6\\,\\text{A/V}^2$, consistent with datasheet values.',

        'The output characteristics showed a clear transition from the linear (ohmic) region at low '
        + '$V_{DS}$ to the saturation region where $I_D$ is nearly constant. The pinch-off locus '
        + '$V_{DS} = V_{GS} - V_{TH}$ separated the two regions as predicted. '
        + 'Channel-length modulation was visible as a small positive slope in saturation.',

        'These characteristics underpin MOSFET applications in switching (linear region: low $r_{DS(on)}$), '
        + 'amplification (saturation region: high $g_m$), and current-source biasing. '
        + 'The near-zero gate current distinguishes the MOSFET from the BJT and enables CMOS logic '
        + 'with negligible static power dissipation.',
      ],
    },
  ],
};
