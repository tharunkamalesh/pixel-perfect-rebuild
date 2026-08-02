const fs = require('fs');

let svg = fs.readFileSync('src/components/site/extracted_raw_svg.txt', 'utf8');

// The original file used <style> tag or similar. Let's fix up some of the things.
svg = svg.replace(/<defs>[\s\S]*?<\/defs>/, `
    <defs>
        <radialGradient id="well-gradient-static" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CFA66A" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#D9B57A" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#D9B57A" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#D9B57A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="well-gradient-animated" cx="2067" cy="725" r="1500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F3C99C" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#F3C99C" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#F8F6F1" stopOpacity="0.0" />
        </radialGradient>
    </defs>
`);

svg = svg.replace(/stroke="url\(#well-gradient\)"/g, 'stroke="url(#well-gradient-animated)"');

svg = svg.replace(/style="([^"]*)"/g, (match, p1) => {
    if (p1.includes('mask-type:alpha')) return 'style={{ maskType: "alpha" }}';
    if (p1.includes('transform:translateY')) return 'style={{ transform: "translateY(-50px)" }}';
    return match;
});

svg = svg.replace(/className="cls-1"/g, '');

const content = `import React from 'react';

export function AccretionSVG() {
  return (
    ${svg}
  );
}
`;

fs.writeFileSync('src/components/site/AccretionSVG.tsx', content);
console.log('Restored SVG perfectly');
