const fs = require('fs');
let svg = fs.readFileSync('src/components/site/extracted_raw_svg.txt', 'utf8');

svg = svg.replace(/stroke-dashoffset="0px" /g, '');
svg = svg.replace(/strokeDasharray="0px 1px"/g, '');

svg = svg.replace(/style="([^"]*)"/g, (match, p1) => {
    if (p1.includes('mask-type:alpha')) return 'style={{ maskType: "alpha" }}';
    if (p1.includes('transform:translateY')) return 'style={{ transform: "translateY(-30px)", transformOrigin: "50% 50%", transformBox: "fill-box" }}';
    return match;
});

// the prompt: For all converging radial paths, apply an animated dashed stroke (strokeDasharray="12 18"). Animate strokeDashoffset from 0 to -120 continuously duration: 2.8s
svg = svg.replace(/<path className="cls-1" strokeWidth="([^"]+)" d="([^"]+)" opacity="1" pathLength="1" \/>/g,
    '<motion.path strokeWidth="$1" d="$2" strokeDasharray="12 18" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }} stroke="url(#well-gradient)" fill="none" />'
);
svg = svg.replace(/<path className="cls-1" strokeWidth="([^"]+)" d="([^"]+)" opacity="1" pathLength="1"\/>/g,
    '<motion.path strokeWidth="$1" d="$2" strokeDasharray="12 18" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }} stroke="url(#well-gradient)" fill="none" />'
);

svg = svg.replace(/<path strokeWidth="1" className="cls-1" d="([^"]+)" opacity="0" /g,
    '<path strokeWidth="1.5" d="$1" opacity="0.4" stroke="url(#well-gradient)" fill="none" '
);

// New colors: #E86C38 and #A30000
svg = svg.replace('<defs><style type="text/css">.cls-1 {\n                        // stroke: #000;\n                        // strokeWidth: 1px;\n                    }\n                    </style></defs>',
    `<defs>
        <radialGradient id="well-gradient" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A30000" stopOpacity="1" />
        <stop offset="25%" stopColor="#A30000" stopOpacity="1" />
        <stop offset="60%" stopColor="#E86C38" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#F8F6F1" stopOpacity="0" />
        </radialGradient>
    </defs>`
);

svg = svg.replace(/className="cls-1"/g, '');

const content = `import { motion } from 'framer-motion';

export function AccretionSVG() {
  return (
    ${svg}
  );
}
`;

fs.writeFileSync('src/components/site/AccretionSVG.tsx', content);
