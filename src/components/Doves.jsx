import { motion } from 'motion/react'

// Each dove leaves the rose window and flies off-screen along its own curve.
// x/y are viewport-relative offsets from the window; s = size growth as it nears the viewer.
const FLIGHTS = [
  { x: ['0vw', '-18vw', '-62vw'], y: ['0vh', '-14vh', '-48vh'], s: [0.35, 0.8, 1.35], delay: 0.2, dur: 4.2, flip: true },
  { x: ['0vw', '20vw', '64vw'], y: ['0vh', '-10vh', '-40vh'], s: [0.3, 0.75, 1.25], delay: 0.45, dur: 4.6 },
  { x: ['0vw', '-10vw', '-40vw'], y: ['0vh', '-22vh', '-70vh'], s: [0.25, 0.6, 1.05], delay: 0.8, dur: 4.4, flip: true },
  { x: ['0vw', '12vw', '44vw'], y: ['0vh', '-24vh', '-72vh'], s: [0.25, 0.55, 0.95], delay: 1.05, dur: 4.8 },
  { x: ['0vw', '28vw', '70vw'], y: ['0vh', '4vh', '-20vh'], s: [0.3, 0.9, 1.5], delay: 1.4, dur: 4.3 },
]

// Where the rose window lands on screen: the cathedral SVG (1440×900, window at y=300)
// is drawn with preserveAspectRatio "xMidYMax slice".
function roseWindowTop() {
  const w = window.innerWidth
  const h = Math.max(window.innerHeight, 600)
  const scale = Math.max(w / 1440, h / 900)
  return Math.max(h * 0.12, h - (900 - 300) * scale)
}

export default function Doves({ play }) {
  if (!play) return null
  return (
    <div className="doves" aria-hidden="true" style={{ top: roseWindowTop() }}>
      {FLIGHTS.map((f, i) => (
        <motion.div
          key={i}
          className="dove-path"
          initial={{ x: f.x[0], y: f.y[0], scale: f.s[0], opacity: 0 }}
          animate={{ x: f.x, y: f.y, scale: f.s, opacity: [0, 1, 1, 0] }}
          transition={{
            delay: f.delay,
            duration: f.dur,
            ease: [0.35, 0, 0.6, 1],
            opacity: { delay: f.delay, duration: f.dur, times: [0, 0.12, 0.8, 1] },
          }}
        >
          <Dove flip={f.flip} flapDelay={i * -0.13} />
        </motion.div>
      ))}
    </div>
  )
}

// Raised dove wing: curved leading edge from the shoulder up to the wingtip,
// then feather tips stepping back down to the body.
const WING =
  'M74 46 C75 30 68 15 52 3 C53 8 53 11 52 14 C49 11 45 9 40 9 C43 12 45 16 46 19 C42 17 38 17 34 18 C38 21 41 24 43 27 C39 26 36 27 33 29 C37 31 40 34 42 37 C39 38 37 40 36 42 C41 43 45 46 48 50 Z'

function Dove({ flip, flapDelay }) {
  return (
    <svg className="dove" viewBox="0 0 120 90" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <defs>
        <linearGradient id="doveBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe2ec" />
        </linearGradient>
        <linearGradient id="doveWing" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.75" stopColor="#f3f4f9" />
          <stop offset="1" stopColor="#c9cedb" />
        </linearGradient>
      </defs>

      {/* far wing — same shape, set back and greyer */}
      <g className="wing wing-back" style={{ animationDelay: `${flapDelay}s` }}>
        <path transform="translate(12 -3) scale(0.92)" d={WING} fill="#d3d7e3" />
      </g>

      {/* slim tail with feather separations */}
      <path d="M32 55 L12 50.5 C10 54 10 59.5 12 63 L32 61 Z" fill="url(#doveBody)" />
      <path d="M32 57 L12 54 M32 58.5 L11.5 58.5 M32 60 L12 61" stroke="#c9cedb" strokeWidth="0.8" strokeLinecap="round" />

      {/* body: plump chest tapering to the tail */}
      <path
        d="M28 57 C38 49 58 45 76 44 C82 44 88 46 92 49 C88 54 70 60 48 62.5 C38 63.5 32 61 28 57 Z"
        fill="url(#doveBody)"
      />
      {/* round head on a short neck */}
      <path d="M78 45 C80 40 84 37 89 36.5 C95 36 99.5 39.5 99.5 44 C99.5 48 96 50.5 92 50.5 C86 50.5 81 49 78 45 Z" fill="#fff" />
      {/* short dove beak (pale cere), eye */}
      <path d="M99 42.4 L105.5 44.2 L99 46 Z" fill="#8f6a62" />
      <ellipse cx="100" cy="42.6" rx="1.8" ry="1" fill="#f1e3df" />
      <circle cx="93.5" cy="42.5" r="1.6" fill="#1a1016" />
      <circle cx="94" cy="42" r="0.5" fill="#fff" />

      {/* near wing — raised, curved leading edge, stepped primary & secondary feathers */}
      <g className="wing wing-front" style={{ animationDelay: `${flapDelay}s` }}>
        <path d={WING} fill="url(#doveWing)" stroke="#cfd4e0" strokeWidth="0.8" strokeLinejoin="round" />
        <path
          d="M70 44 C66 32 60 20 52 12 M66 45 C61 34 54 25 45 19 M62 46 C57 38 50 31 42 27 M58 47 C54 42 48 38 41 36"
          stroke="#d3d7e2"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
