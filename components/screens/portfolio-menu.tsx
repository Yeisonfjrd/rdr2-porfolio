'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type PortfolioInitialSection = 'portfolio' | 'about' | 'contact'

interface PortfolioMenuProps {
  onBack: () => void
  initialSection?: PortfolioInitialSection
}

const categories = [
  { id: 'perfil',      label: 'PERFIL' },
  { id: 'proyectos',   label: 'PROYECTOS' },
  { id: 'habilidades', label: 'HABILIDADES' },
  { id: 'experiencia', label: 'EXPERIENCIA' },
  { id: 'contacto',    label: 'CONTACTO' },
]

const COMPENDIUM_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
  'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&q=80',
] as const

function compendiumFallbackSrc(index: number) {
  return `https://picsum.photos/seed/rdr-compendium-${index}/700/520`
}

const PAINT_EDGE_TALL =
  'M4,4 C8,1 18,6 34,2 C48,5 60,1 74,4 C88,2 102,6 118,3 C132,5 146,2 162,4 C176,3 188,6 198,4 L198,12 C199,28 197,44 198,60 C199,76 197,92 198,108 C199,124 197,140 198,156 C199,172 197,188 198,204 C199,220 197,236 198,252 L198,266 C190,270 178,265 166,268 C154,270 142,265 130,268 C118,270 106,265 94,268 C82,270 70,265 58,268 C46,270 34,265 22,268 C12,270 6,267 2,266 L2,12 C1,28 3,44 2,60 C1,76 3,92 2,108 C1,124 3,140 2,156 C1,172 3,188 2,204 C1,220 3,236 2,252 Z'

const PAINT_EDGE_SHORT =
  'M4,3 C9,1 19,5 36,2 C50,4 62,1 78,3 C92,2 104,5 120,3 C134,4 146,2 162,3 C176,2 188,5 198,3 L198,10 C199,24 197,38 198,52 C199,66 197,80 198,94 C199,108 197,120 198,127 C190,130 178,126 166,128 C154,130 142,126 130,128 C118,130 106,126 94,128 C82,130 70,126 58,128 C46,130 34,126 22,128 C12,130 6,128 2,127 L2,10 C1,24 3,38 2,52 C1,66 3,80 2,94 C1,108 3,120 2,127 Z'

const profileData = {
  nombre: 'Yeison Fajardo',
  titulo: 'Desarrollador Web · Full Stack',
  experiencia: '3 años',
  ubicacion: 'Buenos Aires · Disponible para trabajar',
  descripcion: 'Desarrollador web con experiencia profesional creando aplicaciones avanzadas: interfaces claras, código mantenible y foco en la experiencia de usuario.',
}
const projectsData = [
  { name: 'RoadEra',           tech: 'TypeScript · JavaScript · CSS',  status: 'Completado', year: '2024', blurb: 'Alquiler de coches de lujo: registro, panel admin, reservas en tiempo real y pagos con Stripe; gestión de flota y reservas con buen rendimiento en móvil.' },
  { name: 'Tesla Clone',       tech: 'JavaScript · HTML · CSS',         status: 'Completado', year: '2023', blurb: 'Clon del sitio oficial de Tesla: animaciones, header dinámico, transiciones de color y scroll; un desafío para acercar el comportamiento al original.' },
  { name: 'X (Twitter) Clone', tech: 'JavaScript · Node.js · MongoDB', status: 'Completado', year: '2023', blurb: 'Red social tipo X: registro e inicio de sesión, sesiones, cierre de sesión y publicaciones con comentarios sobre una base de datos funcional.' },
]
const skillsData = {
  frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  backend:  ['Node.js', 'Express', 'Go', 'PostgreSQL', 'MongoDB', 'Prisma'],
  devops:   ['Docker', 'AWS', 'Git', 'Linux', 'CI/CD'],
}
const experienceData = [
  { puesto: 'Tecnicatura en Desarrollo de Software', empresa: 'Universidad Provincial de Ezeiza', periodo: '2025 — Actualidad', descripcion: 'Formación en backend, APIs con Node.js y Express, bases de datos con Prisma, JWT/OAuth2, Docker y despliegues en la nube.' },
  { puesto: 'Big O, algoritmos y estructuras de datos', empresa: 'Udemy', periodo: 'Enero 2025', descripcion: 'Optimización con Big O, estructuras como listas y grafos, y preparación para entrevistas técnicas.' },
  { puesto: 'Python · Desarrollo Web 4 · Desarrollo Web 3', empresa: 'Aprende Programando', periodo: '2022 — 2024', descripcion: 'Fundamentos de Python; backend avanzado con APIs REST, PostgreSQL, MongoDB, JWT y React para interfaces dinámicas.' },
]
const contactData = {
  email: 'andresfajardo1606@gmail.com',
  github: 'github.com/yeisonfjrd',
  linkedin: 'linkedin.com/in/yeisonfajardo',
  disponibilidad: 'Disponible para trabajar',
  social: '@yeisonfajardo',
}
const SECTION_TO_INDEX: Record<PortfolioInitialSection, number> = {
  portfolio: 1, about: 0, contact: 4,
}

export default function PortfolioMenu({ onBack, initialSection }: PortfolioMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [hoveredCategory,  setHoveredCategory]  = useState<number | null>(null)
  const [imgTier, setImgTier] = useState<Record<number, number>>({})
  const containerRef    = useRef<HTMLDivElement>(null)
  const contentPanelRef = useRef<HTMLDivElement>(null)
  const activeCategory  = hoveredCategory !== null ? hoveredCategory : selectedCategory

  useEffect(() => {
    if (!initialSection) return
    const idx = SECTION_TO_INDEX[initialSection]
    if (idx !== undefined) setSelectedCategory(idx)
  }, [initialSection])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack()
      else if (e.key === 'ArrowUp')   setSelectedCategory(p => Math.max(0, p - 1))
      else if (e.key === 'ArrowDown') setSelectedCategory(p => Math.min(categories.length - 1, p + 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let last = 0
    const handleWheel = (e: WheelEvent) => {
      if (contentPanelRef.current?.contains(e.target as Node)) return
      const now = Date.now()
      if (now - last < 150) return
      last = now
      if (e.deltaY > 0) setSelectedCategory(p => Math.min(categories.length - 1, p + 1))
      else              setSelectedCategory(p => Math.max(0, p - 1))
    }
    container.addEventListener('wheel', handleWheel, { passive: true })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  const renderContent = () => {
    switch (categories[activeCategory].id) {
      case 'perfil': return (
        <div className="space-y-5">
          <div className="pb-4" style={{ borderBottom: '1px solid rgba(180,140,60,0.18)' }}>
            <h3 style={{ fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif', color: '#e0c38f', fontSize: 'clamp(1.2rem,2.2vw,1.6rem)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
              {profileData.nombre}
            </h3>
            <p style={{ color: '#8a7860', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>{profileData.titulo}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[['Experiencia', profileData.experiencia], ['Ubicación', profileData.ubicacion]].map(([l, v]) => (
              <div key={l}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3d3428', marginBottom: 4 }}>{l}</p>
                <p style={{ color: '#b8a888', fontSize: '0.8rem', fontFamily: 'sans-serif' }}>{v}</p>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3d3428', marginBottom: 6 }}>Sobre mí</p>
            <p style={{ color: '#9a8a70', fontSize: '0.82rem', lineHeight: 1.7, fontFamily: 'sans-serif' }}>{profileData.descripcion}</p>
          </div>
        </div>
      )
      case 'proyectos': return (
        <div className="space-y-4">
          {projectsData.map((p, i) => (
            <motion.div key={p.name} className="pb-4"
              style={{ borderBottom: '1px solid rgba(180,140,60,0.12)' }}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif', color: '#d8b878', fontSize: 'clamp(0.9rem,1.6vw,1.05rem)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.name}</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.7rem', color: '#5a4a38', flexShrink: 0 }}>{p.year}</span>
              </div>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.7rem', color: '#b89840', marginBottom: 4 }}>{p.tech}</p>
              <p style={{ fontSize: '0.78rem', color: '#8a7860', lineHeight: 1.65, fontFamily: 'sans-serif', marginBottom: 4 }}>{p.blurb}</p>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: p.status === 'Completado' ? '#5a8a5a' : '#b89840' }}>{p.status.toUpperCase()}</span>
            </motion.div>
          ))}
        </div>
      )
      case 'habilidades': return (
        <div className="space-y-6">
          {(['frontend', 'backend', 'devops'] as const).map(group => (
            <div key={group}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3d3428', marginBottom: 8 }}>{group}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skillsData[group].map(skill => (
                  <span key={skill} style={{ fontFamily: 'sans-serif', fontSize: '0.78rem', color: '#b8a888', background: 'rgba(20,16,10,0.9)', border: '1px solid rgba(180,140,60,0.18)', padding: '3px 10px' }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
      case 'experiencia': return (
        <div className="space-y-5">
          {experienceData.map((exp, i) => (
            <motion.div key={exp.puesto} style={{ borderLeft: '2px solid rgba(189,8,26,0.45)', paddingLeft: 12 }}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#5a4a38', marginBottom: 4 }}>{exp.periodo}</p>
              <h4 style={{ fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif', color: '#d8b878', fontSize: 'clamp(0.82rem,1.4vw,0.95rem)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 3 }}>{exp.puesto}</h4>
              <p style={{ fontSize: '0.78rem', color: '#7a6a52', fontFamily: 'sans-serif', marginBottom: 4 }}>{exp.empresa}</p>
              <p style={{ fontSize: '0.78rem', color: '#6a5a44', lineHeight: 1.65, fontFamily: 'sans-serif' }}>{exp.descripcion}</p>
            </motion.div>
          ))}
        </div>
      )
      case 'contacto': return (
        <div className="space-y-5">
          <div style={{ background: 'rgba(18,14,10,0.9)', border: '1px solid rgba(180,140,60,0.15)', padding: '12px 14px' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3d3428', marginBottom: 5 }}>Estado</p>
            <p style={{ fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif', color: '#6a9a6a', letterSpacing: '0.06em' }}>{contactData.disponibilidad}</p>
          </div>
          {[['Red social', contactData.social], ['Email', contactData.email], ['GitHub', contactData.github], ['LinkedIn', contactData.linkedin]].map(([l, v]) => (
            <div key={l}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3d3428', marginBottom: 3 }}>{l}</p>
              <p style={{ fontSize: '0.82rem', color: '#b8a888', fontFamily: 'sans-serif' }}>{v}</p>
            </div>
          ))}
        </div>
      )
      default: return null
    }
  }

  return (
    <div
      ref={containerRef}
      className="rdr-cinematic-bars fixed inset-0 overflow-hidden"
      style={{ background: '#0c0a07' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)',
        zIndex: 1,
      }} aria-hidden />

      <motion.div className="rdr-grain absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}
        animate={{ opacity: [0.025, 0.05, 0.025] }} transition={{ duration: 4, repeat: Infinity }} />

      <div className="rdr-bar-paint-edge-top"    style={{ top:    'calc(12% - 10px)', zIndex: 22 }} aria-hidden />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(12% - 10px)', zIndex: 22 }} aria-hidden />

      <div className="relative flex h-full" style={{ zIndex: 30 }}>

        {/* ── SIDEBAR ── */}
        <div
          className="flex-shrink-0 flex flex-col"
          style={{
            width: 'clamp(200px, 22vw, 270px)',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)',
            borderRight: '1px solid rgba(200,180,130,0.1)',
          }}
        >
          <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid rgba(200,180,130,0.1)' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3d3428', marginBottom: 10 }}>
              Compendio
            </p>
            <button
              type="button"
              onClick={onBack}
              style={{ fontFamily: 'Courier New, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: '#5a4a38', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8b898')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5a4a38')}
            >
              ← Volver
            </button>
          </div>

          <nav style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
            {categories.map((cat, index) => {
              const isActive = activeCategory === index
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  className="w-full text-left relative"
                  style={{
                    padding: '11px 22px',
                    background: isActive ? 'rgba(255,255,255,0.025)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => setSelectedCategory(index)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                      style={{ width: 3, height: 22, background: '#bd081a', boxShadow: '0 0 8px rgba(189,8,26,0.5)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span style={{
                    fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? '#e8d8b0' : '#3a3028',
                    textShadow: isActive ? '0 0 12px rgba(232,216,176,0.3)' : 'none',
                  }}>
                    {cat.label}
                  </span>
                </motion.button>
              )
            })}
          </nav>

          <div style={{ padding: '14px 22px', borderTop: '1px solid rgba(200,180,130,0.08)' }}>
            {['Scroll para navegar', 'Esc para volver'].map(t => (
              <p key={t} style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2a2218', marginBottom: 3 }}>{t}</p>
            ))}
          </div>
        </div>

        {/* ── ÁREA PRINCIPAL ── */}
        <div
          ref={contentPanelRef}
          className="flex-1 flex flex-col overflow-y-auto min-h-0"
          style={{ padding: 'clamp(14px, 2vw, 28px)' }}
        >
          <div style={{ marginBottom: 14 }}>
            <h1 style={{
              fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c8b898',
              marginBottom: 8,
            }}>
              {categories[selectedCategory].label}
            </h1>
            <div style={{ height: 1, background: 'rgba(200,180,130,0.2)', marginBottom: 16 }} />
          </div>

          {/* ── GRID DE CARDS ── */}
          <div
            className="shrink-0"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.45fr 1fr 1fr',
              gridTemplateRows: 'auto auto',
              gap: 8,
              marginBottom: 16,
            }}
          >
            {categories.map((cat, index) => {
              const isFeatured = index === 0
              const isActive   = selectedCategory === index
              const tier       = imgTier[index] ?? 0
              const src        = tier === 0 ? COMPENDIUM_IMAGES[index] : tier === 1 ? compendiumFallbackSrc(index) : null

              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-label={`Abrir sección ${cat.label}`}
                  onClick={() => setSelectedCategory(index)}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    gridRow: isFeatured ? '1 / 3' : undefined,
                    position: 'relative',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    outline: 'none',
                    height: isFeatured ? 'clamp(200px, 32vh, 320px)' : 'clamp(90px, 13vh, 145px)',
                  }}
                >
                  {/*
                    ── MARCO ROJO ACTIVO con paint edge ──

                    CAMBIO: en vez de `border` CSS (que queda recto),
                    usamos `outline` + `filter: url(#rdr-paint-container-active)`.
                    El displacement filter deforma el outline → borde orgánico tipo pintura.
                    box-shadow inset da el "gap" oscuro entre foto y marco rojo.
                  */}
                  {isActive && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        inset: -5,
                        outline: '3px solid #bd081a',
                        outlineOffset: '0px',
                        boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.8), 0 0 16px rgba(189,8,26,0.4)',
                        zIndex: 10,
                        /* Paint edge: deforma el outline con feTurbulence → look de pincelada */
                        filter: 'url(#rdr-paint-container-active)',
                      }}
                      aria-hidden
                    />
                  )}

                  {/* ── FOTO + máscara de borde pintado ── */}
                  <div
                    className={isFeatured ? 'rdr-paint-wrapper-lg' : 'rdr-paint-wrapper-sm'}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <div
                      className="rdr-card-photo-bg"
                      style={{ background: '#1a1410' }}
                    >
                      {src && (
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={() => setImgTier(prev => ({ ...prev, [index]: (prev[index] ?? 0) + 1 }))}
                          style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            filter: 'sepia(75%) contrast(120%) brightness(82%) grayscale(25%) saturate(70%)',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* ── SVG borde pintado a mano ── */}
                  <svg
                    viewBox={isFeatured ? '0 0 200 270' : '0 0 200 130'}
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
                      filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.7))',
                    }}
                  >
                    <path
                      d={isFeatured ? PAINT_EDGE_TALL : PAINT_EDGE_SHORT}
                      fill="none"
                      stroke="#1a1208"
                      strokeWidth={isFeatured ? '10' : '8'}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* ── Label inferior ── */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      padding: isFeatured ? '28px 10px 10px' : '18px 8px 7px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
                      zIndex: 5,
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
                      fontSize: isFeatured ? '0.72rem' : '0.62rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: isActive ? '#ffffff' : '#b8a878',
                      fontWeight: 400,
                    }}>
                      {cat.label}
                    </span>
                  </div>

                  {/* Hover overlay sutil */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 transition-opacity duration-200"
                      style={{
                        background: 'rgba(255,255,255,0)',
                        zIndex: 6,
                        opacity: hoveredCategory === index ? 1 : 0,
                        boxShadow: 'inset 0 0 0 1px rgba(200,180,130,0.25)',
                      }}
                      aria-hidden
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── PANEL DE CONTENIDO ── */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              background: 'linear-gradient(160deg, rgba(22,17,11,0.97) 0%, rgba(14,11,7,0.99) 100%)',
              border: '1px solid rgba(200,180,130,0.12)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
              padding: 'clamp(14px, 2vw, 24px)',
              minHeight: 120,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <h2 style={{
                fontFamily: 'var(--font-chinese-rocks), Impact, sans-serif',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#e0c38f',
                marginBottom: 8,
              }}>
                {categories[activeCategory].label}
              </h2>
              <div style={{ height: 2, width: 70, background: 'linear-gradient(to right, #bd081a 0%, rgba(254,172,1,0.35) 100%)' }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={categories[activeCategory].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(200,180,130,0.12)' }}>
            <p style={{
              fontFamily: 'sans-serif',
              fontSize: '0.72rem',
              color: '#4a3e30',
              letterSpacing: '0.04em',
              fontStyle: 'italic',
            }}>
              {categories[activeCategory].label === 'PERFIL' && 'Información general sobre el desarrollador.'}
              {categories[activeCategory].label === 'PROYECTOS' && 'Proyectos desarrollados con tecnologías modernas.'}
              {categories[activeCategory].label === 'HABILIDADES' && 'Stack técnico y herramientas dominadas.'}
              {categories[activeCategory].label === 'EXPERIENCIA' && 'Formación y recorrido profesional.'}
              {categories[activeCategory].label === 'CONTACTO' && 'Formas de contacto y disponibilidad.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}