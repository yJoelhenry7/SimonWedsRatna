import { memo } from 'react'

// Generated once at load so petals stay stable across re-renders
const ITEMS = Array.from({ length: 22 }, (_, i) => ({
  left: Math.random() * 100,
  size: 8 + Math.random() * 12,
  duration: 12 + Math.random() * 14,
  delay: -Math.random() * 26,
  drift: (Math.random() - 0.5) * 240,
  kind: i % 4 === 0 ? 'dust' : i % 3 === 0 ? 'rose' : 'ivory',
}))

/** Drifting petals + golden dust, pure CSS animation for 60fps */
function Petals({ active }) {
  return (
    <div className={`petals ${active ? 'on' : ''}`} aria-hidden="true">
      {ITEMS.map((p, i) => (
        <span
          key={i}
          className={`petal ${p.kind}`}
          style={{
            left: `${p.left}%`,
            '--s': `${p.size}px`,
            '--d': `${p.duration}s`,
            '--x': `${p.drift}px`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default memo(Petals)
