import { memo } from 'react'

const GLASS = ['#b8323a', '#2c56a8', '#d9a52a', '#1f7a55', '#7b3c9a', '#c2562b']

/** Pointed gothic arch path, base at y=bottom, apex at y=top */
function arch(x, w, top, bottom) {
  const r = x + w
  const mid = x + w / 2
  const spring = top + w * 0.62
  return `M${x} ${bottom} L${x} ${spring} Q${x} ${top + w * 0.12} ${mid} ${top} Q${r} ${top + w * 0.12} ${r} ${spring} L${r} ${bottom} Z`
}

function RoseWindow({ cx, cy, r }) {
  const outer = Array.from({ length: 16 }, (_, i) => i * 22.5)
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5)
  return (
    <g className="rose-window">
      <circle cx={cx} cy={cy} r={r + 10} fill="#140c18" stroke="#c9a24a" strokeWidth="3" />
      <g className="rose-spin" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {outer.map((a, i) => (
          <ellipse
            key={a}
            cx={cx}
            cy={cy - r * 0.62}
            rx={r * 0.17}
            ry={r * 0.36}
            fill={GLASS[i % GLASS.length]}
            stroke="#1a1016"
            strokeWidth="3"
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        ))}
        {inner.map((a, i) => (
          <ellipse
            key={a}
            cx={cx}
            cy={cy - r * 0.3}
            rx={r * 0.11}
            ry={r * 0.22}
            fill={GLASS[(i + 2) % GLASS.length]}
            stroke="#1a1016"
            strokeWidth="2.5"
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        ))}
      </g>
      {/* stone tracery */}
      <g stroke="#c9a24a" strokeOpacity="0.55" strokeWidth="2" fill="none">
        <circle cx={cx} cy={cy} r={r * 0.46} />
        <circle cx={cx} cy={cy} r={r * 0.98} />
        {outer.map((a) => (
          <line key={a} x1={cx} y1={cy - r * 0.14} x2={cx} y2={cy - r * 0.98} transform={`rotate(${a + 11.25} ${cx} ${cy})`} />
        ))}
      </g>
      {outer.map((a) => (
        <circle
          key={a}
          cx={cx}
          cy={cy - r * 1.04}
          r={r * 0.07}
          fill="#c9a24a"
          fillOpacity="0.5"
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.12} fill="#f3d27a" stroke="#1a1016" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r} fill="url(#roseGlow)" style={{ mixBlendMode: 'screen' }} />
    </g>
  )
}

function Lancet({ x, w, top, bottom, seed = 0 }) {
  const rows = 5
  const h = (bottom - top - w * 0.6) / rows
  return (
    <g>
      <path d={arch(x - 6, w + 12, top - 8, bottom + 6)} fill="#1a1016" stroke="#c9a24a" strokeWidth="2" />
      <clipPath id={`lancet-${x}`}>
        <path d={arch(x, w, top, bottom)} />
      </clipPath>
      <g clipPath={`url(#lancet-${x})`}>
        {Array.from({ length: rows + 2 }, (_, row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={x + (col * w) / 2}
              y={top + (row - 1) * h + w * 0.35}
              width={w / 2}
              height={h}
              fill={GLASS[(row * 2 + col + seed) % GLASS.length]}
              stroke="#1a1016"
              strokeWidth="3"
            />
          )),
        )}
        <rect x={x} y={top} width={w} height={bottom - top} fill="url(#glassSheen)" />
      </g>
    </g>
  )
}

function Cathedral() {
  const W = 1440
  const H = 900
  return (
    <svg className="cathedral" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="nave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070a18" />
          <stop offset="0.55" stopColor="#141029" />
          <stop offset="1" stopColor="#2a0f1f" />
        </linearGradient>
        <radialGradient id="roseGlow">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#ffd98a" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="pillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0913" />
          <stop offset="0.45" stopColor="#2b2233" />
          <stop offset="0.6" stopColor="#3a2f40" />
          <stop offset="1" stopColor="#0b0913" />
        </linearGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe7ad" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffe7ad" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="altarGlow" cx="0.5" cy="1" r="0.7">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#nave)" />

      {/* vaulted ribs */}
      <g stroke="#2f2640" strokeWidth="3" fill="none" opacity="0.8">
        <path d="M0 260 Q360 -40 720 40 Q1080 -40 1440 260" />
        <path d="M120 360 Q420 60 720 110 Q1020 60 1320 360" />
        <path d="M-60 180 Q300 -120 720 -20 Q1140 -120 1500 180" />
      </g>

      {/* side windows */}
      <Lancet x={150} w={90} top={250} bottom={640} seed={1} />
      <Lancet x={1200} w={90} top={250} bottom={640} seed={3} />
      <Lancet x={330} w={70} top={330} bottom={620} seed={4} />
      <Lancet x={1040} w={70} top={330} bottom={620} seed={2} />

      {/* central great window */}
      <path d={arch(500, 440, 70, 900)} fill="#0e0a14" stroke="#c9a24a" strokeWidth="4" />
      <path d={arch(520, 400, 100, 900)} fill="#120c1a" />
      <RoseWindow cx={720} cy={300} r={150} />
      <Lancet x={555} w={70} top={480} bottom={760} seed={0} />
      <Lancet x={685} w={70} top={470} bottom={760} seed={5} />
      <Lancet x={815} w={70} top={480} bottom={760} seed={2} />

      {/* light rays */}
      <g className="rays" style={{ mixBlendMode: 'screen' }}>
        <polygon className="ray r1" points="640,300 800,300 1020,900 420,900" fill="url(#ray)" />
        <polygon className="ray r2" points="180,300 220,300 420,900 180,900" fill="url(#ray)" />
        <polygon className="ray r3" points="1220,300 1260,300 1260,900 1020,900" fill="url(#ray)" />
      </g>

      {/* pillars */}
      {[40, 430, 950, 1340].map((x) => (
        <g key={x}>
          <rect x={x} y="120" width="60" height="780" fill="url(#pillar)" />
          <rect x={x - 10} y="120" width="80" height="18" fill="#2b2233" />
          <rect x={x - 10} y="870" width="80" height="30" fill="#1a1422" />
        </g>
      ))}

      {/* altar */}
      <rect x="0" y="780" width={W} height="120" fill="url(#altarGlow)" />
      <path d="M560 900 L600 820 H840 L880 900 Z" fill="#1d1420" stroke="#c9a24a" strokeWidth="1.5" />
      <rect x="590" y="800" width="260" height="22" rx="3" fill="#2a1d2c" stroke="#c9a24a" strokeWidth="1.5" />
    </svg>
  )
}

export default memo(Cathedral)
