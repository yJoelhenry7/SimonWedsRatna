import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Photo from './Photo.jsx'
import { SectionTitle } from './Ornament.jsx'
import { BrideToon, GroomToon } from './Toons.jsx'
import { wedding } from '../data.js'

function Person({ person, role, side, progress }) {
  const y = useTransform(progress, [0, 1], side === 'left' ? [60, -60] : [120, -30])
  return (
    <motion.article
      className="person"
      style={{ y }}
      initial={{ opacity: 0, x: side === 'left' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="arch-wrap">
        <div className="arch-frame">
          <div className="arch-inner">
            <Photo src={person.photo} alt={person.name} />
          </div>
        </div>
        <motion.div
          className={`toon-peek ${side}`}
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.6 }}
        >
          {role === 'The Bride' ? <BrideToon /> : <GroomToon />}
        </motion.div>
      </div>
      <p className="kicker">{role}</p>
      <h3 className="script">{person.name}</h3>
      <p className="muted">{person.parents}</p>
    </motion.article>
  )
}

export default function Couple() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section className="couple section" id="couple" ref={ref}>
      <SectionTitle kicker="Two hearts, one faith" title="The Bride & Groom" />
      <div className="couple-grid">
        <Person person={wedding.bride} role="The Bride" side="left" progress={scrollYProgress} />
        <motion.div className="rings" style={{ rotate: ringRotate }} aria-hidden="true">
          <span />
          <span />
        </motion.div>
        <Person person={wedding.groom} role="The Groom" side="right" progress={scrollYProgress} />
      </div>
    </section>
  )
}
