'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRDR2Navigation } from '@/hooks/useRDR2Navigation'
import RDR2ControlPrompts from '@/components/ui/rdr2-control-prompts'

interface Activity {
  id: string
  title: string
  description: string
  image: string
  stats?: { label: string; value: string | number }[]
}

interface ActivitiesScreenProps {
  onBack: () => void
}

/*
  Paint edge path — borde orgánico tipo pincelada.
  ViewBox 0 0 200 150 (4:3), preserveAspectRatio="none".
*/
const PAINT_EDGE_CARD =
  'M4,3 C9,1 20,5 37,2 C51,4 65,1 80,3 C94,2 108,5 124,3 C138,4 152,2 166,3 C178,2 190,5 198,3 L198,10 C199,26 197,42 198,58 C199,74 197,90 198,106 C199,122 197,136 198,147 C190,150 178,147 165,149 C152,151 138,147 124,149 C110,151 96,147 82,149 C68,151 54,147 40,149 C27,151 14,148 2,147 L2,10 C1,26 3,42 2,58 C1,74 3,90 2,106 C1,122 3,136 2,147 Z'

/*
  Datos estáticos honestos.
  - GitHub: actualizados manualmente. Si quieres datos en vivo, conecta la
    GitHub REST API v3 (/users/{user}/repos, /search/commits).
  - WakaTime: requiere API key privada; no se expone en cliente.
    Se muestran valores representativos actualizados a mano.
  - Proyectos/Aprendizaje: información real del CV.
*/
const activities: Activity[] = [
  {
    id: 'github',
    title: 'GitHub',
    description: 'Actividad de desarrollo. Commits, pull requests y contribuciones a repositorios open source.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80',
    stats: [
      { label: 'Repositorios públicos', value: 12 },
      { label: 'Lenguaje principal',    value: 'TypeScript' },
    ],
  },
  {
    id: 'coding',
    title: 'Coding',
    description: 'Stack principal activo en proyectos. Valores representativos — integración WakaTime requiere API key.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    stats: [
      { label: 'Stack activo',    value: 'TS · Go · SQL' },
      { label: 'Editor',          value: 'VS Code' },
    ],
  },
  {
    id: 'projects',
    title: 'Proyectos',
    description: 'Portafolio de proyectos completados: RoadEra, Tesla Clone y X Clone. Stack full-stack.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
    stats: [
      { label: 'Completados',  value: 3 },
      { label: 'En producción', value: 2 },
    ],
  },
  {
    id: 'learning',
    title: 'Formación',
    description: 'Cursos completados y certificaciones. Universidad Provincial de Ezeiza · Udemy · Aprende Programando.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    stats: [
      { label: 'Cursos completados', value: 6 },
      { label: 'En curso',           value: 'Tecnicatura UPE' },
    ],
  },
]

export default function ActivitiesScreen({ onBack }: ActivitiesScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex,  setHoveredIndex]  = useState<number | null>(null)

  useRDR2Navigation({
    onBack,
    onArrowRight: () => setSelectedIndex(prev => (prev + 1) % activities.length),
    onArrowLeft:  () => setSelectedIndex(prev => (prev - 1 + activities.length) % activities.length),
  })

  const currentActivity = activities[selectedIndex]

  return (
    <div className="rdr-cinematic-bars absolute inset-0 overflow-hidden" style={{ background: '#0c0a07' }}>

      {/* Gradiente atmosférico */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 70% 50%, rgba(254,172,1,0.04) 0%, transparent 100%),
          radial-gradient(ellipse 40% 80% at 0%  50%, rgba(0,0,0,0.5) 0%, transparent 100%)
        `,
        zIndex: 1,
      }} />

      <motion.div
        className="rdr-grain absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        animate={{ opacity: [0.025, 0.05, 0.025] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Barras cinemáticas */}
      <div className="rdr-bar-paint-edge-top"    style={{ top:    'calc(12% - 10px)', zIndex: 22 }} aria-hidden />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(12% - 10px)', zIndex: 22 }} aria-hidden />

      <div className="relative flex flex-col h-full px-8 md:px-[8vw] py-[14vh]" style={{ zIndex: 30 }}>

        {/* ── Header ── */}
        <div className="mb-6 w-full">
          <p style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3d3428',
            marginBottom: 6,
          }}>
            Registro de actividades
          </p>
          <h1 style={{
            fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#c8b898',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: 8,
          }}>
            ACTIVITIES
          </h1>
          <div style={{ height: 2, width: 70, background: 'linear-gradient(to right, #bd081a 0%, rgba(254,172,1,0.35) 100%)' }} />
        </div>

        {/* ── Grid de cards ── */}
        <div
          className="flex gap-5 pb-4 flex-1 items-start overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {activities.map((activity, index) => {
            const isSelected = index === selectedIndex
            const isHovered  = hoveredIndex === index

            return (
              <motion.button
                key={activity.id}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => { setHoveredIndex(index); setSelectedIndex(index) }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex-shrink-0 text-left focus:outline-none"
                style={{ width: 'clamp(200px, 22vw, 280px)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >

                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: '4 / 3',
                    background: '#1a1410',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      filter: isSelected
                        ? 'sepia(60%) contrast(120%) brightness(90%) grayscale(20%) saturate(80%)'
                        : 'sepia(80%) contrast(115%) brightness(65%) grayscale(40%) saturate(50%)',
                      transition: 'filter 0.4s ease',
                    }}
                  />

                  {/* Sombra interior */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.85)' }}
                  />

                  {/*
                    Marco rojo activo.
                    Usa #rdr-paint-container-active del RdrFilters global
                    (definido en layout.tsx). No duplicar el filtro aquí.
                  */}
                  {isSelected && (
                    <div
                      className="absolute pointer-events-none"
                      aria-hidden
                      style={{
                        inset: -5,
                        outline: '3px solid #bd081a',
                        outlineOffset: '0px',
                        boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.8), 0 0 18px rgba(189,8,26,0.45)',
                        zIndex: 10,
                        filter: 'url(#rdr-paint-container-active)',
                      }}
                    />
                  )}

                  {/* Hover overlay sutil */}
                  {!isSelected && isHovered && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      aria-hidden
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(200,180,130,0.22)',
                        zIndex: 9,
                      }}
                    />
                  )}

                  {/* Paint edge SVG — borde orgánico de pintura */}
                  <svg
                    viewBox="0 0 200 150"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: -2,
                      width: 'calc(100% + 4px)',
                      height: 'calc(100% + 4px)',
                      pointerEvents: 'none',
                      zIndex: 4,
                      filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.6))',
                    }}
                  >
                    <path
                      d={PAINT_EDGE_CARD}
                      fill="none"
                      stroke="#1a1208"
                      strokeWidth="8"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* ── Texto + stats ── */}
                <div className="mt-3 px-1">
                  <h2 style={{
                    fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
                    fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isSelected ? '#e8d8b0' : '#3a3028',
                    textShadow: isSelected ? '0 0 12px rgba(232,216,176,0.3)' : 'none',
                    transition: 'color 0.25s, text-shadow 0.25s',
                  }}>
                    {activity.title}
                  </h2>

                  <p style={{
                    marginTop: 6,
                    fontFamily: 'sans-serif',
                    fontSize: '0.75rem',
                    lineHeight: 1.65,
                    color: isSelected ? '#9a8a70' : '#5a4a38',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transition: 'color 0.25s',
                  }}>
                    {activity.description}
                  </p>

                  <AnimatePresence>
                    {isSelected && activity.stats && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          marginTop: 10,
                          background: 'linear-gradient(160deg, rgba(22,17,11,0.97) 0%, rgba(14,11,7,0.99) 100%)',
                          border: '1px solid rgba(200,180,130,0.12)',
                          padding: '8px 10px',
                        }}
                      >
                        {activity.stats.map((stat, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'baseline',
                              marginBottom: i < activity.stats!.length - 1 ? 5 : 0,
                            }}
                          >
                            <span style={{
                              fontFamily: 'Courier New, monospace',
                              fontSize: '0.62rem',
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: '#5a4a38',
                            }}>
                              {stat.label}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
                              fontSize: '0.78rem',
                              color: '#bd081a',
                              letterSpacing: '0.05em',
                            }}>
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* ── Panel inferior: detalle ── */}
        <AnimatePresence mode="wait">
          {currentActivity && (
            <motion.div
              key={currentActivity.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: '1px solid rgba(200,180,130,0.2)',
              }}
            >
              <p style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#3d3428',
                marginBottom: 5,
              }}>
                Seleccionado
              </p>
              <h3 style={{
                fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#e0c38f',
              }}>
                {currentActivity.title}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pie ── */}
        <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid rgba(200,180,130,0.12)' }}>
          <p style={{
            fontFamily: 'sans-serif',
            fontSize: '0.7rem',
            color: '#3a3028',
            letterSpacing: '0.04em',
            fontStyle: 'italic',
          }}>
            Datos actualizados manualmente · Yeison Fajardo · Buenos Aires
          </p>
        </div>
      </div>

      <RDR2ControlPrompts
        prompts={[
          { key: 'ESC', label: 'VOLVER'},
          { key: '←→',  label: 'NAVEGAR' },
        ]}
      />

      <div className="pointer-events-none absolute inset-0 z-[90] rdr-vignette opacity-60" />
    </div>
  )
}