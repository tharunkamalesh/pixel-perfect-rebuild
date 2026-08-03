"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// +20% density: more rings & radials
const RINGS_COUNT = 29;
const RADIALS_COUNT = 62;

// +12% wider opening
const min_R = 280;
const max_R = 3580;
// +8% vertical compression for deeper perspective feel
const perspective = 0.24;
const max_depth = 145;
const base_y = -50;

// Exact palette per design spec
const colorOuter = new THREE.Color("#B99C6A"); // normal grid lines outer
const colorMid = new THREE.Color("#BFA070"); // mid-distance
const colorRim = new THREE.Color("#C7A365"); // near funnel – slightly warmer
const colorInside = new THREE.Color("#C7A365"); // inner funnel – same warm tone
const animLineColor = new THREE.Color("#D89A3D"); // accent lines – muted gold, never orange

function getVertexRGBA(t: number, isThick: boolean, isRadial: boolean): [number, number, number, number] {
    let alpha = 1.0;
    const color = new THREE.Color();

    if (t < 0) {
        // Inner funnel: progressively lighter, dissolves into white center glow
        alpha = Math.max(0, 1.0 - Math.abs(t) * 10.0);
        color.copy(colorRim); // warm tone inside
    } else {
        // Outer: Gaussian so lines fade near all edges naturally
        alpha = Math.exp(-3.0 * t * t);

        // Lines darken as they approach the funnel (t→0) per spec
        if (t < 0.3) {
            // Near funnel: #C7A365 at 22–28%
            color.copy(colorRim);
        } else {
            // Further out: #B99C6A at 12–16%
            color.copy(colorMid).lerp(colorOuter, Math.min(1.0, (t - 0.3) / 0.7));
        }
    }

    if (isThick) {
        alpha *= 0.55; // rim rings — clearly visible like Image 2
    } else if (isRadial) {
        alpha *= 0.42; // radial spokes — well defined
    } else {
        alpha *= 0.35; // circular rings — good contrast
    }

    return [color.r, color.g, color.b, alpha];
}

function computeSurface(t: number) {
    // Wider opening: stronger linear component near rim for natural curvature
    const bend = t > 0 ? Math.pow(t, 2.1) : -Math.pow(-t, 1.5);
    let r = min_R + (max_R - min_R) * (0.82 * bend + 0.18 * t);
    if (r < 0) r = 0;

    let depth;
    if (t >= 0) {
        // Smoother transition into funnel – slightly more curvature
        depth = max_depth * Math.pow(1 - t, 1.65);
    } else {
        depth = max_depth - (max_depth * 1.8 * t) + (4500 * t * t);
    }

    const cy = base_y + depth;
    const y_offset = -(cy - 65);

    return { rx: r, ry: r * perspective, y_offset, z: -depth };
}

function AnimatedRadial({ allowedIndices, delay }: { allowedIndices: number[], delay: number }) {
    const geomRef = useRef<THREE.BufferGeometry>(null);

    const stateRef = useRef<{ j: number; cycle: number }>({
        j: allowedIndices[Math.floor(Math.random() * allowedIndices.length)] as number,
        cycle: -1
    });

    useFrame((state) => {
        if (!geomRef.current) return;
        const time = state.clock.getElapsedTime();

        const cycleDuration = 2.2;
        const currentCycle = Math.floor((time + delay) / cycleDuration);

        if (currentCycle > stateRef.current.cycle) {
            stateRef.current.cycle = currentCycle;
            stateRef.current.j = allowedIndices[Math.floor(Math.random() * allowedIndices.length)] as number;
        }

        let prog = ((time + delay) % cycleDuration) / cycleDuration;
        const theta = (stateRef.current.j / RADIALS_COUNT) * Math.PI * 2;

        const posAttr = geomRef.current.getAttribute('position') as THREE.BufferAttribute;
        const colAttr = geomRef.current.getAttribute('color') as THREE.BufferAttribute;

        for (let k = 0; k < 15; k++) {
            let vProgRaw = (prog * 1.35) - (k * 0.015);
            if (vProgRaw < 0) vProgRaw = 0;

            const t_prog = 1.0 - Math.pow(vProgRaw, 1.2);

            const { rx, ry, y_offset, z } = computeSurface(t_prog);

            const x = rx * Math.cos(theta);
            const y = y_offset - ry * Math.sin(theta);

            posAttr.setXYZ(k, x, y, z);

            const tailFade = 1.0 - (k / 14);
            let alpha = 1.0;
            if (t_prog < 0) {
                alpha = Math.max(0, 1.0 - Math.abs(t_prog) * 12.0);
            } else {
                // Slower falloff so they stay alive near edges
                alpha = Math.exp(-1.5 * t_prog * t_prog);
            }

            // Ultra-visible: strongly bump opacity (1.5x) so they cut through darkness and css masks
            colAttr.setXYZW(k, animLineColor.r, animLineColor.g, animLineColor.b, Math.min(1.0, alpha * tailFade * 1.5));
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
    });

    const initialPos = useMemo(() => new Float32Array(15 * 3), []);
    const initialCol = useMemo(() => new Float32Array(15 * 4), []);

    return (
        <line>
            <bufferGeometry ref={geomRef}>
                <bufferAttribute attach="attributes-position" args={[initialPos, 3]} count={15} />
                <bufferAttribute attach="attributes-color" args={[initialCol, 4]} count={15} />
            </bufferGeometry>
            {/* Make sure depthTest is completely disabled and blending is additive for high visibility */}
            <lineBasicMaterial vertexColors transparent depthWrite={false} depthTest={false} linewidth={1} blending={THREE.AdditiveBlending} />
        </line>
    );
}

function VortexGeometry() {
    const groupRef = useRef<THREE.Group>(null);

    const t_values = useMemo(() => {
        const arr = [];
        for (let i = -10; i <= RINGS_COUNT; i++) {
            arr.push(i / RINGS_COUNT);
        }
        return arr;
    }, []);

    const RIM_INDEX = 10;

    const { geometryData } = useMemo(() => {
        const rThinP: number[] = [];
        const rThinC: number[] = [];
        const rThickP: number[] = [];
        const rThickC: number[] = [];
        const radP: number[] = [];
        const radC: number[] = [];

        const nodes: { x: number; y: number; z: number, t: number }[][] = [];
        for (let i = 0; i < t_values.length; i++) {
            const t = t_values[i]!;

            const { rx, ry, y_offset, z } = computeSurface(t);

            const ringNodes = [];
            for (let j = 0; j < RADIALS_COUNT; j++) {
                const theta = (j / RADIALS_COUNT) * Math.PI * 2;
                const x = rx * Math.cos(theta);
                const y = y_offset - ry * Math.sin(theta);
                ringNodes.push({ x, y, z, t });
            }
            nodes.push(ringNodes);
        }

        for (let i = 0; i < t_values.length; i++) {
            // Remove the artificial dark outline around the rim completely
            const isThick = false;
            const tgPts = rThinP;
            const tgCols = rThinC;

            for (let j = 0; j < RADIALS_COUNT; j++) {
                const p1 = nodes[i]![j]!;
                const p2 = nodes[i]![(j + 1) % RADIALS_COUNT]!;

                tgPts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

                const [r, g, b, a] = getVertexRGBA(p1.t, isThick, false);
                tgCols.push(r, g, b, a, r, g, b, a);
            }
        }

        for (let j = 0; j < RADIALS_COUNT; j++) {
            for (let i = 0; i < t_values.length - 1; i++) {
                const p1 = nodes[i]![j]!;
                const p2 = nodes[i + 1]![j]!;

                radP.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

                const [r1, g1, b1, a1] = getVertexRGBA(p1.t, false, true);
                const [r2, g2, b2, a2] = getVertexRGBA(p2.t, false, true);
                radC.push(r1, g1, b1, a1, r2, g2, b2, a2);
            }
        }

        const occlusionPts: number[] = [];

        for (let i = 0; i < t_values.length - 1; i++) {
            for (let j = 0; j < RADIALS_COUNT; j++) {
                const jNext = (j + 1) % RADIALS_COUNT;
                const p1 = nodes[i]![j]!;
                const p2 = nodes[i]![jNext]!;
                const p3 = nodes[i + 1]![j]!;
                const p4 = nodes[i + 1]![jNext]!;

                // Simple quad triangles physically effectively blocking
                occlusionPts.push(p1.x, p1.y, p1.z, p3.x, p3.y, p3.z, p2.x, p2.y, p2.z);
                occlusionPts.push(p2.x, p2.y, p2.z, p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
            }
        }

        return {
            geometryData: {
                ringsThinPts: new Float32Array(rThinP),
                ringsThinCols: new Float32Array(rThinC),
                ringsThickPts: new Float32Array(rThickP),
                ringsThickCols: new Float32Array(rThickC),
                radialsPts: new Float32Array(radP),
                radialsCols: new Float32Array(radC),
                occlusionPts: new Float32Array(occlusionPts),
            }
        };
    }, []);

    const {
        ringsThinPts, ringsThinCols,
        ringsThickPts, ringsThickCols,
        radialsPts, radialsCols,
        occlusionPts
    } = geometryData;

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        const s = 1 + Math.sin(time * 0.3) * 0.012;
        groupRef.current.scale.set(s, s, 1);
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={occlusionPts.length / 3} args={[occlusionPts, 3]} />
                </bufferGeometry>
                <meshBasicMaterial colorWrite={false} depthWrite={true} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
            </mesh>

            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={ringsThinPts.length / 3} args={[ringsThinPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={ringsThinCols.length / 4} args={[ringsThinCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={ringsThickPts.length / 3} args={[ringsThickPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={ringsThickCols.length / 4} args={[ringsThickCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={radialsPts.length / 3} args={[radialsPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={radialsCols.length / 4} args={[radialsCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

            {/* Animated Flow Lines gracefully switching tracks dynamically covering all 4 outer directions */}
            {[{
                domain: [22, 23, 24, 25, 26, 27, 28, 29, 30], // Left
                delays: [0.0, 0.55, 1.1, 1.65]
            }, {
                domain: [48, 49, 50, 51, 0, 1, 2, 3, 4], // Right
                delays: [0.15, 0.7, 1.25, 1.8]
            }, {
                domain: [9, 10, 11, 12, 13, 14, 15, 16, 17], // Bottom / Down
                delays: [0.3, 0.85, 1.4, 1.95]
            }, {
                domain: [35, 36, 37, 38, 39, 40, 41, 42, 43], // Top
                delays: [0.45, 1.0, 1.55, 2.1]
            }].map((group, gIdx) => (
                group.delays.map((delay, dIdx) => (
                    <AnimatedRadial
                        key={`${gIdx}-${dIdx}`}
                        allowedIndices={group.domain}
                        delay={delay}
                    />
                ))
            ))}
        </group>
    );
}

export function VortexGrid() {
    return (
        <div className="relative w-full h-[200px] md:h-[240px] pointer-events-none z-0 overflow-visible text-black">

            {/* 
              This extended container bypasses the layout constraints, shooting strictly upwards 
              by 200 pixels completely into the background geometry layer, filling the space 
              perfectly behind text and buttons without disrupting the dashboard baseline.
            */}
            <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{ top: "-100px", bottom: "0px" }}
            >


                {/* 4-way edge fade: left, right, top, bottom all dissolve via intersected mask gradients */}
                <div
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        maskImage: [
                            "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
                            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                        ].join(", "),
                        WebkitMaskImage: [
                            "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
                            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                        ].join(", "),
                        maskComposite: "intersect",
                        WebkitMaskComposite: "destination-in",
                    }}
                >
                    <Canvas
                        dpr={[1, 2]}
                        orthographic
                        camera={{ position: [0, 0, 100], zoom: 1 }}
                        gl={{ antialias: true, alpha: true }}
                    >
                        <VortexGeometry />
                    </Canvas>
                </div>
            </div>
        </div>
    );
}
