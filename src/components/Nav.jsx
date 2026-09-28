import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { wedding } from '../data.js'

const LINKS = ['couple', 'gallery', 'events', 'rsvp'].filter((id) => id !== 'gallery' || wedding.showGallery)

export default function Nav({ visible, onNavigate }) {
  const { t } = useTranslation()
  const { scrollY, scrollYProgress } = useScroll()
  const [shown, setShown] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > window.innerHeight * 0.6))

  return (
    <motion.nav
      className="nav"
      initial={false}
      animate={{ y: visible && shown ? 0 : -100, opacity: visible && shown ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="nav-mono" onClick={() => onNavigate('home')}>
        {wedding.groom.first[0]}
        <em>&amp;</em>
        {wedding.bride.first[0]}
      </button>
      <ul>
        {LINKS.map((id) => (
          <li key={id}>
            <button onClick={() => onNavigate(id)}>{t(`nav.${id}`)}</button>
          </li>
        ))}
      </ul>
      <motion.span className="nav-progress" style={{ scaleX: scrollYProgress }} />
    </motion.nav>
  )
}
