// Cute vector illustrations of the bride & groom (pure SVG, animated with CSS)

const BRIDE_SKIN = '#c98b62'
const GROOM_SKIN = '#b77a52'
const HAIR = '#23150f'
const GOLD = '#d4ac55'

function Eyes({ y = 78, lashes = false }) {
  return (
    <g className="toon-eyes">
      {[86, 114].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx="3.6" ry="4.6" fill={HAIR} />
          <circle cx={x + 1.3} cy={y - 1.6} r="1.3" fill="#fff" />
          {lashes && (
            <path
              d={x < 100 ? `M${x - 4} ${y - 3} l-3 -2.5` : `M${x + 4} ${y - 3} l3 -2.5`}
              stroke={HAIR}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </g>
      ))}
    </g>
  )
}

export function BrideG() {
  return (
    <g className="toon toon-bride">
      <defs>
        <linearGradient id="toonGown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#f1e6cf" />
        </linearGradient>
      </defs>

      {/* veil (back) */}
      <path
        className="toon-veil"
        d="M100 30 C58 34 44 92 40 160 C36 228 30 276 20 312 L180 312 C170 276 164 228 160 160 C156 92 142 34 100 30Z"
        fill="#fff"
        fillOpacity="0.55"
        stroke="#eadfcb"
        strokeWidth="1.5"
      />

      {/* gown + saree drape */}
      <path d="M74 146 C70 190 52 262 36 310 L164 310 C148 262 130 190 126 146 Z" fill="url(#toonGown)" stroke="#e6d8bd" strokeWidth="1.5" />
      <path d="M38 298 Q100 316 162 298 L165 311 L35 311 Z" fill={GOLD} />
      <path d="M44 286 Q100 302 156 286" stroke={GOLD} strokeWidth="1.5" fill="none" strokeDasharray="2 5" />
      <path d="M82 118 C96 152 120 204 152 266 L160 254 C130 198 110 150 98 116 Z" fill="#f6ecd8" stroke={GOLD} strokeWidth="3" />

      {/* bodice */}
      <path d="M76 116 Q100 108 124 116 L128 150 Q100 158 72 150 Z" fill="#fffaf2" stroke="#e6d8bd" strokeWidth="1.5" />

      {/* arms */}
      <path d="M76 120 C63 138 64 162 86 176" stroke={BRIDE_SKIN} strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M124 120 C137 138 136 162 114 176" stroke={BRIDE_SKIN} strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M72 124 C66 132 64 140 64 146 M128 124 C134 132 136 140 136 146" stroke="#fffaf2" strokeWidth="12" strokeLinecap="round" fill="none" />

      {/* neck + necklace with cross */}
      <rect x="92" y="96" width="16" height="22" rx="6" fill={BRIDE_SKIN} />
      <path d="M88 110 Q100 126 112 110" stroke={GOLD} strokeWidth="2.5" fill="none" />
      <path d="M99 120h2v4h3v2h-3v6h-2v-6h-3v-2h3z" fill={GOLD} />

      {/* bouquet */}
      <g className="toon-bouquet">
        <path d="M96 186 L92 222 M104 186 L110 220" stroke="#b8323a" strokeWidth="3" strokeLinecap="round" />
        {[
          [-18, 4, -30],
          [18, 4, 30],
          [-10, 14, -60],
          [10, 14, 60],
        ].map(([dx, dy, r], i) => (
          <ellipse key={i} cx={100 + dx} cy={178 + dy} rx="6" ry="11" fill="#3f7a4a" transform={`rotate(${r} ${100 + dx} ${178 + dy})`} />
        ))}
        {[
          [100, 172, '#b8323a'],
          [88, 178, '#fff6f0'],
          [112, 178, '#fff6f0'],
          [94, 186, '#f2b6c0'],
          [106, 186, '#b8323a'],
        ].map(([x, y, c], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7.5" fill={c} stroke="rgba(0,0,0,0.12)" />
            <path d={`M${x - 3} ${y} a3 3 0 1 1 3 3`} stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" fill="none" />
          </g>
        ))}
      </g>
      <circle cx="86" cy="176" r="5.5" fill={BRIDE_SKIN} />
      <circle cx="114" cy="176" r="5.5" fill={BRIDE_SKIN} />

      {/* head */}
      <g className="toon-head">
        <path d="M62 80 C58 42 80 32 100 32 C120 32 142 42 138 80 C138 98 132 108 128 108 L72 108 C68 108 62 98 62 80Z" fill={HAIR} />
        <circle cx="68" cy="80" r="5" fill={BRIDE_SKIN} />
        <circle cx="132" cy="80" r="5" fill={BRIDE_SKIN} />
        <ellipse cx="100" cy="76" rx="31" ry="33" fill={BRIDE_SKIN} />
        <path
          d="M68 72 C66 46 82 38 100 40 C118 38 134 46 132 72 C126 60 112 52 102 50 L100 45 L98 50 C88 52 74 60 68 72Z"
          fill={HAIR}
        />
        {/* jhumka earrings */}
        {[68, 132].map((x) => (
          <g key={x}>
            <circle cx={x} cy="88" r="2" fill={GOLD} />
            <path d={`M${x - 4.5} 97 Q${x} 86 ${x + 4.5} 97 Z`} fill={GOLD} />
            <circle cx={x} cy="99" r="1.4" fill={GOLD} />
          </g>
        ))}
        {/* jasmine in hair */}
        {[
          [64, 64],
          [62, 72],
          [136, 64],
          [138, 72],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#eadfcb" />
        ))}
        {/* tiara */}
        <path d="M80 44 Q100 32 120 44" stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" />
        {[86, 100, 114].map((x, i) => (
          <circle key={x} cx={x} cy={i === 1 ? 36 : 40} r="2.6" fill="#fff" stroke={GOLD} />
        ))}
        <Eyes lashes />
        <ellipse cx="80" cy="90" rx="6" ry="3.5" fill="#e8837a" opacity="0.45" />
        <ellipse cx="120" cy="90" rx="6" ry="3.5" fill="#e8837a" opacity="0.45" />
        <path d="M98 84 q2 3 4 0" stroke="#9a5a3c" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M92 94 Q100 101 108 94" stroke="#8a2a30" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* veil over hair */}
        <path d="M64 64 C68 36 90 26 100 26 C110 26 132 36 136 64 C124 46 76 46 64 64Z" fill="#fff" fillOpacity="0.5" />
      </g>
    </g>
  )
}

export function GroomG() {
  return (
    <g className="toon toon-groom">
      {/* trousers & shoes */}
      <path d="M78 226 L74 300 L97 300 L100 238 L103 300 L126 300 L122 226Z" fill="#101013" />
      <ellipse cx="84" cy="303" rx="15" ry="6" fill="#0b0b12" />
      <ellipse cx="116" cy="303" rx="15" ry="6" fill="#0b0b12" />

      {/* arms (sleeves) */}
      <path d="M70 124 C56 150 54 200 58 232" stroke="#18181c" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M130 124 C144 150 146 200 142 232" stroke="#18181c" strokeWidth="18" strokeLinecap="round" fill="none" />
      <circle cx="58" cy="240" r="7" fill={GROOM_SKIN} />
      <circle cx="142" cy="240" r="7" fill={GROOM_SKIN} />

      {/* jacket */}
      <path d="M68 118 Q100 108 132 118 C140 150 142 200 138 238 Q100 248 62 238 C58 200 60 150 68 118Z" fill="#1b1b20" />
      <path d="M86 114 L100 162 L114 114Z" fill="#fff" />
      <path d="M96 118 L104 118 L102 124 L106 152 L100 160 L94 152 L98 124Z" fill="#7a1a2e" />
      <path d="M86 114 L100 162 L91 136 L78 122Z" fill="#2c2c33" />
      <path d="M114 114 L100 162 L109 136 L122 122Z" fill="#2c2c33" />
      <path d="M100 162 L100 240" stroke="#0c0c0f" strokeWidth="1.5" />
      <path d="M72 126 C66 160 66 200 68 232" stroke="#fff" strokeOpacity="0.06" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="182" r="2.6" fill={GOLD} />
      <circle cx="100" cy="202" r="2.6" fill={GOLD} />
      <path d="M114 146 l10 0 l-3 -6 l-3 4 l-2 -4z" fill="#fff" />
      {/* boutonniere */}
      <ellipse cx="82" cy="142" rx="3" ry="6" fill="#3f7a4a" transform="rotate(-35 82 142)" />
      <circle cx="84" cy="136" r="5" fill="#fff6f0" stroke="rgba(0,0,0,0.12)" />

      {/* neck */}
      <rect x="92" y="96" width="16" height="20" rx="6" fill={GROOM_SKIN} />

      {/* head */}
      <g className="toon-head">
        <circle cx="68" cy="80" r="5.5" fill={GROOM_SKIN} />
        <circle cx="132" cy="80" r="5.5" fill={GROOM_SKIN} />
        <ellipse cx="100" cy="76" rx="31" ry="33" fill={GROOM_SKIN} />
        <path
          d="M67 76 C60 42 84 30 104 32 C126 34 140 48 133 76 C130 62 126 56 120 52 C108 58 88 56 76 52 C71 58 68 66 67 76Z"
          fill={HAIR}
        />
        <path d="M82 68 l8 -1.5 M110 66.5 l8 1.5" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" />
        <Eyes />
        <ellipse cx="80" cy="86" rx="5" ry="2.8" fill="#d9776c" opacity="0.35" />
        <ellipse cx="120" cy="86" rx="5" ry="2.8" fill="#d9776c" opacity="0.35" />
        <path d="M98 84 q2 3 4 0" stroke="#8a4f33" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* full beard with sideburns, medium intensity */}
        <path
          d="M67 70 C65 94 78 116 100 117 C122 116 135 94 133 70 L128 72 C127 87 121 95 112 96 Q100 92 88 96 C79 95 73 87 72 72 Z"
          fill="#3b271d"
          opacity="0.85"
        />
        <path d="M80 104 q4 4 8 5 M112 109 q4 -1 8 -5 M97 111 q3 1 6 0" stroke="#5a3e30" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M89 92 Q100 86 111 92 Q106 96 100 94 Q94 96 89 92Z" fill="#3b271d" opacity="0.92" />
        <path d="M93 98 Q100 105 107 98 Q100 100 93 98Z" fill="#8a3a36" />
        <path d="M95 98.4 Q100 100 105 98.4" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    </g>
  )
}

export function BrideToon({ className = '' }) {
  return (
    <svg className={`toon-svg ${className}`} viewBox="0 0 200 320" role="img" aria-label="Illustration of the bride">
      <BrideG />
    </svg>
  )
}

export function GroomToon({ className = '' }) {
  return (
    <svg className={`toon-svg ${className}`} viewBox="0 0 200 320" role="img" aria-label="Illustration of the groom">
      <GroomG />
    </svg>
  )
}

/** The couple standing together under a floating heart */
export function CoupleToon({ className = '' }) {
  return (
    <svg className={`toon-svg couple-toon ${className}`} viewBox="-6 -30 290 345" role="img" aria-label="Illustration of the bride and groom together">
      <g transform="translate(116 -4)">
        <GroomG />
      </g>
      <g transform="translate(-18 6)">
        <BrideG />
      </g>
      <g className="toon-heart">
        <path d="M149 -8 C149 -18 135 -20 135 -9 C135 0 149 6 149 10 C149 6 163 0 163 -9 C163 -20 149 -18 149 -8Z" fill="#c0392b" />
      </g>
    </svg>
  )
}
