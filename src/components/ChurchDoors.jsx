import { useState } from 'react'
import { motion } from 'motion/react'
import { Cross } from './Ornament.jsx'
import { wedding } from '../data.js'

const ease = [0.7, 0, 0.25, 1]

export default function ChurchDoors({ onOpen, onEnter }) {
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    onOpen?.()
    setTimeout(onEnter, 1500)
  }

  return (
    <motion.div
      className="doors-screen"
      exit={{ opacity: 0, scale: 1.8, filter: 'blur(6px)' }}
      transition={{ duration: 1.4, ease }}
    >
      <div className="doors-stone" />

      <motion.div
        className="doors-top"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 1.2, delay: opening ? 0 : 0.3 }}
      >
        <Cross size={22} />
        <p className="kicker">The Holy Matrimony of</p>
        <h1 className="doors-names">
          {wedding.bride.first} <span>&amp;</span> {wedding.groom.first}
        </h1>
      </motion.div>

      <motion.div
        className="doorway"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="doorway-light"
          animate={opening ? { opacity: 1, scale: 1.3 } : { opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <motion.div
          className="door door-left"
          animate={{ rotateY: opening ? 105 : 0 }}
          transition={{ duration: 1.9, ease }}
        >
          <DoorPanels />
          <span className="door-ring" />
        </motion.div>
        <motion.div
          className="door door-right"
          animate={{ rotateY: opening ? -105 : 0 }}
          transition={{ duration: 1.9, ease }}
        >
          <DoorPanels />
          <span className="door-ring" />
        </motion.div>
        <div className="doorway-molding" />
      </motion.div>

      <motion.button
        className="btn-gold doors-btn"
        onClick={open}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 1, delay: opening ? 0 : 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        Open the Doors
      </motion.button>
    </motion.div>
  )
}

function DoorPanels() {
  return (
    <div className="door-panels">
      <i />
      <i />
      <i />
    </div>
  )
}
