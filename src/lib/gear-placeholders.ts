/**
 * Category-based gear placeholder images.
 * Returns inline SVG data URLs themed to VeloSync's Midnight Trail palette.
 */

const PLACEHOLDER_CONFIG: Record<
  string,
  { icon: string; gradient: [string, string]; label: string }
> = {
  shelter: {
    icon: `<path d="M12 3L2 15h3v6h14v-6h3L12 3z" fill="rgba(255,255,255,0.9)"/><path d="M10 21v-5h4v5" fill="rgba(255,255,255,0.5)"/>`,
    gradient: ["#C8553D", "#A3412E"],
    label: "Shelter",
  },
  sleep: {
    icon: `<path d="M2 18h20v2H2v-2zm1-3c0-4 3-7.5 9-7.5S21 11 21 15H3z" fill="rgba(255,255,255,0.9)"/><ellipse cx="8" cy="15" rx="2" ry="1.5" fill="rgba(255,255,255,0.5)"/>`,
    gradient: ["#5B8FB9", "#4A7A9E"],
    label: "Sleep System",
  },
  cook: {
    icon: `<path d="M8 5v3m4-3v3m4-3v3M5 11h14a1 1 0 011 1v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2a1 1 0 011-1z" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M10 18v2m4-2v2" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    gradient: ["#D4A574", "#BF8E5E"],
    label: "Cook & Eat",
  },
  clothing: {
    icon: `<path d="M8 2l-5 5 3 2v11h12V9l3-2-5-5-3 3-3-3z" fill="rgba(255,255,255,0.9)"/><path d="M12 8v4" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`,
    gradient: ["#8B5CF6", "#7C3AED"],
    label: "Clothing",
  },
  tools: {
    icon: `<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" fill="rgba(255,255,255,0.9)"/>`,
    gradient: ["#6E7787", "#5A6370"],
    label: "Tools & Repair",
  },
  electronics: {
    icon: `<rect x="6" y="4" width="12" height="16" rx="2" fill="rgba(255,255,255,0.9)"/><path d="M10 4V2m4 2V2" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round"/><rect x="9" y="8" width="6" height="4" rx="0.5" fill="rgba(255,255,255,0.3)"/><circle cx="12" cy="16" r="1" fill="rgba(255,255,255,0.4)"/>`,
    gradient: ["#47759A", "#3A6285"],
    label: "Electronics",
  },
  hydration: {
    icon: `<path d="M12 2C8 2 6 5 6 9c0 5 6 11 6 11s6-6 6-11c0-4-2-7-6-7z" fill="rgba(255,255,255,0.9)"/><circle cx="12" cy="9" r="2.5" fill="rgba(255,255,255,0.3)"/>`,
    gradient: ["#06B6D4", "#0891B2"],
    label: "Hydration",
  },
  food: {
    icon: `<circle cx="12" cy="12" r="7" fill="rgba(255,255,255,0.9)"/><path d="M9 9l1.5 3L12 9l1.5 3L15 9" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
    gradient: ["#6B8F71", "#587A5E"],
    label: "Food & Fuel",
  },
  misc: {
    icon: `<rect x="4" y="4" width="16" height="16" rx="2" fill="rgba(255,255,255,0.9)"/><path d="M4 10h16M10 4v16" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`,
    gradient: ["#9CA3AF", "#7B8494"],
    label: "Miscellaneous",
  },
};

/**
 * Returns an inline SVG data URL for a gear category placeholder.
 * Looks like a polished product photo card with gradient + icon.
 */
export function getCategoryPlaceholder(category: string): string {
  const config = PLACEHOLDER_CONFIG[category] ?? PLACEHOLDER_CONFIG.misc;
  const [c1, c2] = config.gradient;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="0.8" fill="rgba(255,255,255,0.08)"/>
      </pattern>
    </defs>
    <rect width="400" height="300" rx="8" fill="url(#bg)"/>
    <rect width="400" height="300" rx="8" fill="url(#dots)"/>
    <g transform="translate(176,100) scale(2)">
      ${config.icon}
    </g>
    <text x="200" y="220" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="system-ui,sans-serif" font-size="14" font-weight="500">${config.label}</text>
    <text x="200" y="240" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="system-ui,sans-serif" font-size="11">Upload a product photo</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Build a Google Images search URL for a gear item.
 */
export function getGearSearchUrl(brand: string, model: string): string {
  const query = `${brand} ${model} product photo`.trim();
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}
