import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Cathedral from './Cathedral.jsx'
import { Cross } from './Ornament.jsx'
import { wedding } from '../data.js'

const dateLabel = new Date(wedding.date).toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function Letters({ text, delay, className }) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="letter"
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: -80, filter: 'blur(10px)' },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              transition: { delay: delay + i * 0.06, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

const fade = (delay) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
})

export default function Hero({ entered, onScrollDown }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section className="hero" ref={ref} id="home">
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <Cathedral />
      </motion.div>
      <div className="hero-vignette" />
      <Candles />

      <motion.div
        className="hero-content"
        style={{ y: textY, opacity: textOpacity }}
        initial="hidden"
        animate={entered ? 'show' : 'hidden'}
      >
        <motion.div variants={fade(0.2)}>
          <Cross size={30} className="glow" />
        </motion.div>
        <motion.p className="kicker" variants={fade(0.5)}>
          Together with their families
        </motion.p>
        <h1 className="hero-names">
          <Letters text={wedding.bride.name} delay={0.8} className="name" />
          <motion.span
            className="amp"
            variants={{
              hidden: { opacity: 0, scale: 0.4, rotate: -30 },
              show: { opacity: 1, scale: 1, rotate: 0, transition: { delay: 1.6, type: 'spring', stiffness: 120, damping: 12 } },
            }}
          >
            &amp;
          </motion.span>
          <Letters text={wedding.groom.name} delay={1.9} className="name" />
        </h1>
        <motion.p className="hero-invite" variants={fade(2.8)}>
          request the honour of your presence as they unite in Holy Matrimony
        </motion.p>
        <motion.div className="hero-date" variants={fade(3.1)}>
          <span className="line" />
          <span>{dateLabel}</span>
          <span className="line" />
        </motion.div>
        <motion.p className="hero-city" variants={fade(3.3)}>
          {wedding.city}
        </motion.p>
      </motion.div>

      <motion.button
        className="scroll-cue"
        onClick={onScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ delay: 3.8, duration: 1 }}
        aria-label="Scroll down"
      >
        <span />
      </motion.button>
    </section>
  )
}

function Candles() {
  const candles = [
    { left: '6%', h: 120 },
    { left: '11%', h: 80 },
    { left: '15%', h: 100 },
    { right: '6%', h: 120 },
    { right: '11%', h: 80 },
    { right: '15%', h: 100 },
  ]
  return (
    <div className="candles" aria-hidden="true">
      {candles.map((c, i) => (
        <div key={i} className="candle" style={{ left: c.left, right: c.right, '--h': `${c.h}px`, animationDelay: `${i * 0.37}s` }}>
          <span className="flame" style={{ animationDelay: `${i * 0.23}s` }} />
        </div>
      ))}
    </div>
  )
}
