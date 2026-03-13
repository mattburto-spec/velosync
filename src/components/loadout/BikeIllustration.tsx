/**
 * Clean geometric side-profile bikepacking bike SVG.
 * Apple-style minimal line art in Midnight Trail palette.
 */
export function BikeIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rear wheel */}
      <circle cx="600" cy="280" r="95" stroke="#4A5568" strokeWidth="2.5" opacity="0.3" />
      <circle cx="600" cy="280" r="95" stroke="#6E7787" strokeWidth="1" strokeDasharray="2 4" opacity="0.15" />
      <circle cx="600" cy="280" r="85" stroke="#4A5568" strokeWidth="1.5" opacity="0.2" />
      <circle cx="600" cy="280" r="12" stroke="#5B8FB9" strokeWidth="2" opacity="0.5" />
      {/* Rear spokes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={`rs-${angle}`}
          x1={600 + 12 * Math.cos((angle * Math.PI) / 180)}
          y1={280 + 12 * Math.sin((angle * Math.PI) / 180)}
          x2={600 + 85 * Math.cos((angle * Math.PI) / 180)}
          y2={280 + 85 * Math.sin((angle * Math.PI) / 180)}
          stroke="#4A5568"
          strokeWidth="0.5"
          opacity="0.2"
        />
      ))}
      {/* Rear tire */}
      <circle cx="600" cy="280" r="93" stroke="#6E7787" strokeWidth="5" opacity="0.15" />

      {/* Front wheel */}
      <circle cx="200" cy="280" r="95" stroke="#4A5568" strokeWidth="2.5" opacity="0.3" />
      <circle cx="200" cy="280" r="95" stroke="#6E7787" strokeWidth="1" strokeDasharray="2 4" opacity="0.15" />
      <circle cx="200" cy="280" r="85" stroke="#4A5568" strokeWidth="1.5" opacity="0.2" />
      <circle cx="200" cy="280" r="12" stroke="#5B8FB9" strokeWidth="2" opacity="0.5" />
      {/* Front spokes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={`fs-${angle}`}
          x1={200 + 12 * Math.cos((angle * Math.PI) / 180)}
          y1={280 + 12 * Math.sin((angle * Math.PI) / 180)}
          x2={200 + 85 * Math.cos((angle * Math.PI) / 180)}
          y2={280 + 85 * Math.sin((angle * Math.PI) / 180)}
          stroke="#4A5568"
          strokeWidth="0.5"
          opacity="0.2"
        />
      ))}
      {/* Front tire */}
      <circle cx="200" cy="280" r="93" stroke="#6E7787" strokeWidth="5" opacity="0.15" />

      {/* Frame - main triangle */}
      {/* Seat tube */}
      <line x1="460" y1="110" x2="430" y2="280" stroke="#5B8FB9" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      {/* Top tube */}
      <line x1="460" y1="110" x2="270" y2="125" stroke="#5B8FB9" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      {/* Down tube */}
      <line x1="270" y1="125" x2="430" y2="280" stroke="#5B8FB9" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      {/* Head tube */}
      <line x1="270" y1="125" x2="255" y2="165" stroke="#5B8FB9" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

      {/* Rear triangle */}
      {/* Chainstay */}
      <line x1="430" y1="280" x2="600" y2="280" stroke="#5B8FB9" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Seatstay */}
      <line x1="460" y1="115" x2="600" y2="280" stroke="#5B8FB9" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* Fork */}
      <line x1="255" y1="165" x2="200" y2="280" stroke="#5B8FB9" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      {/* Fork crown detail */}
      <circle cx="255" cy="165" r="4" fill="#5B8FB9" opacity="0.3" />

      {/* Bottom bracket */}
      <circle cx="430" cy="280" r="8" stroke="#5B8FB9" strokeWidth="2" fill="#0C1222" opacity="0.6" />
      {/* Crank arm */}
      <line x1="430" y1="280" x2="410" y2="310" stroke="#6E7787" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      {/* Pedal */}
      <rect x="402" y="308" width="16" height="5" rx="2" fill="#6E7787" opacity="0.3" />

      {/* Saddle */}
      <ellipse cx="470" cy="98" rx="28" ry="6" fill="#3A4555" opacity="0.6" />
      <path d="M442 98 Q470 90 498 98" stroke="#4A5568" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Seatpost */}
      <line x1="465" y1="104" x2="460" y2="115" stroke="#5B8FB9" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* Handlebar */}
      <path
        d="M262 118 Q250 108 230 115 Q215 120 210 130"
        stroke="#6E7787"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Stem */}
      <line x1="270" y1="125" x2="262" y2="118" stroke="#6E7787" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Bar tape / grip */}
      <path
        d="M230 115 Q222 118 218 125"
        stroke="#C8553D"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Rear cassette */}
      <circle cx="600" cy="280" r="18" stroke="#4A5568" strokeWidth="1.5" opacity="0.25" />

      {/* Chain (simplified) */}
      <path
        d="M440 280 Q520 290 598 280"
        stroke="#4A5568"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
        strokeDasharray="3 2"
      />

      {/* Subtle ground shadow */}
      <ellipse cx="400" cy="382" rx="220" ry="8" fill="url(#groundShadow)" opacity="0.3" />

      <defs>
        <radialGradient id="groundShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#5B8FB9" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#5B8FB9" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
