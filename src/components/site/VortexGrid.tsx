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
// Exact rich golden colors meticulously reconstructed from target image!
const colorRim = new THREE.Color("#FFFFFF"); // Luminous pure white core
const colorRimHighlight = new THREE.Color("#B88645"); // Deep, inherently dark golden specifically injected to pop perfectly over the bright white hole!
const colorOuter = new THREE.Color("#D1AD76"); // Rich bright golden tone traversing the wide mesh
const animLineColor = new THREE.Color("#DCA564");

function getVertexRGBA(t: number, isThick: boolean, isRadial: boolean): [number, number, number, number] {
    let alpha = 1.0;
    const color = new THREE.Color();

    if (t < 0) {
        // "the inner part should not be visble": Immediately fade out plunging lines and turn them pure white
        // so they optically vanish completely into the central white glowing background!
        alpha = Math.max(0, 1.0 - Math.abs(t) * 3.0);
        color.setHex(0xFFFFFF);
    } else {
        // "in bottom it should be visible" 
        // Radically unchoked the structural decay so it proudly sweeps horizontally fully across the bottom of the dashboard natively without artificially vanishing!
        const edge_fade = Math.max(0, 1.0 - (t / 0.98));
        alpha = Math.pow(edge_fade, 1.0); // Gentle 1.0 curve keeps the sweeping baseline heavily visible!

        // Everyone seamlessly defaults cleanly to the beautiful bright gold!
        color.copy(colorOuter);

        // "in top of the circle the golden color should be there"
        // Safely extended to 0.12 to guarantee the dark rich golden hex boldly coats the full physical ring!
        if (!isRadial && t <= 0.12) {
            const ringHighlight = Math.pow(1.0 - (t / 0.12), 1.2);
            color.lerp(colorRimHighlight, ringHighlight);
        }
    }

    if (isThick) {
        alpha *= 1.2;
    } else if (isRadial) {
        alpha *= 1.0;
    } else {
        alpha *= 1.1;
    }

    // Let it natively hold a beautiful, elegant stable visibility across the full sweeping width so the bottom shines!
    alpha *= 0.50;

    // "keep the warm golden highlight only around the opening... 100% opacity only near the funnel opening"
    // Firing a massive exact +75% visibility boost explicitly wrapped tightly around the 0.12 rim geometry!
    if (t >= 0 && !isRadial && t <= 0.12) {
        const ringHighlight = Math.pow(1.0 - (t / 0.12), 1.4);
        alpha = alpha + (0.75 * ringHighlight);
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
                // Instantly vaporize the animated lines cleanly into pure white light when they enter the hole! 
                // This permanently guarantees they match the pure aesthetic of the second image without leaving dark trails!
                alpha = Math.max(0, 1.0 - Math.abs(t_prog) * 3.0);
                drawColor = colorRim;
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
            {/* Core Line */}
            <line>
                <bufferGeometry ref={geomRef1}>
                    <bufferAttribute attach="attributes-position" args={[initialPos, 3]} count={15} />
                    <bufferAttribute attach="attributes-color" args={[initialCol, 4]} count={15} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} depthTest={false} linewidth={1} />
            </line>

            {/* Layer 2: Subtle thickening */}
            <line position={[0.2, 0.2, 0] as any}>
                <bufferGeometry ref={geomRef2}>
                    <bufferAttribute attach="attributes-position" args={[initialPos, 3]} count={15} />
                    <bufferAttribute attach="attributes-color" args={[initialCol, 4]} count={15} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} depthTest={false} linewidth={1} />
            </line>

            {/* Layer 3: Subtle thickening */}
            <line position={[-0.2, -0.2, 0] as any}>
                <bufferGeometry ref={geomRef3}>
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
        // Dramatically increased negative ring limits to forge a significantly deeper physical tunnel core
        for (let i = -26; i <= RINGS_COUNT; i++) {
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

        for (let i = 0; i < t_values.length; i++) {
            const isRim = Math.abs(t_values[i]!) < 0.001; // Isolated exactly to the structural funnel rim!

            for (let j = 0; j < RADIALS_COUNT; j++) {
                const p1 = nodes[i]![j]!;
                const p2 = nodes[i]![(j + 1) % RADIALS_COUNT]!;

                if (isRim) {
                    rimP.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                    // Isolated completely independent stroke parameters mapped to exact requirement!
                    const col = new THREE.Color("#D9BB87");
                    rimC.push(col.r, col.g, col.b, 0.8, col.r, col.g, col.b, 0.8);
                } else {
                    rThinP.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                    const [r, g, b, a] = getVertexRGBA(p1.t, false, false);
                    rThinC.push(r, g, b, a, r, g, b, a);
                }
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
                <meshBasicMaterial colorWrite={false} depthWrite={true} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
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

            {/* Sub-pixel Offset Pass: Physically thickens every single line by drawing a perfectly offset clone! (Simulates stroke-width > 1) */}
            <lineSegments position={[0, -0.6, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={ringsThinPts.length / 3} args={[ringsThinPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={ringsThinCols.length / 4} args={[ringsThinCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

            <lineSegments position={[0.6, 0, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={radialsPts.length / 3} args={[radialsPts, 3]} />
                    <bufferAttribute attach="attributes-color" count={radialsCols.length / 4} args={[radialsCols, 4]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} />
            </lineSegments>

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
                {/* Flawless wide, soft, blooming radial aura directly matching the visual image! */}
                <div
                    className="absolute inset-x-0"
                    style={{
                        top: "120px",
                        bottom: "-250px",
                        // Vastly widened and heated up the golden glowing aura exactly mirroring the gorgeous warm image!
                        background: "radial-gradient(ellipse 55% 45% at 50% 50%, #FFFDF5 0%, transparent 60%), radial-gradient(ellipse 95% 65% at 50% 50%, rgba(220, 165, 100, 0.25) 0%, transparent 80%)"
                    }}
                />

                {/* Drastically expanded Mask! This allows the mesh to natively and organically sweep fully out across the dashboard horizontally without being sliced off! */}
                <div
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    style={{
                        // Composite intersecting mask! The horizontal gradient mathematically forces the sharp left/right container edges to gracefully fade into 0% visibility!
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
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
