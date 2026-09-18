import { type Experiment } from './types';
import { type ExploreSemester, type ExploreSubject, type ExploreExperiment } from '@/sections/explore/explore.data';

export const SUBJECT_META: Record<string, Omit<ExploreSubject, 'experiments'>> = {
  "Analog Electronics": {
    "id": "analog-electronics",
    "title": "Analog Electronics",
    "description": "Study passive and active components, diode characteristics, rectifiers, and transistor amplifiers. Build and test real circuits on a breadboard using oscilloscopes and multimeters.",
    "circuitId": "study-basic-components"
  },
  "Electronics and Electrical": {
    "id": "electronics-and-electrical",
    "title": "Electronics and Electrical",
    "description": "Verify fundamental DC circuit theorems experimentally. Build circuits with multiple sources and resistors, and apply Ohm's Law, KCL, KVL, and network theorems.",
    "circuitId": "ohms-law"
  },
  "Computer Application": {
    "id": "computer-application",
    "title": "Computer Application",
    "description": "Implement and verify combinational logic circuits on a breadboard using 74HC-series ICs. Cover basic gates, adders, subtractors, multiplexers, and demultiplexers.",
    "circuitId": "logic-gates"
  },
  "Digital Electronics": {
    "id": "digital-electronics",
    "title": "Digital Electronics",
    "description": "Implement encoders, decoders, and MUX/DEMUX-based logic on a breadboard. Explore Boolean minimisation and address decoding used in memory systems.",
    "circuitId": "encoder-4to2"
  },
  "Advanced Adder Circuits": {
    "id": "advanced-adders",
    "title": "Advanced Adder Circuits",
    "description": "Revisit the half adder with focus on propagation delay and timing, then extend to a 4-bit ripple-carry adder. Measure inter-stage delay using an oscilloscope.",
    "circuitId": "half-adder-revisit"
  },
  "Combinational Logic": {
    "id": "combinational-logic",
    "title": "Combinational Logic",
    "description": "Extend combinational design to code converters, larger multiplexers/demultiplexers, and multi-bit adder/subtractor ICs. Use standard 74HC MSI parts and verify truth tables experimentally.",
    "circuitId": "decoder"
  },
  "Sequential Logic": {
    "id": "sequential-logic",
    "title": "Sequential Logic",
    "description": "Build and characterise latches, flip-flops, and counters using 74HC-series ICs. Understand state transitions, clock edges, and asynchronous counter operation.",
    "circuitId": "half-adder"
  },
  "Digital Logic Design": {
    "id": "digital-logic-design",
    "title": "Digital Logic Design",
    "description": "Apply systematic minimisation techniques, parity logic, magnitude comparison, and shift registers. Design with Karnaugh maps and verify using 74HC-series ICs.",
    "circuitId": "decoder"
  },
  "Combinational Arithmetic": {
    "id": "combinational-arithmetic",
    "title": "Combinational Arithmetic",
    "description": "Advance from basic gates to multi-bit adders, carry-lookahead logic, and high-speed multiplier architectures. Covers both interactive simulations and theory-based treatments.",
    "circuitId": "full-adder-ripple"
  },
  "Memory & CPU Systems": {
    "id": "memory-cpu-systems",
    "title": "Memory & CPU Systems",
    "description": "Explore ALU design, memory organisation, cache hierarchies, and the fetch-decode-execute cycle. All experiments in this section are coming soon.",
    "circuitId": "decoder"
  },
  "Programming Fundamentals": {
    "id": "programming-fundamentals",
    "title": "Programming Fundamentals",
    "description": "Write and execute C programs covering mathematical expressions and file I/O. Use an in-browser editor with real-time compilation feedback.",
    "circuitId": "half-adder"
  },
  "8085 Assembly Programming": {
    "id": "8085-assembly-programming",
    "title": "8085 Assembly Programming",
    "description": "Write and simulate Intel 8085 assembly programs covering arithmetic, sorting, and data conversion. All experiments in this section are coming soon.",
    "circuitId": "half-adder"
  },
  "Peripheral Interfacing": {
    "id": "peripheral-interfacing",
    "title": "Peripheral Interfacing",
    "description": "Interface digital I/O, display, and analog conversion peripherals with a microcontroller. Cover GPIO, 7-segment display driving, ADC, and DAC techniques.",
    "circuitId": "gpio-interfacing"
  }
};

export function buildSemesters(experiments: Experiment[], semesterOrder: number[]): ExploreSemester[] {
  // Group by semester -> subject -> experiments
  const semMap = new Map<number, Map<string, Experiment[]>>();
  
  for (const exp of experiments) {
    const sem = exp.explore.semester;
    const sub = exp.explore.subject;
    
    if (!semMap.has(sem)) {
      semMap.set(sem, new Map());
    }
    const subMap = semMap.get(sem)!;
    if (!subMap.has(sub)) {
      subMap.set(sub, []);
    }
    subMap.get(sub)!.push(exp);
  }

  const result: ExploreSemester[] = [];
  
  for (const sem of semesterOrder) {
    if (!semMap.has(sem)) continue;
    
    const subMap = semMap.get(sem)!;
    const subjects: ExploreSubject[] = [];
    
    // Sort subjects? We can keep them in order of SUBJECT_META keys to match exactly.
    const orderedSubjects = Object.keys(SUBJECT_META).filter(k => subMap.has(k));
    
    for (const subTitle of orderedSubjects) {
      const exps = subMap.get(subTitle)!;
      const meta = SUBJECT_META[subTitle];
      
      subjects.push({
        ...meta,
        experiments: exps.map(exp => ({
          id: exp.id,
          title: exp.title,
          description: exp.explore.description,
          circuitId: exp.circuit?.id ?? exp.id,
          labRoute: `/labs/${exp.id}`,
          tags: exp.explore.tags,
        })),
      });
    }
    
    result.push({
      id: `semester-${sem}`,
      label: `Semester ${sem}`,
      subjects,
    });
  }
  
  return result;
}
