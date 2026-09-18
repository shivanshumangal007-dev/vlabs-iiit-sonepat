import { type Experiment } from '@/experiments/types';

export const ZenerDiode: Experiment = {
  id: 'zener-diode',
  title: 'V-I characteristics of Zener diode',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'V-I characteristics of PN junction diode',
    description: 'Study the V-I characteristics of a Zener diode, especially in the reverse breakdown region. Determine the Zener voltage and Zener impedance.',
    tags: ['zener', 'diode', 'breakdown', 'characteristics'],
  },
  metaTitle: 'V-I characteristics of Zener diode — VLabs',
  metaDescription: 'Study the V-I characteristics of a Zener diode, especially in the reverse breakdown region. Determine the Zener voltage and Zener impedance.',
  circuit: {
  id: 'zener-diode',
  title: 'V-I Characteristics of Zener Diode',
  description:
    'A 1N4733A Zener diode (V_Z = 5.1 V) in series with a 470 Ω current-limiting resistor. ' +
    'Forward and reverse V-I characteristics are plotted by varying the supply voltage.',

  components: [
    // ── Board ─────────────────────────────────────────────────────────────
    { id: 'bb', type: 'breadboard' },

    // ── Instruments (3D models beside the breadboard) ─────────────────────
    // DC Power Supply — rendered to the LEFT, wires go to VCC/GND rails at col 5
    { id: 'psu', type: 'dc-jack', mountedAt: { board: 'bb', col: 1, row: 'a' },
      terminals: [
        { board: 'bb', rail: 'vcc_top', col: 5 },
        { board: 'bb', rail: 'gnd_top', col: 5 },
      ] },
    // Digital Multimeter (ammeter mode) — rendered to the RIGHT, probes go to ammeter holes
    { id: 'dmm', type: 'potentiometer', mountedAt: { board: 'bb', col: 1, row: 'b' },
      probes: [
        { board: 'bb', col: 3, row: 'd' },
        { board: 'bb', col: 3, row: 'c' },
      ] },

    // ── Ammeter in series ─────────────────────────────────────────────────
    // Orange wire 1: VCC rail (col 5) → ammeter input (col 3 row d)
    { id: 'w_amm_in', type: 'wire', color: 'orange',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { board: 'bb', col: 3, row: 'd' } },
    // Orange wire 2: ammeter output (col 3 row c) → R1 input (col 5 row c)
    // Note: col 3 row c and col 3 row d are in the same column bank = same net
    // So current flows: VCC rail → col3 row d → (same net) → col3 row c → R1
    { id: 'w_amm_out', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 3, row: 'c' },
      to:   { component: 'r1', end: 'p1' } },

    // ── 470 Ω series resistor — cols 5–8, row c ──────────────────────────
    { id: 'r1', type: 'resistor', ohms: 470, mountedAt: { board: 'bb', col: 5, row: 'c' } },

    // ════════════════════════════════════════════════════════════════════════
    // FORWARD BIAS: Zener at cols 10–11, row c (anode=col10, cathode=col11)
    // ════════════════════════════════════════════════════════════════════════
    { id: 'zener_fwd', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // R1 right (col 8) → Zener_fwd anode (col 10)
    { id: 'w_r1_zfwd', type: 'wire', color: 'green',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'zener_fwd', end: 'anode' } },

    // Zener_fwd cathode (col 11) → GND rail
    { id: 'w_zfwd_gnd', type: 'wire', color: 'black',
      from: { led: 'zener_fwd', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // Voltmeter probes (blue) across forward Zener
    // V+ probe: from Zener anode node down to row 'a' (same column = same net, probe tip in node)
    // V- probe: from GND rail at col 12 to row 'a' col 12 (probe on GND side)
    { id: 'w_vm_fwd_pos', type: 'wire', color: 'blue',
      from: { led: 'zener_fwd', end: 'anode' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_fwd_neg', type: 'wire', color: 'blue',
      from: { board: 'bb', rail: 'gnd_top', col: 12 },
      to:   { board: 'bb', col: 12, row: 'a' } },

    // ════════════════════════════════════════════════════════════════════════
    // REVERSE BIAS: Zener reversed at cols 15–16, row c
    // ════════════════════════════════════════════════════════════════════════
    { id: 'zener_rev', type: 'led', color: 'red', mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // R1 right → Zener_rev CATHODE (col 16)
    { id: 'w_r1_zrev', type: 'wire', color: 'purple',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'zener_rev', end: 'cathode' } },

    // Zener_rev anode (col 15) → GND rail
    { id: 'w_zrev_gnd', type: 'wire', color: 'black',
      from: { led: 'zener_rev', end: 'anode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 15 } },

    // Voltmeter probes (blue) across reverse Zener
    // V+ probe: from Zener cathode (supply side, col 16) to row 'a'
    // V- probe: from GND rail at col 13 to row 'a'
    { id: 'w_vm_rev_pos', type: 'wire', color: 'blue',
      from: { led: 'zener_rev', end: 'cathode' },
      to:   { board: 'bb', col: 16, row: 'a' } },
    { id: 'w_vm_rev_neg', type: 'wire', color: 'blue',
      from: { board: 'bb', rail: 'gnd_top', col: 13 },
      to:   { board: 'bb', col: 13, row: 'a' } },
  ],

  steps: [
    // ── FORWARD BIAS ASSEMBLY ───────────────────────────────────────────
    {
      title: 'Place the breadboard',
      body: 'The 830-point solderless breadboard is your build surface. Red rails = VCC (+), blue rails = GND (−). The centre gap isolates rows a–e from f–j.',
      show: ['bb'],
    },
    {
      title: 'Connect the DC power supply',
      body: 'Place the variable DC supply beside the breadboard. Red wire from supply (+) to VCC rail at col 5. Black wire from supply (−) to GND rail at col 5. Set supply to 0 V.',
      show: ['bb', 'psu', 'w_psu_pos', 'w_psu_neg'],
    },
    {
      title: 'Connect the ammeter (DMM) in series',
      body: 'Place the Digital Multimeter in DC mA mode. Orange wire 1: VCC rail → col 3 row d (ammeter input). Orange wire 2: col 3 row c → R₁ input (col 5). The ammeter sits in series — all circuit current passes through it, measuring I_Z directly.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out'],
    },
    {
      title: 'Place the 470 Ω series resistor',
      body: 'Insert R₁ (470 Ω) at cols 5–8, row c. Colour bands: Yellow–Violet–Brown–Gold. This limits Zener current to safe levels.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the Zener diode (forward bias)',
      body: 'Insert the 1N4733A at cols 10–11, row c. ANODE (longer lead) at col 10, CATHODE (banded end) at col 11. In forward bias, current flows anode → cathode.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd'],
      highlight: 'zener_fwd',
    },
    {
      title: 'Wire R₁ to Zener anode',
      body: 'Green wire: R₁ right lead (col 8) → Zener anode (col 10).',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd'],
    },
    {
      title: 'Wire Zener cathode to GND',
      body: 'Black wire: Zener cathode (col 11) → GND rail. Forward-bias loop complete: PSU → ammeter → R₁ → Zener → GND.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd', 'w_zfwd_gnd'],
    },
    {
      title: 'Connect voltmeter probes across the Zener',
      body: 'Blue wires: V⁺ probe at col 10 (anode side), V⁻ probe at col 11 (cathode side). These measure V_Z directly across the diode.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd', 'w_zfwd_gnd', 'w_vm_fwd_pos', 'w_vm_fwd_neg'],
    },
    {
      title: 'Forward sweep: 0 → 2 V — Zener glows',
      body: 'Power on. Sweep V_s from 0 to 2.0 V in 0.1 V steps. The Zener glows once forward voltage exceeds ~0.65 V. Record V_Z and I_Z at each step.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd', 'w_zfwd_gnd', 'w_vm_fwd_pos', 'w_vm_fwd_neg'],
      activeInputs: { Vcc: 1 },
      supplyVoltage: 1.0,
      readings: { psu: '1.00 V', dmm: '0.62 V  0.81 mA' },
      ledBrightness: { zener_fwd: 0.08 },
    },

    // ── REVERSE BIAS ASSEMBLY ───────────────────────────────────────────
    {
      title: 'Reverse the Zener diode',
      body: 'Power off. Remove forward-bias wires. Place the Zener REVERSED at cols 15–16: cathode (col 16) faces supply, anode (col 15) faces GND. The red color marks the reversed orientation.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev'],
      highlight: 'zener_rev',
    },
    {
      title: 'Wire reverse-bias path',
      body: 'Purple wire: R₁ → Zener cathode (col 16). Black wire: Zener anode (col 15) → GND rail. Current enters through the cathode — reverse bias.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev', 'w_r1_zrev', 'w_zrev_gnd'],
    },
    {
      title: 'Connect voltmeter (reverse bias)',
      body: 'Blue wires: voltmeter probes across the reversed Zener at cols 15–16.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev', 'w_r1_zrev', 'w_zrev_gnd', 'w_vm_rev_pos', 'w_vm_rev_neg'],
    },
    {
      title: 'Reverse sweep: 0 → 10 V — observe breakdown',
      body: 'Power on. Sweep V_s from 0 to 10 V. Near V_Z ≈ 5 V, the Zener enters breakdown — it glows as current rises steeply while voltage clamps at 5.1 V.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev', 'w_r1_zrev', 'w_zrev_gnd', 'w_vm_rev_pos', 'w_vm_rev_neg'],
      activeInputs: { Vcc: 1 },
      supplyVoltage: 8.0,
      readings: { psu: '8.00 V', dmm: '-5.12 V  6.13 mA' },
      ledBrightness: { zener_rev: 0.4 },
    },
  ],
},
  sections: [
    // ── THEORY ────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      schematic: THEORY_SCHEMATIC,
      paragraphs: [
        'A Zener diode is a heavily-doped PN junction designed to conduct reliably in **reverse breakdown**. '
        + 'Two mechanisms cause breakdown: *Zener breakdown* (quantum tunnelling, $V_Z < 5\\,\\text{V}$) and '
        + '*avalanche breakdown* (impact ionisation, $V_Z > 7\\,\\text{V}$). '
        + 'The 1N4733A uses both mechanisms at $V_Z = 5.1\\,\\text{V}$.',

        'In **forward bias** it behaves like a normal silicon diode — current rises exponentially above $V_f \\approx 0.65\\,\\text{V}$:'
        + '$$I_Z = I_s\\left(e^{qV/nkT} - 1\\right)$$'
        + 'In **reverse pre-breakdown** only leakage $I_s < 1\\,\\mu\\text{A}$ flows. '
        + 'At $V = -V_Z$, a sharp breakdown knee occurs and current increases steeply while voltage stays nearly constant.',

        'The **Zener impedance** characterises knee sharpness:'
        + '$$Z_Z = \\frac{\\Delta V_Z}{\\Delta I_Z}$$'
        + 'An ideal Zener has $Z_Z = 0$. For the 1N4733A at $I_Z = 20\\,\\text{mA}$, $Z_Z \\approx 7\\,\\Omega$.',

        'The series resistor limits current. At any supply voltage $V_s$:'
        + '$$I_Z = \\frac{V_s - V_Z}{R_S} = \\frac{9 - 5.1}{470} \\approx 8.3\\,\\text{mA}$$',
      ],
    },

    // ── APPARATUS ──────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        {
          name: 'Breadboard',
          specification: '830 tie-point, solderless',
          quantity: '1',
          callouts: [
            { pos: [0,     0.05,  -0.8], label: 'VCC (+) rail' },
            { pos: [0,     0.05,   0.8], label: 'GND (−) rail' },
            { pos: [0.4,   0.05,   0],   label: 'Terminal strips' },
            { pos: [0,     0.05,   0],   label: 'Centre gap (DIP)' },
          ],
        },
        {
          name: '1N4733A Zener Diode',
          specification: '$V_Z = 5.1\\,\\text{V}$, $P_D = 1\\,\\text{W}$, $I_{ZM} = 200\\,\\text{mA}$',
          quantity: '1',
          callouts: [
            { pos: [-0.25,  0.3,  0],  label: 'Anode (A)' },
            { pos: [ 0.3,   0.3,  0],  label: 'Cathode (K) — band' },
            { pos: [ 0,     0.6,  0],  label: 'Dome body' },
            { pos: [-0.25, -0.6,  0],  label: 'Longer lead' },
            { pos: [ 0.25, -0.6,  0],  label: 'Shorter lead' },
          ],
        },
        {
          name: 'Resistor $470\\,\\Omega$',
          specification: '¼ W, carbon film — Yellow–Violet–Brown–Gold',
          quantity: '1',
          callouts: [
            { pos: [-0.7,   0,    0],  label: 'Lead 1' },
            { pos: [ 0.7,   0,    0],  label: 'Lead 2' },
            { pos: [-0.28,  0.12, 0],  label: 'Yellow (4)' },
            { pos: [-0.1,   0.12, 0],  label: 'Violet (7)' },
            { pos: [ 0.04,  0.12, 0],  label: 'Brown (×10)' },
            { pos: [ 0.3,   0.12, 0],  label: 'Gold (±5%)' },
          ],
        },
        {
          name: 'DC Power Supply',
          specification: '$0{-}12\\,\\text{V}$ variable, $1\\,\\text{A}$',
          quantity: '1',
          callouts: [
            { pos: [-0.4,  0.5,  0.4],  label: 'Voltage dial' },
            { pos: [ 0.3,  0.1,  0.5],  label: '+V terminal (red)' },
            { pos: [ 0.3, -0.2,  0.5],  label: 'GND terminal (black)' },
          ],
        },
        {
          name: 'Digital Multimeter',
          specification: 'DC voltage + DC mA modes',
          quantity: '2',
          callouts: [
            { pos: [0,     0.5,  0.4],  label: 'Display' },
            { pos: [-0.35, -0.5, 0.4],  label: 'COM jack' },
            { pos: [ 0.35, -0.5, 0.4],  label: 'V/mA jack' },
          ],
        },
        {
          name: 'Jumper Wires',
          specification: 'Red (VCC), black (GND), orange (node), blue (V-meter)',
          quantity: '1 set',
          callouts: [
            { pos: [-0.5,  0.08,  0],  label: 'Ferrule end' },
            { pos: [ 0.5,  0.08,  0],  label: 'Ferrule end' },
            { pos: [ 0,    0.08,  0],  label: 'Insulated body' },
          ],
        },
      ],
    },

    // ── PROCEDURE ──────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard and connect the DC power supply.',
          circuitStepIndex: 1,
          body: 'Place the 830-point breadboard. Place the **variable DC supply** beside the breadboard (set to 0 V initially).\n'
              + '**Red wire**: supply (+) terminal → VCC rail at col 5.\n'
              + '**Black wire**: supply (−) terminal → GND rail at col 5.\n'
              + 'The red rails carry $V_s$ throughout; the blue rails are $\\text{GND}$. Do **not** power on yet.',
        },
        {
          label: 'Connect the ammeter (DMM) in series.',
          circuitStepIndex: 2,
          body: 'Place the **Digital Multimeter** (DMM) beside the breadboard and set it to **DC mA** mode.\n'
              + 'Connect the ammeter in series using **orange jumper wires**:\n'
              + '**Orange wire 1**: VCC rail (col 5) → col 3 row d (ammeter input).\n'
              + '**Orange wire 2**: col 3 row c → R₁ input (col 5 row c).\n'
              + 'Since rows c and d in the same column share a net, all circuit current flows through the ammeter, measuring $I_Z$ directly.',
        },
        {
          label: 'Insert the 470 Ω series resistor at cols 5–8, row c.',
          circuitStepIndex: 3,
          body: 'Identify the $470\\,\\Omega$ resistor by its colour bands: **Yellow – Violet – Brown – Gold**.\n'
              + 'Insert it bridging **col 5** (left lead, $p_1$) to **col 8** (right lead, $p_2$) in row c.\n'
              + 'This limits current: $I_Z = (V_s - V_Z) / R_S$. At $V_s = 9\\,\\text{V}$, $I_Z \\approx 8.3\\,\\text{mA}$ — safely within the 1N4733A\'s 200 mA rating.',
          markers: [
            { pos: M.r1_p1, dir: DOWN, label: 'R₁ left (p1)' },
            { pos: M.r1_p2, dir: DOWN, label: 'R₁ right (p2)' },
          ],
        },
        {
          label: 'Insert the 1N4733A Zener diode (forward bias) at cols 10–11.',
          circuitStepIndex: 4,
          body: 'Pick up the 1N4733A. The **cathode** is the end with the silver band.\n'
              + 'Insert with **anode at col 10** and **cathode at col 11**, row c. Polarity is critical.\n'
              + 'In forward bias, current flows anode → cathode above $V_f \\approx 0.65\\,\\text{V}$.',
          markers: [
            { pos: M.zd_anode,   dir: DOWN, label: 'Anode (A)' },
            { pos: M.zd_cathode, dir: DOWN, label: 'Cathode (K)' },
          ],
        },
        {
          label: 'Wire R₁ to Zener anode, Zener cathode to GND.',
          circuitStepIndex: 6,
          body: '**Green wire**: R₁ right lead (col 8) → Zener anode (col 10).\n'
              + '**Black wire**: Zener cathode (col 11) → GND rail.\n'
              + 'The forward-bias circuit loop is now complete:\n'
              + '$V_s^+ \\to \\text{ammeter} \\to R_S \\to D_Z \\to \\text{GND}$\n'
              + '**Double-check polarity** before powering on.',
          markers: [
            { pos: M.r1_p2,       dir: DOWN, label: 'R₁ p2 → green wire' },
            { pos: M.zd_cathode,  dir: DOWN, label: 'Cathode → GND' },
          ],
        },
        {
          label: 'Connect voltmeter across the forward-biased Zener.',
          circuitStepIndex: 7,
          body: 'Set DMM 1 to **DC Voltage, 20 V range**.\n'
              + '**Blue wire** (+): col 10, spanning row a → row e (anode side).\n'
              + '**Blue wire** (−): col 11, spanning row a → row e (cathode side).\n'
              + 'These probes measure $V_Z$ directly across the diode.',
        },
        {
          label: 'Forward bias sweep: 0 → 2 V in 0.1 V steps.',
          circuitStepIndex: 8,
          body: 'Power on. Increase $V_s$ from 0 V to 2.0 V in **0.1 V steps**. Record $V_Z$ and $I_Z$ at each step.\n'
              + 'Expect: no current below $\\approx 0.55\\,\\text{V}$; exponential rise above $0.65\\,\\text{V}$.\n'
              + 'Calculate dynamic resistance in the conducting region: $r_d = \\Delta V / \\Delta I \\approx 26/I_{\\text{mA}}\\,\\Omega$ at $25^\\circ\\text{C}$.',
        },
        {
          label: 'Reverse the Zener diode for reverse-bias measurement.',
          circuitStepIndex: 9,
          body: 'Power off and reduce supply to 0 V. **Remove** the forward-bias Zener and its wires.\n'
              + 'Place the Zener **reversed** at cols 15–16, row c: **cathode** (banded end, col 16) now faces the supply side, **anode** (col 15) faces GND.\n'
              + 'The red LED on the breadboard marks this reversed orientation — current will enter through the cathode.',
        },
        {
          label: 'Wire the reverse-bias path and reconnect voltmeter.',
          circuitStepIndex: 11,
          body: '**Purple wire**: R₁ right lead (col 8) → Zener cathode (col 16). Current enters the cathode — reverse bias.\n'
              + '**Black wire**: Zener anode (col 15) → GND rail.\n'
              + '**Blue wires**: voltmeter probes across the reversed Zener (col 15 and col 16, spanning rows a → e).\n'
              + 'DMM readings will show **negative** voltage — this is the reverse voltage $-V_Z$ across the Zener.',
        },
        {
          label: 'Reverse bias sweep: 0 → 10 V.',
          circuitStepIndex: 12,
          body: 'Power on. Increase $V_s$ from 0 to 10 V. Use **0.5 V steps**; switch to **0.1 V steps** near $V_Z \\approx 5\\,\\text{V}$.\n'
              + 'Observe: $|V_Z|$ stays near **5.1 V** as current rises steeply — this is the **voltage-regulation** property.\n'
              + 'Calculate $Z_Z = \\Delta V_Z / \\Delta I_Z$ in the breakdown region. For the 1N4733A at $I_Z = 20\\,\\text{mA}$, expect $Z_Z \\approx 7\\,\\Omega$.',
        },
      ],
    },

    // ── OBSERVATIONS ───────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Zener: 1N4733A. $V_Z(\\text{nominal}) = 5.1\\,\\text{V}$, $R_S = 470\\,\\Omega$.',
        'Forward threshold $V_f \\approx 0.62\\text{–}0.65\\,\\text{V}$. Breakdown knee at $V_Z \\approx 5.0\\text{–}5.2\\,\\text{V}$ (within ±2% of spec).',
        'Measured $Z_Z = \\Delta V_Z / \\Delta I_Z \\approx 6\\text{–}9\\,\\Omega$ (consistent with datasheet at $I_Z = 5\\text{–}20\\,\\text{mA}$).',
      ],
      table: {
        headers: ['$V_s$ (V)', '$V_Z$ (V)', '$I_Z$ (mA)', 'Region'],
        rows: [
          [0.0,   '0.00',   '0.00', 'Off'],
          [0.5,   '0.49',   '0.00', 'Cut-off'],
          [1.0,   '0.62',   '0.80', 'Forward active'],
          [2.0,   '0.66',   '2.85', 'Forward active'],
          ['—',   '—',      '—',    '— (reverse setup) —'],
          ['4',   '−3.98', '0.00',  'Pre-breakdown'],
          ['5',   '−4.82', '0.37',  'Entering knee'],
          ['6',   '−5.10', '1.91',  'Breakdown'],
          ['8',   '−5.12', '6.13',  'Breakdown'],
          ['10',  '−5.14', '10.3',  'Breakdown'],
        ],
      },
    },

    // ── CONCLUSION ─────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The complete V-I characteristic of the 1N4733A Zener diode was successfully plotted. '
        + 'In **forward bias**, threshold voltage $V_f \\approx 0.64\\,\\text{V}$ was observed, consistent with silicon PN junction theory. '
        + 'The dynamic resistance $r_d \\approx 26/I_{\\text{mA}}\\,\\Omega$ was verified experimentally.',

        'In **reverse bias**, the breakdown knee appeared sharply at $V_Z \\approx 5.1\\,\\text{V}$. '
        + 'Beyond breakdown, $V_Z$ stayed within $\\pm 0.05\\,\\text{V}$ of 5.1 V as supply varied 6–10 V, '
        + 'demonstrating the voltage-regulation property. Measured $Z_Z \\approx 7\\,\\Omega$ matched the datasheet.',

        'This experiment establishes the basis for **Zener voltage reference circuits**. '
        + 'The constant-voltage breakdown property makes the Zener diode the core reference element in linear regulators '
        + '(LM317, 78xx series) where an op-amp drives a pass transistor to maintain $V_Z$ at the output.',
      ],
    },
  ],
};
