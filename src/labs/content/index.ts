// ── Lab content registry ────────────────────────────────────────────────────
// Single map from experiment id → LabContent.
// The dynamic /labs/[slug] route uses this to look up content.
// To add a new experiment: import it here and add one entry to the map.

import { type LabContent } from '@/labs/lab-content.types';

// ── Experiments registry (new source, wins over legacy entries on conflict) ─
import { EXPERIMENTS_BY_ID } from '@/experiments';
import { toLabContent }      from '@/experiments/adapters';

import { FullAdderContent }               from './full-adder';
import { HalfSubtractorContent }          from './half-subtractor';
import { FullSubtractorContent }          from './full-subtractor';
import { Mux2to1Content }                 from './mux-2to1';
import { Demux1to2Content }               from './demux-1to2';
import { Encoder4to2Content }             from './encoder-4to2';
import { Decoder2to4Content }             from './decoder-2to4';
import { ZenerDiodeContent }              from './zener-diode';
import { LogicGatesContent }              from './logic-gates';
import { StudyBasicComponentsContent }    from './study-basic-components';
import { OhmsLawContent }                 from './ohms-law';
import { KirchhoffLawsContent }           from './kirchhoff-laws';
import { PnJunctionDiodeContent }         from './pn-junction-diode';
import { ZenerVoltageRegulatorContent }   from './zener-voltage-regulator';
import { HalfWaveRectifierContent }       from './half-wave-rectifier';
import { FullWaveRectifierContent }       from './full-wave-rectifier';
import { RectifiersCapacitorFiltersContent } from './rectifiers-capacitor-filters';
import { SuperpositionTheoremContent }    from './superposition-theorem';
import { TheveninTheoremContent }         from './thevenin-theorem';
import { NortonTheoremContent }           from './norton-theorem';
import { CeAmplifierContent }             from './ce-amplifier';
import { MuxBasedLogicContent }           from './mux-based-logic';
import { DemuxAddressDecoderContent }     from './demux-address-decoder';
import { HalfAdderRevisitContent }        from './half-adder-revisit';
import { FullAdderRippleContent }         from './full-adder-ripple';
import { GpioInterfacingContent }         from './gpio-interfacing';
import { SevenSegmentDisplayContent }     from './seven-segment-display';
import { AdcDacContent }                  from './adc-dac';
import { CbAmplifierContent }             from './cb-amplifier';
import { BjtBiasContent }                 from './bjt-bias';
import { MosfetCharacteristicsContent }   from './mosfet-characteristics';
import { OpampCircuitsContent }           from './opamp-circuits';
import { BcdXs3ConverterContent }         from './bcd-xs3-converter';
import { GrayBinaryConverterContent }     from './gray-binary-converter';
import { Mux4to1ICContent }               from './mux-4to1-ic';
import { Demux1to4ICContent }             from './demux-1to4-ic';
import { BinaryAdder4bitContent }         from './binary-adder-4bit';
import { BinarySubtractor4bitContent }    from './binary-subtractor-4bit';
import { DigitalComparatorContent }       from './digital-comparator';
import { ParityCheckerContent }           from './parity-checker';
import { ShiftRegisterContent }           from './shift-register';
import { SrLatchContent }                 from './sr-latch';
import { DFlipFlopContent }               from './d-flip-flop';
import { JkTFlipFlopContent }             from './jk-t-flip-flop';
import { Mod5CounterContent }             from './mod5-counter';

/** All lab content keyed by experiment id (matches Circuit.id). */
export const ALL_CONTENTS: Record<string, LabContent> = {
  // ── Legacy entries ──────────────────────────────────────────────────────
  // 'half-adder' removed — now sourced from src/experiments/half-adder/
  'full-adder':                    FullAdderContent,
  'half-subtractor':               HalfSubtractorContent,
  'full-subtractor':               FullSubtractorContent,
  'mux-2to1':                      Mux2to1Content,
  'demux-1to2':                    Demux1to2Content,
  'encoder-4to2':                  Encoder4to2Content,
  'decoder-2to4':                  Decoder2to4Content,
  'zener-diode':                   ZenerDiodeContent,
  'logic-gates':                   LogicGatesContent,
  'study-basic-components':        StudyBasicComponentsContent,
  'ohms-law':                      OhmsLawContent,
  'kirchhoff-laws':                KirchhoffLawsContent,
  'pn-junction-diode':             PnJunctionDiodeContent,
  'zener-voltage-regulator':       ZenerVoltageRegulatorContent,
  'half-wave-rectifier':           HalfWaveRectifierContent,
  'full-wave-rectifier':           FullWaveRectifierContent,
  'rectifiers-capacitor-filters':  RectifiersCapacitorFiltersContent,
  'superposition-theorem':         SuperpositionTheoremContent,
  'thevenin-theorem':              TheveninTheoremContent,
  'norton-theorem':                NortonTheoremContent,
  'ce-amplifier':                  CeAmplifierContent,
  'mux-based-logic':               MuxBasedLogicContent,
  'demux-address-decoder':         DemuxAddressDecoderContent,
  'half-adder-revisit':            HalfAdderRevisitContent,
  'full-adder-ripple':             FullAdderRippleContent,
  'gpio-interfacing':              GpioInterfacingContent,
  'seven-segment-display':         SevenSegmentDisplayContent,
  'adc-dac':                       AdcDacContent,
  'cb-amplifier':                  CbAmplifierContent,
  'bjt-bias':                      BjtBiasContent,
  'mosfet-characteristics':        MosfetCharacteristicsContent,
  'opamp-circuits':                OpampCircuitsContent,
  'bcd-xs3-converter':             BcdXs3ConverterContent,
  'gray-binary-converter':         GrayBinaryConverterContent,
  'mux-4to1-ic':                   Mux4to1ICContent,
  'demux-1to4-ic':                 Demux1to4ICContent,
  'binary-adder-4bit':             BinaryAdder4bitContent,
  'binary-subtractor-4bit':        BinarySubtractor4bitContent,
  'digital-comparator':            DigitalComparatorContent,
  'parity-checker':                ParityCheckerContent,
  'shift-register':                ShiftRegisterContent,
  // 'gate-level-minimization' migrated
  // 'cla-adder' migrated
  // 'wallace-tree' migrated
  // 'combinational-multipliers' migrated
  // 'booths-multiplier' migrated
  // 'registers-counters-theory' migrated
  // 'intro-gates-review' migrated
  // 'c-expressions' migrated
  // 'c-file-operations-1' migrated
  // 'c-file-operations-2' migrated
  'sr-latch':                      SrLatchContent,
  'd-flip-flop':                   DFlipFlopContent,
  'jk-t-flip-flop':                JkTFlipFlopContent,
  'mod5-counter':                  Mod5CounterContent,
  // '8085-add-sub-8bit' migrated
  // '8085-add-sub-carry' migrated
  // '8085-bcd-addition' migrated
  // '8085-multiply-8bit' migrated
  // '8085-divide-8bit' migrated
  // '8085-array-sum' migrated
  // '8085-array-square' migrated
  // '8085-min-max' migrated
  // '8085-bubble-sort' migrated
  // '8085-bcd-binary-conv' migrated
  // '8085-sqrt' migrated
  // 'alu-simulation' migrated
  // 'memory-design' migrated
  // 'cache-direct-mapped' migrated
  // 'cache-associative' migrated
  // 'cpu-design' migrated

  // ── New experiments registry (new source wins on conflict) ───────────────
  // During migration: each experiment moved to src/experiments/<slug>/ is
  // automatically picked up here.  When migration is complete, this whole
  // legacy section can be replaced with a single spread.
  ...Object.fromEntries(
    Object.values(EXPERIMENTS_BY_ID).map((e) => [e.id, toLabContent(e)])
  ),
};
