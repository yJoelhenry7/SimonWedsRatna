import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import Photo from './Photo.jsx'

const HOLD_MS = 5000

/** Cross-fades through a person's portraits with a slow zoom. Offset `delay` so two frames don't change together. */
export default function PortraitSlideshow({ photos, alt, delay = 0 }) {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)
  // start cycling only once guests scroll to it, so everyone sees the first portrait first
  const inView = useInView(ref, { once: true, amount: 0.4 })

  useEffect(() => {
    if (!inView || photos.length < 2) return
    let interval
    const start = setTimeout(() => {
      setIndex((i) => (i + 1) % photos.length)
      interval = setInterval(() => setIndex((i) => (i + 1) % photos.length), HOLD_MS)
    }, HOLD_MS + delay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [inView, photos.length, delay])

  // warm the cache so each cross-fade is instant
  useEffect(() => {
    photos.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [photos])

  const { src, focus } = photos[index]

  return (
    <div className="slideshow" ref={ref}>
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          className="slide"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6, ease: 'easeInOut' }, scale: { duration: HOLD_MS / 1000 + 1.6, ease: 'linear' } }}
          style={{ '--focus': focus }}
        >
          <Photo src={src} alt={alt} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
