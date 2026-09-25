import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionTitle } from './Ornament.jsx'
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
  const t = useCountdown(wedding.date)
  const dateLabel = new Date(wedding.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section className="events section" id="events">
      <SectionTitle kicker={dateLabel} title="The Celebration" />

      <motion.div
        className="countdown"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Unit value={t.days} label="Days" />
        <Unit value={t.hours} label="Hours" />
        <Unit value={t.minutes} label="Minutes" />
        <Unit value={t.seconds} label="Seconds" />
      </motion.div>

      <div className="event-cards">
        {wedding.events.map((e, i) => (
          <motion.article
            key={e.title}
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
            <h3>{e.title}</h3>
            <p className="event-time">{e.time}</p>
            <p className="event-venue">{e.venue}</p>
            <p className="muted">{e.address}</p>
            <p className="event-note">{e.note}</p>
            <a className="btn-ghost" href={e.map} target="_blank" rel="noreferrer">
              View Map
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
