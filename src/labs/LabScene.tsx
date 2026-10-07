"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { hole, railHole, COLS, colsForBoardId, PITCH, BOARD_D, TOP_Y } from "./coords";
import {
  buildBreadboard,
  buildLongBreadboard,
  buildDip14,
  buildLed,
  buildResistor,
  buildCapacitor,
  buildWire,
  buildDcPowerSupply,
  buildIcMeter,
  buildAmmeter,
  buildVoltmeter,
  buildOscilloscope,
  buildFunctionGenerator,
  buildFunctionGeneratorStandalone,
  buildBjt,
  buildMosfet,
  buildDiode,
  buildZenerDiode,
  buildOpAmp,
  buildSevenSegment,
  buildDipSwitch,
  buildLogicAnalyzer,
  buildTransformer,
  buildSwitchStandalone,
  buildPushButtonStandalone,
  buildMcuTrainerStandalone,
} from "@/components";
import { resolveIcPin } from "@/components/ic";
import { simulate } from "./simulate";
import {
  type Circuit,
  type ComponentInstance,
  type PinRef,
  type TiePin,
  type RailPin,
  type IcPin,
  type PassivePin,
  type LedPin,
} from "./types";

// ── PinRef → THREE.Vector3 ────────────────────────────────────────────────
// Uses the real DIP-14 pin resolver for IcPins.

// ── Bench layout ─────────────────────────────────────────────────────────────
// Instruments are placed in two rows behind the breadboard (negative Z).
// Row 0 = large instruments (oscilloscope, FG, logic analyser)  — further back
// Row 1 = small panel meters (ammeter, voltmeter)               — closer
//
// Slots are assigned left→right within each row. Callers pass the circuit's
// component array once and get back a counter-based Vector3 position.

const BENCH_Z_LARGE  = -(BOARD_D / 2 + PITCH * 9);   // behind the board
const BENCH_Z_SMALL  = -(BOARD_D / 2 + PITCH * 4.5); // closer row
const BENCH_SLOT_W_LARGE = PITCH * 8.0;               // horizontal gap per large instrument
const BENCH_SLOT_W_SMALL = PITCH * 5.5;               // horizontal gap per small instrument
const BENCH_LARGE_X0 = -(PITCH * 16);                 // start x for large row
const BENCH_SMALL_X0 = -(PITCH * 12);                 // start x for small row

function makeBenchCounter() {
  let largeIdx = 0;
  let smallIdx = 0;
  return {
    large(): THREE.Vector3 {
      const x = BENCH_LARGE_X0 + largeIdx++ * BENCH_SLOT_W_LARGE;
      return new THREE.Vector3(x, TOP_Y, BENCH_Z_LARGE);
    },
    small(): THREE.Vector3 {
      const x = BENCH_SMALL_X0 + smallIdx++ * BENCH_SLOT_W_SMALL;
      return new THREE.Vector3(x, TOP_Y, BENCH_Z_SMALL);
    },
  };
}

function resolvePin(
  pin: PinRef,
  all: ComponentInstance[],
): THREE.Vector3 | null {
  if ("col" in pin && "row" in pin && "board" in pin) {
    const tie = pin as TiePin;
    const cols = colsForBoardId(tie.board, all);
    return hole(tie.col, tie.row, cols);
  }

  if ("rail" in pin) {
    const rp = pin as RailPin;
    const cols = colsForBoardId(rp.board, all);
    const railMap = {
      vcc_top: "top_red",
      gnd_top: "top_blue",
      vcc_bot: "bot_red",
      gnd_bot: "bot_blue",
    } as const;
    return railHole(rp.col, railMap[rp.rail], cols);
  }

  if ("ic" in pin) {
    const ip = pin as IcPin;
    const inst = all.find((c) => c.id === ip.ic);
    if (!inst || !("mountedAt" in inst)) return null;
    const cols = colsForBoardId(inst.mountedAt.board, all);
    return resolveIcPin(ip.pin, inst.mountedAt.col, inst.mountedAt.row, cols);
  }

  if ("component" in pin) {
    const pp = pin as PassivePin;
    const inst = all.find((c) => c.id === pp.component);
    if (!inst || !("mountedAt" in inst)) return null;
    const { col, row, board } = inst.mountedAt;
    const cols = colsForBoardId(board, all);
    return pp.end === "p1" ? hole(col, row, cols) : hole(col + 3, row, cols);
  }

  if ("led" in pin) {
    const lp = pin as LedPin;
    const inst = all.find((c) => c.id === lp.led);
    if (!inst || !("mountedAt" in inst)) return null;
    const { col, row, board } = inst.mountedAt;
    const cols = colsForBoardId(board, all);
    return lp.end === "anode" ? hole(col, row, cols) : hole(col + 1, row, cols);
  }

  return null;
}

// ── Component builder ─────────────────────────────────────────────────────
// isOn map is passed for LEDs so they light up when the simulation says HIGH.
function buildInstance(
  inst: ComponentInstance,
  all: ComponentInstance[],
  ledOnMap: Map<string, boolean>,
  bench: ReturnType<typeof makeBenchCounter>,
): THREE.Group | null {
  switch (inst.type) {
    case "breadboard":
      return buildBreadboard(COLS);

    case "long-breadboard":
      return buildLongBreadboard();

    case "xor-gate":
    case "and-gate":
    case "or-gate":
    case "not-gate":
    case "nand-gate":
    case "nor-gate":
    case "xnor-gate":
    case "buffer-gate": {
      const { col, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const labels: Record<string, string> = {
        "xor-gate": "XOR",
        "and-gate": "AND",
        "or-gate": "OR",
        "not-gate": "NOT",
        "nand-gate": "NAND",
        "nor-gate": "NOR",
        "xnor-gate": "XNOR",
        "buffer-gate": "BUF",
      };
      return buildDip14(col, labels[inst.type], cols);
    }

    case "npn-bjt":
    case "pnp-bjt": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildBjt(hole(col, row, cols));
    }

    case "n-mosfet":
    case "p-mosfet": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildMosfet(hole(col, row, cols));
    }

    case "diode": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildDiode(hole(col, row, cols), hole(col + 3, row, cols));
    }

    case "zener": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildZenerDiode(hole(col, row, cols), hole(col + 3, row, cols));
    }

    case "op-amp": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildOpAmp(hole(col, row, cols));
    }

    case "7seg-display": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildSevenSegment(hole(col, row, cols));
    }

    case "dip-switch": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildDipSwitch(hole(col, row, cols), (inst as any).poles ?? 8);
    }

    case "switch": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const group = buildSwitchStandalone();
      group.position.copy(hole(col, row, cols));
      return group;
    }

    case "push-button": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const group = buildPushButtonStandalone();
      group.position.copy(hole(col, row, cols));
      return group;
    }

    case "resistor": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildResistor(
        hole(col, row, cols),
        hole(col + 3, row, cols),
        inst.ohms,
      );
    }

    case "capacitor": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildCapacitor(
        hole(col, row, cols),
        hole(col + 1, row, cols),
        inst.capacitance,
      );
    }

    case "led": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const isOn = ledOnMap.get(inst.id) ?? false;
      return buildLed(
        hole(col, row, cols),
        hole(col + 1, row, cols),
        inst.color,
        isOn,
      );
    }

    case "wire": {
      const from = resolvePin(inst.from, all);
      const to = resolvePin(inst.to, all);
      if (!from || !to) return null;
      return buildWire(from, to, inst.color);
    }

    // ── Instruments (placed beside the breadboard) ────────────────────
    case "dc-jack":
    case "battery": {
      const t = (inst as any).terminals as [any, any] | undefined;
      const targets = t
        ? {
            vcc: resolvePin(t[0], all) ?? new THREE.Vector3(),
            gnd: resolvePin(t[1], all) ?? new THREE.Vector3(),
          }
        : undefined;
      return buildDcPowerSupply("left", "--", targets);
    }
    case "potentiometer": {
      const p = (inst as any).probes as [any, any] | undefined;
      const targets = p
        ? {
            probe1: resolvePin(p[0], all) ?? new THREE.Vector3(),
            probe2: resolvePin(p[1], all) ?? new THREE.Vector3(),
          }
        : undefined;
      return buildIcMeter("right", "--", targets);
    }

    case "ammeter": {
      const group = buildAmmeter(bench.small());
      return group;
    }

    case "voltmeter": {
      const group = buildVoltmeter(bench.small());
      return group;
    }

    case "oscilloscope": {
      const group = buildOscilloscope(bench.large());
      return group;
    }

    case "function-generator": {
      const g = buildFunctionGeneratorStandalone();
      const pos = bench.large();
      g.position.set(pos.x, pos.y, pos.z);
      return g;
    }

    case "logic-analyser": {
      const g = buildLogicAnalyzer(bench.large());
      return g;
    }

    case "transformer": {
      const g = buildTransformer(bench.large());
      return g;
    }

    case "mcu-trainer": {
      return buildMcuTrainerStandalone();
    }

    default:
      return null;
  }
}

// ── Geometry disposal helper ──────────────────────────────────────────────
// Recursively disposes all geometries and materials in a scene graph.
function disposeGroup(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      const mat = child.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    }
    if (child instanceof THREE.LineSegments || child instanceof THREE.Line) {
      child.geometry?.dispose();
      (child.material as THREE.Material)?.dispose();
    }
  });
}

// ── Marker system (bob-the-builder style pre-placement pointers) ──────────
export type StepMarker = {
  pos: [number, number, number];
  dir: [number, number, number];
  label?: string;
};

function buildMarkerGroup(marker: StepMarker): {
  group: THREE.Group;
  update: (t: number) => void;
} {
  const pos = new THREE.Vector3(...marker.pos);
  const dir = new THREE.Vector3(...marker.dir).normalize();
  const out = dir.clone().negate();
  const UP = new THREE.Vector3(0, 1, 0);
  const ZAX = new THREE.Vector3(0, 0, 1);

  const group = new THREE.Group();

  // Target ring at insertion point
  const ringGeo = new THREE.RingGeometry(0.038, 0.065, 24);
  const ring = new THREE.Mesh(
    ringGeo,
    new THREE.MeshBasicMaterial({ color: 0xe6502e, side: THREE.DoubleSide }),
  );
  ring.quaternion.setFromUnitVectors(ZAX, out);
  ring.position.copy(pos).addScaledVector(out, 0.006);
  group.add(ring);

  // Bobbing cone
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.055, 0.16, 14),
    new THREE.MeshBasicMaterial({ color: 0xe6502e }),
  );
  cone.quaternion.setFromUnitVectors(UP, dir);
  group.add(cone);

  // Approach line
  const linePts = [
    pos.clone().addScaledVector(out, 0.22),
    pos.clone().addScaledVector(out, 0.5),
  ];
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
  group.add(
    new THREE.Line(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0xe6502e,
        transparent: true,
        opacity: 0.5,
      }),
    ),
  );

  const BASE = 0.34,
    BOB = 0.07;
  function update(t: number) {
    cone.position
      .copy(pos)
      .addScaledVector(out, BASE + Math.sin(t * 2.4) * BOB);
  }

  return { group, update };
}

// ── React component ───────────────────────────────────────────────────────
export type LabSceneProps = {
  circuit: Circuit;
  activeStepIndex: number;
  markers?: StepMarker[];
  showControlsHint?: boolean;
  /** Compact card thumbnail — tilted, auto-rotate, no orbit controls */
  previewMode?: boolean;
};

export function LabSceneCanvas({
  circuit,
  activeStepIndex,
  markers = [],
  showControlsHint = true,
  previewMode = false,
}: LabSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const pivotRef = useRef<THREE.Group | null>(null);
  const markerGrpRef = useRef<THREE.Group | null>(null);
  const markerUpdaters = useRef<Array<(t: number) => void>>([]);
  const clockRef = useRef(0);
  const controlsRef = useRef<OrbitControls | null>(null);

  // ── Build / rebuild the component meshes when circuit or step changes ──
  const meshMapRef = useRef<Map<string, THREE.Group>>(new Map());

  // ── Build scene once per circuit ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dispose previous scene
    if (sceneRef.current) {
      sceneRef.current.traverse(disposeGroup);
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(previewMode ? 0xffffff : 0xf7f6f3, 1);
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ── Camera ────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      previewMode ? 38 : 35,
      1,
      0.1,
      previewMode ? 100 : 200,
    );
    if (previewMode) {
      camera.position.set(0.6, 5.2, 6.0);
    } else {
      camera.position.set(0, 6.5, 7.0);
    }
    camera.lookAt(0, 0, 0);

    // ── Controls — orbit for labs, drag-spin for card previews ────────
    let controls: OrbitControls | null = null;
    const spin = { dragging: false, lx: 0, ly: 0, ry: -0.3, rx: 0.3 };

    if (previewMode) {
      controlsRef.current = null;
    } else {
      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0.1, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 2;
      controls.maxDistance = 20;
      controls.maxPolarAngle = Math.PI * 0.48;
      controls.minPolarAngle = Math.PI * 0.05;
      controls.enablePan = true;
      controls.panSpeed = 0.8;
      controls.rotateSpeed = 0.6;
      controls.zoomSpeed = 1.0;
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
      controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      controls.update();
      controlsRef.current = controls;
    }

    // ── Pivot group for circuit components ────────────────────────────
    const pivot = new THREE.Group();
    if (previewMode) pivot.rotation.x = 0.3;
    scene.add(pivot);
    pivotRef.current = pivot;

    // ── Lighting ─────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(3, 8, 5);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.22);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Initial simulation with step 0 inputs
    const step0 = circuit.steps[0];
    const simResult = simulate(circuit, step0?.activeInputs ?? {});

    // Build all component meshes
    const map = new Map<string, THREE.Group>();
    const bench = makeBenchCounter();
    for (const inst of circuit.components) {
      const g = buildInstance(inst, circuit.components, simResult.ledOn, bench);
      if (g) {
        g.visible = false;
        pivot.add(g);
        map.set(inst.id, g);
      }
    }
    meshMapRef.current = map;

    // Marker group
    const markerGroup = new THREE.Group();
    pivot.add(markerGroup);
    markerGrpRef.current = markerGroup;

    // Resize
    function resize() {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf: number;
    const onDown = (e: PointerEvent) => {
      spin.dragging = true;
      spin.lx = e.clientX;
      spin.ly = e.clientY;
    };
    const onUp = () => {
      spin.dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!spin.dragging) return;
      spin.ry += (e.clientX - spin.lx) * 0.01;
      spin.rx += (e.clientY - spin.ly) * 0.006;
      spin.rx = Math.max(-0.05, Math.min(0.75, spin.rx));
      spin.lx = e.clientX;
      spin.ly = e.clientY;
    };

    if (previewMode) {
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointermove", onMove);
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      clockRef.current += 0.016;
      if (previewMode) {
        if (!spin.dragging) spin.ry += 0.002;
        pivot.rotation.y = spin.ry;
        pivot.rotation.x = spin.rx;
      } else {
        controls!.update();
      }
      for (const upd of markerUpdaters.current) upd(clockRef.current);
      renderer.render(scene, camera);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (previewMode) {
        canvas.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointermove", onMove);
      } else {
        controls?.dispose();
      }
      meshMapRef.current.forEach((g) => disposeGroup(g));
      meshMapRef.current.clear();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuit.id, previewMode]);

  // ── Update on step change: visibility + LED states ─────────────────────
  useEffect(() => {
    const step = circuit.steps[activeStepIndex];
    if (!step) return;

    // Run simulation for this step's inputs
    const simResult = simulate(circuit, step.activeInputs ?? {});

    // Visibility
    const visible = new Set(step.show);
    const map = meshMapRef.current;
    const pivot = pivotRef.current;
    if (!pivot) return;

    meshMapRef.current.forEach((g, id) => {
      g.visible = visible.has(id);
    });

    // Rebuild LED meshes with correct isOn state
    // For analog circuits (no gates), activeInputs with any truthy value
    // means "power is on" → all visible LEDs glow.
    const hasActiveInput = Object.values(step.activeInputs ?? {}).some(
      (v) => v === 1,
    );
    const hasSimResults = simResult.ledOn.size > 0;

    for (const inst of circuit.components) {
      if (inst.type !== "led") continue;
      if (!visible.has(inst.id)) continue;

      const old = meshMapRef.current.get(inst.id);
      if (old) {
        disposeGroup(old);
        pivot.remove(old);
      }

      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, circuit.components);
      const brightness = step.ledBrightness?.[inst.id];
      const isOn =
        brightness !== undefined
          ? brightness > 0.05
          : hasSimResults
            ? (simResult.ledOn.get(inst.id) ?? false)
            : hasActiveInput;
      const bright = step.ledBrightness?.[inst.id] ?? (isOn ? 1.0 : 0.0);
      const fresh = buildLed(
        hole(col, row, cols),
        hole(col + 1, row, cols),
        inst.color,
        isOn,
        bright,
      );
      fresh.visible = true;
      pivot.add(fresh);
      meshMapRef.current.set(inst.id, fresh);
    }

    // ── Rebuild instruments with dynamic display values ───────────────
    for (const inst of circuit.components) {
      if (
        inst.type !== "dc-jack" &&
        inst.type !== "battery" &&
        inst.type !== "potentiometer" &&
        inst.type !== "ammeter" &&
        inst.type !== "voltmeter" &&
        inst.type !== "oscilloscope" &&
        inst.type !== "function-generator"
      )
        continue;
      if (!visible.has(inst.id)) continue;

      const old = meshMapRef.current.get(inst.id);
      if (old) {
        disposeGroup(old);
        pivot.remove(old);
      }

      const displayVal = step.readings?.[inst.id] ?? "--";
      // Capture the old position so we can restore it after rebuilding
      const oldPos = old?.position.clone() ?? new THREE.Vector3();
      let fresh: THREE.Group;

      if (inst.type === "potentiometer") {
        const p = (inst as any).probes as [any, any] | undefined;
        const targets = p
          ? {
              probe1:
                resolvePin(p[0], circuit.components) ?? new THREE.Vector3(),
              probe2:
                resolvePin(p[1], circuit.components) ?? new THREE.Vector3(),
            }
          : undefined;
        fresh = buildIcMeter("right", displayVal, targets);
      } else if (inst.type === "ammeter") {
        fresh = buildAmmeter(oldPos);
      } else if (inst.type === "voltmeter") {
        fresh = buildVoltmeter(oldPos);
      } else if (inst.type === "oscilloscope") {
        fresh = buildOscilloscope(oldPos);
      } else if (inst.type === "function-generator") {
        fresh = buildFunctionGeneratorStandalone();
        fresh.position.copy(oldPos);
      } else {
        // dc-jack / battery
        const t = (inst as any).terminals as [any, any] | undefined;
        const targets = t
          ? {
              vcc: resolvePin(t[0], circuit.components) ?? new THREE.Vector3(),
              gnd: resolvePin(t[1], circuit.components) ?? new THREE.Vector3(),
            }
          : undefined;
        fresh = buildDcPowerSupply("left", displayVal, targets);
      }
      fresh.visible = true;
      pivot.add(fresh);
      meshMapRef.current.set(inst.id, fresh);
    }
  }, [circuit, activeStepIndex]);

  // ── Rebuild markers when they change ─────────────────────────────────
  useEffect(() => {
    const mg = markerGrpRef.current;
    if (!mg) return;

    // Dispose old markers
    mg.children.forEach(disposeGroup);
    while (mg.children.length) mg.remove(mg.children[0]);
    markerUpdaters.current = [];

    for (const marker of markers) {
      const { group, update } = buildMarkerGroup(marker);
      mg.add(group);
      markerUpdaters.current.push(update);
    }
  }, [markers]);

  const handleDoubleClick = useCallback(() => {
    const c = controlsRef.current;
    if (!c) return;
    c.target.set(0, 0.1, 0);
    c.object.position.set(0, 6.5, 7.0);
    c.update();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        onDoubleClick={handleDoubleClick}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          cursor: "grab",
          touchAction: "none",
        }}
      />
      {showControlsHint && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            fontSize: 10,
            color: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          left drag: orbit · right drag: pan · scroll: zoom · double-click:
          reset
        </div>
      )}
    </div>
  );
}
