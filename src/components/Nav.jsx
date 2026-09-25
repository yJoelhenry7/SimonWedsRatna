import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { wedding } from '../data.js'

const LINKS = [
  ['couple', 'Couple'],
  ['gallery', 'Memories'],
  ['events', 'Events'],
  ['rsvp', 'RSVP'],
]

export default function Nav({ visible, onNavigate }) {
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
        {wedding.bride.first[0]}
        <em>&amp;</em>
        {wedding.groom.first[0]}
      </button>
      <ul>
        {LINKS.map(([id, label]) => (
          <li key={id}>
            <button onClick={() => onNavigate(id)}>{label}</button>
          </li>
        ))}
      </ul>
      <motion.span className="nav-progress" style={{ scaleX: scrollYProgress }} />
    </motion.nav>
  )
}
