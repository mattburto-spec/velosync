/**
 * SVG shape components for each bag type.
 * Used in both the template panel cards and on the bike when placed.
 */

interface BagShapeProps {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
}

const defaults = { color: "#C8553D", opacity: 0.6, size: 40 };

export function CylinderBag({ color = defaults.color, opacity = defaults.opacity, size = defaults.size }: BagShapeProps) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 60 36" fill="none">
      <ellipse cx="8" cy="18" rx="7" ry="14" fill={color} opacity={opacity * 0.3} />
      <rect x="8" y="4" width="44" height="28" rx="3" fill={color} opacity={opacity * 0.4} />
      <ellipse cx="52" cy="18" rx="7" ry="14" fill={color} opacity={opacity * 0.5} />
      <ellipse cx="8" cy="18" rx="7" ry="14" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
      <rect x="8" y="4" width="44" height="28" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
      <ellipse cx="52" cy="18" rx="7" ry="14" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
    </svg>
  );
}

export function TriangleBag({ color = defaults.color, opacity = defaults.opacity, size = defaults.size }: BagShapeProps) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 50 40" fill="none">
      <path d="M5 36 L25 4 L45 36 Z" fill={color} opacity={opacity * 0.3} />
      <path d="M5 36 L25 4 L45 36 Z" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} strokeLinejoin="round" />
      <line x1="15" y1="20" x2="35" y2="20" stroke={color} strokeWidth="0.8" opacity={opacity * 0.4} />
    </svg>
  );
}

export function WedgeBag({ color = defaults.color, opacity = defaults.opacity, size = defaults.size }: BagShapeProps) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 50 35" fill="none">
      <path d="M4 8 L46 4 L46 31 L4 31 Z" fill={color} opacity={opacity * 0.3} />
      <path d="M4 8 L46 4 L46 31 L4 31 Z" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} strokeLinejoin="round" />
      <line x1="12" y1="12" x2="12" y2="28" stroke={color} strokeWidth="0.8" opacity={opacity * 0.3} />
    </svg>
  );
}

export function BoxBag({ color = defaults.color, opacity = defaults.opacity, size = defaults.size }: BagShapeProps) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 50 35" fill="none">
      <rect x="4" y="4" width="42" height="27" rx="3" fill={color} opacity={opacity * 0.3} />
      <rect x="4" y="4" width="42" height="27" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
      <line x1="4" y1="12" x2="46" y2="12" stroke={color} strokeWidth="0.8" opacity={opacity * 0.3} />
    </svg>
  );
}

export function CageBag({ color = defaults.color, opacity = defaults.opacity, size = defaults.size }: BagShapeProps) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 24 40" fill="none">
      <rect x="3" y="3" width="18" height="34" rx="2" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
      <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1" opacity={opacity * 0.4} />
      <line x1="3" y1="17" x2="21" y2="17" stroke={color} strokeWidth="1" opacity={opacity * 0.4} />
      <line x1="3" y1="24" x2="21" y2="24" stroke={color} strokeWidth="1" opacity={opacity * 0.4} />
      <line x1="3" y1="31" x2="21" y2="31" stroke={color} strokeWidth="1" opacity={opacity * 0.4} />
      <circle cx="12" cy="6" r="2" fill={color} opacity={opacity * 0.5} />
    </svg>
  );
}

export function SlimBag({ color = defaults.color, opacity = defaults.opacity, size = defaults.size }: BagShapeProps) {
  return (
    <svg width={size} height={size * 0.35} viewBox="0 0 60 20" fill="none">
      <rect x="3" y="3" width="54" height="14" rx="4" fill={color} opacity={opacity * 0.3} />
      <rect x="3" y="3" width="54" height="14" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity={opacity} />
    </svg>
  );
}

const SHAPE_MAP = {
  cylinder: CylinderBag,
  triangle: TriangleBag,
  wedge: WedgeBag,
  box: BoxBag,
  cage: CageBag,
  slim: SlimBag,
} as const;

export function BagShape({ shape, ...props }: BagShapeProps & { shape: keyof typeof SHAPE_MAP }) {
  const Component = SHAPE_MAP[shape];
  return <Component {...props} />;
}
