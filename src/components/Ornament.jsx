import { motion } from 'motion/react'

export function Cross({ size = 34, className = '' }) {
  return (
    <svg className={`cross ${className}`} width={size} height={size * 1.4} viewBox="0 0 40 56" aria-hidden="true">
      <defs>
        <linearGradient id="crossGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e3a8" />
          <stop offset="0.5" stopColor="#c9a24a" />
          <stop offset="1" stopColor="#8a6a26" />
        </linearGradient>
      </defs>
      <path
        d="M17 2h6v14h13v6H23v32h-6V22H4v-6h13z"
        fill="url(#crossGold)"
        stroke="#f6e3a8"
        strokeWidth="0.6"
      />
    </svg>
  )
}

/** Gold flourish divider that draws itself when scrolled into view */
export function Flourish({ className = '' }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1] } },
  }
  return (
    <motion.svg
      className={`flourish ${className}`}
      viewBox="0 0 320 40"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      aria-hidden="true"
    >
      <motion.path
        variants={draw}
        d="M4 20 H110 C125 20 128 8 140 8 C150 8 152 20 160 20 C168 20 170 8 180 8 C192 8 195 20 210 20 H316"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <motion.path
        variants={draw}
        d="M110 20 C125 20 128 32 140 32 C150 32 152 20 160 20 C168 20 170 32 180 32 C192 32 195 20 210 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <motion.path
        variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay: 1, type: 'spring' } } }}
        d="M157 14h6v4h4v4h-4v10h-6V22h-4v-4h4z"
        fill="currentColor"
        style={{ transformOrigin: '160px 22px' }}
      />
    </motion.svg>
  )
}

export function SectionTitle({ kicker, title }) {
  return (
    <motion.header
      className="section-title"
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      <Flourish />
    </motion.header>
  )
}

/** Fade-up reveal wrapper */
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
