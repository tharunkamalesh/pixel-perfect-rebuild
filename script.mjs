
import fs from 'fs';
const html = fs.readFileSync('framer.html', 'utf8');
const start = html.indexOf('<svg width=\"100%\" height=\"100%\" viewBox=\"867 0 2400 1080\"');
const end = html.indexOf('</svg>', start) + 6;
let svg = html.substring(start, end);

// Convert to basic JSX:
svg = svg.replace(/stroke-width/g, 'strokeWidth');
svg = svg.replace(/stroke-opacity/g, 'strokeOpacity');
svg = svg.replace(/fill-opacity/g, 'fillOpacity');
svg = svg.replace(/stroke-linecap/g, 'strokeLinecap');
svg = svg.replace(/stroke-linejoin/g, 'strokeLinejoin');
svg = svg.replace(/stroke-dasharray/g, 'strokeDasharray');
svg = svg.replace(/clip-path/g, 'clipPath');
svg = svg.replace(/clip-rule/g, 'clipRule');
svg = svg.replace(/fill-rule/g, 'fillRule');
svg = svg.replace(/class=/g, 'className=');

// They asked for:
// For all converging radial paths, apply an animated dashed stroke (strokeDasharray=\"10 15\").
// Since generating a mapped framer-motion path array dynamically is hard, let's just make the whole component return the SVG string...
// Wait, I need to wrap motion.path around the radial paths!

fs.writeFileSync('src/components/site/extracted_raw_svg.txt', svg);

