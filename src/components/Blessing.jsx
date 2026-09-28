import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Cross, Flourish, Reveal } from './Ornament.jsx'
import { CoupleToon } from './Toons.jsx'
import { wedding } from '../data.js'

export default function Blessing() {
  const { t } = useTranslation()

  return (
    <section className="blessing section" id="rsvp">
      <div className="blessing-arch">
        <motion.div
          className="blessing-toon"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <CoupleToon />
        </motion.div>
        <Reveal>
          <Cross size={28} className="glow" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="blessing-quote">{t('blessing.quote')}</p>
          <p className="kicker">{t('blessing.ref')}</p>
        </Reveal>
        <Flourish />
        <Reveal delay={0.2}>
          <p className="section-lead">{t('blessing.lead')}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.a
            className="btn-gold"
            href={wedding.rsvpUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {t('blessing.rsvp')}
          </motion.a>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="hashtag">{wedding.hashtag}</p>
        </Reveal>
      </div>
      <footer>
        <p className="script">
          {t('names.groom')} &amp; {t('names.bride')}
        </p>
        <p className="muted">
          {t('blessing.footer')} · {new Date(wedding.date).getFullYear()}
        </p>
      </footer>
    </section>
  )
}
