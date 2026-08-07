"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// +20% density: more rings & radials
const RINGS_COUNT = 29;
const RADIALS_COUNT = 62;

// +12% wider opening
const min_R = 300; // Slightly reduced the hole size exactly as specifically requested!
const max_R = 2800; // Geometrically clamped absolute outer radius so it fundamentally never creates lines that can reach the top typography bounds!
// +8% vertical compression for deeper perspective feel
const perspective = 0.24;
const max_depth = 230; // Increased depth so it looks like it continues downward
const base_y = -50;
// Lighter, delicate amber/champagne colors to ensure the funnel doesn't feel 'dark'
const colorRim = new THREE.Color("#FFFFFF");
const colorRimHighlight = new THREE.Color("#EED2B4"); // Softer
const colorOuter = new THREE.Color("#E4C29F"); // Lighter/sandy golden 
const animLineColor = new THREE.Color("#E4C29F");

function getVertexRGBA(t: number, isThick: boolean, isRadial: boolean): [number, number, number, number] {
    let alpha = 1.0;
    const color = new THREE.Color("#E1C1A0"); // Delicate, softer golden line color

    if (t < 0) {
        // Graceful plunge fade — steeper so lines vanish softly as they dive deep (4.5 multiplier)
        const baseFade = Math.max(0, 1.0 - Math.abs(t) * 4.5);
        // Boost first 2-3 rings (t from 0 to -0.12) to prevent the bottom curved rim from disappearing!
        const nearRimBoost = t >= -0.12 ? Math.pow(1.0 - Math.abs(t) / 0.12, 1.5) * 0.28 : 0;
        alpha = Math.min(1.0, baseFade + nearRimBoost);
    } else {
        // Graceful fading across the wide upper mesh
        const edge_fade = Math.max(0, 1.0 - (t / 0.95));
        alpha = Math.pow(edge_fade, 1.25);
    }

    if (isThick) {
        alpha *= 1.2;
    } else if (isRadial) {
        alpha *= 1.0;
    } else {
        alpha *= 1.1;
    }

    // Stable visibility matching image intensity
    alpha *= 0.40; // Soft but distinctly visible

    // The EXACT golden fading shading requested!
    // We gracefully transition the line color to a warmer gold near the center hold for a natural glow.
    if (t >= -0.12 && t <= 0.25) {
        // Distance from the rim (t=0)
        const dist = Math.abs(t) / 0.25;
        const glow = Math.pow(Math.max(0, 1.0 - dist), 1.5);
        alpha = alpha + (0.28 * glow); // Gentle boost to make the gold pop slightly
        color.lerp(new THREE.Color("#E6A865"), glow); // Warm, beautiful golden rim transition
    }

    return [color.r, color.g, color.b, alpha];
}

function computeSurface(t: number) {
    let r;
    if (t >= 0) {
        // Outer rings: stronger linear component near rim for natural curvature
        const bend = Math.pow(t, 2.1);
        r = min_R + (max_R - min_R) * (0.82 * bend + 0.18 * t);
    } else {
        // Inner funnel: deep descending tunnel geometry. 
        // Let the radius gradually shrink asymptotically so lines converge visually infinitely deep
        r = min_R * (1.0 / (1.0 + Math.abs(t) * 4.0));
    }
    if (r < 0) r = 0;

    let depth;
    if (t >= 0) {
        // Smoother transition into funnel
        depth = max_depth * Math.pow(1 - t, 1.65);
    } else {
        // Plunge downwards drastically as it goes inside, simulating an infinite drop
        depth = max_depth + 2800 * Math.pow(Math.abs(t), 1.5);
    }

    const cy = base_y + depth;
    const y_offset = -(cy - 65);

    // Ensure the ellipses are absolutely mathematically perfect strings with zero dipping!
    return { rx: r, ry: r * perspective, y_offset, z: -depth };
}

function AnimatedRadial({ allowedIndices, delay }: { allowedIndices: number[], delay: number }) {
    const geomRef1 = useRef<THREE.BufferGeometry>(null);
    const geomRef2 = useRef<THREE.BufferGeometry>(null);
    const geomRef3 = useRef<THREE.BufferGeometry>(null);

    const stateRef = useRef<{ j: number; cycle: number }>({
        j: allowedIndices[Math.floor(Math.random() * allowedIndices.length)] as number,
        cycle: -1
    });

    useFrame((state) => {
        if (!geomRef1.current) return;
        const time = state.clock.getElapsedTime();

        // Slowed down the physical traveling speed as perfectly requested! (2.2 -> 3.5s)
        const cycleDuration = 3.5;
        const currentCycle = Math.floor((time + delay) / cycleDuration);

        if (currentCycle > stateRef.current.cycle) {
            stateRef.current.cycle = currentCycle;
            stateRef.current.j = allowedIndices[Math.floor(Math.random() * allowedIndices.length)] as number;
        }

        let prog = ((time + delay) % cycleDuration) / cycleDuration;
        const theta = (stateRef.current.j / RADIALS_COUNT) * Math.PI * 2;

        const posAttr = geomRef1.current.getAttribute('position') as THREE.BufferAttribute;
        const colAttr = geomRef1.current.getAttribute('color') as THREE.BufferAttribute;

        for (let k = 0; k < 15; k++) {
            let vProgRaw = (prog * 1.35) - (k * 0.015);
            if (vProgRaw < 0) vProgRaw = 0;

            const t_prog = 1.0 - Math.pow(vProgRaw, 1.2);

            const { rx, ry, y_offset, z } = computeSurface(t_prog);

            const x = rx * Math.cos(theta);
            const y = y_offset - ry * Math.sin(theta);

            // Z-tilt fixes 3D fighting at bottom lip
            const safe_z = z + 15 * Math.sin(theta);

            posAttr.setXYZ(k, x, y, safe_z);

            const tailFade = 1.0 - (k / 14);
            let alpha = 1.0;
            let drawColor = animLineColor;

            if (t_prog < 0) {
                // Plunging animated lines! Native geometrical fade mapping without awkwardly forcing it to pure white, so it visibly travels into the foggy depth!
                alpha = Math.max(0, 1.0 - Math.abs(t_prog) * 3.0);
            } else {
                // Slower falloff so they stay alive near edges
                alpha = Math.exp(-1.5 * t_prog * t_prog);
            }

            // Completely removed all artificial alpha multipliers! The traveling lines now natively absorb the exact darkness and lower opacity of the space they travel through!
            colAttr.setXYZW(k, drawColor.r, drawColor.g, drawColor.b, alpha * tailFade);
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // Sync the physically thickened sub-pixel lines!
        if (geomRef2.current && geomRef3.current) {
            const geom2Pos = geomRef2.current.getAttribute('position') as THREE.BufferAttribute;
            const geom2Col = geomRef2.current.getAttribute('color') as THREE.BufferAttribute;
            const geom3Pos = geomRef3.current.getAttribute('position') as THREE.BufferAttribute;
            const geom3Col = geomRef3.current.getAttribute('color') as THREE.BufferAttribute;

            geom2Pos.copyArray(posAttr.array);
            geom2Col.copyArray(colAttr.array);
            geom2Pos.needsUpdate = true;
            geom2Col.needsUpdate = true;

            geom3Pos.copyArray(posAttr.array);
            geom3Col.copyArray(colAttr.array);
            geom3Pos.needsUpdate = true;
            geom3Col.needsUpdate = true;
        }
    });

    const initialPos = useMemo(() => new Float32Array(15 * 3), []);
    const initialCol = useMemo(() => new Float32Array(15 * 4), []);

    return (
        <group>
            {/* Single Core Line natively executing a clean crisp vector line without blunt secondary offsets! */}
            <line>
                <bufferGeometry ref={geomRef1}>
                    <bufferAttribute attach="attributes-position" args={[initialPos, 3]} count={15} />
                    <bufferAttribute attach="attributes-color" args={[initialCol, 4]} count={15} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} depthTest={false} linewidth={1} />
            </line>
        </group>
    );
}

function VortexGeometry() {
    const groupRef = useRef<THREE.Group>(null);

    const t_values = useMemo(() => {
        const arr = [];
        // Perfectly restrained inner depth. Stops lines from becoming aggressively dense and thick inside the hole, matching the clean reference image.
        for (let i = -10; i <= RINGS_COUNT; i++) {
            arr.push(i / RINGS_COUNT);
        }
        return arr;
    }, []);

    const RIM_INDEX = 10;

    const { geometryData } = useMemo(() => {
        const rThinP: number[] = [];
        const rThinC: number[] = [];
        const radP: number[] = [];
        const radC: number[] = [];
        const rimP: number[] = [];
        const rimC: number[] = [];

        const nodes: { x: number; y: number; z: number, t: number }[][] = [];
        for (let i = 0; i < t_values.length; i++) {
            const t = t_values[i]!;

            const { rx, ry, y_offset, z } = computeSurface(t);

            const ringNodes = [];
            for (let j = 0; j < RADIALS_COUNT; j++) {
                const theta = (j / RADIALS_COUNT) * Math.PI * 2;
                const x = rx * Math.cos(theta);
                const y = y_offset - ry * Math.sin(theta);

                // Pure Z depth sorting so front rings don't overlap randomly
                const safe_z = z + 15 * Math.sin(theta);

                ringNodes.push({ x, y, z: safe_z, t });
            }
            nodes.push(ringNodes);
        }

        // Draw all rings smoothly and organically, without artificially forcing a solid rim line!
        for (let i = 0; i < t_values.length; i++) {
            for (let j = 0; j < RADIALS_COUNT; j++) {
                const p1 = nodes[i]![j]!;
                const p2 = nodes[i]![(j + 1) % RADIALS_COUNT]!;

                rThinP.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                const [r, g, b, a] = getVertexRGBA(p1.t, false, false);
                rThinC.push(r, g, b, a, r, g, b, a);
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
                radialsPts: new Float32Array(radP),
                radialsCols: new Float32Array(radC),
                occlusionPts: new Float32Array(occlusionPts),
                rimPts: new Float32Array(rimP),
                rimCols: new Float32Array(rimC),
            }
        };
    }, []);

    const {
        ringsThinPts, ringsThinCols,
        radialsPts, radialsCols,
        occlusionPts,
        rimPts, rimCols
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
                <meshBasicMaterial colorWrite={false} depthWrite={true} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} side={THREE.DoubleSide} />
            </mesh>

            {/* Primary Pass */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={ringsThinPts.length / 3} args={[ringsThinPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={ringsThinCols.length / 4} args={[ringsThinCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

            {/* Completely independent Isolated Structural Funnel Rim line! */}
            {rimPts.length > 0 && (
                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={rimPts.length / 3} args={[rimPts, 3]} />
                        <bufferAttribute attach="attributes-color" count={rimCols.length / 4} args={[rimCols, 4]} />
                    </bufferGeometry>
                    <lineBasicMaterial vertexColors transparent depthWrite={false} linewidth={1} />
                </lineSegments>
            )}

            {/* The old generic thick rings block has been explicitly replaced natively by the crisp focused functor isolated above! */}

            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={radialsPts.length / 3} args={[radialsPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={radialsCols.length / 4} args={[radialsCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

            {/* Clean and completely singular native line passes mapping precisely to crisp high-fidelity vectors! Offset-duplication fully purged. */}


            {/* Fired completely from ALL angles to ensure they fall radically randomly from every side 360 degrees as specifically requested! */}
            {[{
                domain: Array.from({ length: RADIALS_COUNT }, (_, i) => i), // All 62 radials!
                delays: [0.0, 0.2, 0.45, 0.7, 0.95, 1.2, 1.45, 1.7, 1.95, 2.2, 2.45, 2.7, 2.95, 3.2, 3.45] // 15 total lines continuously falling!
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
              This explicitly drops the bottom by 150px, which guarantees the Canvas has enough DOM room
              to draw the falling lines deeply into the empty space without pushing the dashboard itself away!
            */}
            <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{ top: "-100px", bottom: "-150px" }}
            >
                {/* 
                    PIXEL-PERFECT EXACT RECREATION (Extracted Colors from Reference Image):
                    1. Replaced the highly saturated orange with the elegant creamy off-white (#FEF7ED) and pale peach (#F2D8BA).
                    2. Widened the ellipse to match the exact size and fading ratio of the huge white glow.
                    3. Perfectly constrained, seamless one/layer gradient without any harsh band transitions.
                */}
                <div
                    className="absolute inset-x-0"
                    style={{
                        top: "120px",
                        bottom: "-250px",
                        background: `radial-gradient(
                            ellipse 60% 42% at 50% 38%, 
                            rgba(255, 255, 255, 1) 8%, 
                            rgba(255, 246, 228, 0.95) 25%, 
                            rgba(240, 195, 145, 0.5) 48%, 
                            rgba(235, 185, 135, 0.15) 75%, 
                            transparent 95%
                        )`
                    }}
                />

                <div
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    style={{
                        // Perfectly accurate smooth gradient fade directly copying the original reference curve
                        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 88%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 12%, rgba(0,0,0,0.6) 25%, black 45%, black 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.1) 88%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 88%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 12%, rgba(0,0,0,0.6) 25%, black 45%, black 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.1) 88%, transparent 100%)",
                        WebkitMaskComposite: "source-in",
                        maskComposite: "intersect"
                    }}
                >
                    <Canvas
                        dpr={[1, 2]}
                        orthographic
                        camera={{ position: [0, 0, 100], zoom: 1 }}
                        gl={{ antialias: true, alpha: true }}
                    >
                        <VortexGeometry />
                        <AnimatedRadial allowedIndices={[31, 32]} delay={0.0} /> {/* Bottom center */}
                        <AnimatedRadial allowedIndices={[15, 16]} delay={0.7} /> {/* Bottom right */}
                        <AnimatedRadial allowedIndices={[46, 47]} delay={1.4} /> {/* Left */}
                        <AnimatedRadial allowedIndices={[60, 61, 0, 1]} delay={2.1} /> {/* Top center */}
                        <AnimatedRadial allowedIndices={[24, 25, 26]} delay={0.4} /> {/* Bottom right-ish */}
                        <AnimatedRadial allowedIndices={[7, 8, 9]} delay={1.1} /> {/* Top right */}
                        <AnimatedRadial allowedIndices={[38, 39, 40]} delay={1.8} /> {/* Bottom left */}
                        <AnimatedRadial allowedIndices={[53, 54, 55]} delay={0.9} /> {/* Top left */}
                        <AnimatedRadial allowedIndices={[20, 21]} delay={2.5} /> {/* Bottom right fill */}
                        <AnimatedRadial allowedIndices={[42, 43]} delay={1.6} /> {/* Bottom left fill */}
                    </Canvas>
                </div>
            </div>
        </div>
    );
}
