import { useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Cross } from './Ornament.jsx'
import { playKnock } from '../music.js'
import { wedding } from '../data.js'

const ease = [0.7, 0, 0.25, 1]

// Tap sequence: knock-knock → seal glows & breaks → doors swing open → enter
const KNOCK_MS = 700
const BREAK_MS = 450
const OPEN_MS = 1500

export default function ChurchDoors({ onOpen, onEnter }) {
  const { t } = useTranslation()
  // idle → knock → break → open
  const [phase, setPhase] = useState('idle')
  const opening = phase === 'open'
  const started = phase !== 'idle'

  const start = () => {
    if (started) return
    setPhase('knock')
    onOpen?.()
    playKnock()
    setTimeout(() => setPhase('break'), KNOCK_MS)
    setTimeout(() => setPhase('open'), KNOCK_MS + BREAK_MS)
    setTimeout(onEnter, KNOCK_MS + BREAK_MS + OPEN_MS)
  }

  const knockShake = {
    x: [0, -5, 4, -2, 0, 0, -5, 4, -2, 0],
    transition: { duration: KNOCK_MS / 1000, times: [0, 0.07, 0.14, 0.21, 0.3, 0.43, 0.5, 0.57, 0.64, 0.75] },
  }

  return (
    <motion.div
      className="doors-screen"
      exit={{ opacity: 0, scale: 1.8, filter: 'blur(6px)' }}
      transition={{ duration: 1.4, ease }}
    >
      <div className="doors-stone" />

      <motion.div
        className="doors-top"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 1.2, delay: started ? 0 : 0.3 }}
      >
        <Cross size={22} />
        <p className="kicker">{t('doors.kicker')}</p>
        <h1 className="doors-names">
          {t('names.groom')} <span>&amp;</span> {t('names.bride')}
        </h1>
      </motion.div>

      <motion.div
        className="doorway"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={start}
      >
        <motion.div
          className="doorway-light"
          animate={opening ? { opacity: 1, scale: 1.3 } : { opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.6, ease }}
        />

        <motion.div className="door-leaves" animate={phase === 'knock' ? knockShake : { x: 0 }}>
          <motion.div className="door door-left" animate={{ rotateY: opening ? 105 : 0 }} transition={{ duration: 1.9, ease }}>
            <DoorPanels />
            <span className="door-ring" />
          </motion.div>
          <motion.div className="door door-right" animate={{ rotateY: opening ? -105 : 0 }} transition={{ duration: 1.9, ease }}>
            <DoorPanels />
            <span className="door-ring" />
          </motion.div>

          {/* warm light leaking through the gap between the doors */}
          <span className={`door-gap-light ${phase === 'break' ? 'bright' : ''} ${opening ? 'gone' : ''}`} />
          <span className={`door-threshold-light ${opening ? 'gone' : ''}`} />

          <Seal phase={phase} onActivate={start} />
        </motion.div>

        <div className="doorway-molding" />
      </motion.div>

      <motion.p
        className="doors-hint-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: started ? 0 : 1, y: 0 }}
        transition={{ duration: started ? 0.4 : 1, delay: started ? 0 : 1.2 }}
      >
        <span className="doors-hint">{t('doors.hint')}</span>
      </motion.p>
    </motion.div>
  )
}

function Seal({ phase, onActivate }) {
  const { t } = useTranslation()
  const broken = phase === 'break' || phase === 'open'
  const glowing = phase === 'knock' || phase === 'break'
  const half = (side) => ({
    x: broken ? (side === 'left' ? -46 : 46) : 0,
    y: broken ? 70 : 0,
    rotate: broken ? (side === 'left' ? -38 : 38) : 0,
    opacity: phase === 'open' ? 0 : 1,
  })

  return (
    <motion.button
      className={`door-seal ${glowing ? 'glowing' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onActivate()
      }}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.9 }}
      whileHover={phase === 'idle' ? { scale: 1.08 } : undefined}
      whileTap={phase === 'idle' ? { scale: 0.94 } : undefined}
      aria-label={t('doors.sealLabel')}
      disabled={phase !== 'idle'}
    >
      {phase === 'idle' && <span className="seal-ripple" />}
      {['left', 'right'].map((side) => (
        <motion.span
          key={side}
          className={`seal-half ${side}`}
          animate={half(side)}
          transition={broken ? { duration: 0.9, ease: [0.4, 0, 0.9, 0.6] } : { duration: 0.3 }}
        >
          <SealArt />
        </motion.span>
      ))}
      <motion.span
        className="seal-burst"
        initial={false}
        animate={broken ? { scale: [0.4, 2.6], opacity: [0.95, 0] } : { scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </motion.button>
  )
}

const SCALLOPS = Array.from({ length: 18 }, (_, i) => (i * 360) / 18)

function SealArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="sealGold" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#fff1c2" />
          <stop offset="0.35" stopColor="#e2bd66" />
          <stop offset="0.75" stopColor="#b08633" />
          <stop offset="1" stopColor="#6b4f16" />
        </radialGradient>
      </defs>
      {SCALLOPS.map((a) => (
        <circle key={a} cx="50" cy="8" r="7" fill="url(#sealGold)" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="42" fill="url(#sealGold)" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#6b4f16" strokeOpacity="0.55" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#fff3c9" strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="1.5 3" />
      <path d="M48.6 18h2.8v5h4.4v2.6h-4.4v8h-2.8v-8h-4.4V23h4.4z" fill="#5a3d10" opacity="0.85" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="30"
        fill="#5a3d10"
        opacity="0.9"
      >
        {wedding.groom.first[0]}
        <tspan fontSize="18" dy="-2">&amp;</tspan>
        <tspan dy="2">{wedding.bride.first[0]}</tspan>
      </text>
    </svg>
  )
}

function DoorPanels() {
  return (
    <div className="door-panels">
      <i />
      <i />
      <i />
    </div>
  )
}
