/**
 * Generate PWA icons for VeloSync.
 * Run: node scripts/generate-icons.js
 *
 * Creates SVG-based PNG icons at 192x192 and 512x512.
 * Uses the VeloSync copper bike icon on midnight background.
 */

const fs = require("fs");
const path = require("path");

// SVG icon template — copper bike on midnight circle
const createSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#0C1222"/>
  <g transform="translate(${size * 0.15}, ${size * 0.15}) scale(${size * 0.007})">
    <circle cx="25" cy="60" r="18" fill="none" stroke="#C8553D" stroke-width="3"/>
    <circle cx="75" cy="60" r="18" fill="none" stroke="#C8553D" stroke-width="3"/>
    <path d="M25 60 L45 25 L55 25 L75 60" fill="none" stroke="#C8553D" stroke-width="3" stroke-linejoin="round"/>
    <path d="M45 25 L35 60" fill="none" stroke="#C8553D" stroke-width="3"/>
    <path d="M55 25 L75 60" fill="none" stroke="#C8553D" stroke-width="3"/>
    <path d="M38 20 L55 20" fill="none" stroke="#C8553D" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;

const outputDir = path.join(__dirname, "..", "public", "icons");

// Write SVG files that can be converted, or use as-is
[192, 512].forEach((size) => {
  const svg = createSvg(size);
  const svgPath = path.join(outputDir, `icon-${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`Created ${svgPath}`);
});

// Also create an apple-touch-icon SVG (180x180)
fs.writeFileSync(path.join(outputDir, "apple-touch-icon.svg"), createSvg(180));
console.log("Created apple-touch-icon.svg");

console.log(
  "\nNote: For production, convert these SVGs to PNGs using sharp or an online tool."
);
console.log("For now, update manifest.json to reference .svg files instead of .png");
