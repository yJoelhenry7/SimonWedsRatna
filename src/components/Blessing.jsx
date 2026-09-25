import { motion } from 'motion/react'
import { Cross, Flourish, Reveal } from './Ornament.jsx'
import { CoupleToon } from './Toons.jsx'
import { wedding } from '../data.js'

export default function Blessing() {
  return (
    <section className="blessing section" id="rsvp">
      <div className="blessing-arch">
        <motion.div
          className="blessing-toon"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <CoupleToon />
        </motion.div>
        <Reveal>
          <Cross size={28} className="glow" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="blessing-quote">“Therefore what God has joined together, let no one separate.”</p>
          <p className="kicker">Mark 10 : 9</p>
        </Reveal>
        <Flourish />
        <Reveal delay={0.2}>
          <p className="section-lead">Your presence and prayers are the greatest gift we could ask for.</p>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.a
            className="btn-gold"
            href={wedding.rsvp.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            RSVP — We’ll be there
          </motion.a>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="hashtag">{wedding.hashtag}</p>
        </Reveal>
      </div>
      <footer>
        <p className="script">
          {wedding.bride.first} &amp; {wedding.groom.first}
        </p>
        <p className="muted">With love & gratitude · {new Date(wedding.date).getFullYear()}</p>
      </footer>
    </section>
  )
}
