'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevolverLoader from './revolver-loader'

interface LoadingScreenProps {
  /** Se llama cuando la carga termina — la pantalla hace fade out y llama esto */
  onComplete?: () => void
  /** Si true, la pantalla nunca llama onComplete (modo visual indefinido) */
  indefinite?: boolean
}

/*
  ── Imágenes de la pantalla de carga ──
  Colocá tus propias imágenes en /public/loading/ con estos nombres.
  Reemplazá las URLs de Picsum por rutas locales cuando tengas las imágenes.
*/
const LOADING_IMAGES = [
  '/loading/scene1.jpg',
  '/loading/scene2.jpg',
  '/loading/scene3.jpg',
  '/loading/scene4.jpg',
] as const

/* Fallbacks públicos mientras no tenés las imágenes locales */
const LOADING_IMAGES_FALLBACK = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
  'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1920&q=80',
]

/*
  ── Tips profesionales ──
  Aparecen en la esquina inferior izquierda, rotan con cada imagen.
  Personalizá con tu info.
*/
const TIPS: string[] = [
  'Yeison Fajardo — Desarrollador Full Stack con 3 años de experiencia en React, Next.js y Node.js.',
  'Especializado en interfaces de alta fidelidad y arquitecturas backend escalables.',
  'Proyectos: RoadEra (Stripe + reservas en tiempo real), clones de Tesla y X (Twitter).',
  'Stack: TypeScript · Go · PostgreSQL · MongoDB · Docker · AWS · Prisma.',
  'Disponible para trabajar — Buenos Aires, Argentina.',
  'Universidad Provincial de Ezeiza · Formación en desarrollo de software 2025.',
]

const CYCLE_DURATION = 30000 // 30 segundos por imagen
const FADE_DURATION  = 2000  // 2 segundos de crossfade

export default function LoadingScreen({ onComplete, indefinite = false }: LoadingScreenProps) {
  const [imgIndex,    setImgIndex]    = useState(0)
  const [nextIndex,   setNextIndex]   = useState(1)
  const [isFading,    setIsFading]    = useState(false)
  const [tipIndex,    setTipIndex]    = useState(0)
  const [progress,    setProgress]    = useState(0)
  const [imgErrors,   setImgErrors]   = useState<Record<number, boolean>>({})

  const progressRef = useRef<number>(0)
  const startRef    = useRef<number>(Date.now())

  /* Progreso de carga simulado */
  useEffect(() => {
    if (indefinite) return
    const total = LOADING_IMAGES.length * CYCLE_DURATION
    const interval = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      const p = Math.min((elapsed / total) * 100, 100)
      setProgress(p)
      progressRef.current = p
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(() => onComplete?.(), 600)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [indefinite, onComplete])

  /* Ciclo de imágenes cada 30s con crossfade */
  useEffect(() => {
    const cycle = setInterval(() => {
      setIsFading(true)
      setTipIndex(prev => (prev + 1) % TIPS.length)
      setTimeout(() => {
        setImgIndex(prev => (prev + 1) % LOADING_IMAGES.length)
        setNextIndex(prev => (prev + 1) % LOADING_IMAGES.length)
        setIsFading(false)
      }, FADE_DURATION)
    }, CYCLE_DURATION)
    return () => clearInterval(cycle)
  }, [])

  const resolveSrc = (i: number) =>
    imgErrors[i] ? LOADING_IMAGES_FALLBACK[i % LOADING_IMAGES_FALLBACK.length] : LOADING_IMAGES[i]

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-[#0c0a07]">

      {/* ── SVG filter: efecto Tintype (sepia + grano + viñeta) ── */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="loading-tintype" colorInterpolationFilters="sRGB">
            {/* Grano de película */}
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="grain" />
            <feColorMatrix type="saturate" values="0" in="grain" result="grain-gray" />
            <feBlend in="SourceGraphic" in2="grain-gray" mode="multiply" result="grainy" />
            {/* Sepia */}
            <feColorMatrix
              in="grainy"
              type="matrix"
              values="0.38 0.38 0.38 0 0.08
                      0.28 0.28 0.28 0 0.06
                      0.18 0.18 0.18 0 0.04
                      0    0    0    1 0"
              result="sepia"
            />
            {/* Contraste alto */}
            <feComponentTransfer in="sepia">
              <feFuncR type="linear" slope="1.18" intercept="-0.06" />
              <feFuncG type="linear" slope="1.18" intercept="-0.06" />
              <feFuncB type="linear" slope="1.14" intercept="-0.06" />
            </feComponentTransfer>
          </filter>

          {/*
            Máscara orgánica para el crossfade — borde de pincelada.
            El gradiente radial + turbulencia crea el efecto "revelado de tinta".
          */}
          <filter id="loading-reveal" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="4" seed="42" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── Imagen actual ── */}
      <div
        className="absolute inset-0"
        style={{ filter: 'url(#loading-tintype)', opacity: isFading ? 0 : 1, transition: `opacity ${FADE_DURATION}ms ease` }}
      >
        <img
          src={resolveSrc(imgIndex)}
          alt=""
          onError={() => setImgErrors(prev => ({ ...prev, [imgIndex]: true }))}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* ── Imagen siguiente (crossfade) ── */}
      <div
        className="absolute inset-0"
        style={{
          filter: 'url(#loading-tintype)',
          opacity: isFading ? 1 : 0,
          transition: `opacity ${FADE_DURATION}ms ease`,
          /* Máscara de revelado orgánico aplicada solo en la entrada */
          ...(isFading ? { filter: 'url(#loading-tintype) url(#loading-reveal)' } : {}),
        }}
      >
        <img
          src={resolveSrc(nextIndex)}
          alt=""
          onError={() => setImgErrors(prev => ({ ...prev, [nextIndex]: true }))}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* ── Viñeta perimetral ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)',
          zIndex: 2,
        }}
        aria-hidden
      />

      {/* ── Overlay sepia suave encima ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(55,30,5,0.32)',
          mixBlendMode: 'multiply',
          zIndex: 3,
        }}
        aria-hidden
      />

      {/* ── Barra superior (película) ── */}
      <div className="absolute top-0 left-0 right-0" style={{ height: '8%', background: '#000', zIndex: 10 }} />
      <div className="rdr-bar-paint-edge-top" style={{ top: 'calc(8% - 8px)', zIndex: 11 }} aria-hidden />

      {/* ── Barra inferior ── */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '18%', background: '#000', zIndex: 10 }} />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(18% - 8px)', zIndex: 11 }} aria-hidden />

      {/* ── Barra de progreso — estilo RDR2 (sin porcentaje) ── */}
      {!indefinite && (
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(160px, 30vw, 320px)',
            zIndex: 20,
            marginBottom: 8,
          }}
        >
          <div style={{
            height: 2,
            background: 'rgba(200,180,130,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                background: 'linear-gradient(to right, #bd081a, rgba(254,172,1,0.8))',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </div>
      )}

      {/* ── Tips / info profesional — esquina inferior izquierda ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: 'clamp(16px, 3vw, 32px)',
          maxWidth: 'clamp(220px, 35vw, 420px)',
          zIndex: 20,
          paddingBottom: 12,
        }}
      >
        {/* Línea decorativa */}
        <div style={{
          width: 32,
          height: 1,
          background: 'rgba(189,8,26,0.6)',
          marginBottom: 8,
        }} />

        <AnimatePresence mode="wait">
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'sans-serif',
              fontSize: 'clamp(0.62rem, 1.1vw, 0.78rem)',
              color: '#e8dfc0',
              lineHeight: 1.6,
              letterSpacing: '0.02em',
              fontStyle: 'italic',
              mixBlendMode: 'difference',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {TIPS[tipIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Revólver loader — esquina inferior derecha ── */}
      <RevolverLoader variant="light" speed={2.5} size={44} />



    </div>
  )
}
