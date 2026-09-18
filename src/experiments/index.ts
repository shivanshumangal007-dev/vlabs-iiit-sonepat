import { type Experiment } from './types';
import { HalfAdder }       from './half-adder';
import { Mux2to1 } from './mux-2to1';
import { Demux1to2 } from './demux-1to2';
import { Encoder4to2 } from './encoder-4to2';
import { Decoder2to4 } from './decoder-2to4';
import { FullAdder } from './full-adder';
import { HalfSubtractor } from './half-subtractor';
import { FullSubtractor } from './full-subtractor';
import { ZenerDiode } from './zener-diode';
import { LogicGates } from './logic-gates';
import { StudyBasicComponents } from './study-basic-components';
import { OhmsLaw } from './ohms-law';
import { KirchhoffLaws } from './kirchhoff-laws';
import { PnJunctionDiode } from './pn-junction-diode';
import { ZenerVoltageRegulator } from './zener-voltage-regulator';
import { HalfWaveRectifier } from './half-wave-rectifier';
import { FullWaveRectifier } from './full-wave-rectifier';
import { RectifiersCapacitorFilters } from './rectifiers-capacitor-filters';
import { SuperpositionTheorem } from './superposition-theorem';
import { TheveninTheorem } from './thevenin-theorem';
import { NortonTheorem } from './norton-theorem';
import { CeAmplifier } from './ce-amplifier';
import { MuxBasedLogic } from './mux-based-logic';
import { DemuxAddressDecoder } from './demux-address-decoder';
import { HalfAdderRevisit } from './half-adder-revisit';
import { FullAdderRipple } from './full-adder-ripple';
import { GpioInterfacing } from './gpio-interfacing';
import { SevenSegmentDisplay } from './seven-segment-display';
import { AdcDac } from './adc-dac';
import { CbAmplifier } from './cb-amplifier';
import { BjtBias } from './bjt-bias';
import { MosfetCharacteristics } from './mosfet-characteristics';
import { OpampCircuits } from './opamp-circuits';
import { BcdXs3Converter } from './bcd-xs3-converter';
import { GrayBinaryConverter } from './gray-binary-converter';
import { Mux4to1Ic } from './mux-4to1-ic';
import { Demux1to4Ic } from './demux-1to4-ic';
import { BinaryAdder4bit } from './binary-adder-4bit';
import { BinarySubtractor4bit } from './binary-subtractor-4bit';
import { DigitalComparator } from './digital-comparator';
import { ParityChecker } from './parity-checker';
import { ShiftRegister } from './shift-register';
import { SrLatch } from './sr-latch';
import { DFlipFlop } from './d-flip-flop';
import { JkTFlipFlop } from './jk-t-flip-flop';
import { Mod5Counter } from './mod5-counter';
import { Exp8085BubbleSort } from './8085-bubble-sort';
import { Exp8085BcdBinaryConv } from './8085-bcd-binary-conv';
import { Exp8085BcdAddition } from './8085-bcd-addition';
import { Exp8085AddSub8bit } from './8085-add-sub-8bit';
import { Exp8085Multiply8bit } from './8085-multiply-8bit';
import { Exp8085ArraySquare } from './8085-array-square';
import { Exp8085Sqrt } from './8085-sqrt';
import { Exp8085Divide8bit } from './8085-divide-8bit';
import { Exp8085AddSubCarry } from './8085-add-sub-carry';
import { Exp8085MinMax } from './8085-min-max';
import { Exp8085ArraySum } from './8085-array-sum';
import { CacheDirectMapped } from './cache-direct-mapped';
import { MemoryDesign } from './memory-design';
import { CacheAssociative } from './cache-associative';
import { CpuDesign } from './cpu-design';
import { AluSimulation } from './alu-simulation';
import { RegistersCountersTheory } from './registers-counters-theory';
import { CFileOperations1 } from './c-file-operations-1';
import { CombinationalMultipliers } from './combinational-multipliers';
import { ClaAdder } from './cla-adder';
import { CFileOperations2 } from './c-file-operations-2';
import { WallaceTree } from './wallace-tree';
import { GateLevelMinimization } from './gate-level-minimization';
import { BoothsMultiplier } from './booths-multiplier';
import { CExpressions } from './c-expressions';
import { IntroGatesReview } from './intro-gates-review';

export const ALL_EXPERIMENTS: Experiment[] = [
  HalfAdder,
  Mux2to1,
  Demux1to2,
  Encoder4to2,
  Decoder2to4,
  FullAdder,
  HalfSubtractor,
  FullSubtractor,
  ZenerDiode,
  LogicGates,
  StudyBasicComponents,
  OhmsLaw,
  KirchhoffLaws,
  PnJunctionDiode,
  ZenerVoltageRegulator,
  HalfWaveRectifier,
  FullWaveRectifier,
  RectifiersCapacitorFilters,
  SuperpositionTheorem,
  TheveninTheorem,
  NortonTheorem,
  CeAmplifier,
  MuxBasedLogic,
  DemuxAddressDecoder,
  HalfAdderRevisit,
  FullAdderRipple,
  GpioInterfacing,
  SevenSegmentDisplay,
  AdcDac,
  CbAmplifier,
  BjtBias,
  MosfetCharacteristics,
  OpampCircuits,
  BcdXs3Converter,
  GrayBinaryConverter,
  Mux4to1Ic,
  Demux1to4Ic,
  BinaryAdder4bit,
  BinarySubtractor4bit,
  DigitalComparator,
  ParityChecker,
  ShiftRegister,
  SrLatch,
  DFlipFlop,
  JkTFlipFlop,
  Mod5Counter,
  Exp8085BubbleSort,
  Exp8085BcdBinaryConv,
  Exp8085BcdAddition,
  Exp8085AddSub8bit,
  Exp8085Multiply8bit,
  Exp8085ArraySquare,
  Exp8085Sqrt,
  Exp8085Divide8bit,
  Exp8085AddSubCarry,
  Exp8085MinMax,
  Exp8085ArraySum,
  CacheDirectMapped,
  MemoryDesign,
  CacheAssociative,
  CpuDesign,
  AluSimulation,
  RegistersCountersTheory,
  CFileOperations1,
  CombinationalMultipliers,
  ClaAdder,
  CFileOperations2,
  WallaceTree,
  GateLevelMinimization,
  BoothsMultiplier,
  CExpressions,
  IntroGatesReview,
];

/** O(1) lookup by canonical id slug. */
export const EXPERIMENTS_BY_ID: Record<string, Experiment> =
  Object.fromEntries(ALL_EXPERIMENTS.map(e => [e.id, e]));
