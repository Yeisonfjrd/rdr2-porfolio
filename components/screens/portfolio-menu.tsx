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
  'M4,4 C10,2 22,4 34,3 C46,4 58,2 70,3 C82,4 94,2 106,3 C118,4 130,2 142,3 C154,4 166,2 178,3 C190,4 196,3 198,4 L198,12 C199,28 197,44 198,60 C199,76 197,92 198,108 C199,124 197,140 198,156 C199,172 197,188 198,204 C199,220 197,236 198,252 L198,266 C190,269 178,266 166,268 C154,269 142,266 130,268 C118,269 106,266 94,268 C82,269 70,266 58,268 C46,269 34,266 22,268 C12,269 5,267 2,266 L2,12 C1,28 3,44 2,60 C1,76 3,92 2,108 C1,124 3,140 2,156 C1,172 3,188 2,204 C1,220 3,236 2,252 Z'
const PAINT_EDGE_SHORT =
  'M4,3 C12,1 24,3 36,2 C48,3 60,1 72,2 C84,3 96,1 108,2 C120,3 132,1 144,2 C156,3 168,1 180,2 C190,3 196,2 198,3 L198,10 C199,24 197,38 198,52 C199,66 197,80 198,94 C199,108 197,120 198,127 C190,129 178,127 166,128 C154,129 142,127 130,128 C118,129 106,127 94,128 C82,129 70,127 58,128 C46,129 34,127 22,128 C12,129 5,128 2,127 L2,10 C1,24 3,38 2,52 C1,66 3,80 2,94 C1,108 3,120 2,127 Z'

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

  const activeCategory = hoveredCategory !== null ? hoveredCategory : selectedCategory

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
        <div className="space-y-6">
          <div className="pb-4" style={{ borderBottom: '1px solid rgba(180,140,60,0.2)' }}>
            <h3 className="font-chinese-rocks mb-2 tracking-[0.08em]"
              style={{ color: '#e0c38f', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
              {profileData.nombre}
            </h3>
            <p className="font-sans text-base" style={{ color: '#a08060' }}>{profileData.titulo}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[['Experiencia', profileData.experiencia], ['Ubicación', profileData.ubicacion]].map(([label, val]) => (
              <div key={label}>
                <p className="font-typewriter text-xs tracking-wider uppercase mb-1" style={{ color: '#4a4030', opacity: 0.9 }}>{label}</p>
                <p className="font-sans text-sm" style={{ color: '#c8b898' }}>{val}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-typewriter text-xs tracking-wider uppercase mb-2" style={{ color: '#4a4030' }}>Sobre mí</p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#b8a888' }}>{profileData.descripcion}</p>
          </div>
        </div>
      )
      case 'proyectos': return (
        <div className="space-y-5">
          {projectsData.map((p, i) => (
            <motion.div key={p.name} className="pb-5"
              style={{ borderBottom: '1px solid rgba(180,140,60,0.15)' }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex justify-between items-start gap-4 mb-2">
                <h4 className="font-chinese-rocks tracking-[0.06em]"
                  style={{ color: '#e0c38f', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>{p.name}</h4>
                <span className="font-typewriter text-sm shrink-0" style={{ color: '#6b5a48' }}>{p.year}</span>
              </div>
              <p className="font-typewriter text-sm mb-2" style={{ color: '#c8a84b', opacity: 0.9 }}>{p.tech}</p>
              <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: '#a09070' }}>{p.blurb}</p>
              <span className="font-typewriter text-xs tracking-wider"
                style={{ color: p.status === 'Completado' ? '#6a9a6a' : '#c8a84b' }}>
                {p.status.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      )
      case 'habilidades': return (
        <div className="space-y-8">
          {(['frontend', 'backend', 'devops'] as const).map(group => (
            <div key={group}>
              <h4 className="font-typewriter text-xs tracking-[0.2em] uppercase mb-3"
                style={{ color: '#4a4030', opacity: 0.9 }}>{group}</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData[group].map(skill => (
                  <span key={skill} className="font-sans text-sm px-3 py-1.5"
                    style={{
                      color: '#c8b898',
                      background: 'rgba(26,21,16,0.9)',
                      border: '1px solid rgba(200,168,75,0.2)',
                    }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
      case 'experiencia': return (
        <div className="space-y-6">
          {experienceData.map((exp, i) => (
            <motion.div key={exp.puesto} className="pl-4"
              style={{ borderLeft: '2px solid rgba(189,8,26,0.5)' }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
              <p className="font-typewriter text-xs tracking-wider mb-1" style={{ color: '#6b5a48' }}>{exp.periodo}</p>
              <h4 className="font-chinese-rocks tracking-[0.05em] mb-1"
                style={{ color: '#e0c38f', fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}>{exp.puesto}</h4>
              <p className="font-sans text-sm mb-2" style={{ color: '#a08060' }}>{exp.empresa}</p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#907860' }}>{exp.descripcion}</p>
            </motion.div>
          ))}
        </div>
      )
      case 'contacto': return (
        <div className="space-y-6">
          <div className="p-4" style={{ background: 'rgba(26,21,16,0.8)', border: '1px solid rgba(200,168,75,0.2)' }}>
            <p className="font-typewriter text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#4a4030' }}>Estado</p>
            <p className="font-chinese-rocks tracking-[0.08em]" style={{ color: '#7faa7f' }}>{contactData.disponibilidad}</p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Red social', value: contactData.social },
              { label: 'Email',      value: contactData.email },
              { label: 'GitHub',     value: contactData.github },
              { label: 'LinkedIn',   value: contactData.linkedin },
            ].map(item => (
              <div key={item.label}>
                <p className="font-typewriter text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#4a4030' }}>{item.label}</p>
                <p className="font-sans text-sm" style={{ color: '#c8b898' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )
      default: return null
    }
  }

  return (
      <div
        ref={containerRef}
        className="rdr-cinematic-bars fixed inset-0 overflow-hidden"
        style={{ background: '#0d0b08' }}
      >

      {/* Viñeta lateral izquierda (como RDR2 que oscurece más a la izquierda) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 50% 70% at 0% 50%, rgba(0,0,0,0.45) 0%, transparent 100%),
          radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)
        `
      }} aria-hidden />

      <motion.div className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.055, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }} />

      {/* Paint bars */}
      <div className="rdr-bar-paint-edge-top"    style={{ top:    'calc(12% - 10px)' }} aria-hidden />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(12% - 10px)' }} aria-hidden />

      {/* Layout principal — z-30 */}
      <div className="relative flex h-full" style={{ zIndex: 30 }}>

        {/* ── SIDEBAR ── */}
        <div className="w-64 md:w-72 flex-shrink-0 flex flex-col"
          style={{ background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(180,140,60,0.15)' }}>

          <div className="p-5 md:p-6" style={{ borderBottom: '1px solid rgba(180,140,60,0.15)' }}>
            <p className="font-typewriter text-[10px] tracking-[0.28em] uppercase mb-3"
              style={{ color: '#4a4030' }}>Compendio</p>
            <button type="button" onClick={onBack}
              className="font-typewriter text-xs tracking-wider transition-colors"
              style={{ color: '#6b5a48' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e0c38f')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b5a48')}>
              ← VOLVER
            </button>
          </div>

          <nav className="flex-1 py-3">
            {categories.map((cat, index) => (
              <motion.button key={cat.id} type="button"
                className="w-full text-left py-3 px-5 md:px-6 relative transition-colors"
                style={{ background: activeCategory === index ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategory(index)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {activeCategory === index && (
                  <motion.div className="absolute left-0 top-1/2 -translate-y-1/2"
                    style={{ width: 3, height: 28, background: '#bd081a', boxShadow: '0 0 10px rgba(189,8,26,0.4)' }}
                    layoutId="categoryIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="font-chinese-rocks uppercase text-sm tracking-[0.1em] transition-colors duration-200"
                  style={{ color: activeCategory === index ? '#e8dfc0' : '#4a3e32',
                           textShadow: activeCategory === index ? '1px 1px 4px rgba(0,0,0,0.8)' : 'none' }}>
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="p-5 md:p-6" style={{ borderTop: '1px solid rgba(180,140,60,0.12)' }}>
            <p className="font-typewriter text-[10px] tracking-[0.2em] uppercase" style={{ color: '#3a3028' }}>Scroll para navegar</p>
            <p className="font-typewriter text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: '#3a3028' }}>Esc para volver</p>
          </div>
        </div>

        {/* ── ÁREA PRINCIPAL ── */}
          <div
            ref={contentPanelRef}
            className="relative z-40 flex-1 flex flex-col gap-6 p-6 md:p-8 lg:p-10 overflow-y-auto min-h-0"
            style={{
              background: 'linear-gradient(165deg, rgba(30,24,16,0.96) 0%, rgba(18,14,10,0.99) 100%)',
              border: '1px solid rgba(180,140,60,0.18)',
              boxShadow: 'inset 0 1px 0 rgba(254,172,1,0.08)',
            }}
          >

          {/* Header + grid cards */}
          <div className="shrink-0">
            <div className="flex items-center justify-between pb-2 mb-3"
              style={{ borderBottom: '1px solid rgba(180,140,60,0.2)' }}>
              <p className="font-typewriter text-[10px] tracking-[0.28em] uppercase" style={{ color: '#4a4030' }}>Secciones</p>
              <div className="flex items-center gap-2" aria-hidden>
                <div className="h-px w-8" style={{ background: 'rgba(180,140,60,0.3)' }} />
                <div className="size-1.5 rotate-45" style={{ background: 'rgba(200,168,75,0.5)' }} />
                <div className="h-px w-8" style={{ background: 'rgba(180,140,60,0.3)' }} />
              </div>
            </div>

            <div className="rdr-compendium-grid">
              {categories.map((cat, index) => {
                const isFeatured = index === 0
                const isActive   = selectedCategory === index
                const tier       = imgTier[index] ?? 0
                const src        = tier === 0 ? COMPENDIUM_IMAGES[index] : tier === 1 ? compendiumFallbackSrc(index) : null
                return (
                  <button key={cat.id} type="button"
                    aria-label={`Abrir sección ${cat.label}`}
                    className={cn('rdr-photo-card', isFeatured && 'rdr-photo-card--featured', isActive && 'rdr-photo-card--active')}
                    onClick={() => setSelectedCategory(index)}
                    onMouseEnter={() => setHoveredCategory(index)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="rdr-photo-card-inner">
                      <div className={isFeatured ? 'rdr-paint-wrapper-lg' : 'rdr-paint-wrapper-sm'}
                        style={{ position: 'absolute', inset: 0 }}>
                        <div className="rdr-card-photo-bg">
                          {src && (
                            <img src={src} alt="" loading="lazy" decoding="async"
                              onError={() => setImgTier(prev => ({ ...prev, [index]: (prev[index] ?? 0) + 1 }))} />
                          )}
                        </div>
                      </div>
                      <svg className="rdr-card-paint-stroke"
                        viewBox={isFeatured ? '0 0 200 270' : '0 0 200 130'}
                        preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d={isFeatured ? PAINT_EDGE_TALL : PAINT_EDGE_SHORT} />
                      </svg>
                      <div className="rdr-card-active-outline" aria-hidden />
                      <div className="rdr-compendium-card-label"><span>{cat.label}</span></div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Panel de contenido */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto"
            style={{
              background: 'linear-gradient(165deg, rgba(30,24,16,0.95) 0%, rgba(18,14,10,0.98) 100%)',
              border: '1px solid rgba(180,140,60,0.18)',
              boxShadow: 'inset 0 1px 0 rgba(254,172,1,0.08)',
              minHeight: 'min(100%, 420px)',
            }}>

            <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Título de sección — como RDR2: texto claro sobre fondo oscuro */}
              <h2 className="font-chinese-rocks tracking-[0.12em] mb-2"
                style={{ color: '#e0c38f', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}>
                {categories[activeCategory].label}
              </h2>
              {/* Línea decorativa rojo → dorado */}
              <div style={{ height: 2, width: 80, background: 'linear-gradient(to right, #bd081a, rgba(254,172,1,0.4))' }} />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={categories[activeCategory].id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}