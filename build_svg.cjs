const fs = require('fs');

let code = `import { motion } from 'framer-motion';

export function AccretionSVG() {
  return (
    <svg width="100%" height="100%" viewBox="867 300 2400 780" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="well-gradient-static" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CFA66A" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#D9B57A" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#D9B57A" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#D9B57A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="well-gradient-animated" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2A676" stopOpacity="1" />
          <stop offset="50%" stopColor="#E2A676" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E2A676" stopOpacity="0" />
        </radialGradient>
      </defs>
`;

let raw = fs.readFileSync('process_svg.cjs', 'utf8');
let svgMatches = raw.match(/<g>.*<\/svg>/s);
if (svgMatches) {
    let inner = svgMatches[0].replace('</svg>', '');

    inner = inner.replace(/strokeWidth="1\.5"([^>]+)opacity="[\d\.]+"([^>]+)stroke="url\(#well-gradient\)"/g, 'strokeWidth="1.5"$1opacity="1"$2stroke="url(#well-gradient-static)"');

    inner = inner.replace(/strokeWidth="2"([^>]+)opacity="[\d\.]+"([^>]+)stroke="url\(#well-gradient\)"/g, 'strokeWidth="2"$1opacity="1"$2stroke="url(#well-gradient-animated)"');

    inner = inner.replace(/strokeWidth="1"([^>]+)opacity="[\d\.]+"([^>]+)stroke="url\(#well-gradient\)"/g, 'strokeWidth="1"$1opacity="0.8"$2stroke="url(#well-gradient-animated)"');

    code += inner;
}

code += `</svg>
  );
}
`;

fs.writeFileSync('src/components/site/AccretionSVG.tsx', code);
console.log('Restored AccretionSVG successfully.');

