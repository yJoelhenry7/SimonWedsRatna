import { MotionConfig, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Cathedral from '../components/Cathedral.jsx'
import Petals from '../components/Petals.jsx'
import LanguageToggle from '../components/LanguageToggle.jsx'
import { CoupleToon } from '../components/Toons.jsx'
import { Cross, Flourish } from '../components/Ornament.jsx'
import { formatEventDay } from '../calendar.js'
import { wedding } from '../data.js'

const ease = [0.22, 1, 0.36, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
})

/** Personal invitation from Dr. Y. Vijayakar — shared on WhatsApp, leads into the main site */
export default function VijayInvite() {
  const { t, i18n } = useTranslation()
  const lng = i18n.resolvedLanguage
  const matrimony = wedding.events.find((e) => e.id === 'matrimony')
  const reception = wedding.events.find((e) => e.id === 'reception')
  // carry the chosen language into the main invitation
  const mainHref = `/?lng=${lng === 'te' ? 'te' : 'en'}`

  return (
    <MotionConfig reducedMotion="user">
      <div className="vi-page">
        <div className="vi-bg" aria-hidden="true">
          <Cathedral />
        </div>
        <div className="vi-shade" aria-hidden="true" />
        <Petals active />
        <LanguageToggle />

        <motion.main
          className="vi-card"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease }}
        >
          <motion.div {...rise(0.4)}>
            <Cross size={26} className="glow" />
            <p className="kicker">{t('vijay.kicker')}</p>
          </motion.div>

          <motion.p className="vi-greeting" {...rise(0.7)}>
            {t('vijay.greeting')}
          </motion.p>
          <motion.p className="vi-message" {...rise(0.9)}>
            {t('vijay.message')}
          </motion.p>

          <motion.h1 className="vi-names" {...rise(1.2)}>
            <span>{t('names.groomFull')}</span>
            <em>{t('vijay.with')}</em>
            <span>{t('names.brideFull')}</span>
          </motion.h1>

          <motion.div className="vi-toon" {...rise(1.5)}>
            <CoupleToon />
          </motion.div>

          <Flourish />

          <motion.div className="vi-events" {...rise(1.7)}>
            <EventLine label={t('vijay.wedding')} day={formatEventDay(matrimony.date, lng)} time={t('events.matrimony.time')} venue={t('events.matrimony.venue')} place={t('events.matrimony.address')} />
            <span className="vi-divider" aria-hidden="true" />
            <EventLine label={t('vijay.reception')} day={formatEventDay(reception.date, lng)} time={t('events.reception.time')} venue={t('events.reception.venue')} place={t('events.reception.address')} />
          </motion.div>

          <motion.p className="vi-blessing" {...rise(1.9)}>
            {t('vijay.blessing')}
          </motion.p>

          <motion.div className="vi-sign" {...rise(2.1)}>
            <span>{t('vijay.signoff')}</span>
            <strong>{t('vijay.from')}</strong>
          </motion.div>

          <motion.a
            className="btn-gold vi-cta"
            href={mainHref}
            {...rise(2.4)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {t('vijay.cta')}
            <span className="vi-arrow" aria-hidden="true">
              →
            </span>
          </motion.a>
        </motion.main>
      </div>
    </MotionConfig>
  )
}

function EventLine({ label, day, time, venue, place }) {
  return (
    <div className="vi-event">
      <p className="vi-event-label">{label}</p>
      <p className="vi-event-when">
        {day} · {time}
      </p>
      <p className="vi-event-venue">{venue}</p>
      <p className="vi-event-place">{place}</p>
    </div>
  )
}
