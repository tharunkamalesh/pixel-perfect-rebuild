const fs = require('fs');

const WIDTH = 1600;
const HEIGHT = 900;
const CX = WIDTH / 2;
const OVERALL_DEPTH = 300;
const CY = (HEIGHT * 0.45) - OVERALL_DEPTH;

const RANGE = 1500;
const STEP = 50;
const SCALE_Y = 0.35;
const WELL_WIDTH = 400;

function getZOffset(x, z_3d) {
    const r = Math.sqrt(x * x + z_3d * z_3d);
    const r_adj = Math.max(0, r - 40);
    const val = Math.exp(-Math.pow(r_adj / WELL_WIDTH, 1.6));
    return val * -OVERALL_DEPTH;
}

function getPoint(x, z_3d) {
    let px = CX + x;
    let py = CY + z_3d * SCALE_Y;
    py -= getZOffset(x, z_3d);
    return { x: px, y: py };
}

let static_paths = [];
let animated_paths = [];

function addPath(pStr) {
    static_paths.push(pStr);
    animated_paths.push(pStr);
}

// Lines parallel to X axis 
for (let z = -RANGE; z <= RANGE; z += STEP) {
    // Left half: from -RANGE to center
    let dLeft = '';
    const num_pts = 40;
    for (let i = 0; i <= num_pts; i++) {
        const x = -RANGE + (RANGE * i) / num_pts;
        const pt = getPoint(x, z);
        if (i === 0) dLeft += `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        else dLeft += ` L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }
    addPath(dLeft);

    // Right half: from +RANGE to center
    let dRight = '';
    for (let i = 0; i <= num_pts; i++) {
        const x = RANGE - (RANGE * i) / num_pts;
        const pt = getPoint(x, z);
        if (i === 0) dRight += `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        else dRight += ` L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }
    addPath(dRight);
}

// Lines parallel to Z axis
for (let x = -RANGE; x <= RANGE; x += STEP) {
    // Top half: from -RANGE to center
    let dTop = '';
    const num_pts = 40;
    for (let i = 0; i <= num_pts; i++) {
        const z = -RANGE + (RANGE * i) / num_pts;
        const pt = getPoint(x, z);
        if (i === 0) dTop += `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        else dTop += ` L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }
    addPath(dTop);

    // Bottom half: from +RANGE to center
    let dBottom = '';
    for (let i = 0; i <= num_pts; i++) {
        const z = RANGE - (RANGE * i) / num_pts;
        const pt = getPoint(x, z);
        if (i === 0) dBottom += `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        else dBottom += ` L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }
    addPath(dBottom);
}

const svgContent = `import React from 'react';
import { motion } from 'framer-motion';

export function AccretionSVG() {
  return (
    <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none" 
        style={{ 
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 45%, transparent 6%, black 20%, black 60%, transparent 100%)', 
            WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 45%, transparent 6%, black 20%, black 60%, transparent 100%)' 
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
            <radialGradient id="anim-gradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#ff8a00" stopOpacity="1" />
                <stop offset="100%" stopColor="#e52e71" stopOpacity="1" />
            </radialGradient>
        </defs>

        {/* Static Grid */}
        ${static_paths.map((p, ix) => `<path key="grid-static-${ix}" d="${p}" stroke="#e8cca7" strokeWidth="1" strokeOpacity="0.3" fill="none" />`).join('\n')}
        
        {/* Animated Particles flowing into the well */}
        <g stroke="#F87216" strokeWidth="1" strokeLinecap="round" opacity="0.8">
            ${animated_paths.map((p, ix) => `
                <motion.path 
                    key="anim-${ix}" 
                    d="${p}"
                    fill="none" 
                    pathLength="1"
                    strokeDasharray="0.01 0.99"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -1 }}
                    transition={{
                        repeat: Infinity,
                        duration: 3.52, // staggered speeds
                        ease: "linear",
                        delay: 1.55 // staggered starts
                    }}
                />
            `).join('\n')}
        </g>
        </svg>
    </div>
  );
}
`;

fs.writeFileSync('src/components/site/AccretionSVG.tsx', svgContent);
console.log('Script completed');
