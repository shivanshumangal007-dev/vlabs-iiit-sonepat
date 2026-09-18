import { type Experiment } from '@/experiments/types';

export const StudyBasicComponents: Experiment = {
  id: 'study-basic-components',
  title: 'Study of basic electronic components and laboratory instruments',
  labType: 'breadboard',
  status: 'live',
  explore: {
    semester: 1,
    subject: 'Analog Electronics',
    description: 'Get familiar with resistors, capacitors, diodes, LEDs, transistors, and the breadboard. Learn to use the multimeter, function generator, and oscilloscope.',
    tags: ['components', 'instruments', 'breadboard', 'multimeter', 'oscilloscope'],
  },
  metaTitle: 'Study of basic electronic components and laboratory instruments — VLabs',
  metaDescription: 'Get familiar with resistors, capacitors, diodes, LEDs, transistors, and the breadboard. Learn to use the multimeter, function generator, and oscilloscope.',
  circuit: {
  id: 'study-basic-components',
  title: 'Study of Basic Electronic Components',
  description:
    'A visual introduction to basic electronic components: resistor, LED, and capacitor. ' +
    'Components are placed on a breadboard with wires showing a simple series circuit. ' +
    'No simulation — this lab is for identification and familiarisation.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',  type: 'resistor',  ohms: 470,        mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'led1', type: 'led',       color: 'red',     mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'c1',  type: 'capacitor', capacitance: 100,  mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── Wires: VCC → R1 → LED → GND ──────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    { id: 'w_r1_led', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The solderless breadboard is your build surface. ' +
        'Holes in the same column and bank (a–e or f–j) are electrically connected. ' +
        'Red rails = VCC (+5 V), blue rails = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 470 Ω resistor',
      body: 'Insert the resistor at cols 5–8, row c. ' +
        'Resistors limit current flow. The colour bands indicate the resistance value: ' +
        'Yellow-Violet-Brown = 470 Ω.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the LED',
      body: 'Insert the red LED at cols 10–11, row c. ' +
        'The longer leg (anode, col 10) connects towards the positive side. ' +
        'The shorter leg (cathode, col 11) connects towards ground. ' +
        'LEDs emit light when current flows through them in the forward direction.',
      show: ['bb', 'r1', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Place the 100 µF capacitor',
      body: 'Insert the electrolytic capacitor at cols 15–18, row c. ' +
        'Capacitors store charge. The longer lead is positive. ' +
        'The 100 µF rating tells you how much charge it can hold.',
      show: ['bb', 'r1', 'led1', 'c1'],
      highlight: 'c1',
    },
    {
      title: 'Wire the series circuit',
      body: 'Red wire: VCC rail → resistor left lead (p1). ' +
        'Orange jumper: resistor right lead (p2) → LED anode. ' +
        'Black wire: LED cathode → GND rail. ' +
        'Current path: VCC → R1 (limits current) → LED (emits light) → GND.',
      show: ['bb', 'r1', 'led1', 'c1', 'w_vcc_r1', 'w_r1_led', 'w_led_gnd'],
    },
  ],
},
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Electronic components are the building blocks of every circuit. Passive components — resistors, capacitors, and inductors — do not require an external power source to operate. Active components — diodes, transistors, and ICs — control or amplify electrical signals and generally require a supply voltage.',
        'A resistor opposes the flow of current and is characterised by its resistance in ohms (Ω). The colour-band code printed on the body encodes its value and tolerance. A capacitor stores energy in an electric field; its value is measured in farads (F), microfarads (µF), or picofarads (pF). An inductor stores energy in a magnetic field and is measured in henrys (H).',
        'Diodes are two-terminal semiconductor devices that allow current in one direction only. The anode is the positive terminal and the cathode (marked with a band) is the negative terminal. A light-emitting diode (LED) emits light when forward-biased. A Zener diode is designed to operate in reverse breakdown for voltage regulation.',
        'The breadboard is a solderless prototyping board. Holes in each terminal strip share a node along the same column (within a half). The two long rails provide VCC and GND. A regulated DC power supply, digital multimeter (DMM), function generator, and oscilloscope (CRO) are the core instruments you will use throughout the lab.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point solderless', quantity: '1' },
        { name: 'Resistors', specification: '100 Ω, 470 Ω, 1 kΩ, 10 kΩ (¼ W)', quantity: '2 each' },
        { name: 'Capacitors', specification: '100 nF ceramic, 47 µF electrolytic', quantity: '2 each' },
        { name: 'LED', specification: 'Red 5 mm, forward voltage ≈ 2 V', quantity: '2' },
        { name: '1N4148 Diode', specification: 'Silicon signal diode', quantity: '2' },
        { name: 'BC547 NPN Transistor', specification: 'TO-92 package', quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '0–12 V, 1 A', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'AC/DC voltage, current, resistance', quantity: '1' },
        { name: 'Function Generator', specification: '1 Hz – 1 MHz', quantity: '1' },
        { name: 'CRO / Oscilloscope', specification: '20 MHz dual channel', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Identify resistors using colour-band code.',
          circuitStepIndex: 0,
          body: 'Pick up a resistor and hold it with the tolerance band (gold or silver) on the right. Read the first three bands left to right: first digit, second digit, multiplier. Confirm the value with the DMM on resistance mode. Record the nominal value, tolerance, and measured value in your notebook.',
        },
        {
          label: 'Measure capacitor value with the DMM.',
          circuitStepIndex: 0,
          body: 'Set the multimeter to capacitance mode (Cx). Insert the capacitor leads into the test jacks, observing polarity for the electrolytic capacitor (longer lead = positive). Compare the reading with the body marking. Note how electrolytic capacitors have higher capacitance but lower voltage ratings than ceramics.',
        },
        {
          label: 'Test the diode using the DMM diode mode.',
          circuitStepIndex: 0,
          body: 'Set the DMM to diode test (→|). Place the red probe on the anode and black probe on the cathode. A good silicon diode reads approximately 0.55–0.70 V in forward bias. Swap the probes — the display should read OL (open circuit) in reverse bias. Record both readings.',
        },
        {
          label: 'Verify LED operation on the breadboard.',
          circuitStepIndex: 1,
          body: 'Insert a 330 Ω current-limiting resistor in series with the LED anode on the breadboard. Connect +5 V to the resistor and LED cathode to GND. The LED should light. Measure the voltage across the LED — it should be approximately 1.8–2.2 V. Now reverse the LED; it should not light.',
        },
        {
          label: 'Use the CRO to observe a sine wave.',
          circuitStepIndex: 4,
          body: 'Connect the function generator output to Channel 1 of the CRO. Set the generator to 1 kHz, 5 V peak-to-peak, sine wave. Adjust the CRO timebase to 0.5 ms/div and voltage scale to 2 V/div. Count the number of full cycles across 10 divisions and calculate the frequency. Verify against the generator setting.',
        },
        {
          label: 'Measure AC and DC voltages with the DMM.',
          circuitStepIndex: 4,
          body: 'Connect the DMM (set to ACV) across the function generator output. Note the RMS reading. Then switch to DCV — the reading should be near zero for a pure sine wave with no DC offset. Enable the DC offset on the generator (+2 V) and re-measure in both modes. Understand the difference between peak, peak-to-peak, and RMS values.',
        },
        {
          label: 'Explore the breadboard layout.',
          circuitStepIndex: 4,
          body: 'Using the DMM in continuity mode (buzzer), probe pairs of holes in the same terminal strip column — the meter should beep. Probe across the centre gap — no beep. Probe along the red power rail — continuous along the full length. This exercise builds spatial awareness of the breadboard internals essential for circuit assembly.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage: +5 V DC. Function generator: 1 kHz sine wave, 5 V peak-to-peak.',
        'Diode forward voltage (1N4148): approximately 0.62 V. LED forward voltage: approximately 2.0 V.',
        'LED current: I = (VCC − V_f) / R = (5 − 2.0) / 330 ≈ 9.1 mA.',
      ],
      table: {
        headers: ['Component', 'Marked Value', 'Measured Value', 'Within Tolerance?'],
        rows: [
          ['Resistor 1 (470 Ω)', '470 Ω ±5%', '—', '—'],
          ['Resistor 2 (1 kΩ)',  '1000 Ω ±5%', '—', '—'],
          ['Capacitor (100 nF)', '100 nF', '—', '—'],
          ['Capacitor (47 µF)', '47 µF', '—', '—'],
          ['1N4148 Diode V_f', '~0.65 V', '—', '—'],
          ['LED V_f (red)', '~2.0 V', '—', '—'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This experiment provided hands-on familiarity with the fundamental components and instruments of the electronics laboratory. Each component was identified, measured, and verified against its rated value, establishing good practice for all future experiments.',
        'The multimeter proved versatile across resistance, capacitance, voltage, and diode-test modes. The oscilloscope demonstrated its superiority over the multimeter for observing time-varying signals, enabling direct measurement of frequency, period, and amplitude.',
        'The breadboard layout was explored and its internal connectivity understood, which is essential for efficient and error-free circuit assembly. These foundational skills — component identification, instrument operation, and breadboard usage — underpin every experiment in this course.',
      ],
    },
  ],
};
