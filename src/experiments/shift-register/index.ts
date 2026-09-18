import { type Experiment } from '@/experiments/types';

export const ShiftRegister: Experiment = {
  id: 'shift-register',
  title: '8-bit SIPO Shift Register using 74HC273',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 2,
    subject: 'Digital Logic Design',
    description: 'Configure the 74HC273 octal D flip-flop as a serial-in parallel-out shift register. Clock in 8 bits serially and read the parallel output.',
    tags: ['shift register', 'sipo', '74hc273', 'serial to parallel', 'sequential'],
  },
  metaTitle: '8-bit SIPO Shift Register using 74HC273 — VLabs',
  metaDescription: 'Configure the 74HC273 octal D flip-flop as a serial-in parallel-out shift register. Clock in 8 bits serially and read the parallel output.',
  circuit: {
  id: 'shift-register',
  title: '8-bit Serial-In Parallel-Out (SIPO) Shift Register using 74HC273',
  description:
    'Load data serially into a 74HC273 8-bit register and observe all 8 parallel outputs on LEDs. ' +
    'Data appears on Q0–Q7 on each rising clock edge.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC273 8-bit register ─────────────────────────────────────────────
    { id: 'reg8', type: 'register-8bit', mountedAt: { board: 'bb', col: 3, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_q0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 14, row: 'c' } },
    { id: 'r_q1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 14, row: 'h' } },
    { id: 'r_q2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'c' } },
    { id: 'r_q3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'h' } },
    { id: 'r_q4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'r_q5', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'r_q6', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'r_q7', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'h' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_q0', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 16, row: 'c' } },
    { id: 'led_q1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 16, row: 'h' } },
    { id: 'led_q2', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 19, row: 'c' } },
    { id: 'led_q3', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 19, row: 'h' } },
    { id: 'led_q4', type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_q5', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_q6', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'led_q7', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 25, row: 'h' } },

    // ── CLK input wire ────────────────────────────────────────────────────
    { id: 'w_clk_reg8', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'reg8', pin: 'clk' } },

    // ── D0, D1 data input wires ───────────────────────────────────────────
    { id: 'w_d0_reg8', type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'reg8', pin: 'd0' } },
    { id: 'w_d1_reg8', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'reg8', pin: 'd1' } },

    // ── MR_bar tied HIGH (no reset) ───────────────────────────────────────
    { id: 'w_mr_high', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 1 },
      to:   { ic: 'reg8', pin: 'mr_bar' } },

    // ── Q0-Q7 output wires → resistors ───────────────────────────────────
    { id: 'w_q0_r', type: 'wire', color: 'red',
      from: { ic: 'reg8', pin: 'q0' },
      to:   { component: 'r_q0', end: 'p1' } },
    { id: 'w_q1_r', type: 'wire', color: 'yellow',
      from: { ic: 'reg8', pin: 'q1' },
      to:   { component: 'r_q1', end: 'p1' } },
    { id: 'w_q2_r', type: 'wire', color: 'green',
      from: { ic: 'reg8', pin: 'q2' },
      to:   { component: 'r_q2', end: 'p1' } },
    { id: 'w_q3_r', type: 'wire', color: 'blue',
      from: { ic: 'reg8', pin: 'q3' },
      to:   { component: 'r_q3', end: 'p1' } },
    { id: 'w_q4_r', type: 'wire', color: 'white',
      from: { ic: 'reg8', pin: 'q4' },
      to:   { component: 'r_q4', end: 'p1' } },
    { id: 'w_q5_r', type: 'wire', color: 'red',
      from: { ic: 'reg8', pin: 'q5' },
      to:   { component: 'r_q5', end: 'p1' } },
    { id: 'w_q6_r', type: 'wire', color: 'yellow',
      from: { ic: 'reg8', pin: 'q6' },
      to:   { component: 'r_q6', end: 'p1' } },
    { id: 'w_q7_r', type: 'wire', color: 'green',
      from: { ic: 'reg8', pin: 'q7' },
      to:   { component: 'r_q7', end: 'p1' } },

    // ── Resistors → LEDs ──────────────────────────────────────────────────
    { id: 'w_r0_led', type: 'wire', color: 'red',
      from: { component: 'r_q0', end: 'p2' },
      to:   { led: 'led_q0', end: 'anode' } },
    { id: 'w_r1_led', type: 'wire', color: 'yellow',
      from: { component: 'r_q1', end: 'p2' },
      to:   { led: 'led_q1', end: 'anode' } },
    { id: 'w_r2_led', type: 'wire', color: 'green',
      from: { component: 'r_q2', end: 'p2' },
      to:   { led: 'led_q2', end: 'anode' } },
    { id: 'w_r3_led', type: 'wire', color: 'blue',
      from: { component: 'r_q3', end: 'p2' },
      to:   { led: 'led_q3', end: 'anode' } },
    { id: 'w_r4_led', type: 'wire', color: 'white',
      from: { component: 'r_q4', end: 'p2' },
      to:   { led: 'led_q4', end: 'anode' } },
    { id: 'w_r5_led', type: 'wire', color: 'red',
      from: { component: 'r_q5', end: 'p2' },
      to:   { led: 'led_q5', end: 'anode' } },
    { id: 'w_r6_led', type: 'wire', color: 'yellow',
      from: { component: 'r_q6', end: 'p2' },
      to:   { led: 'led_q6', end: 'anode' } },
    { id: 'w_r7_led', type: 'wire', color: 'green',
      from: { component: 'r_q7', end: 'p2' },
      to:   { led: 'led_q7', end: 'anode' } },

    // ── LED cathodes → GND ────────────────────────────────────────────────
    { id: 'w_led0_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q0', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_led1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
    { id: 'w_led2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q2', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 3 } },
    { id: 'w_led3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q3', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 4 } },
    { id: 'w_led4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q4', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 5 } },
    { id: 'w_led5_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q5', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 6 } },
    { id: 'w_led6_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q6', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 7 } },
    { id: 'w_led7_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q7', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 8 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. We will build an 8-bit parallel-output register ' +
        'using the 74HC273. On each rising CLK edge, the D0–D7 inputs are captured to Q0–Q7, ' +
        'illuminating the corresponding LEDs.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC273 8-bit register',
      body: 'Mount the 74HC273 DIP-20 IC straddling the centre gap at column 3. ' +
        'Pin 1 (MR_bar, active-low reset) is at col 3, row e. ' +
        'D0–D7 are on the top bank, Q0–Q7 and CLK are on the bottom bank.',
      show: ['bb', 'reg8'],
      highlight: 'reg8',
    },
    {
      title: 'Tie MR_bar HIGH and wire CLK',
      body: 'Red wire: VCC rail → MR_bar pin (col 3, row e) — keeps reset inactive. ' +
        'Orange wire: col 1, row a (CLK input) → reg8 CLK pin. ' +
        'CLK is active on the rising edge.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Wire D0 and D1 data inputs',
      body: 'Red wire: col 2 row a → D0. Blue wire: col 2 row b → D1. ' +
        'Remaining D2–D7 inputs are tied to GND (logic 0) via the GND rail. ' +
        'For this demo we drive only D0 and D1 independently.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8'],
      activeInputs: { CLK: 0, D0: 0, D1: 0 },
    },
    {
      title: 'Place 8 output LEDs and resistors',
      body: '8 LEDs placed in alternating rows c and h, columns 16–25. ' +
        '330 Ω resistors before each LED anode. All cathodes to GND rail. ' +
        'Colours: red, yellow, green, blue, white, red, yellow, green (Q0–Q7).',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8',
             'r_q0', 'r_q1', 'r_q2', 'r_q3', 'r_q4', 'r_q5', 'r_q6', 'r_q7',
             'led_q0', 'led_q1', 'led_q2', 'led_q3', 'led_q4', 'led_q5', 'led_q6', 'led_q7'],
      activeInputs: { CLK: 0, D0: 0, D1: 0 },
    },
    {
      title: 'Connect Q0–Q7 output wires',
      body: 'Wire reg8 Q0–Q7 pins to their respective resistors p1. ' +
        'Then wire resistors p2 to LED anodes. Circuit is now complete.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8',
             'r_q0', 'r_q1', 'r_q2', 'r_q3', 'r_q4', 'r_q5', 'r_q6', 'r_q7',
             'led_q0', 'led_q1', 'led_q2', 'led_q3', 'led_q4', 'led_q5', 'led_q6', 'led_q7',
             'w_q0_r', 'w_q1_r', 'w_q2_r', 'w_q3_r', 'w_q4_r', 'w_q5_r', 'w_q6_r', 'w_q7_r',
             'w_r0_led', 'w_r1_led', 'w_r2_led', 'w_r3_led', 'w_r4_led', 'w_r5_led', 'w_r6_led', 'w_r7_led',
             'w_led0_gnd', 'w_led1_gnd', 'w_led2_gnd', 'w_led3_gnd',
             'w_led4_gnd', 'w_led5_gnd', 'w_led6_gnd', 'w_led7_gnd'],
      activeInputs: { CLK: 0, D0: 0, D1: 0 },
    },
    {
      title: 'Test: Load D=0b10110100, apply CLK',
      body: 'Set D7=1, D6=0, D5=1, D4=1, D3=0, D2=1, D1=0, D0=0. ' +
        'Apply a rising CLK edge. Q7–Q0 immediately reflect the data: 1,0,1,1,0,1,0,0. ' +
        'LEDs Q7, Q5, Q4, Q2 should light up (bits that are 1). ' +
        'This demonstrates parallel output from serial-style loading.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8',
             'r_q0', 'r_q1', 'r_q2', 'r_q3', 'r_q4', 'r_q5', 'r_q6', 'r_q7',
             'led_q0', 'led_q1', 'led_q2', 'led_q3', 'led_q4', 'led_q5', 'led_q6', 'led_q7',
             'w_q0_r', 'w_q1_r', 'w_q2_r', 'w_q3_r', 'w_q4_r', 'w_q5_r', 'w_q6_r', 'w_q7_r',
             'w_r0_led', 'w_r1_led', 'w_r2_led', 'w_r3_led', 'w_r4_led', 'w_r5_led', 'w_r6_led', 'w_r7_led',
             'w_led0_gnd', 'w_led1_gnd', 'w_led2_gnd', 'w_led3_gnd',
             'w_led4_gnd', 'w_led5_gnd', 'w_led6_gnd', 'w_led7_gnd'],
      activeInputs: { CLK: 1, D0: 0, D1: 0 },
    },
  ],

  truthTable: {
    inputs:  ['CLK_edge', 'D[7:0]'],
    outputs: ['Q[7:0]'],
    rows: [
      { inputs: { CLK_edge: 0, 'D[7:0]': 0 }, outputs: { 'Q[7:0]': 0 } },
      { inputs: { CLK_edge: 1, 'D[7:0]': 0 }, outputs: { 'Q[7:0]': 0 } },
      { inputs: { CLK_edge: 1, 'D[7:0]': 180 }, outputs: { 'Q[7:0]': 180 } },
      { inputs: { CLK_edge: 1, 'D[7:0]': 255 }, outputs: { 'Q[7:0]': 255 } },
    ],
  },
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A shift register is a sequential logic circuit that stores multiple bits of data, with the ' +
        'ability to shift the stored data one position on each clock pulse. The 74HC273 is an 8-bit ' +
        'D-type flip-flop register — on each rising edge of the CLK signal, the values present on ' +
        'D0–D7 are captured into the internal flip-flops and simultaneously appear on Q0–Q7.',

        'The Serial-In Parallel-Out (SIPO) operating mode applies data bit by bit on a single data line ' +
        'through multiple clock cycles, progressively filling the register. After 8 clock cycles, all ' +
        '8 bits are stored and all 8 Q outputs are valid in parallel. This is used in serial-to-parallel ' +
        'conversion — for example, receiving serial data from a UART and feeding it to an 8-bit data bus.',

        'The four fundamental shift register configurations are: ' +
        'SIPO (Serial-In Parallel-Out) — serial data in, all bits out simultaneously; ' +
        'SISO (Serial-In Serial-Out) — data shifts through, last bit exits serially; ' +
        'PIPO (Parallel-In Parallel-Out) — all bits loaded at once, output simultaneously; ' +
        'PISO (Parallel-In Serial-Out) — all bits loaded at once, output shifted out serially.',

        'The 74HC273 has an active-low Master Reset pin (MR_bar). When pulled LOW, all Q outputs are ' +
        'asynchronously cleared to 0 regardless of CLK or D inputs. In this experiment MR_bar is tied ' +
        'HIGH to keep the register in normal operating mode. The clock input is edge-triggered (rising ' +
        'edge) — data is captured only at the moment the clock transitions from LOW to HIGH.',

        'Applications of shift registers include: serial communication interfaces (SPI, I²C, UART), ' +
        'LED display drivers (chained 74HC595 for many outputs from few pins), digital delay lines, ' +
        'and pseudo-random number generators (using feedback XOR — LFSR).',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC273 Register IC',      specification: '8-bit D flip-flop, DIP-20, 5 V supply',       quantity: '1' },
        { name: 'LED (assorted colours)',   specification: '5 mm LEDs for Q0–Q7 outputs',                  quantity: '8' },
        { name: 'Resistor 330 Ω',           specification: '¼ W, carbon film, current limiter per LED',    quantity: '8' },
        { name: 'Push Button',              specification: 'Momentary, for CLK input',                     quantity: '1' },
        { name: 'DIP Switch (8-position)',  specification: 'For D0–D7 data inputs',                        quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
        { name: 'Digital Multimeter',       specification: 'For verifying supply voltage and continuity',  quantity: '1' },
        { name: 'Connecting Wires',         specification: 'M-M jumper wires, assorted colours',           quantity: '1 set' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Inspect and place the breadboard.',
          circuitStepIndex: 0,
          body: 'Place the breadboard on a clean, dry surface. ' +
            'The centre gap isolates both banks of the DIP-20 IC. ' +
            'Red rail = VCC (+5 V), blue rail = GND.',
        },
        {
          label: 'Mount the 74HC273 DIP-20 IC at column 3.',
          circuitStepIndex: 1,
          body: 'Orient the 74HC273 so that pin 1 (MR_bar) is at the top-left, straddling the centre gap. ' +
            'Columns 3–12 are occupied (10 pins per side for a 20-pin DIP). ' +
            'Press firmly until all 20 pins are seated. ' +
            'The top-bank pins are the data and control inputs; the bottom-bank pins are the Q outputs.',
        },
        {
          label: 'Tie MR_bar HIGH and wire CLK.',
          circuitStepIndex: 2,
          body: 'Connect a red wire from the VCC rail to pin MR_bar (col 3, row e) — this disables reset. ' +
            'Connect an orange wire from col 1, row a to the CLK pin (col 4, row f). ' +
            'Connect your push-button between VCC and the CLK input node for manual clocking.',
        },
        {
          label: 'Wire D0 and D1 data inputs.',
          circuitStepIndex: 3,
          body: 'Red wire: col 2 row a → D0 pin (col 4, row e). ' +
            'Blue wire: col 2 row b → D1 pin (col 5, row e). ' +
            'Connect D2–D7 pins to the GND rail (all LOW by default). ' +
            'Connect the 8-position DIP switch outputs to the D0–D7 nodes for full control.',
        },
        {
          label: 'Place 8 output LEDs and resistors.',
          circuitStepIndex: 4,
          body: 'Insert 330 Ω resistors at cols 14, 14, 17, 17, 20, 20, 23, 23 (alternating rows c and h). ' +
            'Insert LEDs for Q0–Q7 at cols 16, 16, 19, 19, 22, 22, 25, 25 (alternating rows c and h). ' +
            'Always keep the resistor in series before the LED anode.',
        },
        {
          label: 'Connect Q0–Q7 to resistors and LEDs.',
          circuitStepIndex: 5,
          body: 'Wire each Q pin (on bottom bank, row f) through its 330 Ω resistor to its LED anode. ' +
            'Connect all eight LED cathodes to the GND rail. ' +
            'Connect VCC pin of the 74HC273 (pin 20, col 12 row f) to the VCC rail. ' +
            'Connect GND pin (pin 10, col 3 row f — note: check datasheet pin numbering) to GND rail.',
        },
        {
          label: 'Load data and apply clock.',
          circuitStepIndex: 6,
          body: 'Set D7–D0 = 1011 0100 (0xB4 = 180 decimal) using the DIP switches. ' +
            'Press the CLK push-button (apply a rising edge). ' +
            'Observe: Q7, Q5, Q4, Q2 LEDs should light up (bits that are 1 in 0xB4). ' +
            'Change the data inputs and clock again — outputs update immediately on the next rising edge.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. 74HC273 powered from the same VCC/GND rails.',
        'LED forward voltages: red ≈ 1.8 V, yellow ≈ 2.1 V, green ≈ 2.0 V. Series resistors = 330 Ω.',
        'The Q outputs change only on the rising edge of CLK — verify this by changing D inputs without clocking.',
        'With MR_bar = LOW (momentarily ground it), all Q outputs go to 0 regardless of CLK.',
      ],
      table: {
        headers: ['D[7:0] (binary)', 'D (hex)', 'CLK edge', 'Q[7:0]', 'LEDs ON (bit positions)'],
        rows: [
          ['0000 0000', '0x00', 'Rising', '0000 0000', 'None'],
          ['1111 1111', '0xFF', 'Rising', '1111 1111', 'Q7–Q0 all ON'],
          ['1011 0100', '0xB4', 'Rising', '1011 0100', 'Q7, Q5, Q4, Q2'],
          ['0101 0101', '0x55', 'Rising', '0101 0101', 'Q6, Q4, Q2, Q0'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 8-bit SIPO register was successfully built using the 74HC273 IC. All 8 Q output LEDs ' +
        'correctly reflected the D0–D7 input data on each rising CLK edge, confirming proper ' +
        'register operation.',

        'The edge-triggered nature of the register was verified: changing D inputs without applying ' +
        'a clock edge had no effect on the Q outputs. The synchronous behaviour ensures that data ' +
        'is only transferred at the controlled moment of the clock edge.',

        'The Master Reset function was tested by briefly pulling MR_bar LOW — all eight output ' +
        'LEDs immediately extinguished regardless of the data inputs, demonstrating asynchronous reset. ' +
        'This circuit serves as a building block for serial-to-parallel data converters, LED display ' +
        'drivers, and any application requiring the conversion of serial data streams into parallel form.',
      ],
    },
  ],
};
