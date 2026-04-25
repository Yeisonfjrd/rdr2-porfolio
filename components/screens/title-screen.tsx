'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TitleScreenProps {
  isTransitioning: boolean
}

const GIFS = [
  '/gifs/intro1.gif',
  '/gifs/intro2.gif',
  '/gifs/intro3.gif',
] as const

const FALLBACK_IMG = '/gifs/fallback.jpg'

export default function TitleScreen({ isTransitioning }: TitleScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx,    setNextIdx]    = useState(1)
  const [fading,     setFading]     = useState(false)
  const [failedSet,  setFailedSet]  = useState<Set<string>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % GIFS.length)
        setNextIdx(   prev => (prev + 1) % GIFS.length)
        setFading(false)
      }, 1800)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  const resolveSrc = (url: string): string | null => {
    if (!failedSet.has(url)) return url
    if (!failedSet.has(FALLBACK_IMG)) return FALLBACK_IMG
    return null
  }

  const markFailed = (url: string) =>
    setFailedSet(prev => {
      if (prev.has(url)) return prev
      const next = new Set(prev)
      next.add(url)
      return next
    })

  const currentSrc = resolveSrc(GIFS[currentIdx])
  const nextSrc    = resolveSrc(GIFS[nextIdx])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#020002]">

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(254,172,1,0.08), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.78))',
        }}
        aria-hidden
      />

      <div className="rdr-title-media-stack">
        {currentSrc && (
          <img
            key={`cur-${currentSrc}`}
            src={currentSrc}
            alt=""
            onError={() => markFailed(currentSrc)}
            className="absolute inset-0 z-[1] h-full w-full object-cover rdr-title-gif-film"
            style={{ opacity: fading ? 0 : 1, transition: 'opacity 1.8s ease' }}
          />
        )}
        {nextSrc && (
          <img
            key={`nxt-${nextSrc}`}
            src={nextSrc}
            alt=""
            onError={() => markFailed(nextSrc)}
            className="absolute inset-0 z-[2] h-full w-full object-cover rdr-title-gif-film"
            style={{ opacity: fading ? 1 : 0, transition: 'opacity 1.8s ease' }}
          />
        )}
        {!currentSrc && !nextSrc && (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(165deg, #221409 0%, #3d2618 42%, #1a100a 100%)' }}
          />
        )}
      </div>

      <div className="rdr-title-sepia-plate absolute inset-0 pointer-events-none" style={{ zIndex: 3, background: 'rgba(55,30,5,0.48)' }} />
      <div className="absolute inset-0 rdr-golden-hour pointer-events-none" style={{ zIndex: 4 }} aria-hidden />
      <div className="rdr-paint-texture-multiply pointer-events-none" style={{ zIndex: 5 }} aria-hidden />
      <div className="rdr-vignette absolute inset-0 pointer-events-none" style={{ zIndex: 6 }} />

      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 7, opacity: 0.05, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <filter id="ts-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ts-grain)" />
      </svg>

      <div className="absolute top-0 left-0 right-0" style={{ height: '22%', background: '#000', zIndex: 12 }} />
      <div className="rdr-bar-paint-edge-top" style={{ top: 'calc(22% - 12px)', zIndex: 21 }} aria-hidden />

      <div className="absolute bottom-0 left-0 right-0" style={{ height: '19%', background: '#000', zIndex: 12 }} />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(19% - 12px)', zIndex: 21 }} aria-hidden />

      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ height: '22%', zIndex: 22, gap: 'clamp(6px, 2vw, 20px)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 0.88, gap: 2 }}>
          {(['YEISON', 'FAJARDO'] as const).map(word => (
            <span
              key={word}
              className="font-chinese-rocks uppercase"
              style={{
                fontSize: 'clamp(1.1rem, 3.8vw, 2.9rem)',
                color: '#f2ead8',
                letterSpacing: '0.04em',
                textShadow: '2px 2px 0 #000, -1px -1px 0 rgba(0,0,0,0.7), 3px 3px 8px rgba(0,0,0,0.95)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
              }}
            >
              {word}
            </span>
          ))}
        </div>
        <span
          className="font-chinese-rocks"
          style={{
            fontSize: 'clamp(2.8rem, 9.5vw, 7.2rem)',
            lineHeight: 0.82,
            alignSelf: 'center',
            color: '#bd081a',
            textShadow: '3px 3px 0 #5a0000, 5px 5px 0 #3a0000, 0 0 20px rgba(185,3,3,0.45)',
            WebkitTextStroke: '1px #b90303',
          }}
        >
          II
        </span>
      </motion.div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ bottom: '22%', zIndex: 22 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : [0.25, 0.85, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p
          className="font-chinese-rocks uppercase"
          style={{
            fontSize: 'clamp(0.45rem, 1.1vw, 0.65rem)',
            color: 'rgba(220,200,155,0.75)',
            letterSpacing: '0.38em',
            whiteSpace: 'nowrap',
            textShadow: '0 0 8px rgba(0,0,0,0.95)',
          }}
        >
          Pulsa cualquier tecla para continuar
        </p>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4"
        style={{ height: '19%', zIndex: 22, paddingBottom: '0.4%' }}
      >
        <span
          className="font-chinese-rocks uppercase"
          style={{ fontSize: 'clamp(0.85rem, 0.8vw, 0.7rem)', color: 'rgba(200,182,138,0.7)', letterSpacing: '0.18em' }}
        >
          Buenos Aires
        </span>
        <span
          className="font-chinese-rocks uppercase"
          style={{ fontSize: 'clamp(0.85rem, 0.8vw, 0.7rem)', color: 'rgba(200,182,138,0.7)', letterSpacing: '0.18em' }}
        >
          2026
        </span>
      </div>

      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ zIndex: 50 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}