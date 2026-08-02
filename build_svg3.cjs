const fs = require('fs');

let svg = fs.readFileSync('src/components/site/extracted_raw_svg.txt', 'utf8');

svg = svg.replace(/<defs>[\s\S]*?<\/defs>/, `
    <defs>
        <radialGradient id="well-gradient-static" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CFA66A" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#D9B57A" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#D9B57A" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#D9B57A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="well-gradient-animated" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2A676" stopOpacity="1" />
            <stop offset="40%" stopColor="#E2A676" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#F8F6F1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#F8F6F1" stopOpacity="0" />
        </radialGradient>
    </defs>
`);

// The original file used className="cls-1", we'll just remove it.
svg = svg.replace(/className="cls-1" /g, '');

svg = svg.replace(/opacity="0\.3"/g, 'opacity="1"');
svg = svg.replace(/opacity="0\.4"/g, 'opacity="1"');
svg = svg.replace(/opacity="0"/g, '');
svg = svg.replace(/stroke-dashoffset="0px" /g, '');
svg = svg.replace(/strokeDasharray="0px 1px"/g, '');

svg = svg.replace(/style="([^"]*)"/g, (match, p1) => {
    if (p1.includes('mask-type:alpha')) return 'style={{ maskType: "alpha" }}';
    if (p1.includes('transform:translateY')) return 'style={{ transform: "translateY(-50px)" }}';
    return match;
});

let rawMatches = svg.match(/<g>.*<\/svg>/s);
if (rawMatches) {
    let inner = rawMatches[0].replace('</svg>', '');

    // the static paths:
    inner = inner.replace(/<path strokeWidth="1\.5" d="([^"]+)"[^>]*>/g,
        '<path strokeWidth="1.5" d="$1" stroke="url(#well-gradient-static)" fill="none" opacity="1" />'
    );

    // the animated paths:
    inner = inner.replace(/<path strokeWidth="2" d="([^"]+)"[^>]*>/g,
        '<motion.path strokeWidth="2" strokeLinecap="round" opacity="0.9" d="$1" strokeDasharray="12 18" animate={{ strokeDashoffset: [-30, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} stroke="url(#well-gradient-animated)" fill="none" />'
    );

    // the thin animated paths:
    inner = inner.replace(/<path strokeWidth="1" d="([^"]+)"[^>]*>/g,
        '<motion.path strokeWidth="1" strokeLinecap="round" opacity="0.75" d="$1" strokeDasharray="6 12" animate={{ strokeDashoffset: [-18, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }} stroke="url(#well-gradient-animated)" fill="none" />'
    );

    svg = svg.replace(rawMatches[0], inner + '</svg>');
}

const content = `import { motion } from 'framer-motion';

export function AccretionSVG() {
  return (
    ${svg}
  );
}
`;

fs.writeFileSync('src/components/site/AccretionSVG.tsx', content);
console.log('Fixed SVG completely.');
