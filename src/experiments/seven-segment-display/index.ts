import { type Experiment } from '@/experiments/types';

export const SevenSegmentDisplay: Experiment = {
  id: 'seven-segment-display',
  title: 'Seven Segment Display Interface',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 4,
    subject: 'Peripheral Interfacing',
    description: 'Drive a common-cathode 7-segment display using a decoder IC with 330 Ω current-limiting resistors. Display digits 0–9.',
    tags: ['seven segment', 'display', 'decoder', '74hc138', 'current limiting'],
  },
  metaTitle: 'Seven Segment Display Interface — VLabs',
  metaDescription: 'Drive a common-cathode 7-segment display using a decoder IC with 330 Ω current-limiting resistors. Display digits 0–9.',
  circuit: {
  id: 'seven-segment-display',
  title: 'Seven Segment Display',
  description:
    'A seven-segment display built from 7 individual LEDs (segments a through g), ' +
    'each driven through a 330 Ω current-limiting resistor. ' +
    'By selectively enabling segments, any decimal digit (0–9) can be displayed.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Resistors (330 Ω each) ────────────────────────────────────────────
    { id: 'r_a', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 3,  row: 'c' } },
    { id: 'r_b', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'r_c', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r_d', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 8,  row: 'h' } },
    { id: 'r_e', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 13, row: 'c' } },
    { id: 'r_f', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 13, row: 'h' } },
    { id: 'r_g', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 18, row: 'c' } },

    // ── LEDs (segments a–g) ───────────────────────────────────────────────
    { id: 'led_a', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'led_b', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'led_c', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_d', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_e', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'led_f', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 29, row: 'h' } },
    { id: 'led_g', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 32, row: 'c' } },

    // ── VCC → resistors ──────────────────────────────────────────────────
    { id: 'w_vcc_ra', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 3 },  to: { component: 'r_a', end: 'p1' } },
    { id: 'w_vcc_rb', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 2 },  to: { component: 'r_b', end: 'p1' } },
    { id: 'w_vcc_rc', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 8 },  to: { component: 'r_c', end: 'p1' } },
    { id: 'w_vcc_rd', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 7 },  to: { component: 'r_d', end: 'p1' } },
    { id: 'w_vcc_re', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 13 }, to: { component: 'r_e', end: 'p1' } },
    { id: 'w_vcc_rf', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 12 }, to: { component: 'r_f', end: 'p1' } },
    { id: 'w_vcc_rg', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 18 }, to: { component: 'r_g', end: 'p1' } },

    // ── Resistors → LED anodes ───────────────────────────────────────────
    { id: 'w_ra_leda', type: 'wire', color: 'orange', from: { component: 'r_a', end: 'p2' }, to: { led: 'led_a', end: 'anode' } },
    { id: 'w_rb_ledb', type: 'wire', color: 'orange', from: { component: 'r_b', end: 'p2' }, to: { led: 'led_b', end: 'anode' } },
    { id: 'w_rc_ledc', type: 'wire', color: 'orange', from: { component: 'r_c', end: 'p2' }, to: { led: 'led_c', end: 'anode' } },
    { id: 'w_rd_ledd', type: 'wire', color: 'orange', from: { component: 'r_d', end: 'p2' }, to: { led: 'led_d', end: 'anode' } },
    { id: 'w_re_lede', type: 'wire', color: 'orange', from: { component: 'r_e', end: 'p2' }, to: { led: 'led_e', end: 'anode' } },
    { id: 'w_rf_ledf', type: 'wire', color: 'orange', from: { component: 'r_f', end: 'p2' }, to: { led: 'led_f', end: 'anode' } },
    { id: 'w_rg_ledg', type: 'wire', color: 'orange', from: { component: 'r_g', end: 'p2' }, to: { led: 'led_g', end: 'anode' } },

    // ── LED cathodes → GND ───────────────────────────────────────────────
    { id: 'w_leda_gnd', type: 'wire', color: 'black', from: { led: 'led_a', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 24 } },
    { id: 'w_ledb_gnd', type: 'wire', color: 'black', from: { led: 'led_b', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 25 } },
    { id: 'w_ledc_gnd', type: 'wire', color: 'black', from: { led: 'led_c', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 27 } },
    { id: 'w_ledd_gnd', type: 'wire', color: 'black', from: { led: 'led_d', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 28 } },
    { id: 'w_lede_gnd', type: 'wire', color: 'black', from: { led: 'led_e', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 30 } },
    { id: 'w_ledf_gnd', type: 'wire', color: 'black', from: { led: 'led_f', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 31 } },
    { id: 'w_ledg_gnd', type: 'wire', color: 'black', from: { led: 'led_g', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 33 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a seven-segment display from 7 individual LEDs, ' +
        'each representing one segment (a through g).',
      show: ['bb'],
    },
    {
      title: 'Place all 7 segment LEDs',
      body: 'Insert 7 red LEDs: led_a through led_g. These represent the seven segments of the display. ' +
        'Segments a-c-e-g on the top bank, b-d-f on the bottom bank.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g'],
      highlight: 'led_a',
    },
    {
      title: 'Place all 7 current-limiting resistors',
      body: 'Insert 7 × 330 Ω resistors (r_a through r_g). Each limits current to ~10 mA per segment.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g'],
      highlight: 'r_a',
    },
    {
      title: 'Wire VCC to all resistors',
      body: 'Red wires: VCC rail → each resistor p1. In practice, a BCD-to-7-segment decoder IC ' +
        'would selectively drive each segment.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g',
        'w_vcc_ra', 'w_vcc_rb', 'w_vcc_rc', 'w_vcc_rd', 'w_vcc_re', 'w_vcc_rf', 'w_vcc_rg'],
    },
    {
      title: 'Wire resistors to LED anodes',
      body: 'Orange wires: each resistor p2 → corresponding LED anode. ' +
        'Seven parallel paths, one per segment.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g',
        'w_vcc_ra', 'w_vcc_rb', 'w_vcc_rc', 'w_vcc_rd', 'w_vcc_re', 'w_vcc_rf', 'w_vcc_rg',
        'w_ra_leda', 'w_rb_ledb', 'w_rc_ledc', 'w_rd_ledd', 'w_re_lede', 'w_rf_ledf', 'w_rg_ledg'],
    },
    {
      title: 'Wire all LED cathodes to GND — display complete',
      body: 'Black wires: all LED cathodes → GND rail. With all segments lit, the display shows "8". ' +
        'Selectively disconnecting segments displays other digits (e.g., a+b+c+d+e+f = "0", b+c = "1").',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g',
        'w_vcc_ra', 'w_vcc_rb', 'w_vcc_rc', 'w_vcc_rd', 'w_vcc_re', 'w_vcc_rf', 'w_vcc_rg',
        'w_ra_leda', 'w_rb_ledb', 'w_rc_ledc', 'w_rd_ledd', 'w_re_lede', 'w_rf_ledf', 'w_rg_ledg',
        'w_leda_gnd', 'w_ledb_gnd', 'w_ledc_gnd', 'w_ledd_gnd', 'w_lede_gnd', 'w_ledf_gnd', 'w_ledg_gnd'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A seven-segment display (SSD) consists of seven LED segments (labelled a–g) arranged in the shape of a figure-8, plus an optional decimal point (dp). By selectively illuminating subsets of these segments, digits 0–9 (and some letters) can be displayed. Two types exist: common-cathode (CC) — all cathodes share a common GND, segments are enabled by driving the anode HIGH — and common-anode (CA) — all anodes share Vcc, segments are enabled by driving the cathode LOW (active LOW).',
        'A Binary-Coded Decimal (BCD) to 7-segment decoder such as the 74HC4511 (CC driver) or 74HC4543 accepts a 4-bit BCD input (D, C, B, A where A is LSB) and automatically drives the correct segment lines to display the corresponding decimal digit (0–9). For inputs 10–15 (invalid BCD), most decoders either blank the display or show undefined segments. The 74HC4511 also provides latch, blanking (BL\'), and lamp test (LT\') inputs.',
        'If a BCD decoder IC is unavailable, a 2:4 decoder (74HC139) can drive a limited subset of display patterns. However, for full 0–9 display, a 7-segment decoder is the appropriate component. Each segment requires a 330 Ω current-limiting resistor (at 5 V, I_seg = (5−2)/330 ≈ 9 mA), and the decoder IC must be capable of sinking or sourcing the combined segment current.',
        'In this experiment, a common-cathode 7-segment display is driven by a 74HC4511 BCD-to-7-segment decoder. Four input switches (D, C, B, A) set the BCD digit value. The decoded segment outputs illuminate the correct segments through 330 Ω resistors. All ten digits 0–9 are verified. The decoder circuit demonstrates the practical application of decoders in human-readable digital output interfaces.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC4511 BCD to 7-Segment Decoder/Driver IC', specification: 'DIP-16, for common-cathode display', quantity: '1' },
        { name: 'Common Cathode 7-Segment Display', specification: '5161AS or equivalent, 0.56 inch, red', quantity: '1' },
        { name: 'Resistor (segment current limiting)', specification: '330 Ω, 0.25 W (7 resistors — one per segment)', quantity: '7' },
        { name: 'SPDT Switch / Jumper', specification: 'BCD input (D, C, B, A)', quantity: '4' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '25' },
        { name: 'Digital Multimeter', specification: 'Voltage measurement', quantity: '1' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Insert ICs and display on breadboard',
          body: 'Place the 74HC4511 DIP-16 IC on the breadboard straddling the centre groove. Place the 7-segment display (DIP-10 package) in a separate section. Connect pin 16 (Vcc) of the 74HC4511 to +5 V and pin 8 (GND) to ground. Connect the common cathode pin(s) of the display directly to GND. Identify the segment pin mapping of the display using the datasheet — pin numbers for segments a, b, c, d, e, f, g and the common cathode.',
          circuitStepIndex: 0,
        },
        {
          label: 'Connect segment outputs through resistors',
          body: 'Connect each segment output of the 74HC4511 (pins 13=a, 12=b, 11=c, 10=d, 9=e, 15=f, 14=g) through a 330 Ω resistor to the corresponding segment anode of the display. The resistors limit segment current to ≈9 mA per segment. Do not connect the decimal point (dp) unless desired. Verify each resistor–LED chain for correct polarity — the segment LED anode is the display input pin, not the common cathode.',
          circuitStepIndex: 1,
        },
        {
          label: 'Set control pins of 74HC4511',
          body: 'The 74HC4511 has three control inputs: LT\' (Lamp Test, pin 3), BL\' (Blanking, pin 4), and LE (Latch Enable, pin 5). For normal operation, tie LT\' and BL\' to +5 V (active-low, so HIGH = disabled, meaning lamp test and blanking are both off). Tie LE to GND (latch enable LOW = transparent latch, output follows input). Connect the four BCD inputs A (pin 7), B (pin 1), C (pin 2), D (pin 6) to their respective switches.',
          circuitStepIndex: 2,
        },
        {
          label: 'Display digits 0–9 and verify segments',
          body: 'Set the input switches to each BCD code from 0000 (digit 0) to 1001 (digit 9). For each setting, verify that the correct digit is illuminated on the 7-segment display. For digit 0: segments a, b, c, d, e, f should be ON, g OFF. For digit 1: only b, c ON. For digit 8: all segments ON. Record which segments are lit for each digit and compare with the standard 7-segment encoding table.',
          circuitStepIndex: 3,
        },
        {
          label: 'Test blanking and latch functions',
          body: 'Pull BL\' (pin 4) to GND momentarily — all segments should extinguish (blank display), confirming the blanking function. Restore BL\' to +5 V. Now set LE (pin 5) HIGH (latch enable): the display should hold the currently displayed digit even if the input switches are changed. Change the BCD input to a different digit — the display should remain unchanged. Pull LE LOW again to return to transparent (real-time) mode. Document the latch behaviour.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Segment activation for each BCD digit (1 = segment ON, 0 = segment OFF). Common-cathode display, 74HC4511 decoder.',
      ],
      table: {
        headers: ['Digit', 'BCD (DCBA)', 'seg-a', 'seg-b', 'seg-c', 'seg-d', 'seg-e', 'seg-f', 'seg-g', 'Display correct?'],
        rows: [
          [0, '0000', 1, 1, 1, 1, 1, 1, 0, 'Yes'],
          [1, '0001', 0, 1, 1, 0, 0, 0, 0, 'Yes'],
          [2, '0010', 1, 1, 0, 1, 1, 0, 1, 'Yes'],
          [3, '0011', 1, 1, 1, 1, 0, 0, 1, 'Yes'],
          [4, '0100', 0, 1, 1, 0, 0, 1, 1, 'Yes'],
          [5, '0101', 1, 0, 1, 1, 0, 1, 1, 'Yes'],
          [6, '0110', 1, 0, 1, 1, 1, 1, 1, 'Yes'],
          [7, '0111', 1, 1, 1, 0, 0, 0, 0, 'Yes'],
          [8, '1000', 1, 1, 1, 1, 1, 1, 1, 'Yes'],
          [9, '1001', 1, 1, 1, 1, 0, 1, 1, 'Yes'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 7-segment display interface using a 74HC4511 BCD-to-7-segment decoder was successfully implemented. All ten decimal digits (0–9) were correctly displayed, with the observed segment activation patterns matching the standard 7-segment encoding table.',
        'The blanking (BL\') and latch (LE) control functions were verified: blanking extinguished all segments on demand, and latching held the display state independently of input changes. These features are critical for flicker-free multiplexed multi-digit displays.',
        'This experiment demonstrates the complete pipeline from binary data to human-readable visual output — a fundamental interface in digital instruments, calculators, clocks, and scoreboards. The same principle extends to multiplexed multi-digit SSDs controlled by a microcontroller, where digits are addressed rapidly in sequence to create the illusion of simultaneous display.',
      ],
    },
  ],
};
