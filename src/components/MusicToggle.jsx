import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { wedding } from '../data.js'

export default function MusicToggle({ visible, playing, onToggle }) {
  const { t } = useTranslation()
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={`music-toggle ${playing ? 'playing' : ''}`}
          onClick={onToggle}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 1.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={playing ? t('music.pause') : t('music.play')}
          aria-pressed={playing}
          title={playing ? t('music.pause') : t('music.play')}
        >
          <span className="music-ring" />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="6.5" cy="18" r="2.6" fill="currentColor" />
            <circle cx="17.5" cy="16" r="2.6" fill="currentColor" />
            {!playing && <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
          <span className="music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="music-label">{playing ? wedding.musicTitle : t('music.off')}</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
