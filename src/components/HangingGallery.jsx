import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import Photo from './Photo.jsx'
import { SectionTitle } from './Ornament.jsx'
import { useTranslation } from 'react-i18next'
import { wedding } from '../data.js'

// Pendulum spring: low damping so frames keep swinging and settle slowly
const PENDULUM = { type: 'spring', stiffness: 22, damping: 2.2, mass: 1 }
const STRING_LENGTHS = [70, 120, 90, 140, 80, 110, 130, 75, 100]
const TILTS = [-1.5, 1, -0.5, 1.8, -1.2, 0.6, -1.8, 1.2, -0.8]

function usePerRow() {
  const get = () => (window.innerWidth >= 960 ? 3 : 2)
  const [n, setN] = useState(get)
  useEffect(() => {
    const onResize = () => setN(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return n
}

function HangingFrame({ item, index, scrollSwing, onOpen }) {
  const { t } = useTranslation()
  const push = useMotionValue(0)
  const factor = 0.7 + (index % 3) * 0.25
  const rotate = useTransform(() => TILTS[index % TILTS.length] + push.get() + scrollSwing.get() * factor)
  const len = STRING_LENGTHS[index % STRING_LENGTHS.length]

  const swing = (velocity) => animate(push, 0, { ...PENDULUM, velocity })

  const onPointerEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const fromLeft = e.clientX < rect.left + rect.width / 2
    swing(fromLeft ? 70 : -70)
  }

  return (
    <div className="hang" style={{ '--len': `${len}px` }}>
      <span className="nail" />
      <motion.div
        className="swing"
        style={{ rotate }}
        initial={{ y: -260, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 90, damping: 11, delay: (index % 3) * 0.18 }}
        onAnimationComplete={() => swing(index % 2 ? 45 : -45)}
      >
        <svg className="strings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="0" x2="16" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="50" y1="0" x2="84" y2="100" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="bow" />
        <motion.button
          className="frame"
          onPointerEnter={onPointerEnter}
          onClick={() => onOpen(index)}
          whileTap={{ scale: 0.97 }}
          aria-label={t('gallery.open', { caption: item.caption })}
        >
          <span className="frame-mat">
            <Photo src={item.src} alt={item.caption} />
          </span>
        </motion.button>
        <p className="frame-caption">{item.caption}</p>
      </motion.div>
    </div>
  )
}

export default function HangingGallery() {
  const { t } = useTranslation()
  const captions = t('gallery.captions', { returnObjects: true })
  const items = wedding.gallery.map((src, i) => ({ src, caption: captions[i] ?? '' }))
  const perRow = usePerRow()
  const [open, setOpen] = useState(null)

  // Frames sway with scroll speed — scroll fast and they swing.
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const swingTarget = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true })
  const scrollSwing = useSpring(swingTarget, { stiffness: 50, damping: 6 })

  const rows = []
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow))

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      const n = wedding.gallery.length
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % n)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="gallery section" id="gallery">
      <SectionTitle kicker={t('gallery.kicker')} title={t('gallery.title')} />
      <p className="section-lead">{t('gallery.lead')}</p>

      <div className="gallery-rows">
        {rows.map((row, r) => (
          <div className="gallery-row" key={r}>
            <div className="rail">
              <span className="finial left" />
              <span className="finial right" />
            </div>
            <div className="row-frames">
              {row.map((item, i) => {
                const index = r * perRow + i
                return <HangingFrame key={item.src} item={item} index={index} scrollSwing={scrollSwing} onOpen={setOpen} />
              })}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={open}
                className="lightbox-figure"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.85, rotate: -3, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3, y: -20 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
              >
                <span className="frame-mat">
                  <Photo src={items[open].src} alt={items[open].caption} />
                </span>
                <figcaption>{items[open].caption}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button className="lb-btn lb-close" onClick={() => setOpen(null)} aria-label={t('gallery.close')}>
              ×
            </button>
            <button
              className="lb-btn lb-prev"
              onClick={(e) => {
                e.stopPropagation()
                setOpen((o) => (o - 1 + items.length) % items.length)
              }}
              aria-label={t('gallery.prev')}
            >
              ‹
            </button>
            <button
              className="lb-btn lb-next"
              onClick={(e) => {
                e.stopPropagation()
                setOpen((o) => (o + 1) % items.length)
              }}
              aria-label={t('gallery.next')}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
