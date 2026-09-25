import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import ChurchDoors from './components/ChurchDoors.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Verse from './components/Verse.jsx'
import Couple from './components/Couple.jsx'
import HangingGallery from './components/HangingGallery.jsx'
import Events from './components/Events.jsx'
import Blessing from './components/Blessing.jsx'
import Petals from './components/Petals.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { createMusic } from './music.js'
import { wedding } from './data.js'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const lenisRef = useRef(null)
  const musicRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 })
    lenisRef.current = lenis
    lenis.stop()
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('locked', !entered)
    if (entered) lenisRef.current?.start()
  }, [entered])

  // Audio must start inside a user gesture, so create it lazily on first tap
  const music = () => (musicRef.current ??= createMusic(wedding.music))

  const startMusic = () => {
    music().play()
    setMusicOn(true)
  }

  const toggleMusic = () => {
    if (musicOn) music().pause()
    else music().play()
    setMusicOn(!musicOn)
  }

  // Fade out when the tab is hidden, resume when guests come back
  useEffect(() => {
    if (!musicOn) return
    const onVisibility = () => (document.hidden ? musicRef.current?.pause() : musicRef.current?.play())
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [musicOn])

  useEffect(() => () => musicRef.current?.destroy(), [])

  const scrollTo = (id) => lenisRef.current?.scrollTo(`#${id}`, { offset: -40, duration: 1.8 })

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!entered && <ChurchDoors key="doors" onOpen={startMusic} onEnter={() => setEntered(true)} />}
      </AnimatePresence>
      <Petals active={entered} />
      <Nav visible={entered} onNavigate={scrollTo} />
      <MusicToggle visible={entered} playing={musicOn} onToggle={toggleMusic} />
      <main>
        <Hero entered={entered} onScrollDown={() => scrollTo('verse')} />
        <Verse />
        <Couple />
        <HangingGallery />
        <Events />
        <Blessing />
      </main>
    </MotionConfig>
  )
}
