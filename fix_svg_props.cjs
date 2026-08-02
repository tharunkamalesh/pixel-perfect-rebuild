const fs = require('fs');
let content = fs.readFileSync('src/components/site/AccretionSVG.tsx', 'utf8');

// Update SVG tag
content = content.replace(/<svg[^>]*viewBox/, '<svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox');

// Replace stroke rgb(135, 72, 0) and rgba(232, 105, 6, 1) to #e2d7c5
content = content.replace(/stroke="rgb\(135, 72, 0\)"/gi, 'stroke="#e2d7c5"');
content = content.replace(/stroke="rgba\(232, 105, 6, 1\)"/gi, 'stroke="#f59e0b"');

fs.writeFileSync('src/components/site/AccretionSVG.tsx', content);
console.log('Fixed SVG colors');
