import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Flourish } from './Ornament.jsx'
import { useTranslation } from 'react-i18next'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span className="verse-word" style={{ opacity, y }}>
      {children}{' '}
    </motion.span>
  )
}

export default function Verse() {
  const { t, i18n } = useTranslation()
  const isTelugu = i18n.resolvedLanguage === 'te'
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = t('verse.text').split(' ')

  return (
    <section className="verse section" id="verse" ref={ref}>
      <Flourish />
      <blockquote>
        <p>
          {words.map((w, i) => (
            <Word key={`${words.length}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
        {/* letter-spacing breaks Telugu conjuncts, so only English gets the widening effect */}
        <motion.cite
          key={isTelugu ? 'te' : 'en'}
          initial={{ opacity: 0, letterSpacing: isTelugu ? '0.02em' : '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: isTelugu ? '0.02em' : '0.35em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
        >
          {t('verse.ref')}
        </motion.cite>
      </blockquote>
    </section>
  )
}
