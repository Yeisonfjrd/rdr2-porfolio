'use client'
import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TitleScreenProps {
  isTransitioning: boolean
}

const GIFS = [
  'https://media2.giphy.com/media/3oriOdderbO8gZmi2s/giphy.gif',
  'https://media0.giphy.com/media/l2Jhyg5MG2UVvwVu8/giphy.gif',
  'https://media2.giphy.com/media/QBRyW84AWxZBpqhf51/giphy.gif',
]

/** Respaldo si Giphy no carga (red, bloqueo, etc.): imagen estática con seed fija */
const GIF_FALLBACK = 'https://picsum.photos/seed/rdr2-title-western/1920/1080'

export default function TitleScreen({ isTransitioning }: TitleScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx,    setNextIdx]    = useState(1)
  const [fading,     setFading]     = useState(false)
  const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set())

  const resolveGifSrc = useCallback(
    (url: string) => {
      if (!failedUrls.has(url)) return url
      if (!failedUrls.has(GIF_FALLBACK)) return GIF_FALLBACK
      return null
    },
    [failedUrls],
  )

  const markFailed = useCallback((rawSrc: string | null) => {
    if (!rawSrc) return
    setFailedUrls(prev => {
      if (prev.has(rawSrc)) return prev
      const next = new Set(prev)
      next.add(rawSrc)
      return next
    })
  }, [])

  const bothMediaDead =
    GIFS.every(u => failedUrls.has(u)) && failedUrls.has(GIF_FALLBACK)

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#020002]">

      {/* Fondo base */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(254,172,1,0.08),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.78))]" aria-hidden />

      {/* GIFs */}
      <div className="rdr-title-media-stack">
        <img src={GIFS[currentIdx]} alt="" className="bg-[#020002] absolute inset-0 z-[1] h-full fixed w-full object-cover rdr-title-gif-film"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 1.8s ease' }} />
        <img src={GIFS[nextIdx]}    alt="" className="bg-[#020002] absolute inset-0 z-[2] h-full fixed w-full object-cover rdr-title-gif-film"
          style={{ opacity: fading ? 1 : 0, transition: 'opacity 1.8s ease' }} />
      </div>

      <div className="rdr-title-sepia-plate absolute inset-0 pointer-events-none" style={{ zIndex: 3, background: 'rgba(55,30,5,0.48)' }} />
      <div className="absolute inset-0 rdr-golden-hour" style={{ zIndex: 4 }} aria-hidden />
      <div className="rdr-paint-texture-multiply" style={{ zIndex: 5 }} aria-hidden />
      <div className="rdr-vignette absolute inset-0 pointer-events-none" style={{ zIndex: 6 }} />

      {/* Grain */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 7, opacity: 0.05, width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
        <filter id="ts-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ts-grain)" />
      </svg>

      {/* ═══════════════════════════════════════
          BARRA SUPERIOR
          ═══════════════════════════════════════
          Técnica:
          - Bloque negro sólido (z-index 12) = la barra limpia
          - .rdr-bar-paint-edge-top (z-index 21) = gradiente negro→transparente
            con filter: url(#rdr-paint-bar) definido en RdrFilters (layout.tsx)
            El feDisplacementMap deforma el borde del gradiente
            → bordes orgánicos tipo salpicadura de pintura, igual que RDR2
      */}
      <div className="absolute top-0 left-0 right-0" style={{ height: '22%', background: '#000', zIndex: 12 }} />
      <div className="rdr-bar-paint-edge-top" style={{ top: 'calc(22% - 12px)' }} aria-hidden />

      {/* ═══════════════════════════════════════
          BARRA INFERIOR — misma técnica, seed distinto
      ═══════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '19%', background: '#000', zIndex: 12 }} />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(19% - 12px)' }} aria-hidden />

      {/* ═══════════════════════════════════════
          NOMBRE + LOGO
      ═══════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ height: '22%', zIndex: 22, gap: 'clamp(6px, 2vw, 20px)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 0.88, gap: '2px' }}>
          {(['YEISON', 'FAJARDO'] as const).map(word => (
            <span key={word} className="font-chinese-rocks uppercase text-[#f2ead8]"
              style={{
                fontSize: 'clamp(1.1rem, 3.8vw, 2.9rem)',
                letterSpacing: '0.04em',
                textShadow: '2px 2px 0 #000, -1px -1px 0 rgba(0,0,0,0.7), 3px 3px 8px rgba(0,0,0,0.95)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
              }}
            >{word}</span>
          ))}
        </div>
        <span className="font-chinese-rocks text-[#bd081a]"
          style={{
            fontSize: 'clamp(2.8rem, 9.5vw, 7.2rem)',
            lineHeight: 0.82,
            alignSelf: 'center',
            textShadow: '3px 3px 0 #5a0000, 5px 5px 0 #3a0000, 0 0 20px rgba(185,3,3,0.45)',
            WebkitTextStroke: '1px #b90303',
          }}
        >II</span>
      </motion.div>

      {/* Pulsa cualquier tecla */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ bottom: '22%', zIndex: 22 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : [0.25, 0.85, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="font-chinese-rocks uppercase text-[#dcc89b]/75"
          style={{ fontSize: 'clamp(0.45rem, 1.1vw, 0.65rem)', letterSpacing: '0.38em', whiteSpace: 'nowrap', textShadow: '0 0 8px rgba(0,0,0,0.95)' }}>
          Pulsa cualquier tecla para continuar
        </p>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4"
        style={{ height: '19%', zIndex: 22, paddingBottom: '0.4%' }}>
        <span className="font-chinese-rocks uppercase text-[#c8b68a]/70" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.5rem)', letterSpacing: '0.18em' }}>Buenos Aires</span>
        <span className="font-chinese-rocks uppercase text-[#c8b68a]/70" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.5rem)', letterSpacing: '0.18em' }}>2026</span>
      </div>

      {/* Fade transición */}
      <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ zIndex: 50 }}
        initial={{ opacity: 0 }} animate={{ opacity: isTransitioning ? 1 : 0 }} transition={{ duration: 0.8 }} />
    </div>
  )
}