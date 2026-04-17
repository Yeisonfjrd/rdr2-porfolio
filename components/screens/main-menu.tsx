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
  { id: 'about', label: 'SOBRE MÍ', description: 'Conocer mi trayectoria' },
  { id: 'contact', label: 'CONTACTO', description: 'Conectar conmigo' },
  { id: 'exit', label: 'SALIR', description: 'Volver al inicio' },
]

export default function MainMenu({ onNavigate, onBack }: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (id: string) => {
    if (id === 'portfolio' || id === 'about' || id === 'contact') {
      onNavigate('portfolio', id)
    } else if (id === 'exit') {
      onBack()
    }
  }

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex

  return (
    <div className="rdr-cinematic-bars relative w-full h-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-35"
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

      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f0e0c_0%,#19150f_50%,#0e0c09_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/75" />

      <motion.div 
        className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="rdr-vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex">
        <div className="w-full max-w-md pl-12 md:pl-24 flex flex-col justify-center">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                className="w-full text-left py-3 px-4 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setSelectedIndex(index)
                  handleSelect(item.id)
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {activeIndex === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#cc0000]"
                    layoutId="menuIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
                <span 
                  className={`text-xl md:text-2xl tracking-[0.15em] transition-colors duration-200 ${
                    activeIndex === index 
                      ? 'text-[#e8dcc8]' 
                      : 'text-[#6b635a]'
                  }`}
                  style={{ fontFamily: 'var(--font-western), Georgia, serif' }}
                >
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <motion.div 
            className="mt-12 pl-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-[#4a453d] text-sm tracking-wider"
              style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}
            >
              {menuItems[activeIndex].description}
            </p>
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <motion.div
            className="absolute bottom-8 right-8 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-[#3d3a35] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}
            >
              Navega con el cursor
            </p>
            <p className="text-[#3d3a35] text-xs tracking-[0.2em] uppercase mt-1"
              style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}
            >
              Click para seleccionar
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
