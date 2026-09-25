import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Flourish } from './Ornament.jsx'
import { wedding } from '../data.js'

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
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = wedding.verse.text.split(' ')

  return (
    <section className="verse section" id="verse" ref={ref}>
      <Flourish />
      <blockquote>
        <p>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
        <motion.cite
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
        >
          {wedding.verse.ref}
        </motion.cite>
      </blockquote>
    </section>
  )
}
