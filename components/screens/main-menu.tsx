'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type GameScreen = 'title' | 'main' | 'portfolio'

interface MainMenuProps {
  onNavigate: (screen: GameScreen, section?: string) => void
  onBack: () => void
}

const menuItems = [
  { id: 'portfolio', label: 'PORTFOLIO', description: 'Ver mi trabajo y proyectos' },
  { id: 'about',     label: 'SOBRE MÍ',  description: 'Conocer mi trayectoria' },
  { id: 'contact',   label: 'CONTACTO',  description: 'Conectar conmigo' },
  { id: 'exit',      label: 'SALIR',     description: 'Volver al inicio' },
]

export default function MainMenu({ onNavigate, onBack }: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex,  setHoveredIndex]  = useState<number | null>(null)

  const handleSelect = (id: string) => {
    if (id === 'portfolio' || id === 'about' || id === 'contact') onNavigate('portfolio', id)
    else if (id === 'exit') onBack()
  }

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex

  return (
    <div className="rdr-cinematic-bars fixed inset-0 overflow-hidden" style={{ background: '#0d0b08' }}>

      {/* Capa de atmósfera única — sutil, no apila oscuridad */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 70% 50%, rgba(254,172,1,0.05) 0%, transparent 100%),
          radial-gradient(ellipse 40% 80% at 0% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)
        `
      }} aria-hidden />

      {/* Viñeta suave solo en bordes extremos */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)'
      }} aria-hidden />

      {/* Grain muy sutil */}
      <motion.div className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.055, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }} />

      {/* Paint bar edges */}
      <div className="rdr-bar-paint-edge-top"    style={{ top:    'calc(12% - 10px)' }} aria-hidden />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(12% - 10px)' }} aria-hidden />

      {/* Contenido — z-30 para estar encima de las barras (z-20) */}
      <div className="relative flex h-full" style={{ zIndex: 30 }}>
        <div className="w-full max-w-md pl-8 md:pl-[10vw] flex flex-col justify-center">

          <p className="font-typewriter text-[10px] md:text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: '#5a5040' }}>
            Menú principal
          </p>

          <nav className="space-y-1 pl-3" style={{ borderLeft: '1px solid rgba(254,172,1,0.2)' }}>
            {menuItems.map((item, index) => (
              <motion.button key={item.id}
                className="w-full text-left py-3 px-4 relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => { setSelectedIndex(index); handleSelect(item.id) }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {activeIndex === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                    style={{ width: 3, height: 36, background: '#bd081a', boxShadow: '0 0 12px rgba(189,8,26,0.5)' }}
                    layoutId="menuIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="font-chinese-rocks uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                    color: activeIndex === index ? '#e8dfc0' : '#4a3e32',
                    textShadow: activeIndex === index ? '2px 2px 0 #000, 4px 4px 8px rgba(0,0,0,0.9)' : 'none',
                  }}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <motion.p className="mt-10 pl-4 text-sm leading-relaxed max-w-sm font-sans"
            style={{ color: '#6b5a48' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {menuItems[activeIndex].description}
          </motion.p>
        </div>

        <div className="flex-1 relative">
          <motion.div className="absolute bottom-8 right-8 text-right"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <p className="font-typewriter text-xs tracking-[0.2em] uppercase" style={{ color: '#3a3028' }}>Navega con el cursor</p>
            <p className="font-typewriter text-xs tracking-[0.2em] uppercase mt-1" style={{ color: '#3a3028' }}>Clic para seleccionar</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}