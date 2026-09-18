// ── Explore page data ──────────────────────────────────────────────────────
// Each subject groups a set of experiments. Semesters contain subjects.

// ── Experiments registry ──────────────────────────────────────────────────────
import { EXPERIMENTS_BY_ID } from '@/experiments';
import { type Experiment }   from '@/experiments/types';

/** Project a new-style Experiment into the ExploreExperiment shape. */
function toExploreExperiment(exp: Experiment): ExploreExperiment {
  return {
    id:          exp.id,
    title:       exp.title,
    description: exp.explore.description,
    circuitId:   exp.circuit?.id ?? exp.id,
    labRoute:    `/labs/${exp.id}`,
    tags:        exp.explore.tags,
  };
}

export type ExploreExperiment = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  labRoute?: string;
  tags: readonly string[];
};

export type ExploreSubject = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  experiments: ExploreExperiment[];
};

export type ExploreSemester = {
  id: string;
  label: string;
  subjects: ExploreSubject[];
};

// ── Semester 1 ─────────────────────────────────────────────────────────────
const SEMESTER_1: ExploreSemester = {
  id: 'semester-1',
  label: 'Semester 1',
  subjects: [
    {
      id: 'analog-electronics',
      title: 'Analog Electronics',
      description:
        'Study passive and active components, diode characteristics, rectifiers, and transistor amplifiers. ' +
        'Build and test real circuits on a breadboard using oscilloscopes and multimeters.',
      circuitId: 'study-basic-components',
      experiments: [
        // 'study-basic-components' migrated to src/experiments/study-basic-components/
        toExploreExperiment(EXPERIMENTS_BY_ID['study-basic-components']),
        // 'pn-junction-diode' migrated to src/experiments/pn-junction-diode/
        toExploreExperiment(EXPERIMENTS_BY_ID['pn-junction-diode']),
        // 'zener-diode' migrated to src/experiments/zener-diode/
        toExploreExperiment(EXPERIMENTS_BY_ID['zener-diode']),
        // 'zener-voltage-regulator' migrated to src/experiments/zener-voltage-regulator/
        toExploreExperiment(EXPERIMENTS_BY_ID['zener-voltage-regulator']),
        // 'half-wave-rectifier' migrated to src/experiments/half-wave-rectifier/
        toExploreExperiment(EXPERIMENTS_BY_ID['half-wave-rectifier']),
        // 'full-wave-rectifier' migrated to src/experiments/full-wave-rectifier/
        toExploreExperiment(EXPERIMENTS_BY_ID['full-wave-rectifier']),
        // 'rectifiers-capacitor-filters' migrated to src/experiments/rectifiers-capacitor-filters/
        toExploreExperiment(EXPERIMENTS_BY_ID['rectifiers-capacitor-filters']),
        // 'ce-amplifier' migrated to src/experiments/ce-amplifier/
        toExploreExperiment(EXPERIMENTS_BY_ID['ce-amplifier']),
        // 'cb-amplifier' migrated to src/experiments/cb-amplifier/
        toExploreExperiment(EXPERIMENTS_BY_ID['cb-amplifier']),
        // 'bjt-bias' migrated to src/experiments/bjt-bias/
        toExploreExperiment(EXPERIMENTS_BY_ID['bjt-bias']),
        // 'mosfet-characteristics' migrated to src/experiments/mosfet-characteristics/
        toExploreExperiment(EXPERIMENTS_BY_ID['mosfet-characteristics']),
        // 'opamp-circuits' migrated to src/experiments/opamp-circuits/
        toExploreExperiment(EXPERIMENTS_BY_ID['opamp-circuits']),
      ],
    },
    {
      id: 'electronics-and-electrical',
      title: 'Electronics and Electrical',
      description:
        'Verify fundamental DC circuit theorems experimentally. ' +
        'Build circuits with multiple sources and resistors, and apply Ohm\'s Law, KCL, KVL, and network theorems.',
      circuitId: 'ohms-law',
      experiments: [
        // 'ohms-law' migrated to src/experiments/ohms-law/
        toExploreExperiment(EXPERIMENTS_BY_ID['ohms-law']),
        // 'kirchhoff-laws' migrated to src/experiments/kirchhoff-laws/
        toExploreExperiment(EXPERIMENTS_BY_ID['kirchhoff-laws']),
        // 'superposition-theorem' migrated to src/experiments/superposition-theorem/
        toExploreExperiment(EXPERIMENTS_BY_ID['superposition-theorem']),
        // 'thevenin-theorem' migrated to src/experiments/thevenin-theorem/
        toExploreExperiment(EXPERIMENTS_BY_ID['thevenin-theorem']),
        // 'norton-theorem' migrated to src/experiments/norton-theorem/
        toExploreExperiment(EXPERIMENTS_BY_ID['norton-theorem']),
      ],
    },
    {
      id: 'computer-application',
      title: 'Computer Application',
      description:
        'Implement and verify combinational logic circuits on a breadboard using 74HC-series ICs. ' +
        'Cover basic gates, adders, subtractors, multiplexers, and demultiplexers.',
      circuitId: 'logic-gates',
      experiments: [
        // 'logic-gates' migrated to src/experiments/logic-gates/
        toExploreExperiment(EXPERIMENTS_BY_ID['logic-gates']),
        // 'half-adder' migrated to src/experiments/half-adder/ — derived below
        toExploreExperiment(EXPERIMENTS_BY_ID['half-adder']),
        // 'full-adder' migrated to src/experiments/full-adder/
        toExploreExperiment(EXPERIMENTS_BY_ID['full-adder']),
        // 'half-subtractor' migrated to src/experiments/half-subtractor/
        toExploreExperiment(EXPERIMENTS_BY_ID['half-subtractor']),
        // 'full-subtractor' migrated to src/experiments/full-subtractor/
        toExploreExperiment(EXPERIMENTS_BY_ID['full-subtractor']),
        // 'mux-2to1' migrated to src/experiments/mux-2to1/
        toExploreExperiment(EXPERIMENTS_BY_ID['mux-2to1']),
        // 'demux-1to2' migrated to src/experiments/demux-1to2/
        toExploreExperiment(EXPERIMENTS_BY_ID['demux-1to2']),
      ],
    },
  ],
};

// ── Semester 2 ─────────────────────────────────────────────────────────────
const SEMESTER_2: ExploreSemester = {
  id: 'semester-2',
  label: 'Semester 2',
  subjects: [
    {
      id: 'digital-electronics',
      title: 'Digital Electronics',
      description:
        'Implement encoders, decoders, and MUX/DEMUX-based logic on a breadboard. ' +
        'Explore Boolean minimisation and address decoding used in memory systems.',
      circuitId: 'encoder-4to2',
      experiments: [
        // 'encoder-4to2' migrated to src/experiments/encoder-4to2/
        toExploreExperiment(EXPERIMENTS_BY_ID['encoder-4to2']),
        // 'decoder-2to4' migrated to src/experiments/decoder-2to4/
        toExploreExperiment(EXPERIMENTS_BY_ID['decoder-2to4']),
        // 'mux-based-logic' migrated to src/experiments/mux-based-logic/
        toExploreExperiment(EXPERIMENTS_BY_ID['mux-based-logic']),
        // 'demux-address-decoder' migrated to src/experiments/demux-address-decoder/
        toExploreExperiment(EXPERIMENTS_BY_ID['demux-address-decoder']),
      ],
    },
    {
      id: 'advanced-adders',
      title: 'Advanced Adder Circuits',
      description:
        'Revisit the half adder with focus on propagation delay and timing, then extend to a 4-bit ripple-carry adder. ' +
        'Measure inter-stage delay using an oscilloscope.',
      circuitId: 'half-adder-revisit',
      experiments: [
        // 'half-adder-revisit' migrated to src/experiments/half-adder-revisit/
        toExploreExperiment(EXPERIMENTS_BY_ID['half-adder-revisit']),
        // 'full-adder-ripple' migrated to src/experiments/full-adder-ripple/
        toExploreExperiment(EXPERIMENTS_BY_ID['full-adder-ripple']),
      ],
    },
    {
      id: 'combinational-logic',
      title: 'Combinational Logic',
      description:
        'Extend combinational design to code converters, larger multiplexers/demultiplexers, and multi-bit adder/subtractor ICs. ' +
        'Use standard 74HC MSI parts and verify truth tables experimentally.',
      circuitId: 'decoder',
      experiments: [
        // 'bcd-xs3-converter' migrated to src/experiments/bcd-xs3-converter/
        toExploreExperiment(EXPERIMENTS_BY_ID['bcd-xs3-converter']),
        // 'gray-binary-converter' migrated to src/experiments/gray-binary-converter/
        toExploreExperiment(EXPERIMENTS_BY_ID['gray-binary-converter']),
        // 'mux-4to1-ic' migrated to src/experiments/mux-4to1-ic/
        toExploreExperiment(EXPERIMENTS_BY_ID['mux-4to1-ic']),
        // 'demux-1to4-ic' migrated to src/experiments/demux-1to4-ic/
        toExploreExperiment(EXPERIMENTS_BY_ID['demux-1to4-ic']),
        // 'binary-adder-4bit' migrated to src/experiments/binary-adder-4bit/
        toExploreExperiment(EXPERIMENTS_BY_ID['binary-adder-4bit']),
        // 'binary-subtractor-4bit' migrated to src/experiments/binary-subtractor-4bit/
        toExploreExperiment(EXPERIMENTS_BY_ID['binary-subtractor-4bit']),
      ],
    },
    {
      id: 'sequential-logic',
      title: 'Sequential Logic',
      description:
        'Build and characterise latches, flip-flops, and counters using 74HC-series ICs. ' +
        'Understand state transitions, clock edges, and asynchronous counter operation.',
      circuitId: 'half-adder',
      experiments: [
        // 'sr-latch' migrated to src/experiments/sr-latch/
        toExploreExperiment(EXPERIMENTS_BY_ID['sr-latch']),
        // 'd-flip-flop' migrated to src/experiments/d-flip-flop/
        toExploreExperiment(EXPERIMENTS_BY_ID['d-flip-flop']),
        // 'jk-t-flip-flop' migrated to src/experiments/jk-t-flip-flop/
        toExploreExperiment(EXPERIMENTS_BY_ID['jk-t-flip-flop']),
        // 'mod5-counter' migrated to src/experiments/mod5-counter/
        toExploreExperiment(EXPERIMENTS_BY_ID['mod5-counter']),
      ],
    },
    {
      id: 'digital-logic-design',
      title: 'Digital Logic Design',
      description:
        'Apply systematic minimisation techniques, parity logic, magnitude comparison, and shift registers. ' +
        'Design with Karnaugh maps and verify using 74HC-series ICs.',
      circuitId: 'decoder',
      experiments: [
        // 'gate-level-minimization' migrated to src/experiments/gate-level-minimization/
        toExploreExperiment(EXPERIMENTS_BY_ID['gate-level-minimization']),
        // 'parity-checker' migrated to src/experiments/parity-checker/
        toExploreExperiment(EXPERIMENTS_BY_ID['parity-checker']),
        // 'digital-comparator' migrated to src/experiments/digital-comparator/
        toExploreExperiment(EXPERIMENTS_BY_ID['digital-comparator']),
        // 'shift-register' migrated to src/experiments/shift-register/
        toExploreExperiment(EXPERIMENTS_BY_ID['shift-register']),
      ],
    },
  ],
};

// ── Semester 3 ─────────────────────────────────────────────────────────────
const SEMESTER_3: ExploreSemester = {
  id: 'semester-3',
  label: 'Semester 3',
  subjects: [
    {
      id: 'combinational-arithmetic',
      title: 'Combinational Arithmetic',
      description:
        'Advance from basic gates to multi-bit adders, carry-lookahead logic, and high-speed multiplier architectures. ' +
        'Covers both interactive simulations and theory-based treatments.',
      circuitId: 'full-adder-ripple',
      experiments: [
        // 'intro-gates-review' migrated to src/experiments/intro-gates-review/
        toExploreExperiment(EXPERIMENTS_BY_ID['intro-gates-review']),
        {
          id: 'full-adder-ripple',
          title: 'Ripple Carry Adder',
          description: 'Chain four full adders to build a 4-bit ripple-carry adder and study cumulative carry propagation delay through all stages.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/full-adder-ripple',
          tags: ['ripple carry', '4-bit adder', 'carry propagation', 'alu', 'delay'],
        },
        // 'cla-adder' migrated to src/experiments/cla-adder/
        toExploreExperiment(EXPERIMENTS_BY_ID['cla-adder']),
        // 'registers-counters-theory' migrated to src/experiments/registers-counters-theory/
        toExploreExperiment(EXPERIMENTS_BY_ID['registers-counters-theory']),
        // 'wallace-tree' migrated to src/experiments/wallace-tree/
        toExploreExperiment(EXPERIMENTS_BY_ID['wallace-tree']),
        // 'combinational-multipliers' migrated to src/experiments/combinational-multipliers/
        toExploreExperiment(EXPERIMENTS_BY_ID['combinational-multipliers']),
        // 'booths-multiplier' migrated to src/experiments/booths-multiplier/
        toExploreExperiment(EXPERIMENTS_BY_ID['booths-multiplier']),
      ],
    },
    {
      id: 'memory-cpu-systems',
      title: 'Memory & CPU Systems',
      description:
        'Explore ALU design, memory organisation, cache hierarchies, and the fetch-decode-execute cycle. ' +
        'All experiments in this section are coming soon.',
      circuitId: 'decoder',
      experiments: [
        // 'alu-simulation' migrated to src/experiments/alu-simulation/
        toExploreExperiment(EXPERIMENTS_BY_ID['alu-simulation']),
        // 'memory-design' migrated to src/experiments/memory-design/
        toExploreExperiment(EXPERIMENTS_BY_ID['memory-design']),
        // 'cache-direct-mapped' migrated to src/experiments/cache-direct-mapped/
        toExploreExperiment(EXPERIMENTS_BY_ID['cache-direct-mapped']),
        // 'cache-associative' migrated to src/experiments/cache-associative/
        toExploreExperiment(EXPERIMENTS_BY_ID['cache-associative']),
        // 'cpu-design' migrated to src/experiments/cpu-design/
        toExploreExperiment(EXPERIMENTS_BY_ID['cpu-design']),
      ],
    },
    {
      id: 'programming-fundamentals',
      title: 'Programming Fundamentals',
      description:
        'Write and execute C programs covering mathematical expressions and file I/O. ' +
        'Use an in-browser editor with real-time compilation feedback.',
      circuitId: 'half-adder',
      experiments: [
        // 'c-expressions' migrated to src/experiments/c-expressions/
        toExploreExperiment(EXPERIMENTS_BY_ID['c-expressions']),
        // 'c-file-operations-1' migrated to src/experiments/c-file-operations-1/
        toExploreExperiment(EXPERIMENTS_BY_ID['c-file-operations-1']),
        // 'c-file-operations-2' migrated to src/experiments/c-file-operations-2/
        toExploreExperiment(EXPERIMENTS_BY_ID['c-file-operations-2']),
      ],
    },
  ],
};

// ── Semester 4 ─────────────────────────────────────────────────────────────
const SEMESTER_4: ExploreSemester = {
  id: 'semester-4',
  label: 'Semester 4',
  subjects: [
    {
      id: '8085-assembly-programming',
      title: '8085 Assembly Programming',
      description:
        'Write and simulate Intel 8085 assembly programs covering arithmetic, sorting, and data conversion. ' +
        'All experiments in this section are coming soon.',
      circuitId: 'half-adder',
      experiments: [
        // '8085-add-sub-8bit' migrated to src/experiments/8085-add-sub-8bit/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-add-sub-8bit']),
        // '8085-add-sub-carry' migrated to src/experiments/8085-add-sub-carry/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-add-sub-carry']),
        // '8085-bcd-addition' migrated to src/experiments/8085-bcd-addition/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-bcd-addition']),
        // '8085-multiply-8bit' migrated to src/experiments/8085-multiply-8bit/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-multiply-8bit']),
        // '8085-divide-8bit' migrated to src/experiments/8085-divide-8bit/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-divide-8bit']),
        // '8085-array-sum' migrated to src/experiments/8085-array-sum/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-array-sum']),
        // '8085-array-square' migrated to src/experiments/8085-array-square/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-array-square']),
        // '8085-min-max' migrated to src/experiments/8085-min-max/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-min-max']),
        // '8085-bubble-sort' migrated to src/experiments/8085-bubble-sort/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-bubble-sort']),
        // '8085-bcd-binary-conv' migrated to src/experiments/8085-bcd-binary-conv/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-bcd-binary-conv']),
        // '8085-sqrt' migrated to src/experiments/8085-sqrt/
        toExploreExperiment(EXPERIMENTS_BY_ID['8085-sqrt']),
      ],
    },
    {
      id: 'peripheral-interfacing',
      title: 'Peripheral Interfacing',
      description:
        'Interface digital I/O, display, and analog conversion peripherals with a microcontroller. ' +
        'Cover GPIO, 7-segment display driving, ADC, and DAC techniques.',
      circuitId: 'gpio-interfacing',
      experiments: [
        // 'gpio-interfacing' migrated to src/experiments/gpio-interfacing/
        toExploreExperiment(EXPERIMENTS_BY_ID['gpio-interfacing']),
        // 'seven-segment-display' migrated to src/experiments/seven-segment-display/
        toExploreExperiment(EXPERIMENTS_BY_ID['seven-segment-display']),
        // 'adc-dac' migrated to src/experiments/adc-dac/
        toExploreExperiment(EXPERIMENTS_BY_ID['adc-dac']),
      ],
    },
  ],
};

export const EXPLORE_SEMESTERS: readonly ExploreSemester[] = [SEMESTER_1, SEMESTER_2, SEMESTER_3, SEMESTER_4];

export const FEATURED_SUBJECT = {
  id: SEMESTER_1.subjects[0].experiments[0].id,
  title: SEMESTER_1.subjects[0].experiments[0].title,
  description: SEMESTER_1.subjects[0].experiments[0].description,
  circuitId: SEMESTER_1.subjects[0].experiments[0].circuitId,
  category: SEMESTER_1.subjects[0].title,
  tags: SEMESTER_1.subjects[0].experiments[0].tags,
  labRoute: SEMESTER_1.subjects[0].experiments[0].labRoute,
};

export const ALL_EXPERIMENTS: readonly (ExploreExperiment & { subjectTitle: string; semesterLabel: string })[] =
  EXPLORE_SEMESTERS.flatMap((s) =>
    s.subjects.flatMap((sub) =>
      sub.experiments.map((exp) => ({
        ...exp,
        subjectTitle: sub.title,
        semesterLabel: s.label,
      })),
    ),
  );
