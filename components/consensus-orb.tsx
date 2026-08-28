"use client"

/**
 * ConsensusOrb — the product's core mechanic, visualized.
 * Four independent persona nodes pulse on their own, then draw
 * connecting lines to a center point (the debate), flash together
 * as one (the consensus), then reset. Pure SVG + CSS, no deps.
 *
 * Drop into your hero section, e.g.:
 *   <div className="relative">
 *     <ConsensusOrb />
 *     <h1>Stop screening resumes with a single opinion.</h1>
 *   </div>
 * Position it with a wrapping div (absolute/relative) to place it
 * behind or beside your headline as fits your layout.
 */
export default function ConsensusOrb({ size = 420 }: { size?: number }) {
  // node positions around a center at (210,150) in a 420x300 viewBox
  const center = { x: 210, y: 150 }
  const nodes = [
    { key: "tech", x: 70, y: 60, color: "var(--persona-tech)", delay: "0s" },
    { key: "hr", x: 350, y: 60, color: "var(--persona-hr)", delay: "0.4s" },
    { key: "manager", x: 70, y: 240, color: "var(--persona-manager)", delay: "0.8s" },
    { key: "skeptic", x: 350, y: 240, color: "var(--persona-skeptic)", delay: "1.2s" },
  ]

  return (
    <svg
      width={size}
      height={(size * 300) / 420}
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none select-none"
    >
      {/* connecting lines, draw in during the "debate" phase, shared 8s cycle */}
      {nodes.map((n) => (
        <line
          key={`line-${n.key}`}
          x1={n.x}
          y1={n.y}
          x2={center.x}
          y2={center.y}
          stroke={n.color}
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="orb-line"
          style={{ animationDelay: n.delay }}
        />
      ))}

      {/* center consensus core */}
      <circle cx={center.x} cy={center.y} r="10" fill="url(#coreGrad)" className="orb-core" />

      {/* four persona nodes */}
      {nodes.map((n) => (
        <g key={n.key}>
          <circle cx={n.x} cy={n.y} r="16" fill={n.color} opacity="0.15" className="orb-halo" style={{ animationDelay: n.delay }} />
          <circle cx={n.x} cy={n.y} r="8" fill={n.color} className="orb-node" style={{ animationDelay: n.delay }} />
        </g>
      ))}

      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="var(--persona-tech)" />
        </radialGradient>
      </defs>

      <style>{`
        .orb-node {
          transform-origin: center;
          transform-box: fill-box;
          animation: orb-pulse 8s ease-in-out infinite;
        }
        .orb-halo {
          transform-origin: center;
          transform-box: fill-box;
          animation: orb-halo-pulse 8s ease-in-out infinite;
        }
        .orb-line {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          opacity: 0;
          animation: orb-line-draw 8s ease-in-out infinite;
        }
        .orb-core {
          transform-origin: center;
          transform-box: fill-box;
          opacity: 0;
          animation: orb-core-flash 8s ease-in-out infinite;
        }

        @keyframes orb-pulse {
          0%, 20%   { transform: scale(1); }
          10%       { transform: scale(1.35); }
          55%, 70%  { transform: scale(1.5); }
          85%       { transform: scale(1); }
          100%      { transform: scale(1); }
        }
        @keyframes orb-halo-pulse {
          0%, 20%   { opacity: 0.15; }
          55%, 70%  { opacity: 0.4; }
          100%      { opacity: 0.15; }
        }
        @keyframes orb-line-draw {
          0%, 30%   { stroke-dashoffset: 200; opacity: 0; }
          45%       { stroke-dashoffset: 0; opacity: 0.7; }
          70%       { stroke-dashoffset: 0; opacity: 0.7; }
          85%, 100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes orb-core-flash {
          0%, 55%   { opacity: 0; transform: scale(0.5); }
          65%       { opacity: 1; transform: scale(1.8); }
          80%       { opacity: 0.8; transform: scale(1.2); }
          90%, 100% { opacity: 0; transform: scale(0.5); }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-node, .orb-halo, .orb-line, .orb-core { animation: none; opacity: 1; }
          .orb-line { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  )
}
