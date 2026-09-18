import { type Experiment } from '@/experiments/types';

export const AdcDac: Experiment = {
  id: 'adc-dac',
  title: 'ADC and DAC Interfacing',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 4,
    subject: 'Peripheral Interfacing',
    description: 'Interface an ADC0804 to read analog voltage from a potentiometer. Build an R-2R DAC ladder to convert 4-bit digital input to analog output.',
    tags: ['adc', 'dac', 'analog', 'digital conversion', 'r-2r', 'potentiometer'],
  },
  metaTitle: 'ADC and DAC Interfacing — VLabs',
  metaDescription: 'Interface an ADC0804 to read analog voltage from a potentiometer. Build an R-2R DAC ladder to convert 4-bit digital input to analog output.',
  circuit: {
  id: 'adc-dac',
  title: 'ADC / DAC (R-2R Ladder)',
  description:
    'A 4-bit R-2R resistor ladder DAC (Digital-to-Analog Converter). ' +
    'Alternating 2 kΩ (shunt) and 1 kΩ (series) resistors form a binary-weighted voltage divider. ' +
    'Each input bit contributes a proportional voltage to the analog output. ' +
    'The green LED brightness indicates the output analog level.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Ladder resistors ──────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 2000, mountedAt: { board: 'bb', col: 3,  row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r3', type: 'resistor', ohms: 2000, mountedAt: { board: 'bb', col: 13, row: 'c' } },
    { id: 'r4', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 18, row: 'c' } },

    // ── Output LED ────────────────────────────────────────────────────────
    { id: 'led_out', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 23, row: 'c' } },

    // ── Bit 0 (LSB): VCC → r1 p1 (shunt input) ──────────────────────────
    { id: 'w_bit0_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r1', end: 'p1' } },

    // ── r1 p2 → ladder junction (col 6, row c) → r2 p1 ──────────────────
    { id: 'w_r1_junc1', type: 'wire', color: 'white',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 6, row: 'c' } },
    { id: 'w_junc1_r2', type: 'wire', color: 'white',
      from: { board: 'bb', col: 6, row: 'd' },
      to:   { component: 'r2', end: 'p1' } },

    // ── Bit 1: VCC → junction at r2-r3 (col 11 row d) ───────────────────
    { id: 'w_bit1_junc2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 11 },
      to:   { board: 'bb', col: 11, row: 'b' } },

    // ── r2 p2 → junction 2 (col 11, row c) → r3 p1 ─────────────────────
    { id: 'w_r2_junc2', type: 'wire', color: 'white',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 11, row: 'c' } },
    { id: 'w_junc2_r3', type: 'wire', color: 'white',
      from: { board: 'bb', col: 11, row: 'd' },
      to:   { component: 'r3', end: 'p1' } },

    // ── Bit 2: VCC → junction at r3-r4 (col 16 row d) ───────────────────
    { id: 'w_bit2_junc3', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 16 },
      to:   { board: 'bb', col: 16, row: 'b' } },

    // ── r3 p2 → junction 3 (col 16, row c) → r4 p1 ─────────────────────
    { id: 'w_r3_junc3', type: 'wire', color: 'white',
      from: { component: 'r3', end: 'p2' },
      to:   { board: 'bb', col: 16, row: 'c' } },
    { id: 'w_junc3_r4', type: 'wire', color: 'white',
      from: { board: 'bb', col: 16, row: 'd' },
      to:   { component: 'r4', end: 'p1' } },

    // ── Bit 3 (MSB): VCC → junction at r4 output (col 21 row d) ─────────
    { id: 'w_bit3_junc4', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 21 },
      to:   { board: 'bb', col: 21, row: 'b' } },

    // ── r4 p2 → output junction (col 21, row c) → LED anode ─────────────
    { id: 'w_r4_out', type: 'wire', color: 'green',
      from: { component: 'r4', end: 'p2' },
      to:   { board: 'bb', col: 21, row: 'c' } },
    { id: 'w_out_led', type: 'wire', color: 'green',
      from: { board: 'bb', col: 21, row: 'd' },
      to:   { led: 'led_out', end: 'anode' } },

    // ── LED cathode → GND ────────────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 24 } },

    // ── Shunt GND connections (r1 and r3 lower ends) ─────────────────────
    { id: 'w_r1_gnd', type: 'wire', color: 'black',
      from: { board: 'bb', col: 6, row: 'e' },
      to:   { board: 'bb', rail: 'gnd_top', col: 6 } },
    { id: 'w_r3_gnd', type: 'wire', color: 'black',
      from: { board: 'bb', col: 16, row: 'e' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a 4-bit R-2R ladder DAC — ' +
        'a simple digital-to-analog converter using only resistors.',
      show: ['bb'],
    },
    {
      title: 'Place the ladder resistors',
      body: 'Insert R1 (2 kΩ, col 3), R2 (1 kΩ, col 8), R3 (2 kΩ, col 13), R4 (1 kΩ, col 18) — all row c. ' +
        'The alternating 2R/R pattern creates binary-weighted voltage division.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4'],
      highlight: 'r1',
    },
    {
      title: 'Place the output LED',
      body: 'Insert the green LED at col 23, row c. Its brightness is proportional to the ' +
        'analog output voltage of the DAC.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out'],
      highlight: 'led_out',
    },
    {
      title: 'Wire the ladder chain',
      body: 'White wires connect each resistor to the next through junction nodes. ' +
        'This forms the R-2R ladder backbone: r1 → r2 → r3 → r4 → output.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4'],
    },
    {
      title: 'Wire digital input taps',
      body: 'Red wires: VCC rail → each ladder junction (bits 0–3). ' +
        'Each bit tap adds a binary-weighted contribution to the output. ' +
        'In practice, these would be driven by digital logic HIGH/LOW.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4',
        'w_bit0_r1', 'w_bit1_junc2', 'w_bit2_junc3', 'w_bit3_junc4'],
    },
    {
      title: 'Wire output and GND connections',
      body: 'Green wires: r4 output → LED anode. Black wires: LED cathode → GND, ' +
        'shunt resistor GND taps. The ladder is complete.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4',
        'w_bit0_r1', 'w_bit1_junc2', 'w_bit2_junc3', 'w_bit3_junc4',
        'w_r4_out', 'w_out_led', 'w_led_gnd', 'w_r1_gnd', 'w_r3_gnd'],
    },
    {
      title: 'Test the DAC',
      body: 'Toggle each input bit (connect to VCC or GND). With all bits HIGH (1111 = 15), ' +
        'output is near VCC. With 1000 (MSB only), output ≈ VCC/2. ' +
        'The LED brightness changes proportionally to the digital input value.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4',
        'w_bit0_r1', 'w_bit1_junc2', 'w_bit2_junc3', 'w_bit3_junc4',
        'w_r4_out', 'w_out_led', 'w_led_gnd', 'w_r1_gnd', 'w_r3_gnd'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An Analog-to-Digital Converter (ADC) samples a continuous analog voltage and converts it into a discrete binary number. The resolution of an n-bit ADC is 1/2ⁿ of the full-scale range (FSR). For an 8-bit ADC (e.g., ADC0804) with a 5 V reference, the Least Significant Bit (LSB) corresponds to 5/256 ≈ 19.5 mV — the smallest distinguishable voltage step. The digital output D = round(V_in / LSB) for an ideal ADC. Key specifications include: resolution (bits), conversion time, input voltage range, and reference voltage.',
        'The ADC0804 is an 8-bit successive-approximation ADC in a DIP-20 package. It operates from 5 V, accepts a 0–5 V single-ended input, and requires a clock (RC oscillator formed by an external resistor and capacitor on pins CLK IN/CLK R — typically R=10 kΩ, C=100 pF for ≈ 640 kHz). The /WR pin initiates a conversion when pulsed LOW; the /RD pin enables the output data bus; INTR goes LOW when conversion is complete (indicating new data is ready). The 8 output bits (D0–D7) represent the digital equivalent of the analog input.',
        'A Digital-to-Analog Converter (DAC) performs the reverse: it converts an n-bit digital code to a proportional analog voltage. The R-2R ladder network is a passive DAC that requires only two resistor values (R and 2R) in a ladder structure. For a 4-bit R-2R DAC with a reference voltage Vref = 5 V: V_out = Vref × (D3/2 + D2/4 + D1/8 + D0/16), where D3 is the MSB. The output voltage steps are Vref/2ⁿ = 5/16 ≈ 312.5 mV per LSB for a 4-bit DAC.',
        'Together, ADC and DAC are the bridge between the analog physical world and the digital processing domain. They appear in every data acquisition system, audio codec, motor controller, and sensor interface. This experiment covers the complete ADC–DAC signal chain: an analog voltage from a potentiometer is digitised by the ADC0804, the 8-bit result is displayed on LEDs, and independently, a 4-bit R-2R DAC reconstructs an analog voltage from a 4-bit switch input.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'ADC0804 IC', specification: 'DIP-20, 8-bit SAR ADC, 0-5 V input', quantity: '1' },
        { name: 'Potentiometer', specification: '10 kΩ linear, for analog input voltage source', quantity: '1' },
        { name: 'Capacitor C_clk', specification: '100 pF ceramic (ADC clock oscillator)', quantity: '1' },
        { name: 'Resistor R_clk', specification: '10 kΩ (ADC clock oscillator with C_clk)', quantity: '1' },
        { name: 'Resistors for R-2R DAC (R)', specification: '10 kΩ, ±1%, 0.25 W', quantity: '4' },
        { name: 'Resistors for R-2R DAC (2R)', specification: '20 kΩ (or two 10 kΩ in series), ±1%', quantity: '5' },
        { name: 'LED (ADC output display)', specification: '5 mm red LED', quantity: '8' },
        { name: 'Resistor (LED current limiting)', specification: '330 Ω, 0.25 W', quantity: '8' },
        { name: 'SPDT Switch', specification: 'DAC 4-bit input (D3–D0)', quantity: '4' },
        { name: 'Digital Multimeter', specification: 'Voltage measurement for ADC input and DAC output', quantity: '1' },
        { name: 'DC Power Supply', specification: '5 V regulated, ≥ 500 mA', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '40' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the ADC0804 interface circuit',
          body: 'Insert the ADC0804 (DIP-20) on the breadboard. Connect pin 20 (Vcc) and pin 1 (CS\') to +5 V; pins 8 (AGND) and 10 (DGND) to GND. Build the clock oscillator: connect a 10 kΩ resistor from pin 19 (CLK R) to pin 4 (CLK IN), and a 100 pF capacitor from pin 4 to GND. This generates approximately 640 kHz for the successive approximation clock. Connect pin 9 (Vref/2) to a voltage divider or leave unconnected (which defaults to Vcc/2 = 2.5 V, giving a 0–5 V input range).',
          circuitStepIndex: 0,
        },
        {
          label: 'Connect potentiometer as analog input',
          body: 'Wire the 10 kΩ potentiometer: one end to +5 V, the other end to GND, and the wiper (centre tap) to pin 6 (VIN+) of the ADC0804. Connect pin 7 (VIN−) to GND. The potentiometer allows the analog input voltage V_in to be varied continuously from 0 V to 5 V. Connect pins 11–18 (D0–D7, 8-bit output) through 330 Ω resistors to eight LEDs (D0 = LSB = LED0, D7 = MSB = LED7).',
          circuitStepIndex: 1,
        },
        {
          label: 'Initiate and read conversions',
          body: 'Tie /CS (pin 1) to GND (always chip-selected). Connect /WR (pin 3) and /RD (pin 2) both to GND to run the ADC in free-running conversion mode (the /WR–/RD–INTR loop allows auto-restart). In this mode the ADC continuously converts and updates its output register. Adjust the potentiometer and observe the LED binary pattern change. Measure V_in with a voltmeter and record the corresponding LED binary output.',
          circuitStepIndex: 2,
        },
        {
          label: 'Build the 4-bit R-2R ladder DAC',
          body: 'Construct a 4-bit R-2R ladder DAC on the remaining breadboard space. Use four 10 kΩ (R) and five 20 kΩ (2R) resistors in the standard R-2R ladder topology. The ladder has four input nodes connected to four switches (D3=MSB to D0=LSB); each switch connects the node to either +5 V (logic 1) or GND (logic 0). The output node (rightmost) is the analog output V_out. Connect V_out to the voltmeter positive probe.',
          circuitStepIndex: 3,
        },
        {
          label: 'Test DAC with all 16 input codes',
          body: 'Apply all sixteen 4-bit input codes from 0000 to 1111 to the DAC input switches. For each code, measure V_out with the voltmeter. The expected output is V_out = 5 × (code / 16) V. For code 0000, V_out = 0 V; for code 1111 (decimal 15), V_out = 5 × 15/16 = 4.6875 V. Record all sixteen measured voltages and compare with expected values. Calculate the DNL (Differential Non-Linearity) error for any steps that deviate from the ideal 312.5 mV step size.',
          circuitStepIndex: 3,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Part A — ADC: Measured V_in and corresponding 8-bit digital output. Part B — 4-bit R-2R DAC: digital input code versus measured output voltage.',
      ],
      table: {
        headers: ['DAC Code (Decimal)', 'D3 D2 D1 D0', 'V_out Expected (V)', 'V_out Measured (V)', 'Error (mV)'],
        rows: [
          [0, '0000', 0.000, 0.003, 3],
          [1, '0001', 0.3125, 0.310, 2.5],
          [2, '0010', 0.625, 0.621, 4],
          [4, '0100', 1.250, 1.246, 4],
          [7, '0111', 2.1875, 2.182, 5.5],
          [8, '1000', 2.500, 2.494, 6],
          [12, '1100', 3.750, 3.742, 8],
          [15, '1111', 4.6875, 4.678, 9.5],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The ADC0804 interface was successfully implemented. In free-running mode, the 8-bit LED output correctly tracked the potentiometer input voltage across the full 0–5 V range. The digital code increased monotonically as V_in increased, confirming correct ADC operation.',
        'The 4-bit R-2R ladder DAC produced output voltages closely matching the theoretical V_out = Vref × Code/16 formula. The maximum measured error was less than 10 mV (< 3.2% FSR for a 4-bit DAC), which is within the 0.5 LSB (156 mV) accuracy expected from this passive architecture with ±1% resistors.',
        'Together these circuits demonstrate the complete analog-digital interface chain. The ADC converts physical quantities to digital data for processing; the DAC converts digital results back to analog control or audio signals. Understanding these conversions is fundamental to all mixed-signal systems including audio codecs, sensor data acquisition boards, motor drive controllers, and software-defined radio.',
      ],
    },
  ],
};
