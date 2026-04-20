'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type PortfolioInitialSection = 'portfolio' | 'about' | 'contact'

interface PortfolioMenuProps {
  onBack: () => void
  /** Desde el menú principal: abre la pestaña coherente */
  initialSection?: PortfolioInitialSection
}

const categories = [
  { id: 'perfil', label: 'PERFIL' },
  { id: 'proyectos', label: 'PROYECTOS' },
  { id: 'habilidades', label: 'HABILIDADES' },
  { id: 'experiencia', label: 'EXPERIENCIA' },
  { id: 'contacto', label: 'CONTACTO' },
]

/** Miniaturas estilo menú RDR2 (máscara + trazo en globals.css) */
const COMPENDIUM_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
  'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&q=80',
] as const

/** Trazos SVG calcados del layout tipo “paint edge” (borde orgánico) */
const PAINT_EDGE_TALL =
  'M4,4 C10,2 22,4 34,3 C46,4 58,2 70,3 C82,4 94,2 106,3 C118,4 130,2 142,3 C154,4 166,2 178,3 C190,4 196,3 198,4 L198,12 C199,28 197,44 198,60 C199,76 197,92 198,108 C199,124 197,140 198,156 C199,172 197,188 198,204 C199,220 197,236 198,252 L198,266 C190,269 178,266 166,268 C154,269 142,266 130,268 C118,269 106,266 94,268 C82,269 70,266 58,268 C46,269 34,266 22,268 C12,269 5,267 2,266 L2,12 C1,28 3,44 2,60 C1,76 3,92 2,108 C1,124 3,140 2,156 C1,172 3,188 2,204 C1,220 3,236 2,252 Z'

const PAINT_EDGE_SHORT =
  'M4,3 C12,1 24,3 36,2 C48,3 60,1 72,2 C84,3 96,1 108,2 C120,3 132,1 144,2 C156,3 168,1 180,2 C190,3 196,2 198,3 L198,10 C199,24 197,38 198,52 C199,66 197,80 198,94 C199,108 197,120 198,127 C190,129 178,127 166,128 C154,129 142,127 130,128 C118,129 106,127 94,128 C82,129 70,127 58,128 C46,129 34,127 22,128 C12,129 5,128 2,127 L2,10 C1,24 3,38 2,52 C1,66 3,80 2,94 C1,108 3,120 2,127 Z'

const profileData = {
  nombre: 'Yeison Fajardo',
  titulo: 'Desarrollador Web · Full Stack',
  experiencia: '3 años',
  ubicacion: 'Buenos Aires · Disponible para trabajar',
  descripcion:
    'Desarrollador web con experiencia profesional creando aplicaciones avanzadas: interfaces claras, código mantenible y foco en la experiencia de usuario.',
}

const projectsData = [
  {
    name: 'RoadEra',
    tech: 'TypeScript · JavaScript · CSS',
    status: 'Completado',
    year: '2024',
    blurb:
      'Alquiler de coches de lujo: registro, panel admin, reservas en tiempo real y pagos con Stripe; gestión de flota y reservas con buen rendimiento en móvil.',
  },
  {
    name: 'Tesla Clone',
    tech: 'JavaScript · HTML · CSS',
    status: 'Completado',
    year: '2023',
    blurb:
      'Clon del sitio oficial de Tesla: animaciones, header dinámico, transiciones de color y scroll; un desafío para acercar el comportamiento al original.',
  },
  {
    name: 'X (Twitter) Clone',
    tech: 'JavaScript · Node.js · MongoDB',
    status: 'Completado',
    year: '2023',
    blurb:
      'Red social tipo X: registro e inicio de sesión, sesiones, cierre de sesión y publicaciones con comentarios sobre una base de datos funcional.',
  },
]

const skillsData = {
  frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Express', 'Go', 'PostgreSQL', 'MongoDB', 'Prisma'],
  devops: ['Docker', 'AWS', 'Git', 'Linux', 'CI/CD'],
}

const experienceData = [
  {
    puesto: 'Tecnicatura en Desarrollo de Software',
    empresa: 'Universidad Provincial de Ezeiza',
    periodo: '2025 — Actualidad',
    descripcion:
      'Formación en backend, APIs con Node.js y Express, bases de datos con Prisma, JWT/OAuth2, Docker y despliegues en la nube.',
  },
  {
    puesto: 'Big O, algoritmos y estructuras de datos',
    empresa: 'Udemy',
    periodo: 'Enero 2025',
    descripcion:
      'Optimización con Big O, estructuras como listas y grafos, y preparación para entrevistas técnicas.',
  },
  {
    puesto: 'Python · Desarrollo Web 4 · Desarrollo Web 3',
    empresa: 'Aprende Programando',
    periodo: '2022 — 2024',
    descripcion:
      'Fundamentos de Python; backend avanzado con APIs REST, PostgreSQL, MongoDB, JWT y React para interfaces dinámicas.',
  },
]

const contactData = {
  email: 'andresfajardo1606@gmail.com',
  github: 'github.com/yeisonfjrd',
  linkedin: 'linkedin.com/in/yeisonfajardo',
  disponibilidad: 'Disponible para trabajar',
  social: '@yeisonfajardo',
}

const SECTION_TO_INDEX: Record<PortfolioInitialSection, number> = {
  portfolio: 1,
  about: 0,
  contact: 4,
}

export default function PortfolioMenu({ onBack, initialSection }: PortfolioMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeCategory = hoveredCategory !== null ? hoveredCategory : selectedCategory

  useEffect(() => {
    if (!initialSection) return
    const idx = SECTION_TO_INDEX[initialSection]
    if (idx !== undefined) setSelectedCategory(idx)
  }, [initialSection])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      } else if (e.key === 'ArrowUp') {
        setSelectedCategory(prev => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowDown') {
        setSelectedCategory(prev => Math.min(categories.length - 1, prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastScrollTime = 0
    const scrollCooldown = 150

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) return
      lastScrollTime = now

      if (e.deltaY > 0) {
        setSelectedCategory(prev => Math.min(categories.length - 1, prev + 1))
      } else if (e.deltaY < 0) {
        setSelectedCategory(prev => Math.max(0, prev - 1))
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: true })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  const renderContent = () => {
    const categoryId = categories[activeCategory].id

    switch (categoryId) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <div className="rdr-divider border-b pb-4">
              <h3 className="font-chinese-rocks text-rdr-parchment text-2xl md:text-3xl mb-2 tracking-[0.08em]">
                {profileData.nombre}
              </h3>
              <p className="text-[#c8b28d] text-lg font-sans">{profileData.titulo}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-rdr-ink text-xs tracking-wider uppercase mb-1 opacity-90">Experiencia</p>
                <p className="text-rdr-cream">{profileData.experiencia}</p>
              </div>
              <div>
                <p className="text-rdr-ink text-xs tracking-wider uppercase mb-1 opacity-90">Ubicación</p>
                <p className="text-rdr-cream">{profileData.ubicacion}</p>
              </div>
            </div>
            <div>
              <p className="text-rdr-ink text-xs tracking-wider uppercase mb-2 opacity-90">Sobre mí</p>
              <p className="text-[#ddd0aa] leading-relaxed font-sans">{profileData.descripcion}</p>
            </div>
          </div>
        )

      case 'proyectos':
        return (
          <div className="space-y-5">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.name}
                className="rdr-divider border-b pb-5 last:border-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h4 className="font-chinese-rocks text-rdr-parchment text-lg tracking-[0.06em]">
                    {project.name}
                  </h4>
                  <span className="text-rdr-pencil text-sm shrink-0">{project.year}</span>
                </div>
                <p className="text-rdr-gold/90 text-sm mb-2 font-typewriter">{project.tech}</p>
                <p className="text-[#c4b59a] text-sm leading-relaxed mb-2 font-sans">{project.blurb}</p>
                <span
                  className={`text-xs tracking-wider font-typewriter ${
                    project.status === 'Completado' ? 'text-[#6a9a6a]' : 'text-rdr-gold/80'
                  }`}
                >
                  {project.status.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        )

      case 'habilidades':
        return (
          <div className="space-y-8">
            <div>
              <h4 className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-3 opacity-90">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.frontend.map((skill) => (
                  <span key={skill} className="rdr-tag px-3 py-1.5 text-sm font-sans">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-3 opacity-90">Backend</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.backend.map((skill) => (
                  <span key={skill} className="rdr-tag px-3 py-1.5 text-sm font-sans">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-3 opacity-90">DevOps</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.devops.map((skill) => (
                  <span key={skill} className="rdr-tag px-3 py-1.5 text-sm font-sans">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )

      case 'experiencia':
        return (
          <div className="space-y-6">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.puesto}
                className="border-l-2 border-[#bd081a]/55 pl-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <p className="text-rdr-pencil text-xs tracking-wider mb-1 font-typewriter">{exp.periodo}</p>
                <h4 className="font-chinese-rocks text-rdr-parchment text-base md:text-lg tracking-[0.05em] mb-1">
                  {exp.puesto}
                </h4>
                <p className="text-[#c8b28d] text-sm mb-2 font-sans">{exp.empresa}</p>
                <p className="text-[#b8a990] text-sm leading-relaxed font-sans">{exp.descripcion}</p>
              </motion.div>
            ))}
          </div>
        )

      case 'contacto':
        return (
          <div className="space-y-6">
            <div className="rdr-panel p-4">
              <p className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-2 opacity-90">Estado</p>
              <p className="text-[#7faa7f] font-chinese-rocks tracking-[0.08em]">{contactData.disponibilidad}</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-1 opacity-90">Red social</p>
                <p className="text-rdr-cream font-sans">{contactData.social}</p>
              </div>
              <div>
                <p className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-1 opacity-90">Email</p>
                <p className="text-rdr-cream font-sans">{contactData.email}</p>
              </div>
              <div>
                <p className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-1 opacity-90">GitHub</p>
                <p className="text-rdr-cream font-sans">{contactData.github}</p>
              </div>
              <div>
                <p className="text-rdr-ink text-xs tracking-[0.2em] uppercase mb-1 opacity-90">LinkedIn</p>
                <p className="text-rdr-cream font-sans">{contactData.linkedin}</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      ref={containerRef}
      className="rdr-cinematic-bars absolute inset-0 min-h-0 overflow-hidden bg-[#020002]"
    >
      <div className="absolute inset-0 bg-[#100d08]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,172,1,0.08),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.88))]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-western" />
      <div className="absolute inset-0 rdr-golden-hour opacity-50" aria-hidden />

      <motion.div
        className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/38 to-black/72" />
      <div className="rdr-vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex">
        <div className="w-64 md:w-72 flex-shrink-0 rdr-sidebar-edge flex flex-col">
          <div className="p-5 md:p-6 rdr-divider border-b">
            <p className="font-typewriter text-[#5a5348] text-[10px] tracking-[0.28em] uppercase mb-3">
              Compendio
            </p>
            <button
              type="button"
              onClick={onBack}
              className="font-typewriter text-[#8a8070] hover:text-rdr-parchment text-xs tracking-wider transition-colors"
            >
              ← VOLVER
            </button>
          </div>

          <nav className="flex-1 py-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                type="button"
                className="w-full text-left py-3 px-5 md:px-6 relative"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategory(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {activeCategory === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-[#bd081a] shadow-[0_0_10px_rgba(189,8,26,0.4)]"
                    layoutId="categoryIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <span
                  className={`font-chinese-rocks uppercase text-sm tracking-[0.1em] transition-colors duration-200 ${
                    activeCategory === index ? 'text-[#e8dfc0] rdr-text-glow' : 'text-[#4d453c]'
                  }`}
                >
                  {category.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="p-5 md:p-6 rdr-divider border-t">
            <p className="font-typewriter text-[#4a4338] text-[10px] tracking-[0.2em] uppercase">
              Scroll para navegar
            </p>
            <p className="font-typewriter text-[#4a4338] text-[10px] tracking-[0.2em] uppercase mt-1">
              Esc para volver
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 p-6 md:p-10 lg:p-12 overflow-y-auto min-h-0">
          <div className="shrink-0">
            <div className="flex items-center justify-between pb-2 mb-3 rdr-divider border-b">
              <p className="font-typewriter text-[#5a5348] text-[10px] tracking-[0.28em] uppercase">
                Secciones
              </p>
              <div className="flex items-center gap-2" aria-hidden>
                <div className="h-px w-8 bg-[rgba(180,140,60,0.35)]" />
                <div className="size-1.5 rotate-45 bg-[#c8a84b]/60" />
                <div className="h-px w-8 bg-[rgba(180,140,60,0.35)]" />
              </div>
            </div>
            <div className="rdr-compendium-grid">
              {categories.map((category, index) => {
                const isFeatured = index === 0
                const isActive = selectedCategory === index
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-label={`Abrir sección ${category.label}`}
                    className={cn(
                      'rdr-photo-card',
                      isFeatured && 'rdr-photo-card--featured',
                      isActive && 'rdr-photo-card--active'
                    )}
                    onClick={() => setSelectedCategory(index)}
                    onMouseEnter={() => setHoveredCategory(index)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="rdr-photo-card-inner">
                      <div
                        className="rdr-card-photo-bg"
                        style={{
                          backgroundImage: `url(${COMPENDIUM_IMAGES[index]})`,
                        }}
                      />
                      <svg
                        className="rdr-card-paint-stroke"
                        viewBox={isFeatured ? '0 0 200 270' : '0 0 200 130'}
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path d={isFeatured ? PAINT_EDGE_TALL : PAINT_EDGE_SHORT} />
                      </svg>
                      <div className="rdr-card-active-outline" aria-hidden />
                      <div className="rdr-compendium-card-label">
                        <span>{category.label}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rdr-panel rdr-panel-print rdr-tintype-soft rounded-sm p-6 md:p-8 min-h-[min(100%,480px)] flex-1 min-h-0">
            <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-chinese-rocks text-2xl md:text-3xl text-rdr-parchment mb-2 tracking-[0.12em]">
                {categories[activeCategory].label}
              </h2>
              <div className="h-[2px] w-20 bg-gradient-to-r from-[#bd081a] to-[#feac01]/50 rounded-full" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={categories[activeCategory].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
