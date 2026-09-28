import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { downloadIcs, googleCalendarUrl } from '../calendar.js'

export default function AddToCalendar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const invite = { title: t('calendar.title'), details: t('calendar.details') }

  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="cal" ref={ref}>
      <motion.button
        className="cal-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 12.5v5M9.5 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {t('calendar.add')}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="cal-menu"
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <a role="menuitem" href={googleCalendarUrl(invite)} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              {t('calendar.google')}
            </a>
            <button
              role="menuitem"
              onClick={() => {
                downloadIcs(invite)
                setOpen(false)
              }}
            >
              {t('calendar.ics')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
