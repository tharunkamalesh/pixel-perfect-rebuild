const fs = require('fs');

const WIDTH = 1600;
const HEIGHT = 900;
const CX = WIDTH / 2;
const OVERALL_DEPTH = 300;
const CY = (HEIGHT * 0.45) - OVERALL_DEPTH;

const R_MAX = 1300;
const R_MIN = 120; // Wide hole in the middle
const SCALE_Y = 0.35;
const WELL_WIDTH = 350;

const TWIST = 0.0; // No twisting to keep perfect geometric structure

const NUM_RINGS = 35;
const NUM_RAYS = 40;

function getZ(r) {
    if (r > WELL_WIDTH * 2.5) return 0;
    const val = Math.exp(-Math.pow((r - R_MIN) / WELL_WIDTH, 1.8));
    return val * -OVERALL_DEPTH;
}

function getPoint(r, theta0) {
    const normalized = r / R_MAX;
    const theta = theta0 + TWIST * (1 - normalized) * (1 - normalized);

    let x = CX + r * Math.cos(theta);
    let y = CY + r * Math.sin(theta) * SCALE_Y;
    y -= getZ(r);
    return { x, y };
}

let ray_paths = [];
let ring_paths = [];

for (let j = 0; j < NUM_RAYS; j++) {
    const theta = (Math.PI * 2 * j) / NUM_RAYS;
    let d = '';
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
        // Build the ray from the outside (R_MAX) inwards to the center (R_MIN)
        // so that stroke animations cleanly fall into the gravity well!
        const t = Math.pow(1 - (i / steps), 1.5); // Reverse direction: start at edges
        const r = R_MIN + (R_MAX - R_MIN) * t;
        const pt = getPoint(r, theta);
        if (i === 0) d += `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
        else d += ` L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
    }
    ray_paths.push(d);
}

for (let i = 0; i < NUM_RINGS; i++) {
    const t = Math.pow(i / (NUM_RINGS - 1), 1.5);
    const r = R_MIN + (R_MAX - R_MIN) * t;
    let d = '';
    const steps = 80;
    for (let j = 0; j <= steps; j++) {
        const theta = (Math.PI * 2 * j) / steps;
        const pt = getPoint(r, theta);
        if (j === 0) d += `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
        else d += ` L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
    }
    const pt0 = getPoint(r, 0);
    d += ` L ${pt0.x.toFixed(2)} ${pt0.y.toFixed(2)}`;
    ring_paths.push(d);
}

const svgContent = `import React from 'react';
import { motion } from 'framer-motion';

export function AccretionSVG() {
  return (
    <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none" 
        style={{ 
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 5%, black 25%, black 60%, transparent 100%)', 
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 5%, black 25%, black 60%, transparent 100%)' 
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
            <radialGradient id="ray-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#F87216" stopOpacity="1" />
                <stop offset="100%" stopColor="#e52e71" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Static Rings */}
        ${ring_paths.map((p, ix) => `<path key="ring-${ix}" d="${p}" stroke="#e8cca7" strokeWidth="1" strokeOpacity="0.35" fill="none" />`).join('\n')}
        
        {/* Static Rays Base */}
        ${ray_paths.map((p, ix) => `<path key="ray-base-${ix}" d="${p}" stroke="#e8cca7" strokeWidth="1" strokeOpacity="0.35" fill="none" />`).join('\n')}

        {/* Animated Rays Falling into Hole */}
        <g stroke="#F87216" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
        ${ray_paths.map((p, ix) => {
    const duration = (2.5 + Math.random() * 2).toFixed(2);
    const delay = (Math.random() * 3).toFixed(2);
    return \`
            <motion.path 
                key="ray-anim-\${ix}" 
                d="${p}" 
                fill="none" 
                pathLength="1"
                strokeDasharray="0.05 0.95"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -1 }}
                transition={{
                    repeat: Infinity,
                    duration: \${duration},
                    ease: "linear",
                    delay: \${delay}
                }}
            />\`;
        }).join('\n')}
        </g>
        </svg>
    </div>
  );
}
`;

    fs.writeFileSync('src/components/site/AccretionSVG.tsx', svgContent);
    console.log('Script completed');
