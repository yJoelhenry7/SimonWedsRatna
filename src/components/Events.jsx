import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from './Ornament.jsx'
import { formatWeddingDate } from '../calendar.js'
import { wedding } from '../data.js'

function useCountdown(target) {
  const calc = () => Math.max(0, new Date(target).getTime() - Date.now())
  const [ms, setMs] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  const s = Math.floor(ms / 1000)
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 }
}

function Unit({ value, label }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="cd-unit">
      <div className="cd-digits">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={str}
            initial={{ y: '-100%', opacity: 0, rotateX: 70 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            exit={{ y: '100%', opacity: 0, rotateX: -70 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <small>{label}</small>
    </div>
  )
}

export default function Events() {
  const { t, i18n } = useTranslation()
  const left = useCountdown(wedding.date)

  return (
    <section className="events section" id="events">
      <SectionTitle kicker={formatWeddingDate(i18n.resolvedLanguage)} title={t('events.title')} />

      <motion.div
        className="countdown"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Unit value={left.days} label={t('events.units.days')} />
        <Unit value={left.hours} label={t('events.units.hours')} />
        <Unit value={left.minutes} label={t('events.units.minutes')} />
        <Unit value={left.seconds} label={t('events.units.seconds')} />
      </motion.div>

      <div className="event-cards">
        {wedding.events.map(({ id, map }, i) => (
          <motion.article
            key={id}
            className="event-card"
            initial={{ opacity: 0, y: 80, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10 }}
          >
            <div className="event-arch">
              <span className="event-num">{['I', 'II', 'III', 'IV'][i]}</span>
            </div>
            <h3>{t(`events.${id}.title`)}</h3>
            <p className="event-time">{t(`events.${id}.time`)}</p>
            <p className="event-venue">{t(`events.${id}.venue`)}</p>
            <p className="muted">{t(`events.${id}.address`)}</p>
            <p className="event-note">{t(`events.${id}.note`)}</p>
            <a className="btn-ghost" href={map} target="_blank" rel="noreferrer">
              {t('events.viewMap')}
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
