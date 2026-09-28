import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

/** English ⇄ Telugu switch — always visible (also on the church doors screen) */
export default function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage === 'te' ? 'te' : 'en'

  return (
    <motion.div
      className="lang-toggle"
      role="group"
      aria-label={t('lang.label')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    >
      {[
        ['en', 'EN'],
        ['te', 'తె'],
      ].map(([lng, label]) => (
        <button
          key={lng}
          lang={lng}
          className={current === lng ? 'active' : ''}
          aria-pressed={current === lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {current === lng && <motion.span layoutId="lang-pill" className="lang-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
          <span className="lang-label">{label}</span>
        </button>
      ))}
    </motion.div>
  )
}
