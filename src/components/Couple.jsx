import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import PortraitSlideshow from './PortraitSlideshow.jsx'
import { SectionTitle } from './Ornament.jsx'
import { BrideToon, GroomToon } from './Toons.jsx'
import { wedding } from '../data.js'

function Person({ who, side, progress }) {
  const { t } = useTranslation()
  const y = useTransform(progress, [0, 1], side === 'left' ? [60, -60] : [120, -30])
  // full names here; the rest of the site uses first names
  const name = t(`names.${who}Full`)
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
            <PortraitSlideshow photos={wedding[who].photos} alt={name} delay={who === 'bride' ? 2500 : 0} />
          </div>
        </div>
        <motion.div
          className={`toon-peek ${side}`}
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.6 }}
        >
          {who === 'bride' ? <BrideToon /> : <GroomToon />}
        </motion.div>
      </div>
      <p className="kicker">{t(`couple.${who}`)}</p>
      <h3 className="script">{name}</h3>
      <p className="muted">{t(`couple.${who}Parents`)}</p>
    </motion.article>
  )
}

export default function Couple() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section className="couple section" id="couple" ref={ref}>
      <SectionTitle kicker={t('couple.kicker')} title={t('couple.title')} />
      <div className="couple-grid">
        <Person who="groom" side="left" progress={scrollYProgress} />
        <motion.div className="rings" style={{ rotate: ringRotate }} aria-hidden="true">
          <span />
          <span />
        </motion.div>
        <Person who="bride" side="right" progress={scrollYProgress} />
      </div>
    </section>
  )
}
