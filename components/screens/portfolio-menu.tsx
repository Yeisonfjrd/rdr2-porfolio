'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioMenuProps {
  onBack: () => void
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
  titulo: 'Desarrollador Full Stack',
  experiencia: '3 años',
  ubicacion: 'Disponible remoto',
  descripcion: 'Especializado en crear aplicaciones web escalables y de alto rendimiento. Apasionado por el código limpio y las arquitecturas bien diseñadas.',
}

const projectsData = [
  { 
    name: 'Sistema de Gestión Empresarial', 
    tech: 'Next.js, TypeScript, PostgreSQL',
    status: 'Completado',
    year: '2024'
  },
  { 
    name: 'Plataforma E-commerce', 
    tech: 'React, Node.js, MongoDB',
    status: 'Completado',
    year: '2024'
  },
  { 
    name: 'Dashboard Analytics', 
    tech: 'Vue.js, Python, AWS',
    status: 'En desarrollo',
    year: '2024'
  },
  { 
    name: 'API REST Microservicios', 
    tech: 'Go, Docker, Kubernetes',
    status: 'Completado',
    year: '2023'
  },
]

const skillsData = {
  frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB'],
  devops: ['Docker', 'AWS', 'CI/CD', 'Linux', 'Git'],
}

const experienceData = [
  {
    puesto: 'Desarrollador Full Stack Senior',
    empresa: 'Tech Solutions',
    periodo: '2023 - Presente',
    descripcion: 'Liderazgo técnico en proyectos de alta complejidad'
  },
  {
    puesto: 'Desarrollador Full Stack',
    empresa: 'Digital Agency',
    periodo: '2022 - 2023',
    descripcion: 'Desarrollo de aplicaciones web empresariales'
  },
  {
    puesto: 'Desarrollador Frontend',
    empresa: 'Startup Inc',
    periodo: '2021 - 2022',
    descripcion: 'Creación de interfaces de usuario modernas'
  },
]

const contactData = {
  email: 'yeison@email.com',
  github: 'github.com/yeisonfajardo',
  linkedin: 'linkedin.com/in/yeisonfajardo',
  disponibilidad: 'Disponible para nuevos proyectos',
}

export default function PortfolioMenu({ onBack }: PortfolioMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeCategory = hoveredCategory !== null ? hoveredCategory : selectedCategory

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
            <div className="border-b border-[#2a2721] pb-4">
              <h3 className="text-[#c4a882] text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {profileData.nombre}
              </h3>
              <p className="text-[#8b8070] text-lg">{profileData.titulo}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-1">Experiencia</p>
                <p className="text-[#a09080]">{profileData.experiencia}</p>
              </div>
              <div>
                <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-1">Ubicación</p>
                <p className="text-[#a09080]">{profileData.ubicacion}</p>
              </div>
            </div>
            <div>
              <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-2">Sobre mí</p>
              <p className="text-[#8b8070] leading-relaxed">{profileData.descripcion}</p>
            </div>
          </div>
        )

      case 'proyectos':
        return (
          <div className="space-y-4">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.name}
                className="border-b border-[#2a2721] pb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[#c4a882]" style={{ fontFamily: 'Georgia, serif' }}>
                    {project.name}
                  </h4>
                  <span className="text-[#5a554d] text-sm">{project.year}</span>
                </div>
                <p className="text-[#6b635a] text-sm mb-1">{project.tech}</p>
                <span className={`text-xs tracking-wider ${
                  project.status === 'Completado' ? 'text-[#4a7c4a]' : 'text-[#7c7c4a]'
                }`}>
                  {project.status.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        )

      case 'habilidades':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-[#5a554d] text-xs tracking-wider uppercase mb-3">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.frontend.map((skill) => (
                  <span key={skill} className="text-[#a09080] bg-[#1a1815] px-3 py-1 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[#5a554d] text-xs tracking-wider uppercase mb-3">Backend</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.backend.map((skill) => (
                  <span key={skill} className="text-[#a09080] bg-[#1a1815] px-3 py-1 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[#5a554d] text-xs tracking-wider uppercase mb-3">DevOps</h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.devops.map((skill) => (
                  <span key={skill} className="text-[#a09080] bg-[#1a1815] px-3 py-1 text-sm">
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
                className="border-l-2 border-[#2a2721] pl-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <p className="text-[#5a554d] text-xs tracking-wider mb-1">{exp.periodo}</p>
                <h4 className="text-[#c4a882] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {exp.puesto}
                </h4>
                <p className="text-[#8b8070] text-sm mb-2">{exp.empresa}</p>
                <p className="text-[#6b635a] text-sm">{exp.descripcion}</p>
              </motion.div>
            ))}
          </div>
        )

      case 'contacto':
        return (
          <div className="space-y-6">
            <div className="bg-[#1a1815] p-4">
              <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-2">Estado</p>
              <p className="text-[#4a7c4a]">{contactData.disponibilidad}</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-1">Email</p>
                <p className="text-[#a09080]">{contactData.email}</p>
              </div>
              <div>
                <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-1">GitHub</p>
                <p className="text-[#a09080]">{contactData.github}</p>
              </div>
              <div>
                <p className="text-[#5a554d] text-xs tracking-wider uppercase mb-1">LinkedIn</p>
                <p className="text-[#a09080]">{contactData.linkedin}</p>
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
        className="absolute inset-0 h-full w-full object-cover opacity-20"
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
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f0e0c_0%,#1a1815_50%,#0f0e0c_100%)]" />

      <motion.div 
        className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/70" />
      <div className="rdr-vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex">
        <div className="w-64 flex-shrink-0 border-r border-[#2a2721] flex flex-col">
          <div className="p-6 border-b border-[#2a2721]">
            <button
              onClick={onBack}
              className="text-[#6b635a] hover:text-[#a09080] text-sm tracking-wider transition-colors"
              style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}
            >
              ← VOLVER
            </button>
          </div>

          <nav className="flex-1 py-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className="w-full text-left py-3 px-6 relative"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategory(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {activeCategory === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#cc0000]"
                    layoutId="categoryIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
                <span 
                  className={`text-sm tracking-[0.15em] transition-colors duration-200 ${
                    activeCategory === index 
                      ? 'text-[#e8dcc8]' 
                      : 'text-[#5a554d]'
                  }`}
                  style={{ fontFamily: 'var(--font-western), Georgia, serif' }}
                >
                  {category.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="p-6 border-t border-[#2a2721]">
            <p className="text-[#3d3a35] text-xs tracking-wider" style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}>
              SCROLL PARA NAVEGAR
            </p>
            <p className="text-[#3d3a35] text-xs tracking-wider mt-1" style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}>
              ESC PARA VOLVER
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 
              className="text-3xl text-[#c4a882] mb-2"
              style={{ fontFamily: 'var(--font-western), Georgia, serif', letterSpacing: '0.1em' }}
            >
              {categories[activeCategory].label}
            </h2>
            <div className="h-[1px] w-16 bg-[#cc0000]" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={categories[activeCategory].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
