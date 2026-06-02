interface NecklaceColours {
  url?: string;
  bg: string;
  bead1: string;
  bead2: string;
  bead3: string;
}

interface NecklaceSVGProps {
  size?: "sm" | "md" | "lg";
  colours: NecklaceColours;
  className?: string;
}

const SIZES = {
  sm: { width: 120, height: 132 },
  md: { width: 200, height: 220 },
  lg: { width: 320, height: 352 },
};

const CX = 100;
const CY = 108;
const RX = 70;
const RY = 82;
const BEAD_COUNT = 28;

function computeBeads(colours: NecklaceColours) {
  return Array.from({ length: BEAD_COUNT }, (_, i) => {
    const angle = (i / BEAD_COUNT) * Math.PI * 2 - Math.PI / 2;
    const x = CX + RX * Math.cos(angle);
    const y = CY + RY * Math.sin(angle);

    // Larger beads toward the bottom pendant zone
    const bottomness = Math.max(0, Math.sin(angle + Math.PI / 2));
    const r = 4.5 + bottomness * 2.5 + Math.sin(i * 1.7) * 0.8;

    const palette = [colours.bead1, colours.bead2, colours.bead3];
    const colour = palette[i % 3];

    return { x, y, r, colour };
  });
}

export default function NecklaceSVG({
  size = "md",
  colours,
  className = "",
}: NecklaceSVGProps) {
  const { width, height } = SIZES[size];

  if (colours.url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={colours.url}
        alt=""
        width={width}
        height={height}
        className={`object-cover rounded-xl ${className}`}
        style={{ width, height }}
      />
    );
  }

  const beads = computeBeads(colours);
  const claspY = CY - RY - 6;
  const filterId = `shadow-${colours.bead1.replace("#", "")}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#00000033" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="200" height="220" rx="12" fill={colours.bg} />

      {/* Thread line */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={RX}
        ry={RY}
        stroke={colours.bead1}
        strokeWidth="0.6"
        strokeOpacity="0.25"
        fill="none"
      />

      {/* Beads */}
      {beads.map((bead, i) => (
        <g key={i} filter={`url(#${filterId})`}>
          {/* Main bead */}
          <circle cx={bead.x} cy={bead.y} r={bead.r} fill={bead.colour} />
          {/* Highlight shimmer */}
          <circle
            cx={bead.x - bead.r * 0.28}
            cy={bead.y - bead.r * 0.28}
            r={bead.r * 0.38}
            fill="white"
            fillOpacity="0.28"
          />
          {/* Edge darkening */}
          <circle
            cx={bead.x + bead.r * 0.15}
            cy={bead.y + bead.r * 0.15}
            r={bead.r * 0.55}
            fill="black"
            fillOpacity="0.06"
          />
        </g>
      ))}

      {/* Clasp */}
      <rect
        x={CX - 5}
        y={claspY - 4}
        width={10}
        height={8}
        rx={2.5}
        fill={colours.bead1}
        stroke={colours.bead2}
        strokeWidth="0.8"
      />
      <line
        x1={CX}
        y1={claspY - 4}
        x2={CX}
        y2={claspY + 4}
        stroke={colours.bead3}
        strokeWidth="0.6"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
