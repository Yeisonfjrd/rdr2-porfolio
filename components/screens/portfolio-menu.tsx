'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div ref={containerRef} className="rdr-cinematic-bars relative w-full h-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-horses-in-a-field-1560/1080p.mp4"
          type="video/mp4"
        />
      </video>
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

        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto min-h-0">
          <div className="rdr-panel rdr-panel-print rdr-tintype-soft rounded-sm p-6 md:p-8 min-h-[min(100%,480px)]">
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
