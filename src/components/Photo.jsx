import { useState } from 'react'
import { wedding } from '../data.js'

/** Image with an elegant placeholder (monogram, or a custom `fallback`) when the file is missing */
export default function Photo({ src, alt, className = '', fallback }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div className={`photo-placeholder ${fallback ? 'has-toon' : ''} ${className}`} role="img" aria-label={alt}>
        {fallback ?? (
          <>
            <span className="mono">
              {wedding.bride.first[0]}
              <em>&amp;</em>
              {wedding.groom.first[0]}
            </span>
            <small>{alt}</small>
          </>
        )}
      </div>
    )
  }
  return <img className={className} src={src} alt={alt} loading="lazy" draggable="false" onError={() => setFailed(true)} />
}
